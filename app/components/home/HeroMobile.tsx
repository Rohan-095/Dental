'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Bot, Sparkles, Star } from 'lucide-react'
import Button from '@/app/components/ui/Button'

export default function HeroMobile() {
  const shouldReduce = useReducedMotion()

  return (
    <section
      className="relative h-svh min-h-[640px] w-full overflow-hidden text-white md:hidden"
      aria-label="Hero"
    >
      {/* Video background — same source as desktop, mobile-friendly preload */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/hero-poster.jpg"
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      >
        <source src="/videos/hero-dental.mp4" type="video/mp4" />
      </video>

      {/* Overlays for legibility */}
      <div className="absolute inset-0 bg-black/68" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/72"
        aria-hidden="true"
      />

      {/* Single teal blob for depth (no motion) */}
      <div
        className="pointer-events-none absolute right-[-12%] top-[10%] h-[280px] w-[280px] rounded-full opacity-35"
        style={{
          background:
            'radial-gradient(circle, rgba(45,212,191,0.55) 0%, transparent 68%)',
          filter: 'blur(72px)',
        }}
        aria-hidden="true"
      />

      {/* Content — vertical stack, above the fold at 375 × 667 */}
      <div className="relative z-10 mx-auto flex h-full max-w-md flex-col justify-center px-5 pb-24 pt-28">
        {/* Premium badge */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-4 py-1.5 text-[11px] font-medium tracking-wide text-white/80 backdrop-blur-sm"
        >
          <Sparkles size={12} className="text-[#2DD4BF]" />
          AI-powered dental experience
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={shouldReduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.65,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1] as const,
          }}
          className="text-[2.65rem] font-bold leading-[1.04] tracking-tight"
        >
          Your smile,
          <span
            className="block mt-1"
            style={{
              background:
                'linear-gradient(135deg, #2DD4BF 0%, #60A5FA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            upgraded.
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={shouldReduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.32 }}
          className="mt-4 max-w-md text-[15px] leading-relaxed text-white/68"
        >
          Modern dental care with AI-assisted booking, gentle clinical expertise, and a premium patient experience.
        </motion.p>

        {/* Trust line — 4.9 + patient count */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.42 }}
          className="mt-6 flex items-center gap-2.5"
        >
          <div className="flex gap-0.5" aria-hidden="true">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={13}
                className="fill-amber-400 text-amber-400"
              />
            ))}
          </div>
          <p className="text-xs font-medium text-white/75">
            4.9 · 200+ happy patients
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.52 }}
          className="mt-7 flex flex-col gap-3"
        >
          <Button
            variant="heroPrimary"
            size="lg"
            href="#booking"
            className="w-full justify-center"
          >
            Book Appointment
            <ArrowRight size={16} />
          </Button>
          <Button
            variant="heroSecondary"
            size="lg"
            href="#ai-receptionist"
            className="w-full justify-center"
          >
            <Bot size={16} className="text-[#2DD4BF]" />
            Ask AI Receptionist
          </Button>
        </motion.div>

        {/* AI value line */}
        <motion.p
          initial={shouldReduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-5 text-center text-[11px] font-medium tracking-wide text-white/45"
        >
          Reply in seconds · Available 24/7
        </motion.p>
      </div>

      {/* Static scroll cue */}
      <div
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5 text-white/35"
        aria-hidden="true"
      >
        <div className="h-6 w-px bg-white/25" />
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em]">
          Scroll
        </span>
      </div>
    </section>
  )
}
