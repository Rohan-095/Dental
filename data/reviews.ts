export type Review = {
  id: number
  name: string
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
    role: 'Patient since 2022',
    initials: 'SM',
    text: "I used to dread going to the dentist. Ava Dental changed that completely — the team is warm, the space feels calming, and my teeth have never looked better. Worth every visit.",
    rating: 5,
    color: '#3B82F6',
  },
  {
    id: 2,
    name: 'James K.',
    role: 'Patient since 2023',
    initials: 'JK',
    text: "Booked through their AI assistant at midnight, had a same-day crown by noon the next day. The whole experience was impressively smooth from start to finish.",
    rating: 5,
    color: '#8B5CF6',
  },
  {
    id: 3,
    name: 'Priya R.',
    role: 'Patient since 2021',
    initials: 'PR',
    text: "My Invisalign journey was completely transparent — they showed me the full outcome before I even started. Seven months later, my smile is exactly what I envisioned.",
    rating: 5,
    color: '#10B981',
  },
]
