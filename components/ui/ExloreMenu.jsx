"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CategoryFilter from "./CategoryFilter";
import SortFilter from "./SortFilter";
import SearchInput from "./SearchInput";
import Menu from "./Menu";

export default function ExploreMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sort, setSort] = useState("bestSeller");

  // URL -> state (handles back/forward nav + shared links)
  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    setSearch((current) => (current === urlSearch ? current : urlSearch));
  }, [searchParams]);

  // state -> URL (debounced so typing doesn't spam history/replace)
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (search) {
        params.set("search", search);
      } else {
        params.delete("search");
      }

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="flex flex-col gap-6">
      {/* Search */}
      <SearchInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Categories sort */}
      <div className="flex flex-col items-start gap-2 p-3">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <SortFilter
          sort={sort}
          onSortChange={setSort}
        />
      </div>

      {/* Products */}
      <Menu
        searchValue={search}
        sortValue={sort}
        categoryValue={selectedCategory}
      />
    </div>
  );
}