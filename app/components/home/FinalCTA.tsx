'use client'

import { useRef, useCallback } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight, Bot } from 'lucide-react'
import Button from '@/app/components/ui/Button'

export default function FinalCTA() {
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
      id="book"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #050611 0%, #0C0D19 40%, #07080F 100%)' }}
    >
      {/* Background glows */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none opacity-[0.08] blur-3xl rounded-full"
        style={{ background: 'radial-gradient(ellipse, #3B82F6 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-64 h-64 pointer-events-none opacity-[0.05] blur-3xl rounded-full"
        style={{ background: 'radial-gradient(circle, #8B5CF6, transparent 70%)' }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Cursor spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(900px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(96,165,250,0.2), rgba(167,139,250,0.1) 42%, transparent 62%)',
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(1500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(99,102,241,0.08), transparent 55%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl mx-auto px-5 md:px-10 text-center" ref={ref}>
        {/* Pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-7"
          style={{
            background: 'rgba(59,130,246,0.1)',
            border: '1px solid rgba(59,130,246,0.22)',
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-blue-300 text-xs font-medium tracking-wide">Book in under 60 seconds</span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] as const }}
          className="text-4xl md:text-6xl font-bold text-white leading-[1.08] mb-5"
        >
          Ready for a better
          <span
            className="block mt-1"
            style={{
              background: 'linear-gradient(135deg, #60A5FA 0%, #34D399 50%, #A78BFA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            dental visit?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.16 }}
          className="text-slate-400 text-lg mb-10 max-w-md mx-auto leading-relaxed"
        >
          Book your appointment online or let Ava guide you to the right care in under a minute.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.22 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Button variant="heroPrimary" size="lg" href="#booking" className="w-full sm:w-auto">
            Book Appointment
            <ArrowRight size={16} />
          </Button>
          <Button variant="heroSecondary" size="lg" href="#ai-receptionist" className="w-full sm:w-auto">
            <Bot size={17} />
            Ask AI Receptionist
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-slate-600 text-xs mt-8"
        >
          Free consultation - No commitment - Cancel anytime
        </motion.p>
      </div>
    </section>
  )
}
