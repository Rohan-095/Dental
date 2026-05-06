import twilio from "twilio";

let _client = null;
function getClient() {
  if (!_client) _client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  return _client;
}

export async function sendSMS(to, body) {
  return getClient().messages.create({ from: process.env.TWILIO_PHONE_NUMBER, to, body });
}

export function buildConfirmationSMS({ patientName, date, time, service, clinicPhone }) {
  return `Hi ${patientName}! Your ${service} appointment is confirmed for ${date} at ${time}. Questions? Call us at ${clinicPhone}. Reply CANCEL to cancel.`;
}

export function buildReminderSMS({ patientName, date, time, service }) {
  return `Reminder: Hi ${patientName}, your ${service} appointment is tomorrow at ${time} on ${date}. See you then!`;
}
