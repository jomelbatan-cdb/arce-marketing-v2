import React from "react";
import Image from "next/image";
import { arceAssets } from "@/constant";

export default function OutHeaders({ label }: { label?: string }) {
  return (
    <header>
      <nav className="py-4 md:pl-32 flex flex-row items-center gap-8 border-b border-gray-50 shadow-sm">
        <div className="flex flex-row items-center  gap-8">
          <Image
            src={arceAssets.ARCE}
            alt="ARCE Logo"
            className="h-8 md:h-10 w-fit"
          />
        </div>
        <h1 className="text-primary text-2xl">{label}</h1>
      </nav>
    </header>
  );
}
