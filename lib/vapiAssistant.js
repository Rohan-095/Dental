// Paste this config into your Vapi dashboard when creating the assistant
// or use the Vapi API to create it programmatically

export const dentalAssistantConfig = {
  name: "Dental AI Receptionist",
  firstMessage: "Thank you for calling. This is Aria, your dental receptionist. How can I help you today?",

  model: {
    provider: "openai",
    model: "gpt-4o",
    systemPrompt: `You are Aria, a professional and friendly AI receptionist for a dental clinic.

Your job is to:
- Greet patients warmly
- Book, confirm, or cancel appointments
- Answer basic questions about services and hours
- Collect patient name, phone number, and reason for visit

Clinic services: General Checkup, Teeth Cleaning, Whitening, Fillings, Root Canal, Emergency Visit, Invisalign Consultation.
Clinic hours: Monday to Friday 9am to 5pm, Saturday 9am to 1pm.

Rules:
- Always confirm the patient's name and phone number before booking
- Ask for preferred date and time, then check availability
- If a slot is unavailable, offer the next available options
- Always confirm all details before finalizing a booking
- Keep responses short and clear — one question at a time
- Never discuss pricing unless asked, then say "Our team will confirm pricing when you arrive"
- If the patient seems confused or upset, offer to transfer to a human`,

    tools: [
      {
        type: "function",
        function: {
          name: "check_availability",
          description: "Check if a date and time slot is available for booking",
          parameters: {
            type: "object",
            properties: {
              date: { type: "string", description: "Date in YYYY-MM-DD format" },
              time: { type: "string", description: "Time in HH:MM 24hr format" },
            },
            required: ["date", "time"],
          },
        },
      },
      {
        type: "function",
        function: {
          name: "book_appointment",
          description: "Book a confirmed appointment for the patient",
          parameters: {
            type: "object",
            properties: {
              patientName: { type: "string" },
              phone: { type: "string" },
              email: { type: "string" },
              service: { type: "string" },
              date: { type: "string", description: "YYYY-MM-DD" },
              time: { type: "string", description: "HH:MM 24hr" },
            },
            required: ["patientName", "phone", "service", "date", "time"],
          },
        },
      },
      {
        type: "function",
        function: {
          name: "get_patient",
          description: "Look up an existing patient by phone number",
          parameters: {
            type: "object",
            properties: {
              phone: { type: "string" },
            },
            required: ["phone"],
          },
        },
      },
      {
        type: "function",
        function: {
          name: "cancel_appointment",
          description: "Cancel an existing appointment",
          parameters: {
            type: "object",
            properties: {
              phone: { type: "string" },
              date: { type: "string", description: "YYYY-MM-DD" },
            },
            required: ["phone", "date"],
          },
        },
      },
    ],
  },

  voice: {
    provider: "elevenlabs",
    voiceId: "21m00Tcm4TlvDq8ikWAM", // Rachel — professional female voice
  },

  serverUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/vapi/webhook`,
};
