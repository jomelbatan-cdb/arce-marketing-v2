import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "@/utils/axios";
import { ProductsResponse } from "@/types";
interface UseProductsOptions {
  page?: number;
  limit?: number;
  category?: string;
}

export const useProductShowcase = ({
  page = 1,
  limit = 40,
  category,
}: UseProductsOptions = {}) => {
  const api = useApiClient();

  const query = useQuery<ProductsResponse>({
    queryKey: ["products", { page, limit, category }],
    queryFn: async () => {
      const res = await api.get("/product", {
        params: { page, limit, category },
      });
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });

  return {
    products: query.data?.data ?? [],
    meta: query.data?.meta,
    isLoading: query.isLoading,
    isFetching: query.isFetching, // 👈 important
    isError: query.isError,
  };
};
