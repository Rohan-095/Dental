'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { MessageSquare, X } from 'lucide-react'
import ConsentGate from './ConsentGate'
import ChatPanel from './ChatPanel'

type Status = 'closed' | 'consent' | 'open'

export default function FloatingChatWidget() {
  const [status, setStatus] = useState<Status>('closed')
  const shouldReduce = useReducedMotion()

  const open = () => setStatus('consent')
  const accept = () => setStatus('open')
  const close = () => setStatus('closed')

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end" role="complementary" aria-label="Chat with Ava">
      {/* Panel */}
      <AnimatePresence mode="wait">
        {status === 'consent' && <ConsentGate key="consent" onAccept={accept} onClose={close} />}
        {status === 'open' && <ChatPanel key="chat" onClose={close} />}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={status === 'closed' ? open : close}
        aria-label={status === 'closed' ? 'Open chat with Ava' : 'Close chat'}
        className="relative w-14 h-14 rounded-full flex items-center justify-center text-white overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #06182d 0%, #134E4A 55%, #2DD4BF 100%)',
          boxShadow: '0 6px 28px rgba(45,212,191,0.42)',
        }}
        initial={shouldReduce ? false : { scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.8, type: 'spring' as const, stiffness: 280, damping: 22 }}
        whileHover={{ scale: 1.1, boxShadow: '0 8px 40px rgba(45,212,191,0.6)' }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {status === 'closed' ? (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageSquare size={22} />
            </motion.span>
          ) : (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={22} />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Pulse ring — only when closed (single ring; Phase A motion trim) */}
        {status === 'closed' && !shouldReduce && (
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-teal-400/35 pointer-events-none"
            animate={{ scale: [1, 1.65], opacity: [0.5, 0] }}
            transition={{ duration: 2.4, repeat: Infinity }}
          />
        )}
      </motion.button>

      {/* Label tooltip */}
      <AnimatePresence>
        {status === 'closed' && (
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ delay: 3, duration: 0.4 }}
            className="absolute right-[68px] bottom-3 whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold text-white pointer-events-none"
            style={{
              background: 'rgba(15,16,23,0.95)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
            }}
            aria-hidden="true"
          >
            Ask Ava
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
