"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X, Loader2 } from "lucide-react";

export default function PreorderSearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("q") || "";
  const [searchTerm, setSearchTerm] = useState(currentQuery);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchTerm.trim();
    startTransition(() => {
      if (trimmed) {
        router.push(`/preorder?q=${encodeURIComponent(trimmed)}`);
      } else {
        router.push("/preorder");
      }
    });
  };

  const handleClear = () => {
    setSearchTerm("");
    startTransition(() => {
      router.push("/preorder");
    });
  };

  return (
    <div className="w-full max-w-xl mb-8">
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-3.5 flex items-center text-gray-400 pointer-events-none">
            {isPending ? (
              <Loader2 className="animate-spin text-primary-darkRed" size={17} />
            ) : (
              <Search size={17} />
            )}
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search upcoming pre-orders (e.g. food flask, oven, skin…)"
            className="w-full pl-10 pr-9 py-2.5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-darkRed/20 focus:border-primary-darkRed text-sm text-primary-deepBlack bg-white placeholder-gray-400 shadow-sm transition-all"
            aria-label="Search pre-orders"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-700"
              title="Clear search"
            >
              <X size={15} />
            </button>
          )}
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="bg-primary-darkRed text-white px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-primary-red transition-all shadow-sm shrink-0 active:scale-95 disabled:opacity-70"
        >
          Search
        </button>
      </form>

      {/* Active filter badge */}
      {currentQuery && (
        <div className="flex items-center gap-2 mt-3 text-xs text-primary-text_stone_color">
          <span>Showing results for:</span>
          <span className="inline-flex items-center gap-1 font-semibold text-primary-darkRed bg-red-50 border border-red-200/60 px-2.5 py-0.5 rounded-full">
            &ldquo;{currentQuery}&rdquo;
            <button
              onClick={handleClear}
              className="hover:text-red-800 ml-0.5"
              title="Remove filter"
            >
              <X size={12} />
            </button>
          </span>
          <button
            onClick={handleClear}
            className="text-xs text-primary-darkRed underline hover:opacity-80 ml-1"
          >
            Show all
          </button>
        </div>
      )}
    </div>
  );
}
