const STEP_LABELS = {
  pending: "Order Placed",
  accepted: "Accepted",
  preparing: "Preparing",
  ready: "Ready",
  out_for_delivery: "Out for Delivery",
  picked_up: "Picked Up",
  delivered: "Delivered",
  cancelled: "Cancelled",
}

export default function OrderStatusTimeline({ statusHistory }) {
  return (
    <ol className="flex flex-col gap-3 border-l border-border pl-4">
      {statusHistory.map((step, i) => (
        <li key={step._id || i} className="relative flex flex-col gap-1">
          <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-green-700" />
          <p className="text-sm font-medium text-card-foreground">
            {STEP_LABELS[step.status] || step.status}
          </p>
          <p className="text-xs text-muted-foreground">
            {new Date(step.changedAt).toLocaleString("en-EG", {
              day: "numeric",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </li>
      ))}
    </ol>
  )
}