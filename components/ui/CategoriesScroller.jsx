"use client";

import { useRef } from "react";
import { useCategories } from "@/hooks/useCategories";
import { ArrowLeft, ArrowRight } from "lucide-react";
import CategoryCard from "./CategoryCard";

export default function CategoriesScroller() {
  const { categories, isLoading, isError } = useCategories();

  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -340,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 340,
      behavior: "smooth",
    });
  };

  if (isLoading) {
    return (
      <div className="py-10 text-center text-primary">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-10 text-center text-red-500">
        Failed to load categories.
      </div>
    );
  }

  return (
    <section className="w-full min-w-0">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-xl font-bold">
          Our Categories
        </h2>

        {/* Arrows */}
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={scrollLeft}
            aria-label="Scroll categories left"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition hover:bg-primary hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={scrollRight}
            aria-label="Scroll categories right"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition hover:bg-primary hover:text-white"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroller */}
      <div
        ref={scrollRef}
        className="flex w-full min-w-0 gap-5 overflow-x-auto overflow-y-hidden scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {categories.map((category) => (
          <div
            key={category.id ?? category.name}
            className="w-[280px] min-w-[280px] shrink-0 sm:w-[320px] sm:min-w-[320px]"
          >
            <CategoryCard
              image={category.image}
              title={category.name}
              description={category.description}
            />
          </div>
        ))}
      </div>
    </section>
  );
}