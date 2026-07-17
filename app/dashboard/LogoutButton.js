"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-gray-400 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-lg transition-colors text-left"
    >
      Log out
    </button>
  );
}
