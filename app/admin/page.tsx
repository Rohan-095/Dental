import AdminLayout from '@/app/components/admin/AdminLayout'
import StatCard from '@/app/components/admin/StatCard'
import StatusBadge from '@/app/components/admin/StatusBadge'
import { Users, Calendar, AlertTriangle, ClipboardList, Phone } from 'lucide-react'
import { LEADS, APPOINTMENTS, TRIAGE } from '@/data/admin'

export default function AdminOverview() {
  const openTriage = TRIAGE.filter((t) => t.status === 'Open').length
  const todayAppts = APPOINTMENTS.filter((a) => a.date === 'May 6, 2026')
  const newLeads = LEADS.filter((l) => l.status === 'New').length

  return (
    <AdminLayout active="Overview" title="Dashboard Overview">
      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatCard label="New Leads" value={newLeads} change="+3 this week" positive icon={<Users size={15} />} />
        <StatCard label="Today's Appts" value={todayAppts.length} icon={<Calendar size={15} />} />
        <StatCard label="Open Triage" value={openTriage} change={openTriage > 0 ? 'Needs attention' : 'All clear'} positive={openTriage === 0} icon={<AlertTriangle size={15} />} />
        <StatCard label="Pending Intakes" value={2} icon={<ClipboardList size={15} />} />
        <StatCard label="Voice Calls" value={4} change="Today" positive icon={<Phone size={15} />} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Recent leads */}
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03]">
          <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
            <p className="text-sm font-semibold text-white">Recent Leads</p>
            <a href="/admin/leads" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">View all</a>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {LEADS.slice(0, 5).map((lead) => (
              <div key={lead.id} className="flex items-center justify-between px-5 py-3.5">
                <div>
                  <p className="text-sm font-medium text-white">{lead.name}</p>
                  <p className="text-xs text-slate-500">{lead.service} · {lead.source}</p>
                </div>
                <StatusBadge label={lead.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Today's appointments */}
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03]">
          <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
            <p className="text-sm font-semibold text-white">Today's Appointments</p>
            <a href="/admin/appointments" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">View all</a>
          </div>
          {todayAppts.length === 0 ? (
            <p className="px-5 py-8 text-center text-sm text-slate-600">No appointments today.</p>
          ) : (
            <div className="divide-y divide-white/[0.04]">
              {todayAppts.map((appt) => (
                <div key={appt.id} className="flex items-center justify-between px-5 py-3.5">
                  <div>
                    <p className="text-sm font-medium text-white">{appt.patient}</p>
                    <p className="text-xs text-slate-500">{appt.time} · {appt.service}</p>
                  </div>
                  <StatusBadge label={appt.status} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Triage alerts */}
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] lg:col-span-2">
          <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
            <p className="text-sm font-semibold text-white">Triage Alerts</p>
            <a href="/admin/triage" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">View all</a>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {TRIAGE.map((alert) => (
              <div key={alert.id} className="flex flex-wrap items-start justify-between gap-3 px-5 py-3.5">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium text-white">{alert.patient}</p>
                    <StatusBadge label={alert.severity} />
                    <StatusBadge label={alert.status} />
                  </div>
                  <p className="mt-0.5 text-xs text-slate-500 truncate">{alert.symptoms}</p>
                </div>
                <p className="text-xs text-slate-600 whitespace-nowrap">{alert.created}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
