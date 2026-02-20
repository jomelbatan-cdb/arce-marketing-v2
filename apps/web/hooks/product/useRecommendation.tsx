import { useApiClient } from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types";

export const useRecommendations = (categoryId: string, productId: string) => {
  const api = useApiClient();

  const { data, isLoading, isError } = useQuery<Product[]>({
    queryKey: ["recommendations", categoryId, productId],
    queryFn: () =>
      api
        .get(`/product/recommendation/${categoryId}/${productId}`)
        .then((res) => {
          return res.data;
        }),
    staleTime: 1000 * 60 * 5,
    enabled: !!categoryId && !!productId,
  });

  return {
    recommendation: data,
    isLoading,
    isError,
  };
};
