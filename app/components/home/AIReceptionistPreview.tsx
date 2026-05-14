'use client'

import { useRef, useCallback } from 'react'
import { motion, useInView, useReducedMotion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Bot, ArrowRight } from 'lucide-react'

// ─── Typing indicator ─────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div
      className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-bl-sm w-fit"
      style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      {[0, 0.2, 0.4].map((delay, i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-slate-400"
          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.9, repeat: Infinity, delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

// ─── Quick replies ────────────────────────────────────────────────────────────
const QUICK_REPLIES = ['Book cleaning', 'Emergency pain', 'Insurance question', 'New patient form']

// ─── Mock messages ────────────────────────────────────────────────────────────
const MESSAGES = [
  { from: 'ai', text: "Hi! I'm Ava. How can I help with your smile today? 😊" },
  { from: 'ai', text: 'I can help you book, answer questions, or connect you with the team.' },
  { from: 'user', text: 'I need a cleaning appointment.' },
  { from: 'ai', text: "Perfect — I can find the next available slot for you! Morning or afternoon?" },
]

// ─── Chat panel ───────────────────────────────────────────────────────────────
function ChatPanel({ inView }: { inView: boolean }) {
  const shouldReduce = useReducedMotion()
  const cardRef = useRef<HTMLDivElement>(null)

  // Spring tilt
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotX = useSpring(useTransform(mouseY, [-150, 150], [8, -8]), { stiffness: 260, damping: 24 })
  const rotY = useSpring(useTransform(mouseX, [-150, 150], [-8, 8]), { stiffness: 260, damping: 24 })
  const cardScale = useSpring(1, { stiffness: 260, damping: 24 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduce || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    cardRef.current.style.setProperty('--cx', `${x}px`)
    cardRef.current.style.setProperty('--cy', `${y}px`)
    mouseX.set(x - rect.width / 2)
    mouseY.set(y - rect.height / 2)
  }, [shouldReduce, mouseX, mouseY])

  const handleMouseEnter = useCallback(() => { if (!shouldReduce) cardScale.set(1.03) }, [shouldReduce, cardScale])
  const handleMouseLeave = useCallback(() => { mouseX.set(0); mouseY.set(0); cardScale.set(1) }, [mouseX, mouseY, cardScale])

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={shouldReduce ? false : { opacity: 0, y: 40, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
      whileHover={{
        boxShadow: '0 40px 90px rgba(0,0,0,0.55), 0 0 0 1px rgba(59,130,246,0.25)',
      }}
      className="group w-full max-w-full sm:max-w-sm mx-auto lg:mx-0 rounded-3xl overflow-hidden"
      style={shouldReduce ? {
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.09)',
        boxShadow: '0 30px 70px rgba(0,0,0,0.4), 0 0 0 1px rgba(59,130,246,0.08)',
      } : {
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.09)',
        boxShadow: '0 30px 70px rgba(0,0,0,0.4), 0 0 0 1px rgba(59,130,246,0.08)',
        rotateX: rotX,
        rotateY: rotY,
        scale: cardScale,
        transformStyle: 'preserve-3d' as any,
        transformPerspective: 900,
      }}
    >
      {/* Card spotlight — brighter and larger */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{
          background: 'radial-gradient(560px circle at var(--cx, 50%) var(--cy, 50%), rgba(79,126,247,0.22), rgba(45,212,191,0.06) 50%, transparent 65%)',
        }}
        aria-hidden="true"
      />
      {/* Chat header */}
      <div
        className="flex items-center gap-3 px-5 py-4 border-b"
        style={{
          borderColor: 'rgba(255,255,255,0.07)',
          background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.06))',
        }}
      >
        <div className="relative">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #4F7EF7, #2DD4BF)' }}
          >
            <Bot size={17} className="text-white" />
          </div>
          <div
            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
            style={{ background: '#2DD4BF', borderColor: '#07080F' }}
          />
        </div>
        <div>
          <p className="text-white text-sm font-semibold leading-none">Ava</p>
          <p className="text-emerald-400 text-[11px] mt-0.5 font-medium">Online · AI Receptionist</p>
        </div>
        <div
          className="ml-auto px-2.5 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase"
          style={{ background: 'rgba(59,130,246,0.15)', color: '#93C5FD', border: '1px solid rgba(59,130,246,0.2)' }}
        >
          AI
        </div>
      </div>

      {/* Messages */}
      <div className="px-4 py-5 flex flex-col gap-3">
        {MESSAGES.map((msg, i) => (
          <motion.div
            key={i}
            initial={shouldReduce ? false : { opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.5 + i * 0.15 }}
            className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                msg.from === 'user'
                  ? 'rounded-br-sm text-white font-medium'
                  : 'rounded-bl-sm text-slate-200'
              }`}
              style={
                msg.from === 'user'
                  ? { background: 'linear-gradient(135deg, #4F7EF7, #3D6FEB)' }
                  : { background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.07)' }
              }
            >
              {msg.text}
            </div>
          </motion.div>
        ))}

        {/* Typing indicator */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
        >
          <TypingDots />
        </motion.div>

        {/* Quick replies */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap gap-2 mt-1"
        >
          {QUICK_REPLIES.map((r) => (
            <button
              key={r}
              className="px-3 py-1.5 rounded-full text-[11px] font-medium transition-colors"
              style={{
                background: 'rgba(59,130,246,0.1)',
                border: '1px solid rgba(59,130,246,0.22)',
                color: '#93C5FD',
              }}
            >
              {r}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Input bar (mock) */}
      <div
        className="flex items-center gap-3 px-4 pb-5 pt-2 border-t"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <div
          className="flex-1 px-4 py-3 rounded-xl text-slate-500 text-sm"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          Type a message…
        </div>
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0"
          style={{ background: 'linear-gradient(135deg, #4F7EF7, #3D6FEB)' }}
        >
          <ArrowRight size={15} />
        </div>
      </div>
    </motion.div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function AIReceptionistPreview() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="ai-receptionist"
      className="relative bg-[#06182d] border-t border-white/[0.06] py-24 md:py-40 overflow-hidden"
    >
      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(79,126,247,0.07) 0%, rgba(45,212,191,0.03) 40%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10" ref={ref}>
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">

          {/* Left: copy */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/8 text-blue-300 text-xs font-semibold tracking-wide uppercase mb-6"
              style={{ background: 'rgba(59,130,246,0.08)' }}
            >
              <Bot size={13} /> Meet Your AI Receptionist
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight"
            >
              Meet Ava, your
              <span
                className="block mt-1"
                style={{
                  background: 'linear-gradient(135deg, #60A5FA, #2DD4BF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                AI dental receptionist.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.14 }}
              className="text-slate-400 text-lg max-w-sm mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              Ava is available 24/7 to answer questions, collect intake info, and guide patients to the right care — instantly.
            </motion.p>

            {/* Feature list */}
            <motion.ul
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="flex flex-col gap-2.5 text-left max-w-xs mx-auto lg:mx-0 mb-8"
            >
              {[
                'Books appointments in under 60 seconds',
                'Answers FAQs instantly, any hour',
                'Collects intake info before your visit',
                'Routes urgent cases to staff immediately',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-slate-300 text-sm">
                  <div
                    className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.3)' }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                  {item}
                </li>
              ))}
            </motion.ul>

            <motion.a
              href="#"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.26 }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white"
              style={{
                background: 'linear-gradient(135deg, #4F7EF7, #2DD4BF)',
                boxShadow: '0 0 28px rgba(79,126,247,0.4)',
              }}
              whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(37,99,235,0.6)' }}
              whileTap={{ scale: 0.97 }}
            >
              Try Ava Now <ArrowRight size={15} />
            </motion.a>
          </div>

          {/* Right: chat panel */}
          <div className="flex-1 w-full lg:flex lg:justify-end">
            <ChatPanel inView={inView} />
          </div>
        </div>
      </div>
    </section>
  )
}
