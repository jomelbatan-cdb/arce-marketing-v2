"use client";

import React, { useEffect, useState } from "react";

type QuantityCounterProps = {
  defaultValue?: number;
  min?: number;
  max?: number;
  hasVariations: boolean;
  variationId?: string | null;
  onChange?: (value: number) => void;
};

export default function QuantityCounter({
  defaultValue = 1,
  min = 1,
  max = 99,
  hasVariations,
  variationId = null,
  onChange,
}: QuantityCounterProps) {
  const [quantity, setQuantity] = useState<number>(defaultValue);

  /**
   * Disable ONLY when:
   * - product has variations
   * - AND no variation is selected
   */
  const isDisabled = hasVariations && !variationId;

  // Reset quantity when variation changes (only if variations exist)
  useEffect(() => {
    if (!hasVariations) return;

    if (!variationId) {
      setQuantity(min);
      onChange?.(min);
      return;
    }

    setQuantity(defaultValue);
    onChange?.(defaultValue);
  }, [variationId, hasVariations, defaultValue, min, onChange]);

  const updateQuantity = (value: number) => {
    const next = Math.max(min, Math.min(max, value));
    setQuantity(next);
    onChange?.(next);
  };

  const handleIncrement = () => {
    if (isDisabled) return;
    updateQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (isDisabled) return;
    updateQuantity(quantity - 1);
  };

  return (
    <div className="flex items-center">
      <button
        onClick={handleDecrement}
        disabled={isDisabled || quantity <= min}
        className="w-10 h-10 rounded-l bg-primary-pastel disabled:opacity-50"
      >
        -
      </button>

      <input
        value={quantity}
        min={min}
        max={max}
        disabled={isDisabled}
        onChange={(e) => {
          const value = Number(e.target.value);
          if (Number.isNaN(value)) return;
          updateQuantity(value);
        }}
        className="w-16 h-10 text-center border border-x-0 border-primary-pastel focus:outline-none text-primary disabled:bg-gray-100"
      />

      <button
        onClick={handleIncrement}
        disabled={isDisabled || quantity >= max}
        className="w-10 h-10 rounded-r bg-primary-pastel disabled:opacity-50"
      >
        +
      </button>
    </div>
  );
}
