import React, { useState } from "react";
import ProductActions from "../Products/ProductActions";
import { Product, Variation } from "@/types";
import ProductVariationsInput from "./VariationModal";

interface VariationTableProps {
  variation: Variation[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function VariationTable({
  variation,
  onEdit,
  onDelete,
}: VariationTableProps) {
  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              SKU
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Stock
            </th>

            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {variation.map((v) => (
            <tr key={v._id}>
              <td className="px-6 py-4 text-black">{v.sku}</td>
              <td className="px-6 py-4 whitespace-nowrap text-black">
                ₱{v.price.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-black">
                {v.stock}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <ProductActions
                  onEdit={() => onEdit(v._id)}
                  onDelete={() => onDelete(v._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
