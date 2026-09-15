'use client'

import { useState } from "react"
import CouponForm from "./CouponForm"
import AddressForm from "./AddressForm"
import { useCreateOrder } from "@/hooks/useOrder"

const EMPTY_ADDRESS = { governorate: "", city: "", street: "", zipCode: "" }

export default function OrderSummary({ cart }) {
  const [deliveryMethod, setDeliveryMethod] = useState("delivery")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [deliveryAddress, setDeliveryAddress] = useState(EMPTY_ADDRESS)

  const {createOrder,isPending:isCreating,isError,error}=useCreateOrder()

  const subtotal = cart?.totalCartPrice ?? 0
  const shipping = deliveryMethod==='delivery'?30:0
  const discount = cart?.discount ?? 0
  const total = cart?.totalPriceAfterDiscount ?? subtotal + shipping - discount

  const isAddressComplete =
    deliveryMethod !== "delivery" ||
    Object.values(deliveryAddress).every((v) => v.trim() !== "")

//   function handleCheckout() {
//     const payload = {
//       deliveryMethod,
//       paymentMethod,
//       ...(deliveryMethod === "delivery" && { deliveryAddress }),
//     }
//     onCheckout?.(payload)
//   }

  return (
    <aside className="h-fit space-y-5 rounded-md border border-border bg-card p-6">
      <h2 className="text-lg font-semibold text-card-foreground">Order Summary</h2>

      <div className="flex gap-2 py-2">
        <button
          type="button"
          onClick={() => setDeliveryMethod("delivery")}
          className={`flex-1 rounded-md p-2 text-sm font-medium ${
            deliveryMethod === "delivery"
              ? "bg-secondary text-secondary-foreground"
              : "bg-muted text-muted-foreground"
          }`}
        >
          Delivery
        </button>
        <button
          type="button"
          onClick={() => setDeliveryMethod("pickup")}
          className={`flex-1 rounded-md p-2 text-sm font-medium ${
            deliveryMethod === "pickup"
              ? "bg-secondary text-secondary-foreground"
              : "bg-muted text-muted-foreground"
          }`}
        >
          Pick Up
        </button>
      </div>

      {deliveryMethod === "delivery" && (
        <AddressForm address={deliveryAddress} onChange={setDeliveryAddress} />
      )}

      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Payment Method</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        >
          <option value="card">Card</option>
          <option value="cash">Cash on Delivery</option>
        </select>
      </div>

      <dl className="flex flex-col gap-3 text-sm">
        <div className="flex justify-between pt-4 pb-1 ">
          <dt className="text-muted-foreground">Items Subtotal</dt>
          <dd className="text-card-foreground">{subtotal} EGP</dd>
        </div>
        <div className="flex justify-between ">
          <dt className="text-muted-foreground">Delivery</dt>
          <dd className="text-card-foreground">{shipping ? `${shipping} EGP` : "Complimentary"}</dd>
        </div>
        {discount > 0 && (
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Promo Discount</dt>
            <dd className="text-primary">-{discount} EGP</dd>
          </div>
        )}
      </dl>

      <div className="flex items-baseline justify-between border-t border-border pt-4">
        <span className="text-sm text-muted-foreground">Estimated Total</span>
        <span className="text-2xl font-bold text-card-foreground">{total} EGP</span>
      </div>

      <CouponForm />

      <button
        type="button"
         onClick={()=>createOrder({deliveryMethod,paymentMethod,deliveryAddress})}
        disabled={!isAddressComplete || isCreating}
        className="w-full rounded-md bg-primary py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50"
      >
       
        {isCreating ? "Placing order..." : "Proceed to Checkout"}
      </button>
      {isError && (
        <p className="text-sm text-center text-destructive">
          {error?.message}
        </p>
      )}  
        </aside>
  )
}