"use client";

import { Search } from "lucide-react";

export default function SearchInput({ value, onChange, placeholder = "Search products..." }) {
  return (
    <div className="relative w-full md:max-w-3/4">
      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-12 w-full rounded-xl border border-border bg-background pl-12 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
} 