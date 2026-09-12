
"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  const hasSizes =
    Array.isArray(product.sizes) &&
    product.sizes.length > 0;

  const priceFrom = hasSizes
    ? Math.min(
        ...product.sizes
          .map((size) => Number(size.price))
          .filter((price) => !Number.isNaN(price))
      )
    : null;

  const categoryName =
    product.categoryId?.name || "";


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
          type="button"
          aria-label={`Add ${product.name} to favorites`}
          className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-primary shadow-sm backdrop-blur transition  hover:ring"
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
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

        {/* Rating */}
        <div className="mb-1.5 flex items-center gap-1 text-[11px]">
          <span className="text-ring">
            ★
          </span>

          <span className="font-medium text-muted-foreground">
            {product.rating ?? "4.9"}
          </span>

        
        </div>

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
            <Link href={`explore/${product._id}`}
              
              className="flex justify-center items-center p-2 rounded-full bg-secondary  text-[11px] font-medium text-primary-foreground transition hover:bg-ring cursor-pointer"
            >
                Show details 
            </Link>
         
        </div>
      </div>
    </article>
  );
}

