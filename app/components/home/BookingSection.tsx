'use client'

import { useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Phone, Mail, MapPin, Clock, CheckCircle, Send } from 'lucide-react'

const SERVICES = [
  'General Checkup',
  'Teeth Cleaning',
  'Teeth Whitening',
  'Clear Aligners',
  'Veneers',
  'Crowns & Implants',
  'Cosmetic Consultation',
  'Emergency Care',
  'Other',
]

const CONTACT_INFO = [
  { icon: Phone, label: 'Phone', value: '(604) 555-0192' },
  { icon: Mail, label: 'Email', value: 'hello@avadental.ca' },
  { icon: MapPin, label: 'Address', value: '123 West Georgia St, Vancouver, BC' },
  { icon: Clock, label: 'Hours', value: 'Mon–Fri 8 AM–6 PM, Sat 9 AM–3 PM' },
]

export default function BookingSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const [form, setForm] = useState({
    name: '', phone: '', email: '', service: '', date: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    // Simulate async submit
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 900)
  }

  return (
    <section id="booking" className="bg-[#fbfaf6] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-10" ref={ref}>

        {/* Header */}
        <div className="mb-12 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-block rounded-full border border-[#06182d]/10 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#06182d]"
          >
            Book an Appointment
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.07 }}
            className="text-4xl font-bold leading-tight tracking-tight text-[#06182d] md:text-5xl"
          >
            Book your appointment
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.13 }}
            className="mt-4 text-base leading-relaxed text-slate-600"
          >
            Fill in your details below and our team will confirm your slot within a few hours. Same-day appointments available.
          </motion.p>
        </div>

        {/* Two-column layout */}
        <div className="grid gap-10 lg:grid-cols-[1fr_340px]">

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center gap-5 rounded-2xl border border-emerald-200/60 bg-white py-20 text-center shadow-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
                  <CheckCircle size={28} className="text-emerald-500" />
                </div>
                <div>
                  <p className="text-xl font-semibold text-[#06182d]">Request received!</p>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
                    Thanks — the clinic team will contact you shortly to confirm your appointment.
                  </p>
                </div>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', service: '', date: '', message: '' }) }}
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  Book another appointment
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm md:p-8"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jane Smith"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#06182d] outline-none placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="(604) 555-0000"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#06182d] outline-none placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="jane@email.com"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#06182d] outline-none placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Service Needed
                    </label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#06182d] outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                    >
                      <option value="">Select a service…</option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#06182d] outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Message (optional)
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Anything you'd like us to know before your visit…"
                      className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#06182d] outline-none placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#06182d] px-6 py-4 text-sm font-semibold text-white transition-all hover:bg-[#0d2847] disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Request Appointment
                    </>
                  )}
                </button>

                <p className="mt-4 text-center text-xs text-slate-400">
                  We respond within a few hours. Same-day slots available for emergencies.
                </p>
              </form>
            )}
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-col gap-4"
          >
            <div className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm">
              <p className="mb-5 text-sm font-semibold text-[#06182d]">Clinic Information</p>
              <div className="flex flex-col gap-4">
                {CONTACT_INFO.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                      <Icon size={14} className="text-slate-500" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-400">{label}</p>
                      <p className="text-sm font-medium text-[#06182d]">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-[#06182d] p-6 text-white">
              <p className="text-sm font-semibold">Dental Emergency?</p>
              <p className="mt-1.5 text-xs leading-relaxed text-white/60">
                Do not wait — call us directly or use Ava for immediate routing to same-day care.
              </p>
              <a
                href="tel:+16045550192"
                className="mt-4 flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <Phone size={14} />
                Call (604) 555-0192
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
