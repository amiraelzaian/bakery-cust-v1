"use client";

import { LogOut } from "lucide-react";
import { useLogout } from "@/hooks/useLogout";

export default function LogoutButton() {
  const handleLogout = useLogout();

  return (
    <button
      onClick={handleLogout}
      className="cursor-pointer flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium transition text-red-50 bg-red-800 hover:bg-red-500"
    >
      <LogOut size={16} />
      Log out
    </button>
  );
}