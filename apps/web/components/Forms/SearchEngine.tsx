import { useState } from "react";
import { Search } from "lucide-react";

interface SearchEngineUIProps {
  onSearch: (value: string) => void;
}

export default function SearchEngineUI({ onSearch }: SearchEngineUIProps) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!query.trim()) return;
    onSearch(query.trim()); // 🔥 bubble up
  };

  return (
    <div className="w-full max-w-2xl mb-6">
      <div className="flex items-center gap-2 rounded-2xl bg-white shadow-md px-4 py-3 border border-gray-200 focus-within:ring-2 focus-within:ring-gray-900">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Enter product ID..."
          className="flex-1 bg-transparent outline-none text-gray-800 placeholder:text-gray-400"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition"
        >
          Search
        </button>
      </div>
    </div>
  );
}
