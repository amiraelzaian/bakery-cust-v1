
import { deleteReview } from "@/lib/api/review"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export function useDeleteReview() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: deleteReview,

    onSuccess: (_data, variables) => {
      toast.success("Review deleted successfully")

      queryClient.invalidateQueries({
        queryKey: ["productReviews", variables.productId],
      })
    },

    onError: (error) => {
      toast.error(
        error?.message || "Could not delete review"
      )
    },
  })

  return {
    deleteReview: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  }
}

