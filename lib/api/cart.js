import { apiClient } from "./client";



export async function addProductToCart({productId,size,quantity}){

    const data=await apiClient("/cart",{
        method:"POST",
        body:JSON.stringify({productId,size,quantity})
    })
    return data;
}