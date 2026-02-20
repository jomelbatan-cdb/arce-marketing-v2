import { useState, useRef, useEffect } from "react";

interface EnumInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export default function EnumInput({
  value = [],
  onChange,
  placeholder,
}: EnumInputProps) {
  const [input, setInput] = useState("");
  const [tags, setTags] = useState<string[]>(value);
  const containerRef = useRef<HTMLDivElement>(null);

  const addTag = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const updated = [...tags, trimmed];
    setTags(updated);
    onChange(updated);
    setInput("");
  };

  const removeTag = (index: number) => {
    const updated = tags.filter((_, i) => i !== index);
    setTags(updated);
    onChange(updated);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  // Scroll to the end whenever tags change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollWidth,
        behavior: "smooth",
      });
    }
  }, [tags]);

  return (
    <div className="w-full flex flex-col gap-3">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder ?? "Press Enter to add tag"}
        className="border text-black border-black rounded px-3 py-2 w-full focus:outline-none focus:ring focus:ring-gray-300"
      />

      <div
        ref={containerRef}
        className="flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide"
      >
        {tags.map((tag, index) => (
          <div
            key={index}
            className="inline-flex items-center gap-2 bg-gray-200 text-gray-800 px-3 py-1 rounded-full"
          >
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="text-sm font-bold hover:text-red-600"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
