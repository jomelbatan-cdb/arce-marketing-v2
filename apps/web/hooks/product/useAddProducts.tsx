import { Product } from "@/types";
import { useApiClient } from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddProducts = () => {
  const api = useApiClient();
  const queryClient = useQueryClient();

  const addProductMutation = useMutation({
    mutationFn: (formData: FormData) => api.post("/product", formData),

    onSuccess: () => {
      // ✅ invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },

    onError: (error) => {
      console.error("[Add Product Error]:", error);
    },
  });

  const addProduct = (data: Product) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", String(data.price));
    formData.append("discount", String(data.discount));
    formData.append(
      "category",
      typeof data.category === "string" ? data.category : data.category?._id,
    );
    formData.append("isActive", String(data.isActive));

    if (!data.variations?.length) {
      formData.append("stock", String(data.stock));
      if (data.sku) formData.append("sku", data.sku);
    }

    data.tags?.forEach((tag) => formData.append("tags", tag));
    data.images?.forEach((file) => formData.append("images", file));

    // VARIATIONS
    if (data.variations?.length) {
      const variationsPayload = data.variations.map(
        ({ images, ...rest }) => rest,
      );
      formData.append("variations", JSON.stringify(variationsPayload));

      data.variations.forEach((variation, idx) => {
        variation.images?.forEach((file) => {
          formData.append(`variationImages-${idx}`, file);
        });
      });
    }

    addProductMutation.mutate(formData);
  };

  return {
    addProduct,
    isAddingProduct: addProductMutation.isPending,
  };
};
