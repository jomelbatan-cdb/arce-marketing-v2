import React from "react";
import { ShoppingCart } from "lucide-react";

interface CartButtonProps {
  count: number;
}

export default function CartButton({ count }: CartButtonProps) {
  return (
    <button className="relative" aria-label="Cart">
      <ShoppingCart
        className="size-6 md:size-10"
        strokeWidth={2}
        color="#000eff"
      />
      {count > 0 && (
        <span className="absolute -top-1 -right-2 md:-right-4  p-1 text-[6px] md:text-xs font-bold text-white bg-black rounded-full flex items-center justify-center">
          {count > 100 ? "99+" : count}
        </span>
      )}
    </button>
  );
}
