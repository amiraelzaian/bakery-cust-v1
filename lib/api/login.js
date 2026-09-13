import { apiClient } from "@/lib/api/client";

export async function login(email, password) {
  const data = await apiClient("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  return data;
}