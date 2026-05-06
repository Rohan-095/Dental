'use client'

import Link from 'next/link'
import {
  LayoutDashboard, Users, Calendar, MessageSquare,
  AlertTriangle, ClipboardList, Phone, Settings, ArrowLeft,
} from 'lucide-react'

const LINKS = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard },
  { label: 'Leads', href: '/admin/leads', icon: Users },
  { label: 'Appointments', href: '/admin/appointments', icon: Calendar },
  { label: 'Conversations', href: '/admin/conversations', icon: MessageSquare },
  { label: 'Triage Alerts', href: '/admin/triage', icon: AlertTriangle },
  { label: 'Intake Forms', href: '/admin/intakes', icon: ClipboardList },
  { label: 'Voice Calls', href: '/admin/voice-calls', icon: Phone },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
]

type Props = { active: string; onClose?: () => void }

export default function AdminSidebar({ active, onClose }: Props) {
  return (
    <aside className="flex h-full w-60 flex-col bg-[#0A0B11]">
      {/* Logo */}
      <div className="flex h-14 items-center gap-2.5 border-b border-white/[0.06] px-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600/20 text-xs font-bold text-blue-400">
          A
        </div>
        <span className="text-sm font-semibold text-white">Ava Admin</span>
      </div>

      {/* Nav links */}
      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-3">
        {LINKS.map(({ label, href, icon: Icon }) => {
          const isActive = active === label
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                isActive
                  ? 'bg-blue-600/18 text-blue-400 font-medium'
                  : 'text-slate-400 hover:bg-white/[0.05] hover:text-white'
              }`}
            >
              <Icon size={15} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/[0.06] p-3">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-500 transition-colors hover:bg-white/[0.05] hover:text-white"
        >
          <ArrowLeft size={15} />
          Back to Website
        </Link>
      </div>
    </aside>
  )
}
