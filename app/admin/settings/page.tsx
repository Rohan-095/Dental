'use client'

import { useState } from 'react'
import AdminLayout from '@/app/components/admin/AdminLayout'
import { CheckCircle } from 'lucide-react'

const FIELD_GROUPS = [
  {
    title: 'Clinic Details',
    fields: [
      { name: 'clinicName', label: 'Clinic Name', placeholder: 'Ava Dental Studio', type: 'text' },
      { name: 'dentistName', label: 'Dentist Name', placeholder: 'Dr. Sarah Williams', type: 'text' },
      { name: 'address', label: 'Address', placeholder: '123 West Georgia St, Vancouver, BC', type: 'text' },
      { name: 'hours', label: 'Business Hours', placeholder: 'Mon–Fri 8 AM–6 PM, Sat 9 AM–3 PM', type: 'text' },
    ],
  },
  {
    title: 'Contact & Links',
    fields: [
      { name: 'phone', label: 'Clinic Phone', placeholder: '(604) 555-0192', type: 'tel' },
      { name: 'emergencyPhone', label: 'Emergency Phone', placeholder: '(604) 555-0199', type: 'tel' },
      { name: 'email', label: 'Clinic Email', placeholder: 'hello@avadental.ca', type: 'email' },
      { name: 'bookingLink', label: 'Booking Link', placeholder: 'https://...', type: 'url' },
      { name: 'googleReview', label: 'Google Review Link', placeholder: 'https://g.page/...', type: 'url' },
    ],
  },
  {
    title: 'Staff Alerts',
    fields: [
      { name: 'alertEmail', label: 'Staff Alert Email', placeholder: 'staff@avadental.ca', type: 'email' },
      { name: 'alertPhone', label: 'Staff Alert Phone (SMS)', placeholder: '(604) 555-0001', type: 'tel' },
    ],
  },
]

export default function SettingsPage() {
  const [saved, setSaved] = useState(false)
  const [values, setValues] = useState<Record<string, string>>({})

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setSaved(false)
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <AdminLayout active="Settings" title="Settings">
      <form onSubmit={handleSave} className="max-w-2xl">

        {FIELD_GROUPS.map((group) => (
          <div key={group.title} className="mb-8">
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
              {group.title}
            </p>
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
              <div className="grid gap-4 sm:grid-cols-2">
                {group.fields.map((field) => (
                  <div key={field.name} className={field.name === 'address' || field.name === 'hours' ? 'sm:col-span-2' : ''}>
                    <label className="mb-1.5 block text-xs font-medium text-slate-400">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={values[field.name] ?? ''}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500/50 focus:bg-white/[0.07] transition-all"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
          >
            Save Settings
          </button>
          {saved && (
            <span className="flex items-center gap-1.5 text-sm text-emerald-400">
              <CheckCircle size={14} />
              Saved successfully
            </span>
          )}
        </div>
      </form>
    </AdminLayout>
  )
}
