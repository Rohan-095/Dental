export type Review = {
  id: number
  name: string
  service: string
  role: string
  initials: string
  text: string
  rating: number
  color: string
}

export const REVIEWS: Review[] = [
  {
    id: 1,
    name: 'Sarah M.',
    service: 'Teeth Whitening',
    role: 'Patient since 2022',
    initials: 'SM',
    text: "I used to dread going to the dentist. Ava Dental changed that completely — the team is warm, the space feels calming, and my teeth have never looked better.",
    rating: 5,
    color: '#3B82F6',
  },
  {
    id: 2,
    name: 'James K.',
    service: 'CEREC Same-Day Crown',
    role: 'Patient since 2023',
    initials: 'JK',
    text: "Booked through their AI assistant at midnight, had a same-day crown by noon the next day. The whole experience was impressively smooth from start to finish.",
    rating: 5,
    color: '#8B5CF6',
  },
  {
    id: 3,
    name: 'Priya R.',
    service: 'Clear Aligners',
    role: 'Patient since 2021',
    initials: 'PR',
    text: "My Invisalign journey was completely transparent — they showed me the full outcome before I even started. Seven months later, my smile is exactly what I envisioned.",
    rating: 5,
    color: '#10B981',
  },
  {
    id: 4,
    name: 'Marcus L.',
    service: 'Emergency Care',
    role: 'Patient since 2024',
    initials: 'ML',
    text: "Had a cracked tooth on a Sunday. Same-day slot, zero judgment. The AI receptionist was surprisingly helpful routing me to the right person immediately.",
    rating: 5,
    color: '#F59E0B',
  },
  {
    id: 5,
    name: 'Chloe R.',
    service: 'Cosmetic Bonding',
    role: 'Patient since 2023',
    initials: 'CR',
    text: "The results look completely natural. Everyone keeps asking if I got veneers. I just say I switched dentists. Could not be happier with the outcome.",
    rating: 5,
    color: '#EC4899',
  },
  {
    id: 6,
    name: 'David W.',
    service: 'Dental Implants',
    role: 'Patient since 2022',
    initials: 'DW',
    text: "Transparent pricing, zero hidden costs. The digital treatment plan they sent before the procedure completely put my mind at ease. Highly recommend.",
    rating: 5,
    color: '#06B6D4',
  },
  {
    id: 7,
    name: 'Aisha N.',
    service: 'General Checkup',
    role: 'Patient since 2023',
    initials: 'AN',
    text: "I was terrified of dentists before this. The team here genuinely changed that. Calm atmosphere, kind staff, and Ava even followed up after my visit.",
    rating: 5,
    color: '#84CC16',
  },
  {
    id: 8,
    name: 'Tom B.',
    service: 'Digital Diagnostics',
    role: 'Patient since 2024',
    initials: 'TB',
    text: "The 3D scan showed me exactly what was happening with my teeth before anything was touched. I felt informed and in control the whole way through.",
    rating: 5,
    color: '#F97316',
  },
]
