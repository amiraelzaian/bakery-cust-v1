'use client'

import { useState } from "react"
import { useReviews } from "@/hooks/useReviews"
import { useAuth } from "@/hooks/useAuth"
import ReviewItem from "./ReviewItem"

export default function ReviewsContainer({ productId }) {
  const [page, setPage] = useState(1)
  const { reviews, pageInfo, isPending, error } = useReviews(productId, page)
  const { data: user } = useAuth()

  if (isPending) return <p className="text-sm text-muted-foreground">Loading reviews...</p>
  if (error) return <p className="text-sm text-destructive">Could not load reviews.</p>
  if (!reviews.length) return <p className="text-sm text-muted-foreground">No reviews yet. Be the first to review this product.</p>

  return (
    <section className="space-y-4">
      <ul>
        {reviews.map((review) => (
          <ReviewItem
            key={review._id}
            review={review}
            productId={productId}
            isOwner={user?._id === review.user?._id}
          />
        ))}
      </ul>

      {pageInfo?.NoOfPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-2">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="rounded-md border border-border px-3 py-1.5 text-sm disabled:opacity-40">
            Previous
          </button>
          <span className="text-sm text-muted-foreground">Page {pageInfo.currentPage} of {pageInfo.NoOfPages}</span>
          <button onClick={() => setPage((p) => Math.min(pageInfo.NoOfPages, p + 1))} disabled={page === pageInfo.NoOfPages} className="rounded-md border border-border px-3 py-1.5 text-sm disabled:opacity-40">
            Next
          </button>
        </div>
      )}
    </section>
  )
}