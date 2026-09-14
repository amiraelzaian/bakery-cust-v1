import { apiClient } from "./client";

export async function getReviews(productId, page = 1, limit = 10) {
  const data = await apiClient(`/products/${productId}/reviews?page=${page}&limit=${limit}`);
  return data;
}

export async function createReview({ productId, comment, rating }) {
  const data = await apiClient(`/products/${productId}/reviews`, {
    method: "POST",
    body: JSON.stringify({ comment, rating }),
  });
  return data;
}

export async function updateReview({
  reviewId,
  comment,
  rating,
}) {
  return apiClient(`/reviews/${reviewId}`, {
    method: "PATCH",
    body: JSON.stringify({
      comment,
      rating,
    }),
  });
}

export async function deleteReview({ reviewId }) {
  return apiClient(`/reviews/${reviewId}`, {
    method: "DELETE",
    body: JSON.stringify({
      id: reviewId,
    }),
  })
}