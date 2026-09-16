import { apiClient } from "./client";

export async function addProductToWishlist(productId) {
  const data = await apiClient(`/wishlist`, {
    method: "POST",
    body: JSON.stringify({ productId }),
  });
  return data;
}

export async function getWishlist() {
  const data = await apiClient("/wishlist");
  return data;
}

export async function removeWishlistItem(itemId) {
  const data = await apiClient(`/wishlist/${itemId}`, {
    method: "DELETE",
  });
  return data;
}

export async function addWishlistItemToCart(productId, size) {
  const data = await apiClient(`/wishlist/${productId}/move-to-cart`, {
    method: "POST",
    body: JSON.stringify({ size }),
  });
  return data;
}