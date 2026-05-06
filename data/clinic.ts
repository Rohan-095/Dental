export const CLINIC_NAME = 'Ava Dental Studio'
export const TAGLINE = 'Your smile, upgraded.'
export const PHONE = '(604) 555-0192'
export const PHONE_RAW = '+16045550192'
export const EMAIL = 'hello@avadental.ca'
export const ADDRESS = '1234 Robson St, Vancouver, BC V6E 1B9'
export const WHATSAPP_RAW = '16045550192'

export const buildWA = (msg: string) =>
  `https://wa.me/${WHATSAPP_RAW}?text=${encodeURIComponent(msg)}`

export const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'New Patients', href: '#experience' },
  { label: 'Emergency', href: '#emergency' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
]

export const HOURS = [
  { day: 'Monday - Friday', time: '8:00 AM - 6:00 PM' },
  { day: 'Saturday', time: '9:00 AM - 4:00 PM' },
  { day: 'Sunday', time: 'Closed' },
]
