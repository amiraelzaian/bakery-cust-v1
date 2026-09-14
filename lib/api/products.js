import { apiClient } from "../api/client";

export async function getProducts({
  pageParam = 1,
  limit = 20,
  categoryId,
  keyword,
  sort,
} = {}) {
  const params = new URLSearchParams();

  params.set("page", pageParam);
  params.set("limit", limit);

  if (categoryId && categoryId !== "all") {
    params.set("categoryId", categoryId);
  }

  if (keyword) {
    params.set("keyword", keyword);
  }

  if (sort) {
    params.set("sort", sort);
  }

  const data = await apiClient(`/products?${params.toString()}`);
  return data;
}

export async function getProduct(productId) {
  const data = await apiClient(`/products/${productId}`);
  return data;
}