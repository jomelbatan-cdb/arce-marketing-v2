"use client";

import { useState, FormEvent } from "react";
import ImageUpload from "@/components/Main/UploadImage";
import { useAddVariation } from "@/hooks/variation/useAddVariation";
import toast from "react-hot-toast";

type VariationForm = {
  sku: string;
  color: string;
  stock: number;
  price: number;
  images: File[];
};

type ProductVariationsModalProps = {
  open: boolean;
  onClose: () => void;
  productId: string;
};

export default function ProductVariationsModal({
  open,
  onClose,
  productId,
}: ProductVariationsModalProps) {
  const [variations, setVariations] = useState<VariationForm>({
    sku: "",
    color: "",
    stock: 0,
    price: 0,
    images: [],
  });
  const { addVariation, isAddingVariation } = useAddVariation(productId);
  /* ---------------------------- actions ---------------------------- */
  const resetForm = () => {
    setVariations({
      sku: "",
      color: "",
      stock: 0,
      price: 0,
      images: [],
    });
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const payload: any = {
        sku: variations.sku,
        color: variations.color,

        stock: Number(variations.stock),
        price: variations.price ? Number(variations.price) : undefined,

        images: variations.images || [],
      };

      await addVariation(payload);

      resetForm();
      onClose();
      toast.success("Variation Added Successfully", {
        duration: 3000,
        position: "bottom-right",
      });
    } catch (err) {
      console.error(err);
      alert("Error adding product!");
    }
  };
  const updateVariation = (patch: Partial<VariationForm>) => {
    setVariations((prev) => ({
      ...prev,
      ...patch,
    }));
  };
  /* --------------------------- render --------------------------- */

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      {/* Modal content */}
      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-4xl p-6 z-10 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-end items-center mb-4">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 font-bold"
          >
            ✕
          </button>
        </div>

        {/* Variations */}
        <div className="space-y-4" onClick={(e) => e.stopPropagation()}>
          <form
            className="rounded-2xl border border-gray-200 bg-gray-50 p-5 space-y-5"
            onSubmit={handleSubmit}
          >
            {/* Core fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-600">SKU</label>
                <input
                  value={variations.sku}
                  onChange={(e) => updateVariation({ sku: e.target.value })}
                  className="mt-1 w-full text-black rounded-lg border px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600">
                  Stock
                </label>
                <input
                  type="number"
                  min={0}
                  value={variations.stock}
                  onChange={(e) =>
                    updateVariation({ stock: Number(e.target.value) })
                  }
                  className="mt-1 w-full text-black rounded-lg border px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600">
                  Price
                </label>
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  value={variations.price}
                  onChange={(e) =>
                    updateVariation({ price: Number(e.target.value) })
                  }
                  className="mt-1 w-full text-black rounded-lg border px-3 py-2 text-sm"
                />
              </div>
            </div>
            {/* Images */}
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-2">
                Variation Image
              </label>
              <ImageUpload
                existingImages={[]}
                uploadedImages={variations.images}
                setExistingImages={() => {}}
                setUploadedImages={(uploads) =>
                  updateVariation({ images: uploads })
                }
                max={1}
              />
            </div>
            <button
              type="submit"
              disabled={isAddingVariation}
              className="bg-green-500 w-full rounded-xl py-4 my-4 text-white disabled:bg-gray-300"
            >
              {isAddingVariation ? "Saving" : "Save"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
