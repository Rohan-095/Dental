'use client'

import { useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import {
  Activity,
  ArrowUpRight,
  Braces,
  HeartPulse,
  ScanLine,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

type Service = {
  eyebrow: string
  title: string
  desc: string
  icon: typeof ShieldCheck
}

const SERVICES: Service[] = [
  {
    eyebrow: 'Routine care',
    title: 'General Dentistry',
    desc: 'Routine exams, hygiene visits, digital X-rays, and preventive care.',
    icon: ShieldCheck,
  },
  {
    eyebrow: 'Imaging',
    title: 'Digital Diagnostics',
    desc: 'Clear imaging, treatment planning, and precision clinical decisions.',
    icon: ScanLine,
  },
  {
    eyebrow: 'Aesthetic',
    title: 'Cosmetic Dentistry',
    desc: 'Whitening, bonding, veneers, and natural smile enhancements.',
    icon: Sparkles,
  },
  {
    eyebrow: 'Orthodontics',
    title: 'Clear Aligners',
    desc: 'Discreet orthodontic treatment with digital progress previews.',
    icon: Braces,
  },
  {
    eyebrow: 'Same-day care',
    title: 'Emergency Care',
    desc: 'Same-day support for pain, swelling, chips, and urgent concerns.',
    icon: HeartPulse,
  },
  {
    eyebrow: 'Restoration',
    title: 'Restorative Care',
    desc: 'Crowns, implants, and durable repairs with a natural finish.',
    icon: Activity,
  },
]

function ServiceCard({ item, index }: { item: Service; index: number }) {
  const shouldReduce = useReducedMotion()
  const Icon = item.icon
  const [shine, setShine] = useState({ x: 0, y: 0 })

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduce) return
    const rect = e.currentTarget.getBoundingClientRect()
    setShine({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <motion.a
      href="#booking"
      onMouseMove={onMouseMove}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] as const }}
      className="group relative flex min-h-[22rem] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:border-[#2DD4BF]/50 [@media(hover:hover)]:hover:shadow-lift"
      aria-label={`${item.title} — book an appointment`}
    >
      {/* Cursor shine — hover-only devices, brand teal */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-200 [@media(hover:hover)]:group-hover:opacity-100"
        style={{
          background: `radial-gradient(380px circle at ${shine.x}px ${shine.y}px, rgba(45,212,191,0.12), transparent 60%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-1 flex-col">
        {/* Icon — solid slate chip, dark icon, premium-soft hover to teal */}
        <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-[#06182d] ring-1 ring-inset ring-slate-200 transition-colors [@media(hover:hover)]:group-hover:bg-[#2DD4BF]/15 [@media(hover:hover)]:group-hover:ring-[#2DD4BF]/40">
          <Icon size={24} strokeWidth={1.75} />
        </div>

        {/* Eyebrow — teal-700 for AA contrast on white */}
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-teal-700">
          {item.eyebrow}
        </p>

        {/* Title — full midnight */}
        <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight text-[#06182d]">
          {item.title}
        </h3>

        {/* Description — slate-700 for clear readability without being heavy */}
        <p className="mt-3 text-sm leading-6 text-slate-700">{item.desc}</p>

        {/* Hairline + book affordance pushed to bottom */}
        <div className="mt-auto pt-7">
          <div className="flex items-center justify-between border-t border-slate-200 pt-4">
            <span className="text-sm font-semibold text-[#06182d]">Book this</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-all [@media(hover:hover)]:group-hover:rotate-45 [@media(hover:hover)]:group-hover:border-[#2DD4BF] [@media(hover:hover)]:group-hover:bg-[#2DD4BF] [@media(hover:hover)]:group-hover:text-white">
              <ArrowUpRight size={16} />
            </span>
          </div>
        </div>
      </div>
    </motion.a>
  )
}

export default function Services() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="services" className="bg-[#F8F4EC] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div ref={ref} className="mb-16 grid items-end gap-7 md:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="w-fit rounded-full border border-[#06182d]/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#06182d]"
          >
            Our Services
          </motion.div>
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-[#06182d] md:text-6xl"
            >
              Calm, considered, quietly modern care.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.14 }}
              className="mt-5 max-w-2xl text-base leading-7 text-slate-600"
            >
              Six core services under one roof — from routine cleanings to digital diagnostics — delivered by a team that takes the rush out of dentistry.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((item, index) => (
            <ServiceCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
