import { Product, ProductForm } from "@/types";
import { useApiClient } from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditProducts = () => {
  const api = useApiClient();
  const queryClient = useQueryClient();

  const editProductMutation = useMutation({
    mutationFn: async ({ data, id }: { data: ProductForm; id: string }) => {
      const formData = new FormData();

      // primitive fields
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", String(data.price));
      formData.append("discount", String(data.discount));
      formData.append("category", JSON.stringify(data.category));
      formData.append("stock", String(data.stock));
      formData.append("sku", data.sku);
      formData.append("isActive", String(data.isActive));

      // arrays
      data.tags.forEach((tag) => formData.append("tags[]", tag));

      // existing images
      data.images.existing.forEach((url) =>
        formData.append("images[existing][]", url),
      );

      // new uploads
      data.images.uploads.forEach((file) => formData.append("images", file));

      if (data.variations)
        formData.append("variations", JSON.stringify(data.variations));
      return api.put(`/product/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },

    onSuccess: (_res, variables) => {
      const { id } = variables;

      // 🔄 lists
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });

      // 🎯 detail page
      queryClient.invalidateQueries({ queryKey: ["product", id] });
    },

    onError: (error) => {
      console.error("[Edit Product Error]:", error);
    },
  });

  const editProduct = (data: ProductForm, id: string) => {
    console.log(data);
    editProductMutation.mutate({ data, id });
  };

  return {
    editProduct,
    isEditingProduct: editProductMutation.isPending,
  };
};
