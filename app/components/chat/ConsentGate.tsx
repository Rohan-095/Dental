'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bot, X, MessageSquare, ArrowRight, Check } from 'lucide-react'
import { CLINIC_NAME } from '@/data/clinic'

const panelVariants = {
  hidden: { opacity: 0, scale: 0.88, y: 16 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring' as const, stiffness: 320, damping: 30 } },
  exit: { opacity: 0, scale: 0.88, y: 12, transition: { duration: 0.2 } },
}

type Props = {
  onAccept: () => void
  onClose: () => void
}

export default function ConsentGate({ onAccept, onClose }: Props) {
  const [checked, setChecked] = useState(false)

  return (
    <motion.div
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="mb-3 w-[300px] sm:w-[320px] rounded-2xl overflow-hidden"
      style={{
        background: '#0F1017',
        border: '1px solid rgba(255,255,255,0.09)',
        boxShadow: '0 25px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(59,130,246,0.08)',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3.5 border-b"
        style={{
          borderColor: 'rgba(255,255,255,0.07)',
          background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.06))',
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)' }}
          >
            <Bot size={14} className="text-white" />
          </div>
          <span className="text-white text-sm font-semibold">Chat with Ava</span>
        </div>
        <motion.button
          onClick={onClose}
          className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-white rounded transition-colors"
          whileTap={{ scale: 0.9 }}
          aria-label="Close"
        >
          <X size={14} />
        </motion.button>
      </div>

      {/* Body */}
      <div className="p-5">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
          style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.18)' }}
        >
          <MessageSquare size={22} className="text-blue-400" />
        </div>

        <h3 className="text-white font-semibold text-base mb-1.5">Before we start</h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-5">
          This chat is for appointment requests and clinic questions only. Ava cannot provide medical advice or diagnoses.
        </p>

        {/* Checkbox */}
        <label className="flex items-start gap-3 cursor-pointer mb-5">
          <div
            className="w-5 h-5 rounded-md mt-0.5 shrink-0 flex items-center justify-center transition-all"
            style={{
              background: checked ? '#2563EB' : 'rgba(255,255,255,0.05)',
              border: checked ? '1px solid #2563EB' : '1px solid rgba(255,255,255,0.15)',
            }}
            onClick={() => setChecked(!checked)}
          >
            {checked && <Check size={12} className="text-white" strokeWidth={3} />}
          </div>
          <span
            className="text-slate-400 text-xs leading-relaxed select-none"
            onClick={() => setChecked(!checked)}
          >
            I consent to be contacted by {CLINIC_NAME} about my request. I understand this is not a medical consultation.
          </span>
        </label>

        {/* CTA */}
        <motion.button
          onClick={() => checked && onAccept()}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all"
          style={{
            background: checked
              ? 'linear-gradient(135deg, #2563EB, #4F46E5)'
              : 'rgba(255,255,255,0.06)',
            color: checked ? '#fff' : 'rgba(255,255,255,0.3)',
            boxShadow: checked ? '0 0 24px rgba(37,99,235,0.35)' : 'none',
            cursor: checked ? 'pointer' : 'not-allowed',
          }}
          whileHover={checked ? { scale: 1.02 } : {}}
          whileTap={checked ? { scale: 0.98 } : {}}
          aria-disabled={!checked}
        >
          Start Chat with Ava <ArrowRight size={14} />
        </motion.button>
      </div>
    </motion.div>
  )
}
