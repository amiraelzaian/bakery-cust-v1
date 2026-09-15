'use client'

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useGetCart } from "@/hooks/useCart"
import CartItemsList from "@/components/ui/cart/CartItemsList"
import OrderSummary from "@/components/ui/cart/OrderSummary"
import EmptyCart from "@/components/ui/cart/EmptyCart"

export default function CartPage() {
  const { cart, isPending, error } = useGetCart()
  // console.log(cart)

  if (isPending) {
    return <p className="p-20 text-center text-muted-foreground">Loading your basket...</p>
  }

  if (error) {
    return <p className="p-20 text-center text-destructive">Couldn not load your basket.</p>
  }

  const items = cart?.cartItems ?? [] 

  return (
    <section className="pt-20 px-5 w-full">
      <Link href="/explore" className="mb-4  py-2 flex  w-fit items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft size={16} /> Continue Shopping
      </Link>

      <h1 className="mb-6 text-xl font-bold text-foreground pb-3">
        Your Basket{" "}
        {items.length > 0 && (
          <span className="text-base font-normal text-muted-foreground">
            ({items.length} {items.length === 1 ? "item" : "items"})
          </span>
        )}
      </h1>

      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CartItemsList items={items}  />
          </div>
          <OrderSummary cart={cart} />
        </div>
      )}
    </section>
  )
}