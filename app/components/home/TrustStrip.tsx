'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { value: 18, suffix: '+', label: 'Years of experience' },
  { value: 10000, suffix: '+', label: 'Smiles transformed' },
  { value: 4.9, suffix: '/5', label: 'Patient rating', decimals: 1 },
  { value: 24, suffix: '/7', label: 'AI booking support' },
]

function CountUp({ value, suffix, decimals = 0 }: { value: number; suffix: string; decimals?: number }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  useEffect(() => {
    if (!inView) return
    let start: number | null = null
    const duration = 1400
    const raf = (ts: number) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setDisplay(parseFloat((ease * value).toFixed(decimals)))
      if (progress < 1) requestAnimationFrame(raf)
      else setDisplay(value)
    }
    requestAnimationFrame(raf)
  }, [decimals, inView, value])

  return (
    <span ref={ref}>
      {decimals > 0 ? display.toFixed(decimals) : Math.floor(display).toLocaleString()}
      {suffix}
    </span>
  )
}

export default function TrustStrip() {
  return (
    <section className="bg-[#F0E9DC] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="mb-12 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#06182d]/60"
          >
            Trusted expertise
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.06 }}
            className="text-4xl font-bold leading-tight tracking-tight text-[#06182d] md:text-6xl"
          >
            Numbers that make the first visit feel easy.
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-[#06182d]/12 md:grid-cols-4">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.06 }}
              className="bg-white px-5 py-10"
            >
              <p className="text-4xl font-bold tracking-tight text-[#06182d] md:text-6xl">
                <CountUp value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
              </p>
              <p className="mt-4 text-sm font-medium leading-6 text-slate-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
