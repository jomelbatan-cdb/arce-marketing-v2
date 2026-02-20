"use client";

import Dropdown from "@/components/fields/Dropdown";
import EnumInput from "@/components/fields/EnumInput";
import ImageUpload from "@/components/Main/UploadImage";
import { useCategories } from "@/hooks/category/useCategory";
import { useEditProducts } from "@/hooks/product/useEditProducts";
import { useProductStore } from "@/stores/productStore";
import { ProductForm } from "@/types";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EditProductModal({
  isOpen,
  onClose,
}: ProductModalProps) {
  const { product } = useProductStore();
  const { editProduct, isEditingProduct } = useEditProducts();
  const categories = useCategories();

  const [form, setForm] = useState<ProductForm>({
    name: "",
    description: "",
    price: 0,
    discount: 0,
    category: "",
    tags: [],
    images: {
      existing: [],
      uploads: [],
    },
    stock: 0,
    sku: "",
    isActive: true,
    variations: [],
  });

  useEffect(() => {
    if (!product) return;

    setForm({
      name: product.name ?? "",
      description: product.description ?? "",
      price: product.price ?? 0,
      discount: product.discount ?? 0,
      category:
        typeof product.category === "string"
          ? product.category
          : (product.category?._id ?? ""),
      tags: product.tags ?? [],
      images: {
        existing: product.images ?? [],
        uploads: [],
      },
      stock: product.stock ?? 0,
      sku: product.sku ?? "",
      isActive: product.isActive ?? true,
      variations: product.variations ?? [],
    });
  }, [product]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!product) return;

    await editProduct(form, product._id);

    setForm({
      name: "",
      description: "",
      price: 0,
      discount: 0,
      category: "",
      tags: [],
      images: {
        existing: [],
        uploads: [],
      },
      stock: 0,
      sku: "",
      isActive: true,
      variations: [],
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-lg max-w-lg w-full p-6 relative max-h-[80vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-semibold mb-4 text-black">
            Edit Product
          </h2>

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <Dropdown
                options={categories || []}
                value={categories?.find((c) => c._id === form.category) || null}
                onChange={(selectedCategory) =>
                  setForm((prev) => ({
                    ...prev,
                    category: selectedCategory._id,
                  }))
                }
                displayKey="name"
                valueKey="_id"
                placeholder="Select category"
                height="120px"
              />
            </div>

            <EnumInput
              value={form.tags}
              placeholder="Tags (hit enter to add)"
              onChange={(updatedTags) =>
                setForm({ ...form, tags: updatedTags })
              }
            />
            <ImageUpload
              existingImages={form.images.existing}
              uploadedImages={form.images.uploads}
              setExistingImages={(existing) =>
                setForm((prev) => ({
                  ...prev,
                  images: { ...prev.images, existing },
                }))
              }
              setUploadedImages={(uploads) =>
                setForm((prev) => ({
                  ...prev,
                  images: { ...prev.images, uploads },
                }))
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
            />

            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={form.stock}
              onChange={handleChange}
              autoComplete="off"
              className="border border-black text-black rounded px-3 py-2 focus:outline-none "
            />

            {product?.variations?.length && (
              <div className="border p-3 rounded">
                {(form.variations || []).map((v: any, idx: number) => (
                  <div
                    key={idx}
                    className="border border-gray-200 rounded-xl p-4 mb-4 bg-white shadow-sm"
                  >
                    <h3 className="font-semibold text-gray-800">
                      Variation #{idx + 1}
                    </h3>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-500">
                        SKU: {v.sku || "-"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500 font-medium">
                          Color
                        </p>
                        <p className="text-gray-800">{v.color || "-"}</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 font-medium">
                          Stock
                        </p>
                        <p className="text-gray-800">{v.stock ?? "-"}</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 font-medium">
                          Price
                        </p>
                        <p className="text-gray-800">${v.price ?? "-"}</p>
                      </div>
                    </div>

                    {v.images && v.images.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-500 font-medium mb-2">
                          Variation Image
                        </p>
                        <div className="flex gap-3 overflow-x-auto">
                          {v.images.map((img: string, i: number) => (
                            <img
                              key={i}
                              src={img}
                              alt={`Variation ${idx + 1} Image ${i + 1}`}
                              className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isEditingProduct}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-black "
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isEditingProduct}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:bg-gray-300"
              >
                {isEditingProduct ? "Saving" : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
