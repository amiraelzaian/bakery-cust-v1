import { apiClient } from "@/lib/api/client";

export async function getCategories() {
  const data = await apiClient("/categories");
  return data;
}