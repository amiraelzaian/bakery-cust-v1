
import { apiClient } from "../api/client";

export async function getProducts(){

    const data=await apiClient(
        "/products"
    )
    return data;
}