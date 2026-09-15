'use client'

import { Minus, Plus } from "lucide-react"

export default function QuantityStepper({ quantity, onIncrease, onDecrease, disabled }) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onDecrease}
        disabled={disabled || quantity <= 1}
        className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-foreground disabled:opacity-40"
      >
        <Minus size={14} />
      </button>
      <span className="w-4 text-center text-sm text-foreground">{quantity}</span>
      <button
        type="button"
        onClick={onIncrease}
        disabled={disabled}
        className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-foreground disabled:opacity-40"
      >
        <Plus size={14} />
      </button>
    </div>
  )
}