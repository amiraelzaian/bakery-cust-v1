"use client";


import {
  addProductToCart,
  getCart,
  UpdateCartItemQuantity,
  deleteCartItem,
  clearCart,
  applyCouponOnCart,
} from "@/lib/api/cart";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useAddToCart() {
  const mutation = useMutation({
    mutationFn: ({ productId, size, quantity }) =>
      addProductToCart({productId, size, quantity}),
    onSuccess: () => {
      toast.success("Added to cart");
    },
    onError: (error) => {
      toast.error(error?.message || "Couldn't add to cart");
    },
  });

  return { addToCart: mutation.mutate, ...mutation };
}



export function useGetCart() {
  const query = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  return { cart: query.data?.data, ...query };
}


export function useUpdateCartItemQuantity() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ itemId, quantity }) => UpdateCartItemQuantity(itemId, quantity),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
    onError: (error) => toast.error(error?.message || "Couldn't update quantity"),
  });

  return { updateQuantity: mutation.mutate, isPending: mutation.isPending };
}

export function useDeleteCartItem() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (itemId) => deleteCartItem(itemId),
    onSuccess: () => {
      toast.success("Item removed");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => toast.error(error?.message || "Couldn't remove item"),
  });

  return { removeItem: mutation.mutate, isPending: mutation.isPending };
}

export function useClearCart() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: clearCart,
    onSuccess: () => {
      toast.success("Cart cleared");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => toast.error(error?.message || "Couldn't clear cart"),
  });

  return { clearCart: mutation.mutate, isPending: mutation.isPending };
}

export function useApplyCoupon() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (coupon) => applyCouponOnCart(coupon),
    onSuccess: () => {
      toast.success("Coupon applied");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => toast.error(error?.message || "Invalid coupon"),
  });

  return { applyCoupon: mutation.mutate, isPending: mutation.isPending };
}