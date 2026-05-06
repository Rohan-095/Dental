import AdminLayout from '@/app/components/admin/AdminLayout'
import DataTable from '@/app/components/admin/DataTable'
import StatusBadge from '@/app/components/admin/StatusBadge'
import { LEADS } from '@/data/admin'

export default function LeadsPage() {
  return (
    <AdminLayout active="Leads" title="Leads">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs text-slate-500 mt-0.5">{LEADS.length} total leads</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {['All', 'New', 'Contacted', 'Booked', 'Closed', 'Lost'].map((f) => (
            <span key={f} className="cursor-default rounded-full border border-white/[0.08] px-3 py-1 text-xs text-slate-400 hover:border-white/20 hover:text-white transition-colors">
              {f}
            </span>
          ))}
        </div>
      </div>

      <DataTable
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'phone', label: 'Phone' },
          { key: 'email', label: 'Email' },
          { key: 'service', label: 'Service' },
          { key: 'source', label: 'Source' },
          {
            key: 'status',
            label: 'Status',
            render: (val) => <StatusBadge label={String(val)} />,
          },
          { key: 'createdAt', label: 'Date' },
        ]}
        rows={LEADS}
      />
    </AdminLayout>
  )
}
