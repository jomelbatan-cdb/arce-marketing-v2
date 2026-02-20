import ProductCard from "@/components/Cards/ProductCard";
import { useRecommendations } from "@/hooks/product/useRecommendation";
import React from "react";

interface RecommendedProps {
  categoryId: string;
  productId: string;
}
export default function Recommended({
  categoryId,
  productId,
}: RecommendedProps) {
  const { recommendation, isError, isLoading } = useRecommendations(
    categoryId,
    productId
  );

  return (
    <div className="flex flex-col w-full">
      {/* Sticky header */}

      <div className=" bg-white z-10 flex justify-center items-center border-b border-gray-200">
        <p className="w-full p-4 text-2xl text-primary-dark relative">
          You May Also Like
        </p>
      </div>

      {/* Scrollable product grid */}
      <div className="grid grid-cols-2 md:grid-cols-6 md:grid-rows-2 gap-4 w-full px-8  py-4 md:px-4">
        {recommendation?.map((product: any) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
}
