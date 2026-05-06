import { google } from "googleapis";

function getCalendarClient() {
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });
  return google.calendar({ version: "v3", auth });
}

export async function checkAvailability(date, time) {
  const calendar = getCalendarClient();
  const start = new Date(`${date}T${time}:00`);
  const end = new Date(start.getTime() + 60 * 60 * 1000); // 1 hour slot

  const res = await calendar.freebusy.query({
    requestBody: {
      timeMin: start.toISOString(),
      timeMax: end.toISOString(),
      items: [{ id: process.env.GOOGLE_CALENDAR_ID }],
    },
  });

  const busy = res.data.calendars[process.env.GOOGLE_CALENDAR_ID].busy;
  return busy.length === 0;
}

export async function createCalendarEvent({ patientName, phone, service, date, time }) {
  const calendar = getCalendarClient();
  const start = new Date(`${date}T${time}:00`);
  const end = new Date(start.getTime() + 60 * 60 * 1000);

  const event = await calendar.events.insert({
    calendarId: process.env.GOOGLE_CALENDAR_ID,
    requestBody: {
      summary: `${service} — ${patientName}`,
      description: `Patient: ${patientName}\nPhone: ${phone}\nService: ${service}`,
      start: { dateTime: start.toISOString() },
      end: { dateTime: end.toISOString() },
    },
  });

  return event.data;
}
