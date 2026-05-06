'use client'

import Link from 'next/link'
import {
  LayoutDashboard, Users, Calendar, MessageSquare,
  AlertTriangle, ClipboardList, Phone, Settings,
} from 'lucide-react'

const LINKS = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard },
  { label: 'Leads', href: '/admin/leads', icon: Users },
  { label: 'Appointments', href: '/admin/appointments', icon: Calendar },
  { label: 'Conversations', href: '/admin/conversations', icon: MessageSquare },
  { label: 'Triage', href: '/admin/triage', icon: AlertTriangle },
  { label: 'Intakes', href: '/admin/intakes', icon: ClipboardList },
  { label: 'Voice Calls', href: '/admin/voice-calls', icon: Phone },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
]

type Props = { active: string }

export default function Sidebar({ active }: Props) {
  return (
    <aside className="w-60 shrink-0 border-r border-white/[0.06] flex flex-col py-6 px-3 gap-1">
      <div className="px-3 mb-6">
        <span className="text-white font-semibold text-sm tracking-tight">Ava Admin</span>
      </div>
      {LINKS.map(({ label, href, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
            active === label
              ? 'bg-blue-600/20 text-blue-400 font-medium'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
          }`}
        >
          <Icon size={16} />
          {label}
        </Link>
      ))}
    </aside>
  )
}
