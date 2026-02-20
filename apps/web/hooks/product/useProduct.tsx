import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useApiClient } from "@/utils/axios";
import { Product, ProductsResponse } from "@/types";

interface UseProductsParams {
  page?: number;
  limit?: number;
}
export const useProducts = ({
  page = 1,
  limit = 10,
}: UseProductsParams = {}) => {
  const api = useApiClient();

  const query = useQuery<ProductsResponse>({
    queryKey: ["products", page, limit],
    queryFn: async () => {
      const res = await api.get("/product", {
        params: { page, limit },
      });
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });

  return {
    products: query.data?.data ?? [],
    meta: query.data?.meta,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
  };
};
