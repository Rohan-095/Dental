const STYLES: Record<string, string> = {
  New: 'bg-blue-500/15 text-blue-400 border border-blue-500/25',
  Contacted: 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/25',
  Booked: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25',
  Confirmed: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25',
  Completed: 'bg-slate-500/15 text-slate-400 border border-slate-500/20',
  Closed: 'bg-slate-500/15 text-slate-400 border border-slate-500/20',
  Resolved: 'bg-slate-500/15 text-slate-400 border border-slate-500/20',
  Lost: 'bg-red-500/15 text-red-400 border border-red-500/25',
  Cancelled: 'bg-red-500/15 text-red-400 border border-red-500/25',
  Pending: 'bg-orange-500/15 text-orange-400 border border-orange-500/25',
  Open: 'bg-red-500/15 text-red-400 border border-red-500/25',
  Reviewed: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25',
  Critical: 'bg-red-600/20 text-red-300 border border-red-600/30',
  High: 'bg-orange-500/20 text-orange-300 border border-orange-500/30',
  Medium: 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/25',
  Low: 'bg-slate-500/15 text-slate-400 border border-slate-500/20',
}

const DEFAULT = 'bg-slate-500/10 text-slate-400 border border-slate-500/20'

export default function StatusBadge({ label }: { label: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STYLES[label] ?? DEFAULT}`}>
      {label}
    </span>
  )
}
