"use client";

import { useState, useRef, useEffect } from "react";

interface DropdownProps<T> {
  options: T[]; // Array of objects
  value: T | null; // Currently selected object
  onChange: (value: T) => void; // Callback when selected
  displayKey: keyof T; // Key to display in dropdown
  valueKey: keyof T; // Key to identify selection
  placeholder?: string;
  height?: string;
}

function Dropdown<T extends Record<string, any>>({
  options,
  value,
  onChange,
  displayKey,
  valueKey,
  placeholder = "Select...",
  height = "150px",
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full border border-black text-black rounded px-4 py-2 text-left focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {value ? value[displayKey] : placeholder}
      </button>

      {isOpen && (
        <ul
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg overflow-y-auto"
          style={{ maxHeight: height }}
        >
          {options.map((option, idx) => (
            <li
              key={(option[valueKey] as any) || idx}
              className={`px-4 py-2 cursor-pointer hover:bg-indigo-100 text-black${
                value && option[valueKey] === value[valueKey]
                  ? "bg-indigo-50 font-medium"
                  : ""
              }`}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option[displayKey]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
