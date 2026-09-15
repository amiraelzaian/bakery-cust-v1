'use client'

import { useState } from "react"
import { useCancelOrder } from "@/hooks/useOrder"

export default function CancelOrderButton({ orderId }) {
  const [confirming, setConfirming] = useState(false)
  const { cancelOrder, isPending } = useCancelOrder()

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <p className="text-sm text-muted-foreground">Cancel this order?</p>
        <button
          onClick={() => cancelOrder(orderId)}
          disabled={isPending}
          className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          {isPending ? "Cancelling..." : "Yes, cancel"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="rounded-md border border-border px-3 py-1.5 text-sm text-foreground"
        >
          Keep order
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:border-primary hover:text-primary"
    >
      Cancel Order
    </button>
  )
}