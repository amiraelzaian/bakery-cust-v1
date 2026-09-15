'use client'

import { useParams } from "next/navigation"
import { useGetOrder } from "@/hooks/useOrder"
import OrderStatusBadge from "./OrderStatusBadge"
import OrderStatusTimeline from "./OrderStatusTimeLine"
import CancelOrderButton from "./CancelOrderButton"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"


export default function OrderDetailPage() {
  const { id } = useParams()
  const { order, isPending, error } = useGetOrder(id)

  if (isPending) {
    return <p className=" px-8 text-center text-muted-foreground">Loading order...</p>
  }

  if (error || !order) {
    return <p className="p-8 text-center text-destructive">Could not load this order.</p>
  }

const canCancel = ["pending", "accepted"].includes(order.status)

  return (
    <section className="mx-auto  px-4 pt-22 pb-6 flex flex-col gap-2 ">
      <div className="flex items-end gap-4  justify-start ">
        <div className="flex flex-col gap-4">
            <Link href="/orders" className="flex gap-1 cursor-pointer"><ArrowLeft width={20} height={30}/> Back to orders</Link>
          <p className="text-xs text-muted-foreground ">Order # {order._id.slice(-9).toUpperCase()}</p>
          <h1 className="text-xl font-bold text-foreground">
            {new Date(order.createdAt).toLocaleDateString("en-EG", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </h1>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      {/* Items */}
      <div className="rounded-md border border-border bg-card p-4 flex flex-col gap-2">
        <h2 className="text-sm font-semibold text-card-foreground">Items</h2>
        {order.cartItems.map((item) => (
          <div key={item._id} className="flex items-center justify-between text-sm">
            <div className="flex flex-col gap-2">
              <p className="text-card-foreground">{item.name}</p>
              <p className="text-xs text-muted-foreground">
                {item.size && `${item.size} · `}Qty {item.quantity}
              </p>
            </div>
            <p className="text-card-foreground">{item.price * item.quantity} EGP</p>
          </div>
        ))}
      </div>

      {/* Delivery */}
      <div className="rounded-md border border-border bg-card p-4 space-y-2">
        <h2 className="text-sm font-semibold text-card-foreground">
          {order.deliveryMethod === "delivery" ? "Delivery Address" : "Pickup"}
        </h2>
        {order.deliveryMethod === "delivery" && order.deliveryAddress ? (
          <p className="text-sm text-muted-foreground pt-2">
            {order.deliveryAddress.street}, {order.deliveryAddress.city}, {order.deliveryAddress.governorate}{" "}
            {order.deliveryAddress.zipCode}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground pt-2">Pick up in store</p>
        )}
      </div>

      {/* Receipt */}
      <div className="rounded-md border border-border bg-card p-4 flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-card-foreground">Receipt</h2>
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Items Subtotal</span>
            <span className="text-card-foreground">{order.itemsPrice} EGP</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Delivery</span>
            <span className="text-card-foreground">
              {order.shippingPrice ? `${order.shippingPrice} EGP` : "Complimentary"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax</span>
            <span className="text-card-foreground">{order.taxPrice} EGP</span>
          </div>
          <div className="flex justify-between border-t border-border pt-2 font-semibold">
            <span className="text-card-foreground">Total Paid</span>
            <span className="text-card-foreground">{order.totalOrderPrice} EGP</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          {order.paymentMethod === "card" ? "Paid by card" : "Cash on delivery"} ·{" "}
          {order.paymentStatus === "paid" ? "Paid" : "Payment pending"}
        </p>
      </div>

      {/* Timeline */}
      <div className="rounded-md border border-border bg-card p-4 flex flex-col gap-3">
        <h2 className="mb-4 text-sm font-semibold text-card-foreground">Order Status</h2>
        <OrderStatusTimeline statusHistory={order.statusHistory} />
      </div>

      {/* Cancel — pending only */}
      {canCancel && (
        <div className="flex justify-end">
          <CancelOrderButton orderId={order._id} />
        </div>
      )}
    </section>
  )
}