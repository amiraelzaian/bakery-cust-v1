"use client";

import { useCategories } from "@/hooks/useCategories";

export default function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}) {
  const { categories, isLoading, isError } = useCategories();

  if (isLoading) {
    return (
      <div className="flex gap-3 overflow-x-auto pb-2">
        <div className="h-10 w-20 shrink-0 animate-pulse rounded-full bg-muted" />
        <div className="h-10 w-24 shrink-0 animate-pulse rounded-full bg-muted" />
        <div className="h-10 w-24 shrink-0 animate-pulse rounded-full bg-muted" />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-sm text-red-500">
        Failed to load categories.
      </p>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* All */}
        <button
          type="button"
          onClick={() => onCategoryChange("all")}
          className={`shrink-0 rounded-full px-6 py-3 text-sm font-semibold transition ${
            selectedCategory === "all"
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-primary/10"
          }`}
        >
          All
        </button>

        {/* API Categories */}
        {categories.map((category) => (
          <button
            key={category.name}
            type="button"
            onClick={() => onCategoryChange(category.name)}
            className={`shrink-0 rounded-full px-6 py-3 text-sm font-semibold transition ${
              selectedCategory === category.name
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-primary/10"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}