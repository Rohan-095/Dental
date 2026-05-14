'use client'

import { useRef, useCallback } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { AlertTriangle, MessageSquare, Phone } from 'lucide-react'
import { PHONE, PHONE_RAW } from '@/data/clinic'
import Button from '@/app/components/ui/Button'

export default function EmergencyCTA() {
  const ref = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduce || !sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    sectionRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    sectionRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }, [shouldReduce])

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      id="emergency"
      className="relative overflow-hidden bg-[#06182d] border-t border-white/[0.06] py-24 md:py-32"
    >
      {/* Static base glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(249,115,22,0.12),transparent_38%)]" />
      {/* Cursor-follow orange glow */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(720px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(249,115,22,0.18), rgba(234,88,12,0.06) 48%, transparent 62%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-3xl px-5 text-center md:px-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-orange-300/25 bg-orange-400/12 px-4 py-2"
        >
          <AlertTriangle size={15} className="text-orange-300" />
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-200">
            Dental Emergency?
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="mb-5 text-4xl font-bold leading-tight text-white md:text-6xl"
        >
          Tooth pain or swelling?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.14 }}
          className="mx-auto mb-9 max-w-lg text-lg leading-relaxed text-slate-300/76"
        >
          If something feels urgent, don&apos;t wait. Call the clinic directly or start with Ava — we&apos;ll route you to the right care, fast.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button variant="emergencyPrimary" size="lg" href={`tel:${PHONE_RAW}`} className="w-full sm:w-auto">
            <Phone size={17} />
            Call Now - {PHONE}
          </Button>
          <Button variant="ghost" size="lg" href="#ai-receptionist" className="w-full sm:w-auto">
            <MessageSquare size={17} />
            Start Emergency Chat
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-6 text-xs text-slate-500"
        >
          Same-day emergency slots available. We prioritise urgent dental pain.
        </motion.p>
      </div>
    </section>
  )
}
