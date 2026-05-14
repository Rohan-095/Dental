'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Building2,
  Clock,
  CreditCard,
  Languages,
  Lock,
  ShieldCheck,
} from 'lucide-react'

const BADGES = [
  { icon: Clock, label: 'Open since 2007' },
  { icon: Building2, label: 'Registered with the BC College of Dental Surgeons' },
  { icon: CreditCard, label: 'Direct billing — most major insurers' },
  { icon: Lock, label: 'PIPEDA-conscious patient data handling' },
  { icon: ShieldCheck, label: 'Same-day emergency triage' },
  { icon: Languages, label: 'Multilingual care (EN / 中文 / Punjabi)' },
]

// Placeholder dentist details — swap with real clinic info when available.
const DENTIST = {
  initials: 'SC',
  name: 'Dr. Sarah Chen, DDS',
  meta: 'Lead Clinician · 18+ years in Vancouver',
  quote:
    '“Our promise: gentle care, clear plans, and honest pricing — at the pace you need.”',
  affiliation: 'Registered with the BC College of Dental Surgeons',
}

export default function TrustAuthority() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="bg-[#F0E9DC] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div ref={ref} className="mb-14 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-4 w-fit rounded-full border border-[#06182d]/10 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#06182d]"
          >
            Care you can trust
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-4xl font-bold leading-tight tracking-tight text-[#06182d] md:text-5xl"
          >
            Accredited, established, and on call when you need us.
          </motion.h2>
        </div>

        {/* Trust badges grid */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {BADGES.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4"
            >
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[#06182d] ring-1 ring-inset ring-slate-200">
                <Icon size={18} strokeWidth={1.75} />
              </span>
              <p className="text-sm font-medium leading-6 text-slate-800">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* Dentist credibility card */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10 grid items-center gap-6 rounded-2xl border border-slate-200 bg-white p-7 md:grid-cols-[auto_1fr] md:gap-10 md:p-10"
        >
          <div className="flex items-center gap-5 md:flex-col md:items-start md:gap-3">
            <div
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full text-2xl font-bold text-white"
              style={{
                background:
                  'linear-gradient(135deg, #06182d 0%, #134E4A 55%, #2DD4BF 100%)',
              }}
              aria-hidden="true"
            >
              {DENTIST.initials}
            </div>
            <div className="md:hidden">
              <p className="font-display text-lg font-semibold tracking-tight text-[#06182d]">
                {DENTIST.name}
              </p>
              <p className="mt-1 text-xs font-medium text-slate-500">{DENTIST.meta}</p>
            </div>
          </div>

          <div>
            <div className="hidden md:block">
              <p className="font-display text-2xl font-semibold leading-tight tracking-tight text-[#06182d]">
                {DENTIST.name}
              </p>
              <p className="mt-1 text-sm font-medium text-slate-500">{DENTIST.meta}</p>
            </div>
            <p className="mt-3 text-base leading-7 text-slate-700 md:mt-5 md:text-lg">
              {DENTIST.quote}
            </p>
            <p className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-slate-500">
              <ShieldCheck size={14} className="text-teal-700" />
              {DENTIST.affiliation}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
