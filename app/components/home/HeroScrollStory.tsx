'use client'

import { useRef, useCallback, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Sparkles, Star, CalendarCheck, ArrowRight, Bot } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from '@/app/components/ui/Button'

const SCENE_COUNT = 5

const SCENES = [
  {
    badge: 'AI-powered dental experience',
    headline: ['Your smile,', 'upgraded.'],
    sub: 'Modern dental care with smooth AI-assisted booking, gentle clinical expertise, and a premium patient experience.',
    showCtas: false,
    showBadge: true,
  },
  {
    headline: ['AI-assisted booking,', 'without the hassle.'],
    sub: 'Book your appointment in under 60 seconds. No hold music. No back-and-forth emails.',
    showCtas: false,
    showBadge: false,
  },
  {
    headline: ['Gentle care.', 'Smarter experience.'],
    sub: 'Our clinical team pairs deep expertise with technology so every visit feels intentional and easy.',
    showCtas: false,
    showBadge: false,
  },
  {
    headline: ['Designed for busy', 'modern patients.'],
    sub: 'Same-day slots, 24/7 AI receptionist, and instant answers â€” built around your schedule.',
    showCtas: false,
    showBadge: false,
  },
  {
    headline: ['Ready to get', 'started?'],
    sub: 'Book an appointment or let Ava guide you to the right care in under a minute.',
    showCtas: true,
    showBadge: false,
  },
]

export default function HeroScrollStory() {
  const shouldReduce = useReducedMotion()
  const outerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const sceneRefs = useRef<(HTMLDivElement | null)[]>([])
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  // Cursor spotlight + parallax
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduce || !sectionRef.current) return
    const el = sectionRef.current
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    el.style.setProperty('--mouse-x', `${x}px`)
    el.style.setProperty('--mouse-y', `${y}px`)
    el.style.setProperty('--blob-x', `${(x / rect.width - 0.5) * 60}px`)
    el.style.setProperty('--blob-y', `${(y / rect.height - 0.5) * 60}px`)
  }, [shouldReduce])

  useEffect(() => {
    if (shouldReduce) return
    if (!outerRef.current || !stickyRef.current) return

    // Skip scroll story on mobile â€” show static scene 1 only
    if (window.innerWidth < 768) return

    gsap.registerPlugin(ScrollTrigger)

    const scenes = sceneRefs.current.filter(Boolean) as HTMLDivElement[]
    if (scenes.length < SCENE_COUNT) return

    // Set initial states â€” all scenes except first are hidden
    gsap.set(scenes.slice(1), { opacity: 0, y: 56, filter: 'blur(12px)' })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: outerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.7,
      },
    })

    tlRef.current = tl

    // Scene 1 â†’ fade out
    tl.to(scenes[0], { opacity: 0, y: -56, filter: 'blur(12px)', duration: 0.7 }, 0.3)

    // Scene 2 â†’ in â†’ out
    tl.fromTo(scenes[1], { opacity: 0, y: 56, filter: 'blur(12px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7 }, 0.7)
    tl.to(scenes[1], { opacity: 0, y: -56, filter: 'blur(12px)', duration: 0.7 }, 1.4)

    // Scene 3 â†’ in â†’ out
    tl.fromTo(scenes[2], { opacity: 0, y: 56, filter: 'blur(12px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7 }, 1.7)
    tl.to(scenes[2], { opacity: 0, y: -56, filter: 'blur(12px)', duration: 0.7 }, 2.4)

    // Scene 4 â†’ in â†’ out
    tl.fromTo(scenes[3], { opacity: 0, y: 56, filter: 'blur(12px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7 }, 2.7)
    tl.to(scenes[3], { opacity: 0, y: -56, filter: 'blur(12px)', duration: 0.7 }, 3.4)

    // Scene 5 â†’ in (final, stays)
    tl.fromTo(scenes[4], { opacity: 0, y: 56, filter: 'blur(12px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8 }, 3.6)

    return () => {
      tl.kill()
    }
  }, [shouldReduce])

  return (
    // Outer div provides scroll distance. CSS class switches h on mobile vs desktop.
    <div ref={outerRef} className="relative h-screen md:h-[500vh]">
      <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden">
        <section
          ref={sectionRef}
          onMouseMove={handleMouseMove}
          className="relative h-full w-full text-white"
        >
          {/* Video background */}
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

          {/* Base overlays */}
          <div className="absolute inset-0 bg-black/62" style={{ zIndex: 1 }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/55" style={{ zIndex: 2 }} />

          {/* Parallax blobs */}
          {!shouldReduce && (
            <>
              <div
                className="pointer-events-none absolute right-[5%] top-[20%] h-[200px] w-[200px] md:h-[560px] md:w-[560px] rounded-full opacity-28"
                style={{
                  zIndex: 3,
                  background: 'radial-gradient(circle, rgba(45,212,191,0.65) 0%, transparent 68%)',
                  filter: 'blur(88px)',
                  transform: 'translate(var(--blob-x, 0px), var(--blob-y, 0px))',
                }}
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute right-[15%] top-[5%] h-[160px] w-[160px] md:h-[440px] md:w-[440px] rounded-full"
                style={{
                  zIndex: 3,
                  background: 'radial-gradient(circle, rgba(79,126,247,0.65) 0%, transparent 68%)',
                  filter: 'blur(96px)',
                  opacity: 0.2,
                  transform: 'translate(calc(var(--blob-x, 0px) * -0.6), calc(var(--blob-y, 0px) * 0.4))',
                }}
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute bottom-[10%] right-[10%] h-[140px] w-[140px] md:h-[380px] md:w-[380px] rounded-full"
                style={{
                  zIndex: 3,
                  background: 'radial-gradient(circle, rgba(167,139,250,0.65) 0%, transparent 68%)',
                  filter: 'blur(80px)',
                  opacity: 0.18,
                  transform: 'translate(calc(var(--blob-x, 0px) * 0.5), calc(var(--blob-y, 0px) * -0.7))',
                }}
                aria-hidden="true"
              />
            </>
          )}

          {/* Cursor spotlight â€” inner */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              zIndex: 4,
              background: 'radial-gradient(850px circle at var(--mouse-x, 30%) var(--mouse-y, 50%), rgba(59,130,246,0.26), rgba(52,211,153,0.09) 45%, transparent 62%)',
            }}
            aria-hidden="true"
          />
          {/* Cursor spotlight â€” outer halo */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              zIndex: 4,
              background: 'radial-gradient(1400px circle at var(--mouse-x, 30%) var(--mouse-y, 50%), rgba(99,102,241,0.09), transparent 58%)',
            }}
            aria-hidden="true"
          />

          {/* Scenes */}
          <div className="absolute inset-0" style={{ zIndex: 10 }}>
            {SCENES.map((scene, i) => (
              <div
                key={i}
                ref={(el) => { sceneRefs.current[i] = el }}
                className="absolute inset-0 flex items-center justify-center px-5 md:px-10"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <div className="mx-auto w-full max-w-3xl text-center">
                  {scene.showBadge && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.09] px-4 py-2 text-sm text-white/80 backdrop-blur-sm"
                    >
                      <Sparkles size={14} className="text-emerald-300" />
                      {scene.badge}
                    </motion.div>
                  )}

                  <motion.h1
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.75, delay: scene.showBadge ? 0.35 : 0.2, ease: [0.22, 1, 0.36, 1] as const }}
                    className={`font-bold leading-[1.04] tracking-tight ${scene.showCtas ? 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl' : 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.25rem]'}`}
                  >
                    {scene.headline[0]}
                    {scene.headline[1] && (
                      <span
                        className="block mt-1"
                        style={{
                          background: 'linear-gradient(135deg, #2DD4BF 0%, #60A5FA 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        {scene.headline[1]}
                      </span>
                    )}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: scene.showBadge ? 0.5 : 0.35 }}
                    className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-white/62"
                  >
                    {scene.sub}
                  </motion.p>

                  {/* Mobile-only CTAs — shown in scene 0 since scene 5 is unreachable on mobile */}
                  {i === 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.65 }}
                      className="mt-8 flex flex-col items-center gap-3 md:hidden"
                    >
                      <Button variant="heroPrimary" size="lg" href="#booking" className="w-full sm:w-auto">
                        Book Appointment
                        <ArrowRight size={16} />
                      </Button>
                      <Button variant="heroSecondary" size="lg" href="#ai-receptionist" className="w-full sm:w-auto">
                        <Bot size={16} className="text-blue-300" />
                        Ask AI Receptionist
                      </Button>
                    </motion.div>
                  )}

                  {scene.showCtas && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
                    >
                      <Button variant="heroPrimary" size="lg" href="#booking" className="w-full sm:w-auto">
                        Book Appointment
                        <ArrowRight size={16} />
                      </Button>
                      <Button variant="heroSecondary" size="lg" href="#ai-receptionist" className="w-full sm:w-auto">
                        <Bot size={16} className="text-blue-300" />
                        Ask AI Receptionist
                      </Button>
                    </motion.div>
                  )}

                  {scene.showCtas && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.75 }}
                      className="mt-10 flex items-center justify-center gap-4"
                    >
                      <div className="flex -space-x-2">
                        {['#34d399', '#60a5fa', '#a78bfa', '#f59e0b'].map((color, idx) => (
                          <div
                            key={idx}
                            className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black/50 text-[10px] font-bold text-white"
                            style={{ background: color }}
                          >
                            {['A', 'J', 'S', 'M'][idx]}
                          </div>
                        ))}
                      </div>
                      <div>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, idx) => (
                            <Star key={idx} size={11} className="fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <p className="mt-0.5 text-[11px] text-white/45">4.9 Â· 200+ happy patients</p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Floating badges â€” desktop, scene 1 decor */}
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="absolute right-8 top-1/3 z-20 hidden lg:block"
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
            className="absolute right-8 top-1/2 z-20 hidden lg:block -translate-y-1/2"
          >
            <motion.div
              animate={shouldReduce ? {} : { y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              className="rounded-2xl border border-blue-400/22 bg-blue-400/[0.1] px-5 py-3 backdrop-blur-xl shadow-2xl"
            >
              <div className="flex items-center gap-2 text-blue-300">
                <Bot size={13} />
                <span className="text-sm font-semibold">Ava is online</span>
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={shouldReduce ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="absolute bottom-1/3 right-8 z-20 hidden lg:block"
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

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-white/35"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.5 }}
            aria-hidden="true"
          >
            <motion.div
              animate={shouldReduce ? {} : { y: [0, 9, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="flex h-8 w-5 items-start justify-center rounded-full border border-white/20 pt-1.5"
            >
              <div className="h-1.5 w-1 rounded-full bg-white/40" />
            </motion.div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em]">Scroll</span>
          </motion.div>
        </section>
      </div>
    </div>
  )
}

