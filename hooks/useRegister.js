"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { register } from "@/lib/api/register";

export function useRegister() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const mutation = useMutation({
    mutationFn: ({ name, email, password, passwordConfirm }) => register(name, email, password, passwordConfirm),
    onSuccess: (data) => {
      // 1. Store the token
      localStorage.setItem("token", data.token);
       document.cookie = `token=${data.token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax${
        process.env.NODE_ENV === "production" ? "; Secure" : ""
      }`;
      // 2. Redirect back to where the user came from, or home
      const redirect = searchParams.get("redirect");
      router.push(redirect || "/");
    },
  });

  return {
    register: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}