import { apiClient } from "@/lib/api/client";

export async function forgotPassword(email) {
  const data = await apiClient("/auth/forgotPassword", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
  return data;
}