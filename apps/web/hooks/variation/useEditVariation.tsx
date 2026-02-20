import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "@/utils/axios";
import { Variation } from "@/types";

export interface EditVariationParams {
  productId: string;
  variationId: string;
  data: Partial<Omit<Variation, "_id" | "productId">>; // editable fields only
}

export const useEditVariation = () => {
  const api = useApiClient();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ variationId, data }: EditVariationParams) => {
      const res = await api.put(`/variation/${variationId}`, data);
      return res.data;
    },

    onSuccess: (_, { productId }) => {
      queryClient.invalidateQueries({
        queryKey: ["variations", productId],
      });
    },
  });

  return {
    editVariation: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};
