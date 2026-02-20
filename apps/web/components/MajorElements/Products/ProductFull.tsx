import React, { useState } from "react";
import Carousel from "../CarouselManual";
import { Product } from "@/types";
import ShareActions from "@/components/Button/ShareAction";
import Breadcrumbs from "../BreadCrumbs";
import ProductInfo from "./ProductInfo";

interface ProductFullProps {
  product: Product;
}

export default function ProductFull({ product }: ProductFullProps) {
  const discountedPrice = product.discount
    ? product.price - (product.price * product.discount) / 100
    : product.price;
  const [selectedVariationId, setSelectedVariationId] = useState<string | null>(
    null,
  );

  const selectedVariation = React.useMemo(() => {
    return (
      product.variations?.find((v) => v._id === selectedVariationId) ?? null
    );
  }, [product.variations, selectedVariationId]);

  const displayImages = React.useMemo(() => {
    // 1. If a variation is selected and it has images → use them
    if (selectedVariation?.images?.length) {
      return selectedVariation.images;
    }

    // 2. Otherwise fallback to product images + all variation images
    const mainImages = product.images ?? [];
    const variationImages =
      product.variations?.flatMap((v) => v.images ?? []) ?? [];

    return [...mainImages, ...variationImages];
  }, [product.images, product.variations, selectedVariation]);

  const toggleVariation = (id: string) => {
    setSelectedVariationId((prev) => (prev === id ? null : id));
  };
  const displayPrice = React.useMemo(() => {
    // Variation has price override?
    if (selectedVariation?.price) {
      return selectedVariation.price;
    }

    // default product price
    return product.discount
      ? product.price - (product.price * product.discount) / 100
      : product.price;
  }, [product.price, product.discount, selectedVariation]);

  if (!product) return null;
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      {/* Top Section */}
      <Breadcrumbs />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Images */}
        <div className="rounded-xl border bg-gray-50 p-4">
          <Carousel images={displayImages} />
          {/* Share */}
          <div className="flex items-center gap-3 pt-4 border-t">
            <span className="text-sm text-gray-500">Share</span>
            <ShareActions url="www.facebook.com" />
          </div>
        </div>

        <ProductInfo
          product={product}
          displayPrice={displayPrice}
          selectedVariationId={selectedVariationId}
          selectedVariation={selectedVariation}
          toggleVariation={toggleVariation}
        />
      </div>

      {/* Description Section */}
      <div className="mt-20 border-t pt-10">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Product Description
        </h2>

        <p className="max-w-3xl whitespace-pre-line text-gray-600 leading-relaxed">
          {product.description}
        </p>
      </div>
    </div>
  );
}
