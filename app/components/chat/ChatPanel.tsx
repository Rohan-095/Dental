'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, X, Send } from 'lucide-react'

const panelVariants = {
  hidden: { opacity: 0, scale: 0.88, y: 16 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring' as const, stiffness: 320, damping: 30 } },
  exit: { opacity: 0, scale: 0.88, y: 12, transition: { duration: 0.2 } },
}

type Message = { id: number; from: 'ai' | 'user'; text: string }

const INITIAL_MESSAGES: Message[] = [
  { id: 1, from: 'ai', text: "Hi! I'm Ava 👋 How can I help with your smile today?" },
  { id: 2, from: 'ai', text: 'I can book appointments, answer questions, or connect you with the team.' },
]

const QUICK_REPLIES = ['Book a cleaning', 'Emergency pain', 'Insurance question', 'New patient']

const AI_RESPONSES: Record<string, string> = {
  'Book a cleaning': 'Great! 🦷 I can find the next available cleaning slot. Would morning or afternoon work better?',
  'Emergency pain': "I'm sorry to hear that. For urgent dental pain please call us at (604) 555-0192. We keep same-day slots for emergencies.",
  'Insurance question': 'We accept most major insurance plans with direct billing. Which provider are you with?',
  'New patient': 'Welcome! 😊 Your first visit includes a full exam, digital X-rays, and a treatment plan. Want me to book that?',
}

type Props = { onClose: () => void }

export default function ChatPanel({ onClose }: Props) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const nextIdRef = useRef(3)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const sendMessage = (text: string) => {
    if (!text.trim()) return
    const userMsg: Message = { id: nextIdRef.current++, from: 'user', text: text.trim() }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      const response =
        AI_RESPONSES[text.trim()] ??
        'Thanks for your message! Our team will follow up shortly. For urgent matters, please call us directly.'
      setTyping(false)
      setMessages((prev) => [...prev, { id: nextIdRef.current++, from: 'ai', text: response }])
    }, 1100)
  }

  return (
    <motion.div
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="mb-3 w-[calc(100vw-2.5rem)] sm:w-[340px] flex flex-col rounded-3xl overflow-hidden"
      style={{
        background: '#0F1017',
        border: '1px solid rgba(255,255,255,0.09)',
        boxShadow: '0 30px 70px rgba(0,0,0,0.55), 0 0 0 1px rgba(59,130,246,0.08)',
        maxHeight: 'min(560px, calc(100vh - 140px))',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3.5 border-b shrink-0"
        style={{
          borderColor: 'rgba(255,255,255,0.07)',
          background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.06))',
        }}
      >
        <div className="relative">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)' }}
          >
            <Bot size={17} className="text-white" />
          </div>
          <div
            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
            style={{ background: '#34D399', borderColor: '#0F1017' }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-semibold leading-none">Ava</p>
          <p className="text-emerald-400 text-[11px] mt-0.5">Online · AI Receptionist</p>
        </div>
        <motion.button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
          whileTap={{ scale: 0.9 }}
          aria-label="Close chat"
        >
          <X size={16} />
        </motion.button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 min-h-0" style={{ scrollbarWidth: 'none' }}>
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28 }}
            className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[83%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                msg.from === 'user' ? 'rounded-br-sm text-white font-medium' : 'rounded-bl-sm text-slate-200'
              }`}
              style={
                msg.from === 'user'
                  ? { background: 'linear-gradient(135deg, #2563EB, #4F46E5)' }
                  : { background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.07)' }
              }
            >
              {msg.text}
            </div>
          </motion.div>
        ))}

        <AnimatePresence>
          {typing && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex justify-start"
            >
              <div
                className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-bl-sm"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                {[0, 0.18, 0.36].map((d, i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-slate-400"
                    animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 0.85, repeat: Infinity, delay: d }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>

      {/* Quick replies */}
      <div className="px-4 pt-2 pb-1 flex gap-2 overflow-x-auto shrink-0" style={{ scrollbarWidth: 'none' }}>
        {QUICK_REPLIES.map((r) => (
          <motion.button
            key={r}
            onClick={() => sendMessage(r)}
            className="shrink-0 px-3 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap transition-colors"
            style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.22)', color: '#93C5FD' }}
            whileHover={{ scale: 1.04, background: 'rgba(59,130,246,0.16)' }}
            whileTap={{ scale: 0.96 }}
          >
            {r}
          </motion.button>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2.5 px-4 py-3.5 border-t shrink-0" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(input) }}
          placeholder="Ask Ava anything…"
          className="flex-1 bg-white/[0.05] border border-white/[0.07] rounded-xl px-3.5 py-2.5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-blue-500/40 transition-all min-w-0"
          aria-label="Chat message"
        />
        <motion.button
          onClick={() => sendMessage(input)}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0"
          style={{ background: 'linear-gradient(135deg, #2563EB, #4F46E5)' }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          aria-label="Send message"
        >
          <Send size={15} />
        </motion.button>
      </div>
    </motion.div>
  )
}
