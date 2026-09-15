import { apiClient } from "./client";


export async function createOrder(deliveryMethod,paymentMethod,deliveryAddress={}){

    const data=await apiClient(`/orders`,{
        method:"POST",
        body:JSON.stringify({deliveryMethod,paymentMethod,deliveryAddress})
    })
    return data;
}


export async function getMyOrders(){

    const data=await apiClient('/orders/my-orders');
    return data;

}

export async function getSpecificOrder(orderId){
    const data=await apiClient(`/orders/${orderId}`);

    return data;

}

export async function cancellOrder(orderId){
    const data=await apiClient(`/orders/${orderId}/cancel`,{
        method:"PATCH"
    })
    return data;

}