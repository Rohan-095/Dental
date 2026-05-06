export const dynamic = "force-dynamic";
import { getSupabaseAdmin } from "@/lib/supabase";

async function getAppointments() {
  const { data } = await getSupabaseAdmin()
    .from("appointments")
    .select("*")
    .order("date", { ascending: true })
    .order("time", { ascending: true });
  return data ?? [];
}

const statusColors = {
  scheduled: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  confirmed: "bg-green-500/10 text-green-400 border-green-500/20",
  cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
  completed: "bg-gray-500/10 text-gray-400 border-gray-500/20",
  no_show:   "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
};

export default async function AppointmentsPage() {
  const appointments = await getAppointments();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Appointments</h1>
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 text-left border-b border-gray-800 bg-gray-900/50">
                <th className="px-5 py-3">Patient</th>
                <th className="px-5 py-3">Phone</th>
                <th className="px-5 py-3">Service</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Time</th>
                <th className="px-5 py-3">Booked Via</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(a => (
                <tr key={a.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                  <td className="px-5 py-4 font-medium">{a.patient_name}</td>
                  <td className="px-5 py-4 text-gray-400">{a.phone}</td>
                  <td className="px-5 py-4 text-gray-400">{a.service}</td>
                  <td className="px-5 py-4 text-gray-400">{a.date}</td>
                  <td className="px-5 py-4 text-gray-400">{a.time}</td>
                  <td className="px-5 py-4">
                    <span className="text-xs text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
                      {a.booked_via}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold border ${statusColors[a.status] ?? "bg-gray-800 text-gray-400 border-gray-700"}`}>
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
              {appointments.length === 0 && (
                <tr><td colSpan={7} className="px-5 py-8 text-center text-gray-600">No appointments yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
