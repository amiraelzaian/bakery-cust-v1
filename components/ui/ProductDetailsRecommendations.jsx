
'use client'

import { useParams } from "next/navigation";
import ProductDetails from "./ProductDetails";
import SuggestedProducts from "./SuggestedProducts";
import { useProduct } from "@/hooks/useProduct";
import ProductReviews from "./ProductReviews";

export default function ProductDetailsRecommentdations(){
    const { productId } = useParams();
      const { product, isPending, error } = useProduct(productId);

      return <section className="flex flex-col gap-5 ">
        <ProductDetails product={product} isPending={isPending} error={error}/>

        <ProductReviews productId={productId}/>

        <SuggestedProducts categoryId={product?.categoryId._id} productId={productId}/>
      </section>

}