import AdminLayout from '@/app/components/admin/AdminLayout'
import StatusBadge from '@/app/components/admin/StatusBadge'
import { VOICE_CALLS } from '@/data/admin'
import { Phone, Zap, AlertTriangle } from 'lucide-react'

export default function VoiceCallsPage() {
  return (
    <AdminLayout active="Voice Calls" title="Voice Calls">

      {/* Coming soon banner */}
      <div className="mb-6 flex items-center gap-3 rounded-xl border border-blue-500/25 bg-blue-500/10 px-5 py-4">
        <Zap size={16} className="text-blue-400 shrink-0" />
        <div>
          <p className="text-sm font-semibold text-blue-300">Coming Soon: Vapi / Retell AI Integration</p>
          <p className="text-xs text-blue-400/70 mt-0.5">
            Live call recordings, transcripts, and booking results will appear here once Phase 4 is active.
          </p>
        </div>
      </div>

      <p className="mb-4 text-xs text-slate-500">{VOICE_CALLS.length} mock call records shown below</p>

      <div className="flex flex-col gap-3">
        {VOICE_CALLS.map((call) => (
          <div
            key={call.id}
            className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${call.urgency ? 'bg-red-500/15' : 'bg-slate-700/40'}`}>
                  <Phone size={14} className={call.urgency ? 'text-red-400' : 'text-slate-400'} />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium text-white">{call.caller}</p>
                    {call.urgency && (
                      <span className="flex items-center gap-1 rounded-full bg-red-500/15 px-2 py-0.5 text-[10px] font-semibold text-red-400 border border-red-500/25">
                        <AlertTriangle size={9} />
                        Urgent
                      </span>
                    )}
                    <StatusBadge label={call.status} />
                  </div>
                  <p className="text-xs text-slate-500">{call.phone}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500">Result</p>
                <p className="text-xs font-medium text-slate-300 mt-0.5">{call.result}</p>
              </div>
            </div>

            <p className="mt-3 pl-12 text-xs leading-relaxed text-slate-400">{call.summary}</p>

            <div className="mt-3 pl-12">
              <span className="text-xs text-slate-600 italic">
                Recording: {call.recording ?? 'Not available yet'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  )
}
