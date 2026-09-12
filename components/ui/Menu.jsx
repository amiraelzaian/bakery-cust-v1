
"use client";

import { useEffect, useMemo, useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "./ProductCard";

export default function Menu({
  categoryValue,
  sortValue,
  searchValue,
}) {
  const { products = [], isLoading, isError } = useProducts();

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

  // -----------------------------
  // Get product starting price
  // -----------------------------
  const getProductPrice = (product) => {
    // Product has a direct price
    if (product.price != null) {
      return Number(product.price);
    }

    // Product has sizes
    if (product.sizes?.length) {
      const prices = product.sizes
        .map((size) => Number(size.price))
        .filter((price) => !Number.isNaN(price));

      if (prices.length > 0) {
        return Math.min(...prices);
      }
    }

    // No price
    return 0;
  };

  // -----------------------------
  // Filter + Search + Sort
  // -----------------------------
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // -----------------------------
    // Category
    // -----------------------------
    if (
      categoryValue &&
      categoryValue.toLowerCase() !== "all"
    ) {
      result = result.filter((product) => {
        const categoryName =
          product.categoryId?.name?.toLowerCase() || "";

        return categoryName === categoryValue.toLowerCase();
      });
    }

    // -----------------------------
    // Search
    // -----------------------------
    const search = debouncedSearch.trim().toLowerCase();

    if (search) {
      result = result.filter((product) => {
        const name = product.name?.toLowerCase() || "";

        const description =
          product.description?.toLowerCase() || "";

        const category =
          product.categoryId?.name?.toLowerCase() || "";

        return (
          name.includes(search) ||
          description.includes(search) ||
          category.includes(search)
        );
      });
    }

    // -----------------------------
    // Sort
    // -----------------------------
    switch (sortValue) {
      case "price-low":
      case "price-asc":
        result.sort(
          (a, b) =>
            getProductPrice(a) - getProductPrice(b)
        );
        break;

      case "price-high":
      case "price-desc":
        result.sort(
          (a, b) =>
            getProductPrice(b) - getProductPrice(a)
        );
        break;

      case "name-asc":
      case "a-z":
        result.sort((a, b) =>
          (a.name || "").localeCompare(b.name || "")
        );
        break;

      case "name-desc":
      case "z-a":
        result.sort((a, b) =>
          (b.name || "").localeCompare(a.name || "")
        );
        break;

      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
        );
        break;

      case "oldest":
        result.sort(
          (a, b) =>
            new Date(a.createdAt || 0).getTime() -
            new Date(b.createdAt || 0).getTime()
        );
        break;

      default:
        break;
    }

    return result;
  }, [
    products,
    categoryValue,
    debouncedSearch,
    sortValue,
  ]);

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
      {filteredProducts.length === 0 ? (
        <div className="py-10 text-center text-gray-500">
          No products found.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      )}
    </section>
  );
}
