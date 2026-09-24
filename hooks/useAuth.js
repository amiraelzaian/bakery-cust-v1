"use client";

import {
  getLoggedUser,
  updateProfile,
  forgotPassword,
  changeUserPassword,
  verifyCode,
//  resetPassword, // adjust to your real API function name
} from "@/lib/api/user";
import { useAuthStore } from "@/stores/authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

function clearSession() {
  localStorage.removeItem("token");
  document.cookie = "token=; path=/; max-age=0; SameSite=Lax";
}

export function useAuth() {
  const hasToken =
    typeof window !== "undefined" && Boolean(localStorage.getItem("token"));

  const setUser = useAuthStore((s) => s.setUser);
  const setHydrated = useAuthStore((s) => s.setHydrated);

  const query = useQuery({
    queryKey: ["loggedUser"],
    queryFn: getLoggedUser,
    enabled: hasToken,
    retry: false,
  });

  useEffect(() => {
    // No token: we know the user is logged out, so we're hydrated.
    if (!hasToken) {
      setUser(null);
      setHydrated(true);
      return;
    }

    if (query.isSuccess) {
      setUser(query.data?.data ?? null);
      setHydrated(true);
      return;
    }

    if (query.isError) {
      const status = query.error?.response?.status;

      // Invalid/expired token: clear BOTH token copies so the middleware and the client agree.
      if (status === 401 || status === 403) {
        clearSession();
        setUser(null);
      }
      setHydrated(true);
    }
  }, [
    hasToken,
    query.isSuccess,
    query.isError,
    query.error,
    query.data,
    setUser,
    setHydrated,
  ]);

  return query;
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload) => updateProfile(payload),
    onSuccess: () => {
      toast.success("Profile updated");
      queryClient.invalidateQueries({ queryKey: ["loggedUser"] });
    },
    onError: (error) => {
      toast.error(error?.message || "Couldn't update profile");
    },
  });

  return { updateProfile: mutation.mutate, isPending: mutation.isPending };
}

export function useForgotPassword() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: ({ email }) => forgotPassword(email),
    onSuccess: (data, variables) => {
      router.push(`/verifyCode?email=${encodeURIComponent(variables.email)}`);
    },
  });

  return {
    forgotPassword: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}

export function useVerifyCode() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: ({ email, resetCode }) => verifyCode(email, resetCode),
    onSuccess: (data, variables) => {
      router.push(`/resetPassword?email=${encodeURIComponent(variables.email)}`);
    },
  });

  return {
    verifyCode: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}

// export function useResetPassword() {
//   const router = useRouter();

//   const mutation = useMutation({
//     mutationFn: ({ email, newPassword }) => resetPass(email, newPassword),
//     onSuccess: (data, variables) => {
//       router.push(`/login?email=${encodeURIComponent(variables.email)}`);
//     },
//   });

//   return {
//     resetNewPassword: mutation.mutate,
//     isPending: mutation.isPending,
//     error: mutation.error,
//   };
// }

export function useChangeUserPassword() {
  const mutation = useMutation({
    mutationFn: ({ userId, currentPassword, password, passwordConfirm }) =>
      changeUserPassword(userId, currentPassword, password, passwordConfirm),
    onSuccess: () => {
      toast.success("Password Changed");
    },
    onError: () => {
      toast.error("Could not change password, Try later");
    },
  });

  return {
    changeUserPassword: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}