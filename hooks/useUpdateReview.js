import { updateReview } from "@/lib/api/review";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateReview() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (variables) => updateReview(variables),

    onSuccess: (_data, variables) => {
      toast.success("Review updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["productReviews", variables.productId],
      });
    },

    onError: (error) => {
      toast.error(
        error?.message || "Could not update your review"
      );
    },
  });

  return {
    updateReview: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
}