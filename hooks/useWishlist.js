"use client";

import {
  addProductToWishlist,
  getWishlist,
  removeWishlistItem,
  addWishlistItemToCart,
} from "@/lib/api/wishlist";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useGetWishlist() {
  const query = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
    retry: (failureCount, error) => {
      if (error?.response?.status === 404) return false;
      return failureCount < 3;
    },
  });

  if (query.error?.response?.status === 404 || query.data === undefined) {
    return {
      wishlist: [],
      ...query,
      error: null,
      isError: false,
      isPending: false,
    };
  }

  return { wishlist: query.data?.data ?? [], ...query };
}

export function useAddToWishlist() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ productId }) => addProductToWishlist(productId),
    onSuccess: () => {
      toast.success("Product added to wishlist");
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
    onError: () => {
      toast.error("Could not add product to wishlist, Try later!");
    },
  });

  return {
    addToWishlist: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}

export function useRemoveWishlistItem() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (itemId) => removeWishlistItem(itemId),
    onSuccess: () => {
      toast.success("Item removed from wishlist");
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
    onError: (error) => {
      toast.error(error?.message || "Couldn't remove item");
    },
  });

  return {
    removeItem: mutation.mutate,
    isPending: mutation.isPending,
  };
}

export function useAddWishlistItemToCart() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ productId, size }) => addWishlistItemToCart(productId, size),
    onSuccess: () => {
      toast.success("Moved to cart");
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      toast.error(error?.message || "Couldn't move item to cart");
    },
  });

  return {
    moveToCart: mutation.mutate,
    isPending: mutation.isPending,
  };
}