import { createOrder } from "@/lib/api/order";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateOrder() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ deliveryMethod, paymentMethod, deliveryAddress }) =>
      createOrder(deliveryMethod, paymentMethod, deliveryAddress),
    onSuccess: () => {
      toast.success("Order created successfully, check orders page");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      toast.error(error?.message || "Could not create order, try later");
    },
  });

  return {
    createOrder: mutation.mutate,
    ...mutation,
  };
}