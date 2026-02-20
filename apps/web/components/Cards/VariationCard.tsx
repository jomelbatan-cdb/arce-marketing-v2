import { Variation } from "@/types";
import Image from "next/image";
import React from "react";

type VariationCardProps = {
  variation: Variation;
  selected: boolean;
  onSelect: (id: string) => void;
};

export default function VariationCard({
  variation,
  selected,
  onSelect,
}: VariationCardProps) {
  if (!variation?.images?.length) return null;

  return (
    <button
      type="button"
      onClick={() => onSelect(variation._id)}
      className={[
        "inline-flex items-center gap-2 rounded border px-2 py-1 transition",
        selected
          ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600"
          : "border-gray-300 bg-gray-100 hover:bg-gray-200",
      ].join(" ")}
    >
      <div className="relative size-10 overflow-hidden">
        <Image
          src={variation.images[0]}
          alt={variation.sku ?? "Variation"}
          width={40}
          height={40}
          className="object-contain"
        />
      </div>

      <span className="whitespace-nowrap text-sm text-gray-700">
        {variation.sku}
      </span>
    </button>
  );
}
