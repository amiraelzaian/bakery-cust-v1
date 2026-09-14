'use client'

import { Star } from "lucide-react"

export default function StarRating({ value, onChange, readOnly = false, size = 20 }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => onChange?.(star)}
          className={readOnly ? "cursor-default" : "cursor-pointer"}
        >
          <Star
            size={size}
            className={star <= value ? "fill-secondary text-secondary" : "fill-none text-muted-foreground"}
          />
        </button>
      ))}
    </div>
  )
}