export const dynamic = "force-dynamic";
import { getSupabaseAdmin } from "@/lib/supabase";

async function getCalls() {
  const { data } = await getSupabaseAdmin()
    .from("calls")
    .select("*")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export default async function CallsPage() {
  const calls = await getCalls();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Call Logs</h1>
      <div className="flex flex-col gap-4">
        {calls.map(c => (
          <div key={c.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-semibold">{c.patient_name ?? "Unknown"}</p>
                <p className="text-sm text-gray-500">{c.phone} · {c.duration_seconds ? `${Math.round(c.duration_seconds / 60)}m ${c.duration_seconds % 60}s` : "—"}</p>
              </div>
              <div className="text-right">
                <span className="text-xs bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded-full">
                  {c.direction ?? "inbound"}
                </span>
                <p className="text-xs text-gray-600 mt-1">{new Date(c.created_at).toLocaleString()}</p>
              </div>
            </div>
            {c.summary && (
              <p className="text-sm text-gray-400 bg-gray-800/50 rounded-lg p-3">{c.summary}</p>
            )}
          </div>
        ))}
        {calls.length === 0 && (
          <p className="text-gray-600 text-center py-12">No calls logged yet</p>
        )}
      </div>
    </div>
  );
}
