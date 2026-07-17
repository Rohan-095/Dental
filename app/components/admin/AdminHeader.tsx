'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Menu, ExternalLink, LogOut } from 'lucide-react'

type Props = {
  title: string
  onMenuClick: () => void
}

export default function AdminHeader({ title, onMenuClick }: Props) {
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-white/[0.06] bg-[#0A0B11] px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-white/[0.06] hover:text-white transition-colors lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={18} />
        </button>
        <h1 className="text-sm font-semibold text-white">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
        >
          View Website
          <ExternalLink size={12} />
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
        >
          Log out
          <LogOut size={12} />
        </button>
      </div>
    </header>
  )
}
