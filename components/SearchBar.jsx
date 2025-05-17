// components/SearchBar.jsx
"use client";

import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function SearchBar({ placeholder = "Search tasks..." }) {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-md">
      <div className="flex items-center gap-2 bg-[#f0fdf4] border border-[#d1fae5] rounded-full px-4 py-2 shadow-sm">
        <FiSearch className="text-[#14B8A6]" size={18} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent border-none outline-none text-[#111827] text-sm"
        />
        <button
          type="submit"
          className="bg-[#14B8A6] text-white px-4 py-1 rounded-full text-sm font-medium hover:bg-teal-600 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
}
