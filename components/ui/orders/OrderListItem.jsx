import Link from "next/link"
import OrderStatusBadge from "./OrderStatusBadge"

export default function OrderListItem({ order }) {
    
  const itemCount = order.cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const firstItemName = order.cartItems[0]?.name
  const extraCount = order.cartItems.length - 1

  const date = new Date(order.createdAt).toLocaleDateString("en-EG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })

  return (
    <Link
      href={`/orders/${order._id}`}
      className="block rounded-md border border-border bg-card p-4 transition hover:border-primary w-full  "
    >
      <div className="flex items-start justify-between">
        <div className="flex  flex-col items-start gap-2">
          <p className="text-xs text-muted-foreground">{date}</p>
          <p className="font-medium text-card-foreground">
            {firstItemName}
            {extraCount > 0 && ` + ${extraCount} more`}
          </p>
          <p className="text-xs text-muted-foreground">
            {itemCount} {itemCount === 1 ? "item" : "items"} · {order.deliveryMethod}
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <OrderStatusBadge status={order.status} />
          <p className="font-semibold text-card-foreground">{order.totalOrderPrice} EGP</p>
        </div>
      </div>
      <p className="text-muted-foreground text-xs pt-2">Open to show order details </p>
    </Link>
  )
}