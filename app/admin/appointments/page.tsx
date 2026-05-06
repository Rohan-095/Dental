import AdminLayout from '@/app/components/admin/AdminLayout'
import DataTable from '@/app/components/admin/DataTable'
import StatusBadge from '@/app/components/admin/StatusBadge'
import { APPOINTMENTS } from '@/data/admin'

export default function AppointmentsPage() {
  return (
    <AdminLayout active="Appointments" title="Appointments">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-slate-500">{APPOINTMENTS.length} total appointments</p>
        <div className="flex gap-2 flex-wrap">
          {['All', 'Confirmed', 'Pending', 'Completed', 'Cancelled'].map((f) => (
            <span key={f} className="cursor-default rounded-full border border-white/[0.08] px-3 py-1 text-xs text-slate-400 hover:border-white/20 hover:text-white transition-colors">
              {f}
            </span>
          ))}
        </div>
      </div>

      <DataTable
        columns={[
          { key: 'patient', label: 'Patient' },
          { key: 'phone', label: 'Phone' },
          { key: 'service', label: 'Service' },
          { key: 'date', label: 'Date' },
          { key: 'time', label: 'Time' },
          {
            key: 'status',
            label: 'Status',
            render: (val) => <StatusBadge label={String(val)} />,
          },
          { key: 'notes', label: 'Notes' },
        ]}
        rows={APPOINTMENTS}
      />
    </AdminLayout>
  )
}
