import { apiClient } from "./client";



export async function addProductToCart({productId,size,quantity}){

    const data=await apiClient("/cart",{
        method:"POST",
        body:JSON.stringify({productId,size,quantity})
    })
    return data;
}

export async function getCart(){
    const data=await apiClient('/cart');
    return data;
}
export async function UpdateCartItemQuantity(itemId,quantity){
    const data=await apiClient(`/cart/${itemId}`,{
        method:"PATCH",
        body:JSON.stringify({quantity})
    })
    return data;
}
export async function deleteCartItem(itemId){
    const data=await apiClient(`/cart/${itemId}`,{
        method:"DELETE",
    })
    return data;
}
export async function clearCart(){
    const data=await apiClient('/cart',{
        method:"DELETE",
    })
    return data;
}
export async function applyCouponOnCart(coupon){
    const data=await apiClient(`/cart/applyCoupon/`,{
        method:"POST",
        body:JSON.stringify({coupon})
    })
    return data;
}