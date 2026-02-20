"use client";

import { useState } from "react";
import SearchEngineUI from "@/components/Forms/SearchEngine";
import VariationTable from "@/components/MajorElements/Variations/VariationTable";
import { useVariationsByProduct } from "@/hooks/variation/useSearchVariation";
import ConfirmationModal from "@/components/Cards/ConfirmationModal";
import ProductVariationsModal from "@/components/MajorElements/Variations/VariationModal";
import { useVariationStore } from "@/stores/variationStore";
import toast from "react-hot-toast";
import { useDeleteVariation } from "@/hooks/variation/useDeleteVariation";
import EditVariationModal from "@/components/MajorElements/Variations/EditVariationModal";

const PAGE_SIZE = 10;

export default function AdminVariation() {
  const [productId, setProductId] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { deleteVariation } = useDeleteVariation();
  const { variation, setVariation } = useVariationStore();
  const { variations, isLoading, isFetching, isError } = useVariationsByProduct(
    {
      productId,
      limit: PAGE_SIZE,
    },
  );

  const handleEdit = (id: string) => {
    const variationToEdit = variations?.find((v) => v._id === id) || null;
    setVariation(variationToEdit);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: string) => {
    const variantToDelete = variations.find((v) => v._id === id);
    if (!variantToDelete) return;

    setVariation(variantToDelete);
    setIsDeleteModalOpen(true);
  };
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-black">
          Variations Dashboard
        </h1>
      </div>

      <SearchEngineUI onSearch={setProductId} />

      {isLoading && <p>Loading...</p>}
      {isError && <p>Failed to load variations</p>}
      {variations && variations.length !== 0 && (
        <div className="flex justify-between">
          <h3 className="text-black py-4">{variations[0].productId.name}</h3>

          <button
            onClick={() => setIsModalOpen(true)}
            className="my-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add Variation
          </button>
        </div>
      )}
      <VariationTable
        variation={variations}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      <ProductVariationsModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        productId={productId}
      />
      <EditVariationModal
        onClose={() => setIsEditModalOpen(false)}
        open={isEditModalOpen}
      />
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        title="Delete Product?"
        message="Are you sure you want to delete this product? This action cannot be undone."
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          if (!variation) return null;
          deleteVariation({ variationId: variation._id, productId: productId });
          setIsDeleteModalOpen(false);
          toast.success("Variation successfully deleted", {
            duration: 3000,
            position: "bottom-right",
            iconTheme: {
              primary: "#000",
              secondary: "#fff",
            },
          });
        }}
        confirmText="Delete"
        cancelText="No"
      />
    </div>
  );
}
