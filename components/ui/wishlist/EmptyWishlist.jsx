import Link from "next/link"
import { Heart } from "lucide-react"

export default function EmptyWishlist() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border px-6 py-20 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
        <Heart size={24} className="text-muted-foreground" />
      </div>
      <h2 className="text-base font-semibold text-foreground">
        Nothing sweet here yet.
      </h2>
      <p className="mt-1 max-w-xs text-sm text-muted-foreground">
        Save the bakes you love and find them here whenever you are ready to order.
      </p>
      <Link
        href="/explore"
        className="mt-6 rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
      >
        Explore the bakery
      </Link>
    </div>
  )
}