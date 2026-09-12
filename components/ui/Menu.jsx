"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "./ProductCard";

const SORT_MAP = {
  newest: "-createdAt",
  oldest: "createdAt",
  "name-asc": "name",
  "a-z": "name",
  "name-desc": "-name",
  "z-a": "-name",
};

export default function Menu({
  categoryValue,
  sortValue,
  searchValue,
}) {
  // -----------------------------
  // Debounced search
  // -----------------------------
  const [debouncedSearch, setDebouncedSearch] = useState(
    searchValue || ""
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchValue || "");
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue]);

  // Price isn't a fixed DB field (product.price OR sizes[].price),
  // so price sort is applied client-side on loaded pages only.
  const isPriceSort =
    sortValue === "price-low" ||
    sortValue === "price-asc" ||
    sortValue === "price-high" ||
    sortValue === "price-desc";

  const {
    products = [],
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProducts({
    categoryId: categoryValue,
    keyword: debouncedSearch,
    sort: isPriceSort ? undefined : SORT_MAP[sortValue],
  });

  // -----------------------------
  // Infinite scroll sentinel (now works for every category, not just "all")
  // -----------------------------
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (!hasNextPage) return;

    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // -----------------------------
  // Get product starting price
  // -----------------------------
  const getProductPrice = (product) => {
    if (product.price != null) {
      return Number(product.price);
    }

    if (product.sizes?.length) {
      const prices = product.sizes
        .map((size) => Number(size.price))
        .filter((price) => !Number.isNaN(price));

      if (prices.length > 0) {
        return Math.min(...prices);
      }
    }

    return 0;
  };

  // -----------------------------
  // Client-side price sort only (over currently loaded pages)
  // -----------------------------
  const sortedProducts = useMemo(() => {
    if (!isPriceSort) return products;

    const result = [...products];

    result.sort((a, b) =>
      sortValue === "price-low" || sortValue === "price-asc"
        ? getProductPrice(a) - getProductPrice(b)
        : getProductPrice(b) - getProductPrice(a)
    );

    return result;
  }, [products, isPriceSort, sortValue]);

  // -----------------------------
  // Loading
  // -----------------------------
  if (isLoading) {
    return (
      <div className="py-10 text-center">
        Loading products...
      </div>
    );
  }

  // -----------------------------
  // Error
  // -----------------------------
  if (isError) {
    return (
      <div className="py-10 text-center text-red-500">
        Failed to load products.
      </div>
    );
  }

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <section>
      {sortedProducts.length === 0 ? (
        <div className="py-10 text-center text-gray-500">
          No products found.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      )}

      <div ref={sentinelRef} className="h-10 w-full">
        {isFetchingNextPage && (
          <div className="py-6 text-center text-sm text-gray-400">
            Loading more...
          </div>
        )}
      </div>
    </section>
  );
}