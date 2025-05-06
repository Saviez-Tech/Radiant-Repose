import { useState } from "react";

export default function ProductTypeFilter() {
    const [activeTab, setActiveTab] = useState("All Items");
    return (
        <div className="flex gap-2 flex-1 md:gap-4 overflow-x-auto hide-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-4 py-2 rounded-[35px] text-xs font-medium whitespace-nowrap ${
              activeTab === cat
                ? "bg-primary-darkRed text-white"
                : "bg-[#EFE1D2] text-primary-dark_slate/40"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    );
}
 const categories = ["All Items", "Bags", "Watches", "Jewelry", "Shoes"];