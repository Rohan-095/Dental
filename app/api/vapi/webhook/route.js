import { getSupabaseAdmin } from "@/lib/supabase";
import { sendSMS, buildConfirmationSMS } from "@/lib/twilio";
import { createCalendarEvent, checkAvailability } from "@/lib/calendar";
import { sendAppointmentNotification } from "@/lib/gmail";

// Vapi sends a shared secret in the x-vapi-secret header (configured in the
// Vapi assistant's serverUrlSecret field). Verify before doing any work.
function verifyVapiSecret(req) {
  if (process.env.VAPI_WEBHOOK_SKIP_VERIFY === "true") return true;

  const expected = process.env.VAPI_WEBHOOK_SECRET;
  if (!expected) return false;

  const provided = req.headers.get("x-vapi-secret") || "";
  if (provided.length !== expected.length) return false;

  let result = 0;
  for (let i = 0; i < provided.length; i++) {
    result |= provided.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return result === 0;
}

// Vapi calls this route for tool calls and call events
export async function POST(req) {
  if (!verifyVapiSecret(req)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { message } = body;

  if (!message) return Response.json({ error: "No message" }, { status: 400 });

  // --- Tool call from Vapi agent ---
  if (message.type === "tool-calls") {
    const results = await handleToolCalls(message.toolCallList);
    return Response.json({ results });
  }

  // --- Call ended event ---
  if (message.type === "end-of-call-report") {
    await handleCallEnded(message);
    return Response.json({ ok: true });
  }

  return Response.json({ ok: true });
}

async function handleToolCalls(toolCallList) {
  const results = [];

  for (const toolCall of toolCallList) {
    const { id, function: fn } = toolCall;
    const args = fn.arguments || {};
    let result = "";

    try {
      if (fn.name === "check_availability") {
        const available = await checkAvailability(args.date, args.time);
        result = available
          ? `Yes, ${args.date} at ${args.time} is available.`
          : `Sorry, ${args.date} at ${args.time} is already booked. Please suggest another time.`;
      }

      if (fn.name === "book_appointment") {
        const { patientName, phone, email, service, date, time } = args;

        // 1. Upsert patient
        const { data: patient } = await getSupabaseAdmin()
          .from("patients")
          .upsert({ name: patientName, phone, email }, { onConflict: "phone" })
          .select()
          .single();

        // 2. Create calendar event
        const calendarEvent = await createCalendarEvent({ patientName, phone, service, date, time });

        // 3. Save appointment
        const { data: appt } = await getSupabaseAdmin()
          .from("appointments")
          .insert({
            patient_id: patient?.id,
            patient_name: patientName,
            phone,
            email,
            service,
            date,
            time,
            status: "confirmed",
            booked_via: "ai",
            calendar_event_id: calendarEvent?.id,
          })
          .select()
          .single();

        // 4. Send confirmation SMS
        await sendSMS(phone, buildConfirmationSMS({
          patientName,
          date,
          time,
          service,
          clinicPhone: process.env.TWILIO_PHONE_NUMBER,
        }));

        // 5. Notify dentist by email
        await sendAppointmentNotification({ patientName, phone, service, date, time });

        result = `Appointment booked for ${patientName} on ${date} at ${time} for ${service}. Confirmation SMS sent.`;
      }

      if (fn.name === "get_patient") {
        const { data: patient } = await getSupabaseAdmin()
          .from("patients")
          .select("name, phone, email, notes")
          .eq("phone", args.phone)
          .single();

        result = patient
          ? `Patient found: ${patient.name}, last notes: ${patient.notes || "none"}.`
          : "No existing patient record found. Will create a new one when booking.";
      }

      if (fn.name === "cancel_appointment") {
        await getSupabaseAdmin()
          .from("appointments")
          .update({ status: "cancelled" })
          .eq("phone", args.phone)
          .eq("date", args.date);

        result = `Appointment on ${args.date} for ${args.phone} has been cancelled.`;
      }

    } catch (err) {
      result = `Error processing ${fn.name}: ${err.message}`;
    }

    results.push({ toolCallId: id, result });
  }

  return results;
}

async function handleCallEnded(message) {
  const { call, transcript, summary } = message;
  if (!call?.id) return;

  await getSupabaseAdmin().from("calls").upsert({
    vapi_call_id: call.id,
    phone: call.customer?.number,
    direction: "inbound",
    duration_seconds: call.endedAt
      ? Math.round((new Date(call.endedAt) - new Date(call.startedAt)) / 1000)
      : null,
    outcome: "other",
    transcript: typeof transcript === "string" ? transcript : JSON.stringify(transcript),
    summary,
  }, { onConflict: "vapi_call_id" });
}
