"use client";
import ProductCard from "@/components/Cards/ProductCard";
import { useProducts } from "@/hooks/product/useProduct";
import { useProductShowcase } from "@/hooks/product/useProductShowcase";
import React from "react";

export default function DailyDiscover() {
  const { products, isError, isLoading } = useProductShowcase();

  return (
    <div className="flex flex-col w-full">
      {/* Sticky header */}
      <div className="sticky top-28 bg-white z-10 flex justify-center items-center border-b border-gray-200">
        <p className="w-full text-center text-2xl text-primary-dark relative py-4">
          Daily Discover
        </p>
        <span className="absolute left-0 bottom-0 w-full h-1 bg-linear-to-r from-primary-soft via-primary-muted to-primary-pastel rounded-full"></span>
      </div>

      {/* Scrollable product grid */}
      <div className="grid grid-cols-2 md:grid-cols-6 md:grid-rows-2 gap-4 w-full px-8  py-4 md:px-4">
        {products?.map((product: any) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
}
