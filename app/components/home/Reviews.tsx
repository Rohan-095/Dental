'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Star } from 'lucide-react'
import { REVIEWS } from '@/data/reviews'

function ReviewCard({ review, index }: { review: typeof REVIEWS[0]; index: number }) {
  const shouldReduce = useReducedMotion()
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
      whileHover={shouldReduce ? {} : { y: -6, boxShadow: '0 16px 48px rgba(0,0,0,0.1)' }}
      className="shrink-0 w-72 sm:w-80 md:w-auto bg-white rounded-2xl p-6 border border-slate-100 cursor-default"
      style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
    >
      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
        ))}
      </div>

      <p className="text-slate-600 text-sm leading-relaxed mb-5">{review.text}</p>

      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
          style={{ background: review.color }}
        >
          {review.initials}
        </div>
        <div>
          <p className="text-slate-900 font-semibold text-sm">{review.name}</p>
          <p className="text-slate-400 text-xs">{review.role}</p>
        </div>
        {/* Google G */}
        <div className="ml-auto w-6 h-6 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center shrink-0">
          <span className="text-[9px] font-bold text-blue-600">G</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function Reviews() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="reviews" className="bg-[#F7F5F0] py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        {/* Header */}
        <div ref={ref} className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-200 bg-amber-50 text-amber-700 text-xs font-semibold tracking-wide uppercase mb-5"
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} size={10} className="text-amber-500 fill-amber-500" />)}
            </div>
            Patient Reviews
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight"
          >
            Patients love
            <br /> the experience.
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

        {/* Cards — horizontal scroll on mobile, grid on desktop */}
        <div className="flex md:hidden gap-4 overflow-x-auto pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
          {REVIEWS.map((review, i) => (
            <div key={review.id} className="snap-start">
              <ReviewCard review={review} index={i} />
            </div>
          ))}
        </div>

        <div className="hidden md:grid md:grid-cols-3 gap-5">
          {REVIEWS.map((review, i) => (
            <ReviewCard key={review.id} review={review} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
