export type Service = {
  id: number
  icon: string
  title: string
  desc: string
  tag?: string
}

export const SERVICES: Service[] = [
  {
    id: 1,
    icon: 'Shield',
    title: 'General Dentistry',
    desc: 'Preventive cleanings, digital X-rays, and comprehensive exams that keep your smile healthy long-term.',
  },
  {
    id: 2,
    icon: 'Sparkles',
    title: 'Cosmetic Dentistry',
    desc: 'Veneers, bonding, and smile makeovers designed around what you want your smile to look and feel like.',
    tag: 'Popular',
  },
  {
    id: 3,
    icon: 'Layers',
    title: 'Invisalign',
    desc: 'Custom clear aligners for straighter teeth - no wires, no brackets, no awkward conversations.',
    tag: 'Trending',
  },
  {
    id: 4,
    icon: 'Zap',
    title: 'Dental Implants',
    desc: 'Permanent, natural-looking replacements that function exactly like your real teeth.',
  },
  {
    id: 5,
    icon: 'AlertTriangle',
    title: 'Emergency Dental',
    desc: 'Same-day care for pain, swelling, broken teeth, and urgent dental situations.',
    tag: 'Same-Day',
  },
  {
    id: 6,
    icon: 'Sun',
    title: 'Teeth Whitening',
    desc: 'In-office professional whitening up to 8 shades brighter in a single appointment.',
  },
]
