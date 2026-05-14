'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Globe, Link, ExternalLink } from 'lucide-react'
import { CLINIC_NAME, PHONE, EMAIL, ADDRESS, HOURS } from '@/data/clinic'

const SERVICE_LINKS = [
  'General Dentistry',
  'Cosmetic Dentistry',
  'Invisalign',
  'Dental Implants',
  'Emergency Dental',
  'Teeth Whitening',
]

export default function Footer() {
  return (
    <footer className="bg-[#06182d] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-5 md:px-10 pt-16 pb-10">
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                style={{ background: 'linear-gradient(135deg, #4F7EF7, #2DD4BF)' }}
              >
                A
              </div>
              <span className="text-white font-semibold text-[15px]">{CLINIC_NAME}</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-5 max-w-[220px]">
              Premium dental care powered by AI. Book 24/7, get treated with precision, leave with confidence.
            </p>
            {/* Social-style links */}
            <div className="flex gap-2.5">
              {[Globe, Link, ExternalLink].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-lg border border-white/[0.08] flex items-center justify-center text-slate-500 hover:text-white hover:border-white/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Link"
                >
                  <Icon size={14} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="text-white text-sm font-semibold mb-4">Services</p>
            <ul className="flex flex-col gap-2.5">
              {SERVICE_LINKS.map((s) => (
                <li key={s}>
                  <a href="#services" className="text-slate-500 text-sm hover:text-slate-300 transition-colors">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div id="contact">
            <p className="text-white text-sm font-semibold mb-4">Contact</p>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2.5 text-slate-500 text-sm">
                <Phone size={14} className="mt-0.5 shrink-0 text-slate-600" />
                <a href={`tel:${PHONE}`} className="hover:text-slate-300 transition-colors">{PHONE}</a>
              </li>
              <li className="flex items-start gap-2.5 text-slate-500 text-sm">
                <Mail size={14} className="mt-0.5 shrink-0 text-slate-600" />
                <a href={`mailto:${EMAIL}`} className="hover:text-slate-300 transition-colors">{EMAIL}</a>
              </li>
              <li className="flex items-start gap-2.5 text-slate-500 text-sm">
                <MapPin size={14} className="mt-0.5 shrink-0 text-slate-600" />
                <span>{ADDRESS}</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <p className="text-white text-sm font-semibold mb-4">
              <span className="flex items-center gap-2">
                <Clock size={13} className="text-slate-500" /> Hours
              </span>
            </p>
            <ul className="flex flex-col gap-2.5">
              {HOURS.map((h) => (
                <li key={h.day} className="flex flex-col">
                  <span className="text-slate-400 text-xs font-medium">{h.day}</span>
                  <span className="text-slate-500 text-xs">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.05] pt-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs text-center sm:text-left">
            © 2025 {CLINIC_NAME}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5">
            {['Privacy Policy', 'Terms of Service', 'Accessibility'].map((link) => (
              <a key={link} href="#" className="text-slate-600 text-xs hover:text-slate-400 transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* HIPAA note */}
        <p className="text-slate-700 text-[11px] text-center mt-5 max-w-md mx-auto leading-relaxed">
          Your information is handled securely and only used for clinic communication. We never share your data with third parties.
        </p>
      </div>
    </footer>
  )
}
