'use client'

import { useState } from "react"
import Image from "next/image"
import { Heart, Star, ShoppingCart, Loader2, ArrowRight } from "lucide-react"
import { useRemoveWishlistItem, useAddWishlistItemToCart } from "@/hooks/useWishlist"
import Link from "next/link"

export default function WishlistItemCard({ item }) {
  const product = item.product ?? item
  console.log(product)
  const sizes = product.sizes ?? []
  const [selectedSize, setSelectedSize] = useState(sizes[0]?.name ?? null)

  const { removeItem, isPending: isRemoving } = useRemoveWishlistItem()
  const { moveToCart, isPending: isMoving } = useAddWishlistItemToCart()

  const activePrice =
    sizes.find((s) => s.name === selectedSize)?.price ?? product.price

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition hover:shadow-md">
      <button
        type="button"
        onClick={() => removeItem(item?.product?._id)}
        disabled={isRemoving}
        aria-label="Remove from wishlist"
        className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-card/90 shadow backdrop-blur transition hover:scale-105 disabled:opacity-50"
      >
        {isRemoving ? (
          <Loader2 size={16} className="animate-spin text-muted-foreground" />
        ) : (
          <Heart size={16} className="fill-red-600 text-red-600" />
        )}
      </button>

      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <Image
            src="/images/bread2.jpg"
            alt={product.name}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col p-4 gap-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-card-foreground">{product.name}</h3>
          <span className="whitespace-nowrap text-sm font-semibold text-card-foreground">
            {activePrice != null ? `${activePrice} EGP` : "Price unavailable"}
          </span>
        </div>

        {product.rating != null && (
          <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <Star size={12} className="fill-amber-500 text-amber-500" />
            <span>{product.rating}</span>
          </div>
        )}

        {product.description && (
          <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">
            {product.description.slice(0,100)}
          </p>
        )}
        <Link href={`/explore/${product?._id}`}
            className="text-xs text-muted-foreground flex justify-start items-center"
        >
            Show details <ArrowRight height={15}/>
        </Link>
        {sizes.length > 0 && (
          <div className="mt-3">
            <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              Select size
            </p>
            <div className="flex gap-2">
              {sizes.map((s) => (
                <button
                  key={s.name}
                  type="button"
                  onClick={() => setSelectedSize(s.name)}
                  className={`flex-1 rounded-md border px-2 py-1.5 text-xs capitalize transition ${
                    selectedSize === s.name
                      ? "border-foreground bg-secondary text-card-foreground"
                      : "border-border text-card-foreground hover:bg-muted"
                  }`}
                >
                  <span className="block font-medium">{s.name}</span>
                  <span className="block opacity-80">{s.price} EGP</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          type="button"
          disabled={isMoving}
          onClick={() =>
            moveToCart({ productId: product._id, size: selectedSize })
          }
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-secondary py-2.5 text-sm font-medium text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
        >
          {isMoving ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <ShoppingCart size={16} />
          )}
          {isMoving ? "Moving..." : "Move to Cart"}
        </button>
      </div>
    </div>
  )
}