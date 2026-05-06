# API Plan

## POST /api/leads
Save a lead from chat widget or contact form.

**Body:** `{ name, phone, email?, message?, source }`
**Response:** `{ success: true }` or `{ error: string }`
**Status:** Stub complete. Needs Supabase insert wired in Phase 2.

## POST /api/conversations (Phase 2)
Save a full chat conversation.

**Body:** `{ lead_id, messages: [{from, text, ts}], urgent }`

## POST /api/appointments (Phase 2)
Create an appointment request.

**Body:** `{ lead_id, service, preferred_date, preferred_time }`

## POST /api/voice/webhook (Phase 4)
Receive transcript + summary from Vapi / Retell AI after a call ends.
