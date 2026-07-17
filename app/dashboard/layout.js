import Link from "next/link";
import LogoutButton from "./LogoutButton";

const nav = [
  { label: "Overview",     href: "/dashboard" },
  { label: "Appointments", href: "/dashboard/appointments" },
  { label: "Calls",        href: "/dashboard/calls" },
  { label: "Patients",     href: "/dashboard/patients" },
];

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      <aside className="w-56 bg-gray-900 border-r border-gray-800 flex flex-col p-5 gap-1 shrink-0">
        <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4">Dental AI</p>
        {nav.map(n => (
          <Link key={n.href} href={n.href}
            className="text-sm text-gray-400 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-lg transition-colors">
            {n.label}
          </Link>
        ))}
        <div className="mt-auto pt-4 border-t border-gray-800">
          <LogoutButton />
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}
