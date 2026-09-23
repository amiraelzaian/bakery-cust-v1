'use client'

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle, XCircle } from "lucide-react"

function PaymentStatus() {
  const searchParams = useSearchParams()
  const paymentStatus = searchParams.get("paymentStatus")
  const isSuccess = paymentStatus === "SUCCESS"

  return (
    <section style={{"margin":"100px auto"}} className="mx-auto flex max-w-md flex-col items-center justify-center gap-4 px-4 py-20 text-center">
      {isSuccess ? (
        <>
          <CheckCircle className="text-primary" size={48} />
          <h1 className="text-2xl font-bold text-foreground">Payment Successful</h1>
          <p className="text-muted-foreground">
            Your order has been placed. Check your orders page for details.
          </p>
        </>
      ) : (
        <>
          <XCircle className="text-destructive" size={48} />
          <h1 className="text-2xl font-bold text-foreground">Payment Failed</h1>
          <p className="text-muted-foreground">
            Something went wrong with your payment. Please try again.
          </p>
        </>
      )}

      <Link
        href="/orders"
        className="mt-4 inline-block rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground"
      >
        Go to My Orders
      </Link>
    </section>
  )
}

export default function PaymentStatusPage() {
  return (
    <Suspense fallback={null}>
      <PaymentStatus />
    </Suspense>
  )
}