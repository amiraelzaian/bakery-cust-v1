"use client";

export default function SortFilter({
  sort,
  onSortChange,
}) {
  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="sort"
        className="text-sm font-medium text-muted-foreground"
      >
        Sort:
      </label>

      <select
        id="sort"
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
        className="cursor-pointer rounded-full border border-border bg-muted px-4 py-2 text-sm font-semibold outline-none transition focus:border-primary"
      >
        <option value="bestSeller">Bestsellers</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="stock">Stock</option>
      </select>
    </div>
  );
}