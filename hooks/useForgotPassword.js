"use client";

import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/lib/api/forgotPassword";
import { useRouter } from "next/navigation";

export function useForgotPassword() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: ({ email }) => forgotPassword(email),
    onSuccess: (data, variables) => {
  console.log("forgotPassword success:", data, variables);
  router.push(`/verifyCode?email=${encodeURIComponent(variables.email)}`);
},
  });

  return {
    forgotPassword: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}