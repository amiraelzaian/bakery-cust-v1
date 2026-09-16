
"use client";

import { useAddToCart } from "@/hooks/useCart";
import { useAddToWishlist, useGetWishlist, useRemoveWishlistItem } from "@/hooks/useWishlist";
import { ShoppingCartPlus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }) {
const { wishlist } = useGetWishlist()
  const { addToWishlist, isPending: isAdding } = useAddToWishlist()
  const { removeItem, isPending: isRemoving } = useRemoveWishlistItem()



const wishlistItem = (wishlist ?? []).find(
  (item) => item.product?._id === product?._id
)
const isSaved = Boolean(wishlistItem)

  console.log('saved',isSaved)
  const isBusy = isAdding || isRemoving

  function handleToggle() {
    if (isSaved) {
      removeItem(wishlistItem?.product?._id)

    } else {
      addToWishlist({ productId: product?._id })
    }
  }
  
  const router=useRouter();
  const {addToCart}=useAddToCart()

  const hasSizes =
    Array.isArray(product.sizes) &&
    product.sizes.length > 0;

  const activeSize = hasSizes ? product.sizes[0].name : null;

  const priceFrom = hasSizes
    ? Math.min(
        ...product.sizes
          .map((size) => Number(size.price))
          .filter((price) => !Number.isNaN(price))
      )
    : null;

  const categoryName =
    product.categoryId?.name || "";

 function handleShowDetails(productId){

    const token=localStorage.getItem("token");
    if(!token){
      router.push(`/login?redirect=/explore/${productId}`);
      return
    }
    router.push(`/explore/${productId}`);
}

  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300  hover:shadow-md">

      {/* Image */}
      <div className="relative aspect-4/3 overflow-hidden bg-card">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm ">
             <Image
            src="/images/bread2.jpg"
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          </div>
        )}

        {/* Offer Badge */}
        {product.hasActiveOffer && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-[#fff8ed] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#9a542e] shadow-sm">
            Offer
          </span>
        )}

      {/* Favorite */}
        <button
          onClick={handleToggle}
          disabled={isBusy}
          type="button"
          aria-label={
            isSaved
              ? `Remove ${product.name} from favorites`
              : `Add ${product.name} to favorites`
          }
          aria-pressed={isSaved}
          className="cursor-pointer absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition hover:ring disabled:cursor-not-allowed disabled:opacity-60"
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill={isSaved ? "#dc2626" : "none"}
            stroke={isSaved ? "#dc2626" : "currentColor"}
            strokeWidth="1.8"
            className="text-primary transition-colors"
          >
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-3">

        {/* Rating  Cart*/}
      <section className="flex justify-between items-center">
        

        <div className="mb-1.5 flex items-center gap-1 text-[11px]">
          <span className="text-ring">
            ★
          </span>

          <span className="font-medium text-muted-foreground">
            {product.rating ?? "4.9"}
          </span>
          
        
        </div>
         <button 
          className="w-8 h-8 text-primary cursor-pointer active:outline-0"
          onClick={() =>
            addToCart({productId:product._id, size: activeSize, quantity:1 })
          }>
           <ShoppingCartPlus/> 
           </button> 
        </section>

        {/* Name */}
        <h2 className="line-clamp-2 text-[15px] font-medium leading-5 text-forground">
          {product.name}
        </h2>

        {/* Category */}
        {categoryName && (
          <p className="mt-1 text-xs text-accent">
            {categoryName}
          </p>
        )}
       
        {/* Bottom */}
        <div className="mt-4 flex items-center justify-between gap-3">

          {/* Price */}
          <div>
            {hasSizes ? (
              <>
                <span className="text-[11px] text-accent">
                  From
                </span>{" "}
                <span className="text-sm font-bold text-muted-foreground">
                  {priceFrom} EGP
                </span>
              </>
            ) : (
              <span className="text-sm font-bold text-muted-foreground">
                {product.price != null
                  ? `${product.price} EGP`
                  : "Price unavailable"}
              </span>
            )}
          </div>

           {/*details page*/}
            <button onClick={() => handleShowDetails(product._id)}
              
              className="flex justify-center items-center p-2 rounded-full bg-secondary  text-[11px] font-medium text-primary-foreground transition hover:bg-ring cursor-pointer"
            >
                Show details 
            </button>
         
        </div>
      </div>
    </article>
  );
}

