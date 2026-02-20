import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useApiClient } from "@/utils/axios";
import { Variation } from "@/types";

interface VariationsResponse {
  data: Variation[];
  nextCursor: string | null;
  limit: number;
}

interface UseVariationsParams {
  productId: string;
  limit?: number;
  cursor?: string;
}

export const useVariationsByProduct = ({
  productId,
  limit = 10,
  cursor,
}: UseVariationsParams) => {
  const api = useApiClient();

  const query = useQuery<VariationsResponse>({
    queryKey: ["variations", productId],
    queryFn: async () => {
      const res = await api.get(`/variation/product/${productId}`, {
        params: { limit, cursor },
      });
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
    enabled: Boolean(productId),
  });

  return {
    variations: query.data?.data ?? [],
    nextCursor: query.data?.nextCursor ?? null,
    limit: query.data?.limit ?? limit,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
  };
};
