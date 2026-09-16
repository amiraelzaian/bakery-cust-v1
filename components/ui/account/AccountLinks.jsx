import Link from "next/link"
import { ChevronRight } from "lucide-react"

const LINKS = [
  { href: "/orders", label: "Order History" },
  { href: "/wishlist", label: "My Wishlist" },
]

export default function AccountLinks() {
  return (
    <div className="mt-6 divide-y divide-border rounded-xl border border-border bg-card">
      {LINKS.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className="flex items-center justify-between px-5 py-4 text-sm font-medium text-card-foreground transition hover:bg-muted"
        >
          {label}
          <ChevronRight size={16} className="text-muted-foreground" />
        </Link>
      ))}
    </div>
  )
}