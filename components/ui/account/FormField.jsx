export function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  )
}

export function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-muted-foreground w-20">{label}</dt>
      <dd className="text-right font-medium text-card-foreground text-wrap">{value}</dd>
    </div>
  )
}