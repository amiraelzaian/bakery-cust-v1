'use client';

import { getProducts } from "@/lib/api/products";
import { useQuery } from "@tanstack/react-query";



export function useProducts(){
    const query=useQuery({
        queryKey:["products"],
        queryFn:getProducts,
    })

    const products=Array.isArray(query.data)?query.data:Array.isArray(query.data?.data)?query.data.data:[]
  return {
    ...query,
    products
  }
}