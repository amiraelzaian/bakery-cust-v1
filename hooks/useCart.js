"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { addProductToCart } from "@/lib/api/cart";

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