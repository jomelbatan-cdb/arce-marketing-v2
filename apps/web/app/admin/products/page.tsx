"use client";

import React, { useState, useEffect } from "react";
import SearchBar from "@/components/MajorElements/Products/SearchBar";
import ProductTable from "@/components/MajorElements/Products/ProductTable";
import ProductModal from "@/components/MajorElements/Products/ProductModal";
import { useProducts } from "@/hooks/product/useProduct";
import { useProductStore } from "@/stores/productStore";
import EditProductModal from "@/components/MajorElements/Products/EditProductModal";
import ConfirmationModal from "@/components/Cards/ConfirmationModal";
import { useDeleteProduct } from "@/hooks/product/useDeleteProduct";
import toast from "react-hot-toast";

const PAGE_SIZE = 10;

const AdminProducts = () => {
  const [search, setSearch] = useState("");

  const { product, setProduct } = useProductStore();
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { deleteProduct } = useDeleteProduct();
  const { products, meta, isLoading, isFetching, isError } = useProducts({
    page,
    limit: PAGE_SIZE,
  });

  const totalPages = meta?.totalPages ?? 1;

  const handleEdit = (id: string) => {
    const productToEdit = products?.find((p) => p._id === id) || null;
    setProduct(productToEdit);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: string) => {
    const productToDelete = products.find((p) => p._id === id);
    if (!productToDelete) return;

    setProduct(productToDelete);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-black">
          Products Dashboard
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add Product
        </button>
      </div>

      <SearchBar search={search} setSearch={setSearch} />
      {isFetching && !isLoading && (
        <p className="text-sm text-gray-400 mb-2">Loading page {page}...</p>
      )}
      <ProductTable
        products={products || []}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <div className="flex justify-end mt-4 gap-2">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50  text-black"
        >
          Previous
        </button>
        <span className="px-3 py-1  text-black">
          {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 text-black"
        >
          Next
        </button>
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        title="Delete Product?"
        message="Are you sure you want to delete this product? This action cannot be undone."
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          if (!product) return null;
          deleteProduct(product?._id);
          setIsDeleteModalOpen(false);
          toast.success("Product successfully deleted", {
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
};

export default AdminProducts;
