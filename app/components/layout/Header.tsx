'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react'
import { CLINIC_NAME, PHONE_RAW } from '@/data/clinic'
import Button from '@/app/components/ui/Button'

const treatmentLinks = [
  { label: 'General Dentistry', href: '#services' },
  { label: 'Clear Aligners', href: '#results' },
  { label: 'Teeth Whitening', href: '#results' },
]

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Treatments', href: '#results', dropdown: true },
  { label: 'Experience', href: '#experience' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <motion.header
        initial={shouldReduce ? false : { y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] as const }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-white/10 bg-[#06182d]/88 shadow-xl shadow-black/20 backdrop-blur-2xl'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between px-5 md:px-10">
          <a href="#" className="flex items-center gap-3" aria-label="Home">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-bold text-[#06182d]">
              A
            </span>
            <span className="hidden text-sm font-semibold tracking-tight text-white sm:block">{CLINIC_NAME}</span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <a
                    href={link.href}
                    className="flex items-center gap-1.5 text-sm font-medium text-white/68 transition-colors hover:text-white"
                  >
                    {link.label}
                    <ChevronDown size={14} />
                  </a>
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-1/2 top-8 w-56 -translate-x-1/2 rounded-lg border border-white/12 bg-white p-2 shadow-2xl shadow-black/25"
                      >
                        {treatmentLinks.map((item) => (
                          <a
                            key={item.label}
                            href={item.href}
                            className="block rounded-md px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-[#eef8f6] hover:text-[#06182d]"
                          >
                            {item.label}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-white/68 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              ),
            )}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a href={`tel:${PHONE_RAW}`} className="text-sm font-medium text-white/68 transition-colors hover:text-white">
              (604) 555-0192
            </a>
            <Button variant="nav" size="sm" href="#booking">
              Book
              <ArrowRight size={14} />
            </Button>
          </div>

          <button
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-white/8 text-white lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-[#06182d]"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <div className="flex h-[74px] items-center justify-between border-b border-white/10 px-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-bold text-[#06182d]">
                  A
                </span>
                <span className="text-sm font-semibold text-white">{CLINIC_NAME}</span>
              </div>
              <button
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-white/8 text-white"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center px-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="border-b border-white/10 py-5 text-3xl font-semibold text-white/78"
                  initial={{ opacity: 0, x: 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + index * 0.05 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <motion.div
              className="px-8 pb-10 flex flex-col gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <Button variant="heroPrimary" size="lg" href="#booking" className="w-full justify-center" onClick={() => setMobileOpen(false)}>
                Book Appointment
                <ArrowRight size={15} />
              </Button>
              <a
                href={`tel:${PHONE_RAW}`}
                className="flex items-center justify-center gap-2 rounded-full border border-white/14 py-4 text-sm font-medium text-white/70"
                onClick={() => setMobileOpen(false)}
              >
                Call (604) 555-0192
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

