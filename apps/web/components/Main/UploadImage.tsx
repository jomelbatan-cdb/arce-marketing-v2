"use client";

import { useRef } from "react";
import { Image as ImageIcon, X } from "lucide-react";

interface ImageUploadProps {
  existingImages: string[];
  uploadedImages: File[];
  setExistingImages: (images: string[]) => void;
  setUploadedImages: (files: File[]) => void;
  max?: number;
}

export default function ImageUpload({
  existingImages,
  uploadedImages,
  setExistingImages,
  setUploadedImages,
  max = 5,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const totalImages = existingImages.length + uploadedImages.length;

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selected = Array.from(e.target.files);
    const remaining = max - totalImages;

    setUploadedImages([...uploadedImages, ...selected.slice(0, remaining)]);
    e.target.value = "";
  };

  return (
    <div className="space-y-3">
      {/* Upload Button */}
      {totalImages < max && (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="cursor-pointer border-2 border-dashed border-gray-600 rounded-xl p-6 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition"
        >
          <ImageIcon className="w-10 h-10 text-gray-500" />
          <p className="text-gray-600 font-medium">Choose images</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
            className="hidden"
          />
        </div>
      )}

      {/* Previews */}
      <div className="flex gap-4 overflow-x-auto py-2">
        {/* Existing Images */}
        {existingImages.map((url, idx) => (
          <Preview
            key={`existing-${idx}`}
            src={url}
            onRemove={() =>
              setExistingImages(existingImages.filter((_, i) => i !== idx))
            }
          />
        ))}

        {/* New Uploads */}
        {uploadedImages
          .filter((file): file is File => file instanceof File) // ✅ type guard
          .map((file, idx) => (
            <Preview
              key={`upload-${idx}`}
              src={URL.createObjectURL(file)}
              onRemove={() =>
                setUploadedImages(uploadedImages.filter((_, i) => i !== idx))
              }
            />
          ))}
      </div>
    </div>
  );
}

function Preview({ src, onRemove }: { src: string; onRemove: () => void }) {
  return (
    <div className="relative shrink-0 w-32 h-32 rounded-lg overflow-hidden border group">
      <img src={src} className="w-full h-full object-cover" />
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
      >
        <X size={16} />
      </button>
    </div>
  );
}
