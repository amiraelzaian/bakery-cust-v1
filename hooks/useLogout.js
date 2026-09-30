"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { clearSession } from "@/lib/session";
import { useAuthStore } from "@/stores/authStore";

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const logout = useAuthStore((s) => s.logout);

  return () => {
    clearSession();        // cookie + localStorage + assistant chat
    logout();              // store: header updates immediately
    queryClient.clear();   // cart, wishlist, orders, everything
    router.replace("/login");
    router.refresh();      // drop cached protected pages
  };
}