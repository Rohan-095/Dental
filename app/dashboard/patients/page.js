export const dynamic = "force-dynamic";
import { getSupabaseAdmin } from "@/lib/supabase";

async function getPatients() {
  const { data } = await getSupabaseAdmin()
    .from("patients")
    .select("*")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export default async function PatientsPage() {
  const patients = await getPatients();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Patients</h1>
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 text-left border-b border-gray-800 bg-gray-900/50">
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Phone</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Notes</th>
                <th className="px-5 py-3">Added</th>
              </tr>
            </thead>
            <tbody>
              {patients.map(p => (
                <tr key={p.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                  <td className="px-5 py-4 font-medium">{p.name}</td>
                  <td className="px-5 py-4 text-gray-400">{p.phone}</td>
                  <td className="px-5 py-4 text-gray-400">{p.email ?? "—"}</td>
                  <td className="px-5 py-4 text-gray-400 max-w-xs truncate">{p.notes ?? "—"}</td>
                  <td className="px-5 py-4 text-gray-500 text-xs">{new Date(p.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
              {patients.length === 0 && (
                <tr><td colSpan={5} className="px-5 py-8 text-center text-gray-600">No patients yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
