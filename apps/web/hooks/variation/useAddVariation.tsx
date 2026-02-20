import { useApiClient } from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface AddVariationFormType {
  name: string;
  sku?: string;
  price: number;
  stock: number;
  productId: string;
  images?: File[];
}

export const useAddVariation = (productId: string) => {
  const api = useApiClient();
  const queryClient = useQueryClient();

  const addVariationMutation = useMutation({
    mutationFn: (formData: FormData) =>
      api.post(`/variation/${productId}`, formData),

    onSuccess: (data) => {
      // ✅ Invalidate queries for the product's variations
      queryClient.invalidateQueries({ queryKey: ["products", productId] });
      queryClient.invalidateQueries({ queryKey: ["variations", productId] });
    },

    onError: (error) => {
      console.error("[Add Variation Error]:", error);
    },
  });

  const addVariation = (data: AddVariationFormType) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("price", String(data.price));
    formData.append("stock", String(data.stock));
    formData.append("productId", data.productId);

    if (data.sku) formData.append("sku", data.sku);

    data.images?.forEach((file) => formData.append("images", file));

    addVariationMutation.mutate(formData);
  };

  return {
    addVariation,
    isAddingVariation: addVariationMutation.isPending,
  };
};
