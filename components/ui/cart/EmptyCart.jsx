import Link from "next/link"

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-md border border-border bg-card py-20 text-center">
      <p className="text-lg font-medium text-card-foreground">Your basket is empty</p>
      <p className="text-sm text-muted-foreground">Browse our menu and add something delicious.</p>
      <Link href="/explore" className="mt-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
        Continue Shopping
      </Link>
    </div>
  )
}