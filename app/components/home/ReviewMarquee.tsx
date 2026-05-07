'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { REVIEWS } from '@/data/reviews'

// ─── Single card ──────────────────────────────────────────────────────────────
function ReviewCard({ review }: { review: typeof REVIEWS[0] }) {
  return (
    <div
      className="shrink-0 w-[300px] bg-white rounded-2xl p-6 border border-slate-100 cursor-default select-none transition-transform duration-300 hover:-translate-y-1.5"
      style={{ boxShadow: '0 4px 24px rgba(15,23,42,0.07), 0 1px 4px rgba(15,23,42,0.04)' }}
    >
      {/* Stars */}
      <div className="flex gap-0.5 mb-3">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} size={13} className="text-amber-400 fill-amber-400" />
        ))}
      </div>

      {/* Quote */}
      <Quote size={16} className="text-slate-200 mb-3 -scale-x-100" />

      {/* Review text */}
      <p className="text-slate-600 text-sm leading-relaxed mb-5 line-clamp-3">
        {review.text}
      </p>

      {/* Author row */}
      <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0"
          style={{ background: review.color }}
        >
          {review.initials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-slate-900 font-semibold text-sm leading-none mb-0.5 truncate">
            {review.name}
          </p>
          <p className="text-slate-400 text-xs truncate">{review.service}</p>
        </div>
        {/* Google badge */}
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-100 bg-white shadow-sm">
          <span className="text-[9px] font-bold text-blue-600">G</span>
        </div>
      </div>
    </div>
  )
}

// ─── Marquee row ──────────────────────────────────────────────────────────────
function MarqueeRow({
  reviews,
  reverse = false,
}: {
  reviews: typeof REVIEWS
  reverse?: boolean
}) {
  const doubled = [...reviews, ...reviews]
  return (
    <div className="marquee-wrapper relative overflow-hidden">
      {/* Edge fades */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 z-10"
        style={{ background: 'linear-gradient(to right, #F7F5F0, transparent)' }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 z-10"
        style={{ background: 'linear-gradient(to left, #F7F5F0, transparent)' }}
      />

      <div
        className={`flex gap-5 py-3 w-max ${reverse ? 'marquee-track-reverse' : 'marquee-track'}`}
      >
        {doubled.map((review, i) => (
          <ReviewCard key={`${review.id}-${i}`} review={review} />
        ))}
      </div>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function ReviewMarquee() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const row2 = [...REVIEWS].reverse()

  return (
    <section id="reviews" className="bg-[#F7F5F0] py-24 md:py-32 overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-5 md:px-10 text-center mb-14" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-200 bg-amber-50 text-amber-700 text-xs font-semibold tracking-wide uppercase mb-5"
        >
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={10} className="text-amber-500 fill-amber-500" />
            ))}
          </div>
          Patient Reviews
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="text-4xl md:text-6xl font-bold text-slate-900 mb-4 leading-tight"
        >
          Patients love
          <br className="hidden sm:block" /> the experience.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.55, delay: 0.14 }}
          className="text-slate-500 text-base"
        >
          4.9 stars across 1,200+ Google reviews
        </motion.p>
      </div>

      {/* Row 1 — scrolls left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.22 }}
      >
        <MarqueeRow reviews={REVIEWS} reverse={false} />
      </motion.div>

      {/* Row 2 — scrolls right, slight offset */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.32 }}
        className="mt-5"
      >
        <MarqueeRow reviews={row2} reverse={true} />
      </motion.div>
    </section>
  )
}
