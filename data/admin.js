export const LEADS = [
  { id: 1, name: 'Sarah Chen', phone: '(604) 555-0198', email: 'sarah.chen@email.com', service: 'General Checkup', source: 'Website', status: 'New', createdAt: 'May 6, 2026' },
  { id: 2, name: 'Marcus Powell', phone: '(604) 555-0143', email: 'mpowell@gmail.com', service: 'Clear Aligners', source: 'AI Chat', status: 'Contacted', createdAt: 'May 5, 2026' },
  { id: 3, name: 'Priya Sharma', phone: '(604) 555-0271', email: 'priya.sharma@email.com', service: 'Teeth Whitening', source: 'Google', status: 'Booked', createdAt: 'May 5, 2026' },
  { id: 4, name: 'James Mwangi', phone: '(604) 555-0382', email: 'j.mwangi@email.com', service: 'Emergency Care', source: 'AI Chat', status: 'Closed', createdAt: 'May 4, 2026' },
  { id: 5, name: 'Olivia Turner', phone: '(604) 555-0416', email: 'oturner@email.com', service: 'Crowns & Implants', source: 'Referral', status: 'New', createdAt: 'May 4, 2026' },
  { id: 6, name: 'Daniel Kowalski', phone: '(604) 555-0527', email: 'dkowalski@email.com', service: 'Cosmetic Consult', source: 'Instagram', status: 'Contacted', createdAt: 'May 3, 2026' },
  { id: 7, name: 'Amara Diallo', phone: '(604) 555-0634', email: 'amara.d@email.com', service: 'Dental Cleaning', source: 'Website', status: 'Booked', createdAt: 'May 3, 2026' },
  { id: 8, name: 'Kevin Zhang', phone: '(604) 555-0745', email: 'k.zhang@email.com', service: 'Veneers', source: 'AI Chat', status: 'Lost', createdAt: 'May 2, 2026' },
]

export const APPOINTMENTS = [
  { id: 1, patient: 'Priya Sharma', phone: '(604) 555-0271', service: 'Teeth Whitening', date: 'May 6, 2026', time: '10:00 AM', status: 'Confirmed', notes: 'Wants extra whitening strips' },
  { id: 2, patient: 'Amara Diallo', phone: '(604) 555-0634', service: 'Dental Cleaning', date: 'May 6, 2026', time: '2:00 PM', status: 'Confirmed', notes: '' },
  { id: 3, patient: 'Tom Bradley', phone: '(604) 555-0809', service: 'General Checkup', date: 'May 7, 2026', time: '9:00 AM', status: 'Pending', notes: 'New patient' },
  { id: 4, patient: 'Nina Patel', phone: '(604) 555-0921', service: 'Clear Aligners Consult', date: 'May 7, 2026', time: '11:30 AM', status: 'Confirmed', notes: '' },
  { id: 5, patient: 'Marcus Powell', phone: '(604) 555-0143', service: 'Clear Aligners', date: 'May 8, 2026', time: '1:00 PM', status: 'Pending', notes: 'Follow-up from chat lead' },
  { id: 6, patient: 'James Mwangi', phone: '(604) 555-0382', service: 'Emergency Extraction', date: 'May 4, 2026', time: '4:30 PM', status: 'Completed', notes: 'Wisdom tooth removed' },
  { id: 7, patient: 'Rachel Kim', phone: '(604) 555-1034', service: 'Veneers Consult', date: 'May 9, 2026', time: '10:00 AM', status: 'Cancelled', notes: 'Patient cancelled via WhatsApp' },
  { id: 8, patient: 'David Osei', phone: '(604) 555-1145', service: 'Crowns', date: 'May 9, 2026', time: '2:30 PM', status: 'Confirmed', notes: '' },
]

export const CONVERSATIONS = [
  { id: 1, patient: 'Sarah Chen', contact: 'sarah.chen@email.com', lastMessage: 'Can I book a cleaning this week?', summary: 'Asked about cleaning availability. Ava provided open slots and started booking flow.', urgency: 'Low', date: 'May 6, 9:41 AM' },
  { id: 2, patient: 'Anonymous', contact: '(604) 555-0174', lastMessage: 'I have severe tooth pain since yesterday', summary: 'Reported severe pain. Ava flagged as urgent and provided emergency number immediately.', urgency: 'High', date: 'May 6, 8:12 AM' },
  { id: 3, patient: 'Marcus Powell', contact: 'mpowell@gmail.com', lastMessage: 'What does aligner treatment cost?', summary: 'Aligner pricing inquiry. Ava gave range and booked a free consult appointment.', urgency: 'Low', date: 'May 5, 3:22 PM' },
  { id: 4, patient: 'Olivia Turner', contact: 'oturner@email.com', lastMessage: 'Do you accept Pacific Blue Cross?', summary: 'Insurance inquiry. Ava confirmed clinic accepts most major plans and offered intake form.', urgency: 'Low', date: 'May 5, 11:05 AM' },
  { id: 5, patient: 'Anonymous', contact: '(604) 555-0292', lastMessage: 'My crown fell off, need help asap', summary: 'Crown emergency. Ava routed to same-day urgent booking and collected patient info.', urgency: 'High', date: 'May 4, 2:48 PM' },
  { id: 6, patient: 'Daniel Kowalski', contact: 'dkowalski@email.com', lastMessage: 'Interested in cosmetic options', summary: 'General cosmetic inquiry. Ava shared veneers and whitening info with next steps.', urgency: 'Low', date: 'May 3, 5:15 PM' },
]

export const TRIAGE = [
  { id: 1, patient: 'Anonymous', symptoms: 'Severe tooth pain, swelling, fever reported', severity: 'Critical', contact: '(604) 555-0174', created: 'May 6, 8:12 AM', status: 'Open' },
  { id: 2, patient: 'Anonymous', symptoms: 'Crown fell off, unable to eat', severity: 'High', contact: '(604) 555-0292', created: 'May 4, 2:48 PM', status: 'Resolved' },
  { id: 3, patient: 'Kevin Zhang', symptoms: 'Bleeding gums after procedure', severity: 'Medium', contact: 'k.zhang@email.com', created: 'May 2, 6:30 PM', status: 'Resolved' },
  { id: 4, patient: 'Anonymous', symptoms: 'Broken tooth with sharp pain', severity: 'High', contact: '(604) 555-0512', created: 'May 1, 11:22 AM', status: 'Resolved' },
]

export const INTAKES = [
  { id: 1, patient: 'Tom Bradley', dob: 'Mar 14, 1989', phone: '(604) 555-0809', insurance: 'Pacific Blue Cross', complaint: 'Routine checkup, first visit', status: 'Pending', submitted: 'May 6, 2026' },
  { id: 2, patient: 'Nina Patel', dob: 'Jul 22, 1995', phone: '(604) 555-0921', insurance: 'Great-West Life', complaint: 'Interested in clear aligners', status: 'Reviewed', submitted: 'May 6, 2026' },
  { id: 3, patient: 'Rachel Kim', dob: 'Nov 5, 1992', phone: '(604) 555-1034', insurance: 'Sunlife', complaint: 'Cosmetic veneers consultation', status: 'Reviewed', submitted: 'May 5, 2026' },
  { id: 4, patient: 'David Osei', dob: 'Jan 30, 1980', phone: '(604) 555-1145', insurance: 'Manulife', complaint: 'Crown replacement required', status: 'Pending', submitted: 'May 5, 2026' },
  { id: 5, patient: 'Priya Sharma', dob: 'Sep 18, 1997', phone: '(604) 555-0271', insurance: 'Desjardins', complaint: 'Teeth whitening and general cleaning', status: 'Reviewed', submitted: 'May 4, 2026' },
]

export const VOICE_CALLS = [
  { id: 1, caller: 'Unknown', phone: '(604) 555-0174', status: 'Completed', summary: 'Patient reported severe pain. AI collected name and symptoms. Escalated to on-call staff.', recording: null, urgency: true, result: 'Escalated to staff' },
  { id: 2, caller: 'Marcus Powell', phone: '(604) 555-0143', status: 'Completed', summary: 'Inquired about aligner pricing. AI provided info and scheduled a callback for today.', recording: null, urgency: false, result: 'Callback scheduled' },
  { id: 3, caller: 'Unknown', phone: '(604) 555-0292', status: 'Completed', summary: 'Crown emergency. AI collected contact info and booked same-day appointment slot.', recording: null, urgency: true, result: 'Booked same-day' },
  { id: 4, caller: 'Amara Diallo', phone: '(604) 555-0634', status: 'Completed', summary: 'Appointment reminder call. Patient confirmed attendance for 2:00 PM cleaning.', recording: null, urgency: false, result: 'Confirmed' },
]
