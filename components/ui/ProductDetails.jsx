'use client'

import { useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { useAddToCart } from "@/hooks/useCart";

export default function ProductDetails({product,isPending,error}) {
  
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const {addToCart,isPending:addingToCart,isError}=useAddToCart()

// console.log(product)

  if (isPending) return <div className="p-12 text-center text-muted-foreground">Loading...</div>;
  if (error) return <div className="p-12 text-center text-primary">Something went wrong: {error.message}</div>;
  if (!product) return null;

  
  const hasSizes = product.sizes && product.sizes.length > 0;
  const activeSize = hasSizes ? product.sizes[selectedSize] : null;
  const displayPrice = hasSizes ? activeSize.price : product.price;

  return (
    <div className=" mx-auto px-6 pt-20 grid md:grid-cols-2 gap-10 mb-3">
      {/* Image */}
      <div className="relative aspect-square rounded-md overflow-hidden bg-muted">
        <Image
          src={product.imageUrl || "/images/cookies.jpg"}
          alt={product.name}
          fill
          className="object-cover"
        />
       {product.hasActiveOffer&& <div className="absolute left-2 top-2 text-xs bg-muted px-2 py-1 rounded-xl ">In Offer</div>}
      </div>

      {/* Details */}
      <div className=" flex flex-col gap-4 pt-2 sm:pt-3 md:pt-5">
        <div className="flex justify-between">

        {product.categoryId?.name && (
            <p className="text-xs tracking-wide text-primary">{product.categoryId.name}</p>
        )}
         <Heart className="h-5 w-5 cursor-pointer" />
        </div>

        <h1 className="font-serif text-3xl mt-1 text-foreground">{product.name}</h1>

        {product.description && (
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
            {product.description}
          </p>
        )}

        <div className="mt-6 flex items-baseline gap-2">
          <span className="text-xs text-muted-foreground">
            {hasSizes ? "From" : "Price"}
          </span>
          <span className="text-2xl font-medium text-foreground">
            {displayPrice != null ? `${displayPrice} EGP` : "—"}
          </span>
        </div>

        {!product.isAvailable && (
          <p className="mt-2 text-sm text-primary">Currently unavailable</p>
        )}

        {product.stockQuantity != null && (
          <p className="mt-1 text-xs text-muted-foreground">
            {product.stockQuantity > 0
              ? `${product.stockQuantity} left in stock`
              : "Out of stock"}
          </p>
        )}

        {/* Size selector */}
        {hasSizes && (
          <div className="mt-8 flex flex-col gap-2">
            <p className="text-xs font-medium text-foreground mb-2">Select size</p>
            <div className="grid grid-cols-3 gap-3">
              {product.sizes.map((size, i) => (
                <button
                  key={size.name}
                  onClick={() => setSelectedSize(i)}
                  className={`cursor-pointer border rounded-md py-3 text-center transition-colors ${
                    i === selectedSize
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-foreground hover:bg-muted"
                  }`}
                >
                  <p className="text-sm font-medium capitalize">{size.name}</p>
                  <p className="text-xs mt-0.5 opacity-80">{size.price} EGP</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity + Add to bag */}
        <div className="mt-8 flex items-center gap-4">
          <div className="flex items-center border border-border rounded-md">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="cursor-pointer w-9 h-9 flex items-center justify-center text-foreground hover:bg-muted"
            >
              −
            </button>
            <span className="w-8 text-center text-sm text-foreground">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="cursor-pointer w-9 h-9 flex items-center justify-center text-foreground hover:bg-muted"
            >
              +
            </button>
          </div>

          <button
          onClick={() =>
            addToCart({productId:product._id, size: activeSize?.name, quantity })
          }
          disabled={addingToCart || !product.isAvailable || product.stockQuantity === 0}
          className="flex-1 bg-primary text-primary-foreground rounded-md py-2.5 text-sm font-medium
                    hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {addingToCart
            ? "Adding to cart..."
            : `Add to cart · ${displayPrice != null ? `${displayPrice * quantity} EGP` : ""}`}
        </button>
        </div>
       
    
    <p className="mt-1 text-xs text-muted-foreground">
      Updated {product?.updatedAt && new Date(product.updatedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })}
    </p>        
      </div>
    </div>
  );
}