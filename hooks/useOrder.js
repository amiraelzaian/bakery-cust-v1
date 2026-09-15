import {
  createOrder,
  getMyOrders,
  getSpecificOrder,
  cancellOrder,
} from "@/lib/api/order";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useCreateOrder() {
  const queryClient = useQueryClient();
  const router = useRouter(); // from "next/navigation"

  const mutation = useMutation({
    mutationFn: ({ deliveryMethod, paymentMethod, deliveryAddress }) =>
      createOrder(deliveryMethod, paymentMethod, deliveryAddress),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });

      if (data?.paymentUrl) {
       console.log(data.paymentUrl)
        window.location.href = data.paymentUrl;
        return;
      }

      
      toast.success("Order created successfully, check orders page");
      router.push("/orders");
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
export function useGetAllMyOrders() {
  const query = useQuery({
    queryKey: ["orders"],
    queryFn: getMyOrders,
  });

  return {
    orders: query.data?.data,
    ...query,
  };
}

export function useGetOrder(orderId) {
  const query = useQuery({
    queryKey: ["orders", orderId],
    queryFn: () => getSpecificOrder(orderId),
    enabled: !!orderId, 
  });

  return {
    order: query.data?.data,
    ...query,
  };
}

export function useCancelOrder() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (orderId) => cancellOrder(orderId),
    onSuccess: () => {
      toast.success("Order cancelled");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      toast.error(error?.message || "Could not cancel order, try later");
    },
  });

  return {
    cancelOrder: mutation.mutate,
    ...mutation,
  };
}