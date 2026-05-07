'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight, Play, Sparkles } from 'lucide-react'

const TREATMENTS = [
  {
    title: 'Clear Aligner Studio',
    desc: 'Premium aligner planning and brightening details with beauty-brand polish.',
    src: '/treatment-aligner-product.png',
    tag: 'Whitening + Aligners',
  },
  {
    title: 'Smile Success Story',
    desc: 'Natural, bright outcomes shown with clean editorial photography.',
    src: '/success-smile-closeup.png',
    tag: 'Cosmetic Dentistry',
  },
  {
    title: 'Meet Your Clinician',
    desc: 'Warm team photography builds trust before the first appointment.',
    src: '/team-dentist-headshot.png',
    tag: 'Patient Experience',
  },
]

function TreatmentCard({ item, index }: { item: typeof TREATMENTS[0]; index: number }) {
  const shouldReduce = useReducedMotion()

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.62, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
      whileHover={shouldReduce ? {} : { y: -10 }}
      className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]"
    >
      <div className="relative h-[31rem] overflow-hidden">
        <Image
          src={item.src}
          alt={item.title}
          fill
          sizes="(min-width: 1024px) 33vw, 90vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,8,15,0.05),rgba(7,8,15,0.86))]" />
        <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 cinematic-sheen" />
        <button
          className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#06182d] shadow-xl transition-transform group-hover:scale-110"
          aria-label={`Play ${item.title} preview`}
        >
          <Play size={17} className="ml-0.5 fill-current" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="mb-3 inline-flex rounded-full border border-white/16 bg-white/12 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/82 backdrop-blur-xl">
            {item.tag}
          </p>
          <h3 className="text-3xl font-semibold tracking-tight text-white">{item.title}</h3>
          <p className="mt-3 max-w-sm text-sm leading-6 text-white/66">{item.desc}</p>
        </div>
      </div>
    </motion.article>
  )
}

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="results" className="relative overflow-hidden bg-[#050505] py-24 text-white md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(127,216,203,0.18),transparent_30%),radial-gradient(circle_at_18%_82%,rgba(226,207,168,0.14),transparent_32%)]" />
      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-10">
        <div ref={ref} className="mb-16 grid items-end gap-7 md:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/14 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/78 backdrop-blur-xl"
          >
            <Sparkles size={14} />
            Featured Treatments
          </motion.div>
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-6xl"
            >
              Modern treatments with editorial-grade imagery.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.14 }}
              className="mt-5 max-w-2xl text-base leading-7 text-white/60"
            >
              A dark section, large image cards, and subtle overlays keep every treatment readable and premium.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {TREATMENTS.map((item, index) => (
            <TreatmentCard key={item.title} item={item} index={index} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href="#book"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-[#06182d]"
          >
            Book Consultation
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}
