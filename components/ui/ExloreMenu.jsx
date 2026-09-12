"use client";

import { useState } from "react";
import CategoryFilter from "./CategoryFilter";
import SortFilter from "./SortFilter";
import SearchInput from "./SearchInput";
import Menu from "./Menu";

export default function ExploreMenu() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sort, setSort] = useState("bestSeller");

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