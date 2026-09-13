import { apiClient } from "@/lib/api/client";

export async function googleLogin(credential) {
  const data = await apiClient("/auth/google", {
    method: "POST",
    body: JSON.stringify({ credential }),
  });
  return data;
}