"use client";

import { useState, FormEvent, useEffect } from "react";
import ImageUpload from "@/components/Main/UploadImage";
import toast from "react-hot-toast";
import { useVariationStore } from "@/stores/variationStore";
import {
  useEditVariation,
  EditVariationParams,
} from "@/hooks/variation/useEditVariation";
import { Variation } from "@/types";

/* ----------------------------- */
/* Form-specific type (UI model) */
/* ----------------------------- */
type VariationForm = {
  name: string;
  sku: string;
  stock: number;
  price: number;
};

type ProductVariationsModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function EditVariationModal({
  open,
  onClose,
}: ProductVariationsModalProps) {
  const { variation } = useVariationStore();
  const { editVariation, isLoading } = useEditVariation();

  /* ----------------------------- */
  /* Image state (single ownership) */
  /* ----------------------------- */
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  /* ----------------------------- */
  /* Core form state (no images)   */
  /* ----------------------------- */
  const [form, setForm] = useState<VariationForm>({
    name: "",
    sku: "",
    stock: 0,
    price: 0,
  });

  /* ----------------------------- */
  /* Populate form when editing    */
  /* ----------------------------- */
  useEffect(() => {
    if (!open || !variation) return;

    setForm({
      name: variation.name ?? "",
      sku: variation.sku ?? "",
      stock: variation.stock ?? 0,
      price: variation.price ?? 0,
    });

    setExistingImages(
      (variation.images ?? []).filter(
        (img): img is string => typeof img === "string",
      ),
    );

    setUploadedImages([]);
  }, [open, variation]);

  /* ----------------------------- */
  /* Helpers                       */
  /* ----------------------------- */
  const updateForm = (patch: Partial<VariationForm>) => {
    setForm((prev) => ({ ...prev, ...patch }));
  };

  /* ----------------------------- */
  /* Submit                        */
  /* ----------------------------- */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!variation) return;

    try {
      // TODO: upload images here if needed
      // const uploadedUrls = await uploadImages(uploadedImages);
      const uploadedUrls: string[] = [];

      const images = [...existingImages, ...uploadedUrls];

      const payloadData: Partial<Omit<Variation, "_id" | "productId">> = {
        ...form,
        images,
      };

      const params: EditVariationParams = {
        productId: variation.productId._id,
        variationId: variation._id,
        data: payloadData,
      };

      await editVariation(params);

      toast.success("Variation updated successfully", {
        duration: 3000,
        position: "bottom-right",
      });

      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update variation", { duration: 3000 });
    }
  };

  if (!open) return null;

  /* ----------------------------- */
  /* UI                            */
  /* ----------------------------- */
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-4xl p-6 z-10 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 font-bold"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form
          className="space-y-5"
          onSubmit={handleSubmit}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-600">SKU</label>
              <input
                value={form.sku}
                onChange={(e) => updateForm({ sku: e.target.value })}
                className="mt-1 w-full rounded-lg border px-3 py-2 text-black text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-600">Stock</label>
              <input
                type="number"
                min={0}
                value={form.stock}
                onChange={(e) =>
                  updateForm({ stock: Number(e.target.value) || 0 })
                }
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm text-black"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-600">Price</label>
              <input
                type="number"
                min={0}
                step="0.01"
                value={form.price}
                onChange={(e) =>
                  updateForm({ price: Number(e.target.value) || 0 })
                }
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm text-black"
              />
            </div>
          </div>

          {/* Images */}
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-2">
              Variation Image
            </label>
            <ImageUpload
              existingImages={existingImages}
              uploadedImages={uploadedImages}
              setExistingImages={setExistingImages}
              setUploadedImages={setUploadedImages}
              max={1}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-green-500 w-full rounded-xl py-4 text-white disabled:bg-gray-300"
          >
            {isLoading ? "Saving..." : "Update Variation"}
          </button>
        </form>
      </div>
    </div>
  );
}
