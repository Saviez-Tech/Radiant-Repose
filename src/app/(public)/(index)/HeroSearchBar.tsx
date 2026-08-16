"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HeroSearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/services/luxury?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center w-full max-w-md mt-2">
      <div className="relative w-full">
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.3-4.3"/>
          </svg>
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-3 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-800/60 text-sm text-gray-700 bg-white"
          aria-label="Search products"
        />
      </div>
      <button
        type="submit"
        className="bg-primary-darkRed text-white px-5 py-3 rounded-r-full text-sm font-medium hover:bg-primary-red transition-colors whitespace-nowrap"
      >
        Search
      </button>
    </form>
  );
}
