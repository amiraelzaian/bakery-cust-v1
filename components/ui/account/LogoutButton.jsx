"use client";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";

export default function LogoutButton() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const logout = useAuthStore((state) => state.logout);

  function handleLogout() {
    localStorage.removeItem("token");

    document.cookie =
      "token=; path=/; max-age=0; SameSite=Lax";

    logout();

    queryClient.removeQueries({
      queryKey: ["loggedUser"],
    });

    queryClient.removeQueries({
      queryKey: ["cart"],
    });

    queryClient.removeQueries({
      queryKey: ["wishlist"],
    });

    router.replace("/login");
  }

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