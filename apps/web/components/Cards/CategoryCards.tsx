import { Category } from "@/types";
import Image from "next/image";
import React from "react";
interface CategoryCardsProps {
  category: Category;
}

export default function CategoryCards({ category }: CategoryCardsProps) {
  return (
    <div className="bg-white w-32 md:w-52 shrink-0 p-3 border border-gray-200 flex flex-col items-center justify-center gap-2 shadow-sm">
      <div className="size-10 md:size-20 relative">
        <Image
          src={category.image}
          alt={`${category.name}'s Image`}
          fill
          className="object-cover rounded-xl"
        />
      </div>

      <p className="text-neutral-dark text-xs  md:text-sm text-center font-medium leading-tight">
        {category.name}
      </p>
    </div>
  );
}
