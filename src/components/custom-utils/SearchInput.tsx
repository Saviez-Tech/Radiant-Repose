import { Search } from "lucide-react";
import { FiSearch } from "react-icons/fi";

type SearchInputProps = {
  placeholder: string;
};

export default function SearchInput({ placeholder }: SearchInputProps) {
  return (
    <div className="w-full max-w-5xl relative">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full py-3 px-4 rounded-md border-none shadow-sm focus:outline-none focus:ring-2 md:text-base text-xs focus:ring-primary-red text-gray-700"
      />
      <button
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </button>
    </div>
  );
}
