type Props = {
  label: string
  value: string | number
  change?: string
  positive?: boolean
  icon?: React.ReactNode
}

export default function StatCard({ label, value, change, positive, icon }: Props) {
  return (
    <div className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-5">
      <div className="flex items-start justify-between mb-3">
        <span className="text-slate-400 text-sm">{label}</span>
        {icon && <span className="text-slate-500">{icon}</span>}
      </div>
      <p className="text-white text-2xl font-bold">{value}</p>
      {change && (
        <p className={`text-xs mt-1.5 ${positive ? 'text-emerald-400' : 'text-red-400'}`}>{change}</p>
      )}
    </div>
  )
}
