import React from "react";
import ProductActions from "./ProductActions";
import { Product } from "@/types";

interface ProductTableProps {
  products: Product[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Stock
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Solds
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product._id}>
              <td className="px-6 py-4 text-black">{product.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-black">
                ₱{product.price.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-black">
                {product.stock}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-black">
                {typeof product.category === "string"
                  ? product.category
                  : product.category.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-black">
                {product.solds}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <ProductActions
                  onEdit={() => onEdit(product._id)}
                  onDelete={() => onDelete(product._id)}
                  textToCopy={product._id}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
