
"use client";

import {
  getLoggedUser,
  updateProfile,
  forgotPassword,
  changeUserPassword,
  verifyCode,
  resetPassword, // uncommented
} from "@/lib/api/user";
import { clearSession } from "@/lib/session";
import { useAuthStore } from "@/stores/authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export function useAuth() {
  const queryClient = useQueryClient();
  const token = useAuthStore((s) => s.token);
  const init = useAuthStore((s) => s.init);
  const setUser = useAuthStore((s) => s.setUser);
  const logout = useAuthStore((s) => s.logout);
  const setHydrated = useAuthStore((s) => s.setHydrated);

  // read the saved token once, after mount
  useEffect(() => {
    init();
  }, [init]);

  const query = useQuery({
    queryKey: ["loggedUser"],
    queryFn: getLoggedUser,
    enabled: Boolean(token),
    retry: false,
  });

  useEffect(() => {
    if (!token) return

    if (query.isSuccess) {
      setUser(query.data?.data ?? null);
      return;
    }

    if (query.isError) {
     
      const status = query.error?.res?.status ?? query.error?.response?.status;

      if (status === 401 || status === 403) {
        clearSession();
        queryClient.removeQueries({ queryKey: ["loggedUser"] });
        logout();
      } else {
       
        setHydrated(true);
      }
    }
  }, [token, query.isSuccess, query.isError, query.data, query.error,
      setUser, logout, setHydrated, queryClient]);

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

export function useResetPassword() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: ({ email, newPassword }) => resetPassword(email, newPassword),
    onSuccess: (data, variables) => {
      router.push(`/login?email=${encodeURIComponent(variables.email)}`);
    },
  });

  return {
    resetNewPassword: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}



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