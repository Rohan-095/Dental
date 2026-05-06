import AdminLayout from '@/app/components/admin/AdminLayout'
import DataTable from '@/app/components/admin/DataTable'
import StatusBadge from '@/app/components/admin/StatusBadge'
import { INTAKES } from '@/data/admin'

export default function IntakesPage() {
  return (
    <AdminLayout active="Intake Forms" title="Patient Intake Forms">
      <p className="mb-6 text-xs text-slate-500">{INTAKES.length} intake forms submitted</p>

      <DataTable
        columns={[
          { key: 'patient', label: 'Patient' },
          { key: 'dob', label: 'DOB' },
          { key: 'phone', label: 'Phone' },
          { key: 'insurance', label: 'Insurance' },
          { key: 'complaint', label: 'Chief Complaint' },
          {
            key: 'status',
            label: 'Status',
            render: (val) => <StatusBadge label={String(val)} />,
          },
          { key: 'submitted', label: 'Submitted' },
        ]}
        rows={INTAKES}
      />
    </AdminLayout>
  )
}
