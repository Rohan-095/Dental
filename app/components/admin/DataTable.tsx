type Column<T> = { key: keyof T; label: string; render?: (val: T[keyof T], row: T) => React.ReactNode }

type Props<T extends Record<string, unknown>> = {
  columns: Column<T>[]
  rows: T[]
  emptyMessage?: string
}

export default function DataTable<T extends Record<string, unknown>>({ columns, rows, emptyMessage = 'No data yet.' }: Props<T>) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/[0.07]">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/[0.07]">
            {columns.map((col) => (
              <th key={String(col.key)} className="text-left px-4 py-3 text-slate-500 font-medium whitespace-nowrap">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-slate-600">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr key={i} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-4 py-3 text-slate-300 whitespace-nowrap">
                    {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
