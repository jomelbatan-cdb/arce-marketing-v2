"use client";

import {
  TicketPercentIcon,
  PackageCheck,
  ShoppingCart,
  Clock,
  MapPin,
  Info,
} from "lucide-react";

import { Product, Variation } from "@/types";
import VariationCard from "@/components/Cards/VariationCard";
import QuantityCounter from "@/components/Button/QuantityCounter";

type ProductInfoProps = {
  product: Product;
  displayPrice: number;
  selectedVariationId: string | null;
  selectedVariation: Variation | null;
  toggleVariation: (variationId: string) => void;
  onAddToCart?: () => void;
};

export default function ProductInfo({
  product,
  displayPrice,
  selectedVariationId,
  selectedVariation,
  toggleVariation,
  onAddToCart,
}: ProductInfoProps) {
  if (!product) return null;

  return (
    <div className="flex flex-col gap-8">
      {/* Title + Price */}
      <div className="space-y-3">
        <h1 className="text-2xl font-semibold text-gray-900">{product.name}</h1>

        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-primary">
            ₱ {displayPrice}
          </span>

          {product.discount !== 0 && (
            <span className="flex items-center gap-1 text-sm text-primary-muted">
              <TicketPercentIcon size={16} />
              {product.discount}% off
            </span>
          )}
        </div>
      </div>

      {/* Variations */}
      {product.variations && product.variations?.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">
            Available Variations
          </p>

          <div className="flex flex-wrap gap-2">
            {product.variations?.map((variation) => (
              <VariationCard
                key={variation._id}
                variation={variation}
                selected={variation._id === selectedVariationId}
                onSelect={toggleVariation}
              />
            ))}
          </div>
        </div>
      )}

      {/* Info Fillers */}
      <div className="space-y-3 rounded-lg bg-gray-50 p-4 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-gray-500" />
          <span>Preparation time: 1–3 business days</span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-gray-500" />
          <span>Pickup only at our physical store</span>
        </div>

        <div className="flex items-center gap-2">
          <Info size={16} className="text-gray-500" />
          <span>Actual item may vary slightly by variation</span>
        </div>
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-5">
        {" "}
        <span className="text-sm text-gray-500">Quantity: </span>
        <QuantityCounter
          hasVariations={
            Array.isArray(product.variations) && product.variations.length > 0
          }
          variationId={selectedVariation?._id ?? null}
          defaultValue={0}
          min={0}
          max={selectedVariation?.stock || product.stock}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={onAddToCart}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-primary/30 bg-primary/5 py-3 text-sm font-medium text-primary transition hover:bg-primary/10"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>

        <button className="flex-1 rounded-lg bg-primary py-3 text-sm font-semibold text-white transition hover:bg-primary/90">
          Reserve for Pickup
        </button>
      </div>
      {/* Pickup Notice */}
      <div className="flex items-start gap-2 rounded-lg bg-gray-50 p-3 text-sm text-gray-600">
        <PackageCheck size={18} className="mt-0.5" />
        <p>
          Items added to cart are <strong>saved for pickup</strong>. No online
          payment required. Orders will be prepared in advance and completed
          in-store.
        </p>
      </div>
    </div>
  );
}
