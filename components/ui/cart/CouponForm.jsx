'use client'

import { useState } from "react"
import { useApplyCoupon } from "@/hooks/useCart"

export default function CouponForm() {
  const [code, setCode] = useState("")
  const { applyCoupon, isPending } = useApplyCoupon()

  function handleSubmit(e) {
    e.preventDefault()
    if (!code.trim()) return
    applyCoupon(code.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="py-3 px-2 flex gap-2">
      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Coupon code"
        className="flex-1 rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
      />
      <button
        type="submit"
        disabled={isPending || !code.trim()}
        className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background disabled:opacity-50"
      >
        {isPending ? "Applying..." : "Apply"}
      </button>
    </form>
  )
}