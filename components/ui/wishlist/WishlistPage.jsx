'use client'

import Link from "next/link"
import { useGetWishlist } from "@/hooks/useWishlist"
import WishlistItemCard from "@/components/ui/wishlist/WishlistItemCard"
import EmptyWishlist from "@/components/ui/wishlist/EmptyWishlist"

export default function WishlistPage() {
  const { wishlist, isPending, error } = useGetWishlist()

  if (isPending) {
    return (
      <section className="pt-20 px-5 w-full">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-96 animate-pulse rounded-xl border border-border bg-muted"
            />
          ))}
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <p className="p-20 text-center text-destructive">
        Couldn not load your wishlist.
      </p>
    )
  }

  const items = wishlist ?? []
  


  return (
    <section className="pt-20 px-5 w-full pb-16">
      <div className="mb-8 flex flex-col gap-3">
        <h1 className="text-xl font-bold text-foreground">
          My Favorites{" "}
          {items.length > 0 && (
            <span className="text-base font-normal text-muted-foreground">
              ({items.length} {items.length === 1 ? "item" : "items"})
            </span>
          )}
        </h1>
        <p className="py-2 text-sm text-muted-foreground">
          Keep the treats you love close for slow mornings.
        </p>
      </div>

      {items.length === 0 ? (
        <EmptyWishlist />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <WishlistItemCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </section>
  )
}