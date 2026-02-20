"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CarouselProps = {
  images: string[];
  interval?: number; // milliseconds (default 4000)
};

export default function Carousel({ images, interval = 4000 }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const total = images.length;

  const next = () => {
    setCurrent((prev) => (prev + 1) % total);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + total) % total);
  };

  // ✅ Auto-looping
  useEffect(() => {
    if (isHovering) return;

    timeoutRef.current = setTimeout(next, interval);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current, isHovering, interval]);

  if (!images.length) return null;

  return (
    <div
      className="relative w-full overflow-hidden group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* ✅ Images */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, index) => (
          <div key={index} className="min-w-full flex justify-center">
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              width={1200} // match your real image ratio
              height={360} // match your real image ratio
              className="w-full h-auto object-contain"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* ✅ Left Chevron */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 
        bg-black/50 text-white p-2 rounded-full
        opacity-0 group-hover:opacity-100 transition"
      >
        <ChevronLeft size={22} />
      </button>

      {/* ✅ Right Chevron */}
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 
        bg-black/50 text-white p-2 rounded-full
        opacity-0 group-hover:opacity-100 transition"
      >
        <ChevronRight size={22} />
      </button>

      {/* ✅ Dots */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 
        flex gap-2 opacity-0 group-hover:opacity-100 transition"
      >
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2.5 w-2.5 rounded-full transition-all ${
              index === current ? "bg-white scale-110" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
