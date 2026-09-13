import { apiClient } from "@/lib/api/client";

export async function register( name,email, password,passwordConfirm) {
  const data = await apiClient("/auth/signup", {
    method: "POST",
    body: JSON.stringify({ name,email, password,passwordConfirm }),
  });
  return data;
}