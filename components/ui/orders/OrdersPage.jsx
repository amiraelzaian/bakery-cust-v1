'use client'

import { useGetAllMyOrders } from "@/hooks/useOrder"
import OrderListItem from "./OrderListItem"

export default function OrdersPage() {
  const { orders, isPending, error } = useGetAllMyOrders()
  

  if (isPending) {
    return <p className="p-8 text-center text-muted-foreground">Loading your orders...</p>
  }

  if (error) {
    return (
      <div className="mx-auto max-w-md py-16 text-center ">
        <p className="text-lg font-medium text-foreground">No orders yet</p>
        <p className="text-sm text-muted-foreground">
          {error.message || "Start ordering to see your history here."}
        </p>
      </div>
    )
  }

  return (
    <section className="mx-auto  px-4 py-8 space-y-4 pt-22">
      <h1 className="text-lg  md:text-xl font-bold text-foreground">My Orders</h1>

      <div className="flex flex-col gap-3 py-5">
        {orders.map((order) => (
          <OrderListItem key={order._id} order={order} />
        ))}
      </div>
    </section>
  )
}