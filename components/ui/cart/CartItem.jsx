'use client'

import Image from "next/image"
import { Heart, Trash2 } from "lucide-react"
import QuantityStepper from "./QuantityStepper"
import { useUpdateCartItemQuantity, useDeleteCartItem } from "@/hooks/useCart"

export default function CartItem({ item }) {
  const { updateQuantity, isPending: isUpdating } = useUpdateCartItemQuantity()
  const { removeItem, isPending: isRemoving } = useDeleteCartItem()

// console.log(item)
  const { _id, productId:product, quantity, price } = item
  const unitPrice = price ?? product?.price
  const lineTotal = unitPrice * quantity

  return (
    <div className="flex gap-4 rounded-md border border-border bg-card p-4">
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-muted">
        {product?.imageUrl && (
          <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-medium text-card-foreground">{product?.name}</h3>
            {item?.size && (
              <p className="text-xs text-muted-foreground line-clamp-1">{item.size}</p>
            )}
          </div>
          <div className="text-right whitespace-nowrap">
            <p className="font-semibold text-card-foreground">{lineTotal} EGP</p>
            <p className="text-xs text-muted-foreground">{unitPrice} EGP each</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <QuantityStepper
            quantity={quantity}
            disabled={isUpdating}
            onDecrease={() => updateQuantity({ itemId: _id, quantity: quantity - 1 })}
            onIncrease={() => updateQuantity({ itemId: _id, quantity: quantity + 1 })}
          />

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <button type="button" className="flex items-center gap-1 hover:text-foreground">
                {/* wishlistpart */}
              <Heart size={14} /> Save for Later
            </button>
            <button
              type="button"
              disabled={isRemoving}
              onClick={() => removeItem(_id)}
              className="flex items-center gap-1 hover:text-primary disabled:opacity-40"
            >
              <Trash2 size={14} /> Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}