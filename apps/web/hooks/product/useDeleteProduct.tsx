import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "@/utils/axios";

export const useDeleteProduct = () => {
  const api = useApiClient();
  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (productId: string) =>
      api.delete(`/product/${productId}`).then((res) => res.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },

    onError: (error) => {
      console.error("[Delete Product Error]:", error);
    },
  });

  return {
    deleteProduct: mutate,
    isLoading: isPending,
    isError,
  };
};
