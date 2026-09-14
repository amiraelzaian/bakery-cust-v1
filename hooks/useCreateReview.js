import { createReview } from "@/lib/api/review";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateReview() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createReview, 
    onSuccess: (_data, variables) => {
      toast.success("Review added successfully");
      queryClient.invalidateQueries({ queryKey: ["productReviews", variables.productId] });
    },
    onError: (error) => {
      toast.error(error?.message || "Could not add your review");
    },
  });

  return {
    createReview: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
}