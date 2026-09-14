'use client';

import { getProduct } from "@/lib/api/products";
import { useQuery } from "@tanstack/react-query";

export function useProduct(productId) {
  const query = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
    enabled: !!productId, // don't fetch until we actually have an id
  });

  return {
    isPending: query.isPending,
    error: query.error,
    product: query.data?.data,
  };
}