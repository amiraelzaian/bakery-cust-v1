'use client'

import { useState } from "react"
import { useCreateReview } from "@/hooks/useCreateReview"
import StarRating from "./StarRating"

export default function CreateReview({ productId }) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const { createReview, isPending } = useCreateReview()

  function handleSubmit(e) {
    e.preventDefault()
    if (!rating) return

    createReview(
      { productId, comment, rating },
      { onSuccess: () => { setRating(0); setComment("") } }
    )
  }

  return (
    <section className="bg-card border border-border rounded-lg p-4 space-y-3">
      <h3 className="font-medium text-foreground">Write a review</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <StarRating value={rating} onChange={setRating} />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts about this product..."
          rows={3}
          className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        />
        <button
          type="submit"
          disabled={isPending || !rating}
          className="rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium disabled:opacity-50"
        >
          {isPending ? "Submitting..." : "Submit review"}
        </button>
      </form>
    </section>
  )
}