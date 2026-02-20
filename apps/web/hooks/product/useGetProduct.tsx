import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "@/utils/axios";
import { Product } from "@/types";

export const useGetProduct = (productId: string) => {
  const api = useApiClient();

  const query = useQuery<Product>({
    queryKey: ["product", productId],
    queryFn: async () => {
      const res = await api.get(`/product/${productId}`);
      return res.data;
    },
    enabled: Boolean(productId),
    staleTime: 1000 * 60 * 5,
  });

  return {
    product: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching, // 👈 important for post-edit refresh
    isError: query.isError,
  };
};
