import nodemailer from "nodemailer";

let _transporter = null;
function getTransporter() {
  if (!_transporter) {
    _transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
    });
  }
  return _transporter;
}

export async function sendAppointmentNotification({ patientName, phone, service, date, time }) {
  await getTransporter().sendMail({
    from: process.env.GMAIL_USER,
    to: process.env.DENTIST_EMAIL,
    subject: `New Appointment: ${patientName} — ${service}`,
    html: `<h2>New Appointment Booked</h2>
      <p><strong>Patient:</strong> ${patientName}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Date:</strong> ${date} at ${time}</p>`,
  });
}

export async function sendConfirmationEmail({ to, patientName, service, date, time }) {
  await getTransporter().sendMail({
    from: process.env.GMAIL_USER,
    to,
    subject: `Appointment Confirmed — ${service}`,
    html: `<h2>Your Appointment is Confirmed</h2>
      <p>Hi ${patientName},</p>
      <p>Your <strong>${service}</strong> is booked for <strong>${date} at ${time}</strong>.</p>
      <p>If you need to reschedule, please call us.</p>`,
  });
}
