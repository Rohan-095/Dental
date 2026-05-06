'use client'

import { useRef, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Sparkles, Star, CalendarCheck, ArrowRight, Bot } from 'lucide-react'

const containerV = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.2 } },
}

const itemV = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const } },
}

export default function Hero() {
  const shouldReduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduce || !sectionRef.current) return
    const el = sectionRef.current
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    el.style.setProperty('--mouse-x', `${x}px`)
    el.style.setProperty('--mouse-y', `${y}px`)
    // Parallax blobs: offset from center, range ±60px
    el.style.setProperty('--blob-x', `${(x / rect.width - 0.5) * 60}px`)
    el.style.setProperty('--blob-y', `${(y / rect.height - 0.5) * 60}px`)
  }, [shouldReduce])

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden text-white"
    >
      {/* ── Video background ──────────────────────────────────────────────── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/hero-poster.jpg"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source src="/videos/hero-dental.mp4" type="video/mp4" />
      </video>

      {/* ── Base overlays ─────────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-black/60" style={{ zIndex: 1 }} />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/10" style={{ zIndex: 2 }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" style={{ zIndex: 2 }} />

      {/* ── Parallax blobs — react to mouse ───────────────────────────────── */}
      {!shouldReduce && (
        <>
          {/* Blob 1 — emerald, right-center */}
          <div
            className="pointer-events-none absolute right-[5%] top-[20%] h-[560px] w-[560px] rounded-full opacity-30"
            style={{
              zIndex: 3,
              background: 'radial-gradient(circle, rgba(52,211,153,0.75) 0%, transparent 68%)',
              filter: 'blur(88px)',
              transform: 'translate(var(--blob-x, 0px), var(--blob-y, 0px))',
            }}
            aria-hidden="true"
          />
          {/* Blob 2 — blue, top-right */}
          <div
            className="pointer-events-none absolute right-[15%] top-[5%] h-[440px] w-[440px] rounded-full opacity-22"
            style={{
              zIndex: 3,
              background: 'radial-gradient(circle, rgba(96,165,250,0.7) 0%, transparent 68%)',
              filter: 'blur(96px)',
              transform: 'translate(calc(var(--blob-x, 0px) * -0.6), calc(var(--blob-y, 0px) * 0.4))',
            }}
            aria-hidden="true"
          />
          {/* Blob 3 — violet, bottom-right */}
          <div
            className="pointer-events-none absolute bottom-[10%] right-[10%] h-[380px] w-[380px] rounded-full opacity-20"
            style={{
              zIndex: 3,
              background: 'radial-gradient(circle, rgba(167,139,250,0.65) 0%, transparent 68%)',
              filter: 'blur(80px)',
              transform: 'translate(calc(var(--blob-x, 0px) * 0.5), calc(var(--blob-y, 0px) * -0.7))',
            }}
            aria-hidden="true"
          />
        </>
      )}

      {/* ── Cursor spotlight — two layers for depth ───────────────────────── */}
      {/* Inner: tight bright blue glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex: 4,
          background:
            'radial-gradient(850px circle at var(--mouse-x, 30%) var(--mouse-y, 50%), rgba(59,130,246,0.28), rgba(52,211,153,0.1) 45%, transparent 62%)',
        }}
        aria-hidden="true"
      />
      {/* Outer: wide soft halo */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex: 4,
          background:
            'radial-gradient(1400px circle at var(--mouse-x, 30%) var(--mouse-y, 50%), rgba(99,102,241,0.1), transparent 58%)',
        }}
        aria-hidden="true"
      />

      {/* ── Hero content ──────────────────────────────────────────────────── */}
      <div
        className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-5 pb-20 pt-32 md:px-10"
        style={{ zIndex: 10 }}
      >
        <motion.div variants={containerV} initial="hidden" animate="visible" className="max-w-2xl">

          {/* Pill badge */}
          <motion.div
            variants={itemV}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.09] px-4 py-2 text-sm text-white/80 backdrop-blur-sm"
          >
            <Sparkles size={14} className="text-emerald-300" />
            AI-powered dental experience
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemV}
            className="text-5xl font-bold leading-[1.04] tracking-tight sm:text-6xl lg:text-[5.25rem]"
          >
            Your smile,{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #34d399 0%, #60a5fa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              upgraded.
            </span>
          </motion.h1>

          {/* Sub-copy */}
          <motion.p variants={itemV} className="mt-6 max-w-[430px] text-lg leading-relaxed text-white/62">
            Modern dental care with smooth AI-assisted booking, gentle clinical expertise, and a premium patient experience.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemV} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <motion.a
              href="#book"
              className="group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-black"
              style={{
                background: 'linear-gradient(135deg, #34d399, #22d3ee)',
                boxShadow: '0 0 36px rgba(52,211,153,0.5)',
              }}
              whileHover={{ scale: 1.05, y: -3, boxShadow: '0 0 60px rgba(52,211,153,0.75)' }}
              whileTap={{ scale: 0.97 }}
            >
              Book Appointment
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </motion.a>
            <motion.button
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.09] px-8 py-4 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/[0.16]"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              <Bot size={15} className="text-blue-300" />
              Ask AI Receptionist
            </motion.button>
          </motion.div>

          {/* Social proof */}
          <motion.div variants={itemV} className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-2">
              {['#34d399', '#60a5fa', '#a78bfa', '#f59e0b'].map((color, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-black/50 flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: color }}
                >
                  {['A', 'J', 'S', 'M'][i]}
                </div>
              ))}
            </div>
            <div>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={11} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-[11px] text-white/45 mt-0.5">4.9 · 200+ happy patients</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Floating badges — desktop right side ──────────────────────────── */}
      <motion.div
        initial={shouldReduce ? false : { opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        className="absolute right-8 top-1/3 z-10 hidden lg:block"
      >
        <motion.div
          animate={shouldReduce ? {} : { y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="rounded-2xl border border-white/14 bg-black/45 px-5 py-3.5 backdrop-blur-xl shadow-2xl"
        >
          <div className="flex items-center gap-2.5">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span className="text-sm font-semibold text-white">4.9</span>
            <span className="text-sm text-white/50">Google Rating</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={shouldReduce ? false : { opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute right-8 bottom-1/3 z-10 hidden lg:block"
      >
        <motion.div
          animate={shouldReduce ? {} : { y: [0, 12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.12] px-5 py-3.5 backdrop-blur-xl shadow-2xl"
        >
          <div className="flex items-center gap-2.5 text-emerald-300">
            <CalendarCheck size={14} />
            <span className="text-sm font-semibold">Same-day booking</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={shouldReduce ? false : { opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute right-8 top-1/2 z-10 hidden lg:block -translate-y-1/2"
      >
        <motion.div
          animate={shouldReduce ? {} : { y: [0, -8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          className="rounded-2xl border border-blue-400/22 bg-blue-400/[0.1] px-5 py-3 backdrop-blur-xl shadow-2xl"
        >
          <div className="flex items-center gap-2 text-blue-300">
            <Bot size={13} />
            <span className="text-sm font-semibold">Ava is online</span>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ──────────────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/35"
        style={{ zIndex: 10 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.5 }}
        aria-hidden="true"
      >
        <motion.div
          animate={shouldReduce ? {} : { y: [0, 9, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-white/40" />
        </motion.div>
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em]">Scroll</span>
      </motion.div>
    </section>
  )
}
