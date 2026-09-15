const STATUS_CONFIG = {
  pending: { label: "Pending", className: "bg-muted text-muted-foreground" },
  accepted: { label: "Accepted", className: "bg-secondary/20 text-secondary-foreground" },
  preparing: { label: "Preparing", className: "bg-secondary/20 text-secondary-foreground" },
  ready: { label: "Ready", className: "bg-accent/20 text-accent-foreground" },
  out_for_delivery: { label: "Out for Delivery", className: "bg-accent/20 text-accent-foreground" },
  picked_up: { label: "Picked Up", className: "bg-primary/15 text-primary" },
  delivered: { label: "Delivered", className: "bg-primary/15 text-primary" },
  cancelled: { label: "Cancelled", className: "bg-border text-muted-foreground line-through" },
}

export default function OrderStatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || { label: status, className: "bg-muted text-muted-foreground" }

  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  )
}