'use client';

import { getProducts } from "@/lib/api/products";
import { useInfiniteQuery } from "@tanstack/react-query";

const LIMIT = 20;

export function useProducts({ categoryId = "all", keyword = "", sort } = {}) {
  const query = useInfiniteQuery({
    queryKey: ["products", categoryId, keyword, sort],
    queryFn: ({ pageParam = 1 }) =>
      getProducts({ pageParam, limit: LIMIT, categoryId, keyword, sort }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const page = lastPage?.page;
      if (!page) return undefined;
      return page.currentPage < page.NoOfPages ? page.next : undefined;
    },
  });

  const products = (query.data?.pages ?? []).flatMap((page) =>
    Array.isArray(page?.data) ? page.data : []
  );

  return {
    ...query,
    products,
  };
}