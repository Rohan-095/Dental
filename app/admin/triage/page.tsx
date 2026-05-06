import AdminLayout from '@/app/components/admin/AdminLayout'
import StatusBadge from '@/app/components/admin/StatusBadge'
import { TRIAGE } from '@/data/admin'
import { AlertTriangle, Phone } from 'lucide-react'

const SEVERITY_ORDER: Record<string, number> = { Critical: 0, High: 1, Medium: 2, Low: 3 }

export default function TriagePage() {
  const sorted = [...TRIAGE].sort(
    (a, b) => (SEVERITY_ORDER[a.severity] ?? 9) - (SEVERITY_ORDER[b.severity] ?? 9)
  )
  const open = sorted.filter((t) => t.status === 'Open')
  const resolved = sorted.filter((t) => t.status !== 'Open')

  return (
    <AdminLayout active="Triage Alerts" title="Triage Alerts">

      {open.length > 0 && (
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3">
          <AlertTriangle size={14} className="text-red-400 shrink-0" />
          <p className="text-sm text-red-300 font-medium">
            {open.length} open alert{open.length > 1 ? 's' : ''} — requires immediate attention
          </p>
        </div>
      )}

      {/* Open alerts */}
      {open.length > 0 && (
        <div className="mb-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Open</p>
          <div className="flex flex-col gap-3">
            {open.map((alert) => (
              <div
                key={alert.id}
                className="rounded-2xl border border-red-500/20 bg-red-500/[0.06] p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-white">{alert.patient}</p>
                    <StatusBadge label={alert.severity} />
                    <StatusBadge label={alert.status} />
                  </div>
                  <p className="text-xs text-slate-500 whitespace-nowrap">{alert.created}</p>
                </div>
                <p className="mt-2 text-sm text-slate-300">{alert.symptoms}</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                  <Phone size={11} />
                  {alert.contact}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resolved */}
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Resolved</p>
        <div className="flex flex-col gap-3">
          {resolved.map((alert) => (
            <div
              key={alert.id}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 opacity-70"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-medium text-white">{alert.patient}</p>
                  <StatusBadge label={alert.severity} />
                  <StatusBadge label={alert.status} />
                </div>
                <p className="text-xs text-slate-500 whitespace-nowrap">{alert.created}</p>
              </div>
              <p className="mt-2 text-sm text-slate-400">{alert.symptoms}</p>
              <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                <Phone size={11} />
                {alert.contact}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
