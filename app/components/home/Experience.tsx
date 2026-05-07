'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Heart, Monitor, FileText, Bell } from 'lucide-react'

const FEATURES = [
  {
    id: 1,
    icon: Heart,
    color: '#EC4899',
    title: 'Gentle, judgment-free care',
    desc: "No lectures, no pressure. We meet you where you are and build a plan that works for your actual life — not a perfect one.",
    rotate: -1.5,
  },
  {
    id: 2,
    icon: Monitor,
    color: '#3B82F6',
    title: 'Modern digital dentistry',
    desc: 'CEREC same-day crowns, digital X-rays, AI diagnostics, and 3D scanning. Precision care without the wait.',
    rotate: 1,
  },
  {
    id: 3,
    icon: FileText,
    color: '#10B981',
    title: 'Transparent treatment plans',
    desc: 'Full cost breakdowns before any procedure. You decide what to do, on your timeline, with zero pressure tactics.',
    rotate: -1,
  },
  {
    id: 4,
    icon: Bell,
    color: '#8B5CF6',
    title: 'Fast booking and reminders',
    desc: 'Book in 60 seconds online. Smart reminders, digital intake forms, and post-visit care — handled automatically.',
    rotate: 1.5,
  },
]

function FeatureCard({
  feature,
  index,
}: {
  feature: typeof FEATURES[0]
  index: number
}) {
  const shouldReduce = useReducedMotion()
  const Icon = feature.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: shouldReduce ? 0 : feature.rotate }}
      whileInView={{
        opacity: 1,
        y: 0,
        rotate: shouldReduce ? 0 : feature.rotate,
      }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
      whileHover={
        shouldReduce
          ? {}
          : {
              rotate: 0,
              y: -8,
              boxShadow: `0 20px 50px rgba(0,0,0,0.4), 0 0 0 1px ${feature.color}22`,
            }
      }
      className="relative rounded-2xl p-6 cursor-default"
      style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 8px 30px rgba(0,0,0,0.25)',
      }}
    >
      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-tl-[80px] rounded-br-2xl rounded-tr-2xl opacity-[0.06]"
        style={{ background: feature.color }}
      />

      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
        style={{ background: `${feature.color}15`, border: `1px solid ${feature.color}22` }}
      >
        <Icon size={22} style={{ color: feature.color }} />
      </div>

      <h3 className="text-white font-semibold text-lg mb-2 leading-snug">{feature.title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
    </motion.div>
  )
}

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" className="relative bg-[#0D1120] py-24 md:py-40 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.05] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #4F7EF7, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-[0.04] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #2DD4BF, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10" ref={ref}>
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] text-slate-300 text-xs font-semibold tracking-wide uppercase mb-5"
          >
            Why Patients Choose Us
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight"
          >
            Dental visits,
            <span
              className="block mt-1"
              style={{
                background: 'linear-gradient(135deg, #60A5FA, #2DD4BF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              redesigned.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="text-slate-400 text-lg max-w-md mx-auto"
          >
            We removed every part of the dental visit that used to feel stressful.
          </motion.p>
        </div>

        {/* Desktop-only stat row */}
        <div className="hidden md:grid md:grid-cols-3 gap-px mb-14 rounded-2xl overflow-hidden border border-white/[0.07]">
          {[
            { val: '200+', label: 'Happy patients' },
            { val: '4.9', label: 'Google rating' },
            { val: '60s', label: 'Avg. booking time' },
          ].map((s) => (
            <div key={s.val} className="bg-white/[0.03] px-8 py-6 text-center">
              <p className="text-4xl font-bold text-white mb-1">{s.val}</p>
              <p className="text-sm text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.id} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
