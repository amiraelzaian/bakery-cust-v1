"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { googleLogin } from "@/lib/api/googleLogin";

export function useGoogleAuth() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const mutation = useMutation({
    mutationFn: (credential) => googleLogin(credential),
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
       document.cookie = `token=${data.token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax${
        process.env.NODE_ENV === "production" ? "; Secure" : ""
      }`;
      const redirect = searchParams.get("redirect");
      router.push(redirect || "/");
    },
  });

  return {
    loginWithGoogle: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}