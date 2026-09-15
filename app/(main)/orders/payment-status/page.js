'use client'

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle, XCircle } from "lucide-react"

export default function PaymentStatusPage() {
  const searchParams = useSearchParams()
  const paymentStatus = searchParams.get("paymentStatus")
  const isSuccess = paymentStatus === "SUCCESS"

  return (
    <section className="mx-auto max-w-md py-20 px-4 text-center space-y-4">
      {isSuccess ? (
        <>
          <CheckCircle className="mx-auto text-primary" size={48} />
          <h1 className="text-2xl font-bold text-foreground">Payment Successful</h1>
          <p className="text-muted-foreground">Your order has been placed. Check your orders page for details.</p>
        </>
      ) : (
        <>
          <XCircle className="mx-auto text-destructive" size={48} />
          <h1 className="text-2xl font-bold text-foreground">Payment Failed</h1>
          <p className="text-muted-foreground">Something went wrong with your payment. Please try again.</p>
        </>
      )}

      <Link
        href="/orders"
        className="inline-block mt-4 rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground"
      >
        Go to My Orders
      </Link>
    </section>
  )
}