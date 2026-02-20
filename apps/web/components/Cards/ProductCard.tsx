import Image from "next/image";
import React from "react";
import { Product } from "@/types";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const discountedPrice = product.discount
    ? product.price - (product.price * product.discount) / 100
    : product.price;
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/product/${product._id}`)}
      className="bg-white shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col cursor-pointer"
    >
      {/* Product Image */}
      <div className="relative w-full h-64">
        {/* 16rem height */}
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover"
        />
        {product.discount && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            -{product.discount}%
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-1">
        <h3
          className="text-base md:text-lg font-semibold text-gray-900 leading-6"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: "3rem", // 2 lines * 1.5rem line-height (leading-6)
          }}
        >
          {product.name}
        </h3>

        {/* Price */}
        <div className="mt-3 flex items-center gap-2"></div>

        {/* Ratings & Sold */}
        <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
          <span className="text-xs md:text-lg font-bold text-primary-muted">
            ₱{discountedPrice.toFixed(2)}
          </span>
          <span className="text-xs md:text-lg">{product.solds} sold</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
