
"use client"

import { useState } from "react"
import StarRating from "./StarRating"
import ConfirmModal from "@/components/ui/ConfirmModal"
import { useUpdateReview } from "@/hooks/useUpdateReview"
import { useDeleteReview } from "@/hooks/useDeleteReview"

const COLLAPSE_LENGTH = 160

export default function ReviewItem({ review, productId, isOwner }) {

  const [isEditing, setIsEditing] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const [rating, setRating] = useState(review.rating)
  const [comment, setComment] = useState(review.comment || "")

  const { updateReview, isPending: isUpdating } = useUpdateReview()

  const {
    deleteReview,
    isPending: isDeleting,
  } = useDeleteReview()

  const text = review.comment || ""

  const isLong = text.length > COLLAPSE_LENGTH

  const displayText =
    isExpanded || !isLong
      ? text
      : text.slice(0, COLLAPSE_LENGTH) + "..."

  function handleSave(e) {
    e.preventDefault()

    updateReview(
      {
        reviewId: review._id,
        productId,
        comment,
        rating,
      },
      {
        onSuccess: () => {
          setIsEditing(false)
        },
      }
    )
  }

  function handleDelete() {
    deleteReview(
      {
        reviewId: review._id,
        productId,
      },
      {
        onSuccess: () => {
          setShowDeleteModal(false)
        },
      }
    )
  }

  if (isEditing) {
    return (
      <li className="border-b border-border py-4">
        <form onSubmit={handleSave} className="flex flex-col gap-3 ">
          <StarRating
            value={rating}
            onChange={setRating}
          />

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isUpdating}
              className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isUpdating ? "Saving..." : "Save"}
            </button>

            <button
              type="button"
              onClick={() => setIsEditing(false)}
              disabled={isUpdating}
              className="rounded-md border border-border px-3 py-1.5 text-sm text-foreground transition hover:bg-muted disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </li>
    )
  }

  return (
    <div className="">
      
        <p className="text-secondary text-bold text-sm">Customer. {review?.user?.name}</p>
      <li className="space-y-2 border-b border-border py-4">
        {/* Rating + Actions */}
        <div className="flex items-center justify-between">
          <StarRating
            value={review.rating}
            readOnly
            size={16}
          />

          {isOwner && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="text-xs text-primary transition hover:underline"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="text-xs text-red-600 transition hover:underline dark:text-red-400"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        {/* Review text */}
        {text && (
          <p className="text-sm leading-6 text-foreground">
            {displayText}{" "}

            {isLong && (
              <button
                type="button"
                onClick={() => setIsExpanded((value) => !value)}
                className="text-xs text-muted-foreground hover:underline"
              >
                {isExpanded ? "Show less" : "Show more"}
              </button>
            )}
          </p>
        )}
      </li>

      {/* Delete confirmation */}
      <ConfirmModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete review?"
        description="Are you sure you want to delete this review? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isDeleting}
      />
    </div>
  )
}

