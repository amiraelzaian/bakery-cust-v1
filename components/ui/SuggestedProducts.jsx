import { useProducts } from "@/hooks/useProducts";
import ProductCard from "./ProductCard";

export default function SuggestedProducts({ categoryId, productId }) {
  const { products, isPending, isError, error } = useProducts(categoryId);

  if (isPending) {
    return (
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 p-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square rounded-md bg-muted animate-pulse"
          />
        ))}
      </section>
    );
  }

  if (isError) {
    return (
      <p className="text-sm text-muted-foreground p-4">
        Couldn&apos;t load suggestions: {error?.message}
      </p>
    );
  }

  const suggestedProducts = (products || []).filter((p) => p._id !== productId);

  if (suggestedProducts.length === 0) {
    return null; 
  }

  return (
    <section className="mt-8 p-4">
      <h2 className="text-lg font-serif text-foreground mb-4">You may also like</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {suggestedProducts.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </section>
  );
}