'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CalendarCheck, Coffee, FileCheck } from 'lucide-react'

const STEPS = [
  {
    n: '01',
    icon: CalendarCheck,
    title: 'Tell us why you’re visiting',
    body: 'Book online in under a minute, or message Ava — our AI receptionist — anytime. No phone tag, no hold music.',
  },
  {
    n: '02',
    icon: Coffee,
    title: 'Arrive to a calm clinic',
    body: 'Quick check-in, no long forms, modern chairs, and a team that takes time to listen before treating.',
  },
  {
    n: '03',
    icon: FileCheck,
    title: 'Leave with a clear plan',
    body: 'Treatment options, timing, and honest pricing in plain language. No pressure, no surprises.',
  },
]

export default function WhatToExpect() {
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
            Your first visit
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-4xl font-bold leading-tight tracking-tight text-[#06182d] md:text-5xl"
          >
            Three quiet steps from question to care.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="mt-5 max-w-2xl text-base leading-7 text-slate-700"
          >
            We&apos;ve trimmed the friction so your first visit feels like the rest — calm, considered, and on your schedule.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="relative rounded-2xl border border-slate-200 bg-white p-7"
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-[11px] font-semibold tracking-[0.18em] text-slate-400">
                    {step.n}
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-[#06182d] ring-1 ring-inset ring-slate-200">
                    <Icon size={22} strokeWidth={1.75} />
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold leading-snug tracking-tight text-[#06182d]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-700">{step.body}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
