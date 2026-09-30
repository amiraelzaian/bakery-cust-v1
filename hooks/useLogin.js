"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { login } from "@/lib/api/login";
import { saveSession, getSafeRedirect } from "@/lib/session";
import { useAuthStore } from "@/stores/authStore";

export function useLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const storeLogin = useAuthStore((s) => s.login);

  const mutation = useMutation({
    mutationFn: ({ email, password }) => login(email, password),

    onSuccess: (data) => {
      const user = data.data; // backend: { status, data: user, token }

      saveSession(data.token);          // 1. cookie + localStorage first
      storeLogin(user, data.token);     // 2. store: header updates immediately
      queryClient.setQueryData(["loggedUser"], { data: user }); // 3. no flicker

      const target = getSafeRedirect(
        searchParams.get("callbackUrl") || searchParams.get("redirect"),
      );
      router.replace(target);           // 4. navigate
      router.refresh();                 // 5. re-run middleware with the new cookie
    },
  });

  return {
    login: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}