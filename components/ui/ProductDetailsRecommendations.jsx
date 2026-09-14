
'use client'

import { useParams } from "next/navigation";
import ProductDetails from "./ProductDetails";
import SuggestedProducts from "./SuggestedProducts";
import { useProduct } from "@/hooks/useProduct";

export default function ProductDetailsRecommentdations(){
    const { productId } = useParams();
      const { product, isPending, error } = useProduct(productId);

      return <section className="">
        <ProductDetails product={product} isPending={isPending} error={error}/>
        <SuggestedProducts categoryId={product?.categoryId._id} productId={productId}/>
      </section>

}