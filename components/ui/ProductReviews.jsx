'use client'

import { useReviews } from "@/hooks/useReviews"
import { useAuth } from "@/hooks/useAuth"
import CreateReview from "./CreateReview"
import ReviewsContainer from "./ReviewsContainer"

export default function ProductReviews({ productId }) {
  const { data: user } = useAuth()
  const { reviews, pageInfo, isPending, error, page, setPage } = useReviews(productId)

  const myReview = reviews?.find((r) => r.user?._id === user?._id)

  return (
    <section className="flex flex-col gap-4  px-12">
      {/* Only show the create form if the logged-in user has no review yet */}
      {user && !myReview && <CreateReview productId={productId} />}

      <ReviewsContainer
        productId={productId}
        reviews={reviews}
        pageInfo={pageInfo}
        isPending={isPending}
        error={error}
        currentUserId={user?._id}
      />
    </section>
  )
}