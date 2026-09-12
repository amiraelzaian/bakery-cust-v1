"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/api/categories";

export function useCategories() {
  const query = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });


  const categories = Array.isArray(query.data)
    ? query.data
    : Array.isArray(query.data?.data)
      ? query.data.data
      : [];


  return {
    ...query,
    categories,
  };
}