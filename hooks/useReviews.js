import { getReviews } from "@/lib/api/review";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

export function useReviews(productId, page = 1, limit = 10) {
  const query = useQuery({
    queryKey: ["productReviews", productId, page],
    queryFn: () => getReviews(productId, page, limit),
    enabled: !!productId,
    placeholderData: keepPreviousData, 
  });

  return {
    reviews: query.data?.data ?? [],
    pageInfo: query.data?.page,
    isPending: query.isPending,
    ...query,
  };
}