import { apiClient } from "./client";


export async function createOrder(deliveryMethod,paymentMethod,deliveryAddress={}){

    const data=await apiClient(`/orders`,{
        method:"POST",
        body:JSON.stringify({deliveryMethod,paymentMethod,deliveryAddress})
    })
    return data;
}