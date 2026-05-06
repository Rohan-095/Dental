import AdminLayout from '@/app/components/admin/AdminLayout'
import StatusBadge from '@/app/components/admin/StatusBadge'
import { CONVERSATIONS } from '@/data/admin'
import { MessageSquare } from 'lucide-react'

export default function ConversationsPage() {
  return (
    <AdminLayout active="Conversations" title="AI Conversations">
      <p className="mb-6 text-xs text-slate-500">{CONVERSATIONS.length} recorded conversations</p>

      <div className="flex flex-col gap-3">
        {CONVERSATIONS.map((conv) => (
          <div
            key={conv.id}
            className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 hover:bg-white/[0.05] transition-colors"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600/15">
                  <MessageSquare size={14} className="text-blue-400" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium text-white">{conv.patient}</p>
                    <StatusBadge label={conv.urgency === 'High' ? 'High' : 'Low'} />
                  </div>
                  <p className="text-xs text-slate-500">{conv.contact}</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 whitespace-nowrap">{conv.date}</p>
            </div>

            <div className="mt-3 pl-12">
              <p className="text-sm text-slate-300 italic">"{conv.lastMessage}"</p>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                <span className="font-medium text-slate-400">AI summary: </span>
                {conv.summary}
              </p>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  )
}
