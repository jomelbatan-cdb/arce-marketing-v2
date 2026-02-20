"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";

type SearchBarProps = {
  placeholders: string[];
  interval?: number; // ms
};

export default function SearchBar({
  placeholders = [
    "Search for products...",
    "Find your favorite items...",
    "What are you looking for?",
    "Discover something new...",
  ],
  interval = 2500,
}: SearchBarProps) {
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  useEffect(() => {
    if (placeholders.length === 0) return;

    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % placeholders.length);
    }, interval);

    return () => clearTimeout(timer);
  }, [placeholders, interval, index]);

  const handleSearch = () => {
    if (value.trim()) {
      alert(`Searching for: ${value.trim()}`);
      // In your app: router.push(`/search?q=${encodeURIComponent(value.trim())}`);
    }
  };

  return (
    <div className="relative w-full  h-12">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className="w-full h-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      <Search className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />

      {!value && !isFocused && (
        <div className="pointer-events-none absolute left-4 top-[30%] -translate-y-1/2 text-sm w-full max-w-xl text-zinc-400">
          {placeholders.map((text, i) => (
            <div
              key={i}
              className="absolute top-0 left-0 h-5 leading-5 transition-all duration-500 ease-out"
              style={{
                opacity: i === index ? 1 : 0,
                transform:
                  i === index
                    ? "translateY(0)"
                    : i < index
                    ? "translateY(-100%)"
                    : "translateY(100%)",
              }}
            >
              {text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
