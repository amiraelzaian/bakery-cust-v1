"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { login } from "@/lib/api/login";
import { useAuthStore } from "@/stores/authStore";

export function useLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const storeLogin = useAuthStore((state) => state.login);
  const setHydrated = useAuthStore((state) => state.setHydrated);

  const mutation = useMutation({
    mutationFn: ({ email, password }) => login(email, password),

    onSuccess: (data) => {
      localStorage.setItem("token", data.token);

      document.cookie = `token=${data.token}; path=/; max-age=${
        60 * 60 * 24 * 7
      }; SameSite=Lax${
        process.env.NODE_ENV === "production" ? "; Secure" : ""
      }`;

      // Seed the cache so useAuth doesn't flash empty, then refetch to confirm.
      if (data.user) {
        queryClient.setQueryData(["loggedUser"], { data: data.user });
      }
      queryClient.invalidateQueries({ queryKey: ["loggedUser"] });

      storeLogin(data.user ?? null);
      setHydrated(true);

      const callbackUrl = searchParams.get("callbackUrl");
      router.replace(callbackUrl || "/");
    },
  });

  return {
    login: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}