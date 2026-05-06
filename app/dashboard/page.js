export const dynamic = "force-dynamic";
import { getSupabaseAdmin } from "@/lib/supabase";

async function getStats() {
  const today = new Date().toISOString().split("T")[0];
  const [appts, todayAppts, calls, patients] = await Promise.all([
    getSupabaseAdmin().from("appointments").select("id", { count: "exact" }).eq("status", "scheduled"),
    getSupabaseAdmin().from("appointments").select("id", { count: "exact" }).eq("date", today),
    getSupabaseAdmin().from("calls").select("id", { count: "exact" }),
    getSupabaseAdmin().from("patients").select("id", { count: "exact" }),
  ]);
  return {
    scheduled: appts.count ?? 0,
    today: todayAppts.count ?? 0,
    calls: calls.count ?? 0,
    patients: patients.count ?? 0,
  };
}

async function getRecentAppointments() {
  const { data } = await getSupabaseAdmin()
    .from("appointments")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);
  return data ?? [];
}

const statusColors = {
  scheduled: "bg-blue-500/10 text-blue-400",
  confirmed: "bg-green-500/10 text-green-400",
  cancelled: "bg-red-500/10 text-red-400",
  completed: "bg-gray-500/10 text-gray-400",
  no_show:   "bg-yellow-500/10 text-yellow-400",
};

export default async function DashboardPage() {
  const [stats, recent] = await Promise.all([getStats(), getRecentAppointments()]);

  const cards = [
    { label: "Scheduled",       value: stats.scheduled, color: "text-blue-400" },
    { label: "Today",           value: stats.today,     color: "text-green-400" },
    { label: "Total Calls",     value: stats.calls,     color: "text-purple-400" },
    { label: "Total Patients",  value: stats.patients,  color: "text-yellow-400" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Overview</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map(c => (
          <div key={c.label} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{c.label}</p>
            <p className={`text-3xl font-bold ${c.color}`}>{c.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Recent Appointments</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 text-left border-b border-gray-800">
                <th className="pb-2 pr-4">Patient</th>
                <th className="pb-2 pr-4">Service</th>
                <th className="pb-2 pr-4">Date</th>
                <th className="pb-2 pr-4">Time</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {recent.map(a => (
                <tr key={a.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                  <td className="py-3 pr-4 font-medium">{a.patient_name}</td>
                  <td className="py-3 pr-4 text-gray-400">{a.service}</td>
                  <td className="py-3 pr-4 text-gray-400">{a.date}</td>
                  <td className="py-3 pr-4 text-gray-400">{a.time}</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[a.status] ?? "bg-gray-800 text-gray-400"}`}>
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
              {recent.length === 0 && (
                <tr><td colSpan={5} className="py-6 text-center text-gray-600">No appointments yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
