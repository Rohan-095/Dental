'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import {
  motion,
  useInView,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import {
  Activity,
  ArrowUpRight,
  Braces,
  HeartPulse,
  ScanLine,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

const SERVICES = [
  {
    title: 'General Dentistry',
    desc: 'Routine exams, hygiene visits, digital X-rays, and preventive care.',
    icon: ShieldCheck,
    color: '#dff7ee',
    image: '/service-general-dentist.png',
  },
  {
    title: 'Digital Diagnostics',
    desc: 'Clear imaging, treatment planning, and precision clinical decisions.',
    icon: ScanLine,
    color: '#e6f1ff',
    image: '/service-xray-detail.png',
  },
  {
    title: 'Cosmetic Dentistry',
    desc: 'Whitening, bonding, veneers, and natural smile enhancements.',
    icon: Sparkles,
    color: '#f7e8ee',
  },
  {
    title: 'Clear Aligners',
    desc: 'Discreet orthodontic treatment with digital progress previews.',
    icon: Braces,
    color: '#f5efd9',
  },
  {
    title: 'Emergency Care',
    desc: 'Same-day support for pain, swelling, chips, and urgent concerns.',
    icon: HeartPulse,
    color: '#e9f8fb',
  },
  {
    title: 'Restorative Care',
    desc: 'Crowns, implants, and durable repairs with a natural finish.',
    icon: Activity,
    color: '#ece9ff',
  },
]

function ServiceCard({ item, index }: { item: typeof SERVICES[0]; index: number }) {
  const shouldReduce = useReducedMotion()
  const Icon = item.icon
  const [shine, setShine] = useState({ x: 0, y: 0 })

  // Spring-based 3D tilt
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotX = useSpring(useTransform(mouseY, [-100, 100], [12, -12]), { stiffness: 280, damping: 22 })
  const rotY = useSpring(useTransform(mouseX, [-100, 100], [-12, 12]), { stiffness: 280, damping: 22 })
  const cardScale = useSpring(1, { stiffness: 280, damping: 22 })

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduce) return
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
    setShine({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }
  const onMouseEnter = () => { if (!shouldReduce) cardScale.set(1.04) }
  const onMouseLeave = () => { mouseX.set(0); mouseY.set(0); cardScale.set(1) }

  return (
    <motion.article
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] as const }}
      whileHover={{
        boxShadow: '0 32px 80px rgba(0,0,0,0.18), 0 8px 28px rgba(0,0,0,0.1)',
      }}
      className="group relative min-h-[22rem] overflow-hidden rounded-lg border border-slate-200/80 p-6 cursor-default"
      style={shouldReduce ? { background: item.color, boxShadow: '0 16px 50px rgba(15,23,42,0.06)' } : {
        background: item.color,
        boxShadow: '0 16px 50px rgba(15,23,42,0.06)',
        rotateX: rotX,
        rotateY: rotY,
        scale: cardScale,
        transformStyle: 'preserve-3d' as any,
        transformPerspective: 900,
      }}
    >
      {/* Cursor shine — bright glossy highlight */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150 rounded-lg overflow-hidden"
        style={{
          background: `radial-gradient(360px circle at ${shine.x}px ${shine.y}px, rgba(255,255,255,0.82), rgba(255,255,255,0.22) 40%, transparent 60%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        {item.image ? (
          <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-lg bg-white/45">
            <Image
              src={item.image}
              alt={`${item.title} dental service`}
              fill
              sizes="(min-width: 1024px) 32vw, 90vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="mb-12 flex h-32 items-center justify-center rounded-lg border border-white/70 bg-white/45">
            <Icon size={46} strokeWidth={1.35} className="text-[#06182d]" />
          </div>
        )}

        <div className="flex items-start justify-between gap-5">
          <div>
            <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/70 text-[#06182d] shadow-sm">
              <Icon size={20} strokeWidth={1.5} />
            </span>
            <h3 className="text-xl font-semibold tracking-tight text-[#06182d]">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{item.desc}</p>
          </div>
          <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#06182d]/10 bg-white/55 text-[#06182d] transition-transform group-hover:rotate-45">
            <ArrowUpRight size={17} />
          </span>
        </div>
      </div>
    </motion.article>
  )
}

export default function Services() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="services" className="bg-[#fbfaf6] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div ref={ref} className="mb-16 grid items-end gap-7 md:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="w-fit rounded-full border border-[#06182d]/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#06182d]"
          >
            Our Services
          </motion.div>
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-[#06182d] md:text-6xl"
            >
              Thoughtful care, aligned to a sharper grid.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.14 }}
              className="mt-5 max-w-2xl text-base leading-7 text-slate-600"
            >
              Soft pastel service cards, precise line icons, and short descriptions keep the experience calm and easy to scan.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((item, index) => (
            <ServiceCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
