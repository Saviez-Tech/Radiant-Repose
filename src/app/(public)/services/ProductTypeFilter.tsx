import { useState } from "react";

export default function ProductTypeFilter({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (value: string) => void;
}) {
  return (
    <div className="flex gap-2 flex-1 md:gap-4 overflow-x-auto hide-scrollbar">
      {categories.map((cat) => (
        <button
          key={cat.label}
          onClick={() => setActiveTab(cat.value)}
          className={`px-4 py-2 rounded-[35px] text-xs font-medium whitespace-nowrap ${
            activeTab === cat.value
              ? "bg-primary-darkRed text-white"
              : "bg-[#EFE1D2] text-primary-dark_slate/40"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
const categories = [
  { label: "All Items", value: "" },
  { label: "Bags", value: "bags" },
  { label: "Watches", value: "watches" },
  { label: "Jewelry", value: "jewelry" },
  { label: "Shoes", value: "shoes" },
];
