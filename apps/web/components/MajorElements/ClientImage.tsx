// ClientImage.tsx
"use client";

import Image from "next/image";

export default function ClientImage({ src, alt, className }: any) {
  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      onContextMenu={(e) => e.preventDefault()}
    />
  );
}
