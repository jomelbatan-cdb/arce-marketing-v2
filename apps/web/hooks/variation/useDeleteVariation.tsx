import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "@/utils/axios";

interface DeleteVariationParams {
  productId: string;
  variationId: string;
}

export const useDeleteVariation = () => {
  const api = useApiClient();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ variationId }: DeleteVariationParams) => {
      await api.delete(`/variation/${variationId}`);
    },

    onSuccess: (_, { productId }) => {
      queryClient.invalidateQueries({
        queryKey: ["variations", productId],
      });
    },
  });

  return {
    deleteVariation: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};
