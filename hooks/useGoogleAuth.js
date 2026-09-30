"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { googleLogin } from "@/lib/api/googleLogin";
import { saveSession, getSafeRedirect } from "@/lib/session";
import { useAuthStore } from "@/stores/authStore";

export function useGoogleAuth() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const storeLogin = useAuthStore((s) => s.login);

  const mutation = useMutation({
    mutationFn: (credential) => googleLogin(credential),

    onSuccess: (data) => {
      const user = data.data;

      saveSession(data.token);
      storeLogin(user, data.token);
      queryClient.setQueryData(["loggedUser"], { data: user });

      const target = getSafeRedirect(
        searchParams.get("callbackUrl") || searchParams.get("redirect"),
      );
      router.replace(target);
      router.refresh();
    },
  });

  return {
    loginWithGoogle: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}