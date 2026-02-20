import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  if (!images) return null;
  return (
    <div className="relative w-full max-w-[400px] mb-4 flex flex-col">
      {/* MAIN IMAGE */}
      <div className="relative w-full h-[400px] overflow-hidden rounded-lg">
        <Image
          src={images[current]}
          alt={`Slide ${current + 1}`}
          fill
          className="object-cover"
        />
      </div>

      {/* THUMBNAILS */}
      <div className="flex gap-2 justify-center mt-4 relative">
        {images.map((img, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`relative w-20 h-20 cursor-pointer rounded-lg overflow-hidden border-2 ${
              index === current ? "border-primary" : "border-transparent"
            }`}
          >
            <Image
              src={img}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-gray-700/25  p-2 rounded-full shadow hover:bg-gray-800 transition"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-gray-700/25 p-2 rounded-full shadow hover:bg-gray-800 transition"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
