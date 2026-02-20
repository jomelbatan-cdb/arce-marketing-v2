"use client";

import Dropdown from "@/components/fields/Dropdown";
import EnumInput from "@/components/fields/EnumInput";
import ImageUpload from "@/components/Main/UploadImage";
import { useAddProducts } from "@/hooks/product/useAddProducts";
import { useCategories } from "@/hooks/category/useCategory";
import React, { useState, ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";
import { AddProductForm, VariationDraft } from "@/types";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}
type VariationUpdate = Partial<Omit<VariationDraft, "images">> & {
  images?: string[];
};
const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose }) => {
  const [useVariations, setUseVariations] = useState(false);

  const [form, setForm] = useState<AddProductForm>({
    name: "",
    description: "",
    price: 0,
    discount: 0,
    category: "",
    tags: [],
    images: [],
    stock: 0,
    sku: "",
    isActive: true,
    variations: [],
  });

  const categories = useCategories();
  const { addProduct, isAddingProduct } = useAddProducts();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addVariation = () => {
    const newVariation: VariationDraft = {
      name: "",
      sku: "",
      stock: 0,
      price: 0,
      existingImages: [], // required
      newImages: [], // required
    };

    setForm((prev) => ({
      ...prev,
      variations: [...(prev.variations || []), newVariation],
    }));
  };

  const updateVariation = (index: number, data: Partial<VariationDraft>) => {
    setForm((prev) => {
      const variations = [...(prev.variations || [])];

      variations[index] = {
        ...variations[index],
        ...data,
      };

      return { ...prev, variations };
    });
  };

  const removeVariation = (index: number) => {
    setForm((prev) => {
      const variations = prev.variations || [];
      variations.splice(index, 1);
      return { ...prev, variations };
    });
  };

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      price: 0,
      discount: 0,
      category: "",
      tags: [],
      images: [],
      stock: 0,
      sku: "",
      isActive: true,
      variations: [],
    });
    setUseVariations(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const payload: any = {
        name: form.name,
        description: form.description,
        category: form.category,
        tags: form.tags,
        isActive: form.isActive,
        price: Number(form.price),
        discount: Number(form.discount),
        images: form.images, // general images
      };

      if (!useVariations) {
        payload.stock = Number(form.stock);
        payload.sku = form.sku;
      } else {
        payload.variations = form.variations?.map((v: any) => ({
          ...v,
          stock: Number(v.stock),
          price: v.price ? Number(v.price) : undefined,
          discount: v.discount ? Number(v.discount) : undefined,
          // keep images here
          images: v.images || [],
        }));
      }

      await addProduct(payload);

      resetForm();
      onClose();
      toast("Product Added Successfully", {
        duration: 3000,
        position: "bottom-right",
      });
    } catch (err) {
      console.error(err);
      alert("Error adding product!");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-lg w-full p-6 relative max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4 text-black">Add Product</h2>

        <div className="flex items-center gap-3 mb-4">
          <input
            type="checkbox"
            checked={useVariations}
            onChange={(e) => setUseVariations(e.target.checked)}
          />
          <span className="text-black">Use Variations</span>
        </div>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            autoComplete="off"
            className="border border-black text-black rounded px-3 py-2 focus:outline-none "
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            autoComplete="off"
            className="border border-black text-black rounded px-3 py-2 focus:outline-none "
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <input
              type="number"
              name="price"
              placeholder="Base Price"
              value={form.price}
              onChange={handleChange}
              autoComplete="off"
              className="border border-black text-black rounded px-3 py-2 focus:outline-none "
              required={!useVariations}
            />

            <input
              type="number"
              name="discount"
              placeholder="Discount (in %)"
              value={form.discount}
              onChange={handleChange}
              autoComplete="off"
              className="border border-black text-black rounded px-3 py-2 focus:outline-none "
              required
            />
          </div>

          <Dropdown
            options={categories || []}
            value={categories?.find((c) => c._id === form.category) || null}
            onChange={(selectedCategory) =>
              setForm((prev) => ({ ...prev, category: selectedCategory._id }))
            }
            displayKey="name"
            valueKey="_id"
            placeholder="Select category"
            height="120px"
          />

          <EnumInput
            value={form.tags}
            placeholder="Tags (hit enter to add)"
            onChange={(updatedTags) => setForm({ ...form, tags: updatedTags })}
          />

          <ImageUpload
            existingImages={[]}
            uploadedImages={form.images}
            setExistingImages={() => {}}
            setUploadedImages={(uploads) =>
              setForm((prev) => ({ ...prev, images: uploads }))
            }
          />

          <input
            type="text"
            name="sku"
            placeholder="SKU"
            value={form.sku}
            onChange={handleChange}
            autoComplete="off"
            className="border border-black text-black rounded px-3 py-2 focus:outline-none "
            required={!useVariations}
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            autoComplete="off"
            className="border border-black text-black rounded px-3 py-2 focus:outline-none "
            required={!useVariations}
          />

          {useVariations && (
            <div className="border p-3 rounded">
              <div className="flex justify-between items-center mb-2">
                <button
                  type="button"
                  onClick={addVariation}
                  className="px-3 py-1 bg-indigo-600 text-white rounded"
                >
                  + Add Variation
                </button>
              </div>

              {(form.variations || []).map((v: any, idx: number) => (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-xl p-4 mb-4 bg-white shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-gray-800">
                      Variation #{idx + 1}
                    </h3>
                    <button
                      type="button"
                      onClick={() => removeVariation(idx)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-4">
                    <div>
                      <label className="text-sm text-gray-600">SKU</label>
                      <input
                        type="text"
                        placeholder="SKU"
                        value={v.sku || ""}
                        onChange={(e) =>
                          updateVariation(idx, { sku: e.target.value })
                        }
                        className="mt-1 w-full border rounded-md px-3 py-2 text-black"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm text-gray-600">Stock</label>
                      <input
                        type="number"
                        placeholder="Stock"
                        value={v.stock}
                        onChange={(e) =>
                          updateVariation(idx, {
                            stock: e.target.valueAsNumber,
                          })
                        }
                        className="mt-1 w-full border rounded-md px-3 py-2 text-black"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm text-gray-600">Price</label>
                      <input
                        type="number"
                        placeholder="Price"
                        value={v.price}
                        onChange={(e) =>
                          updateVariation(idx, {
                            price: e.target.valueAsNumber,
                          })
                        }
                        className="mt-1 w-full border rounded-md px-3 py-2 text-black"
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="text-sm text-gray-600">
                      Variation Images
                    </label>
                    <div className="mt-2">
                      <ImageUpload
                        existingImages={v.existingImages}
                        uploadedImages={v.newImages}
                        setExistingImages={(imgs) =>
                          updateVariation(idx, { existingImages: imgs })
                        }
                        setUploadedImages={(files) =>
                          updateVariation(idx, { newImages: files })
                        }
                        max={1}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isAddingProduct}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-black "
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isAddingProduct}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:bg-gray-300"
            >
              {isAddingProduct ? "Saving" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
