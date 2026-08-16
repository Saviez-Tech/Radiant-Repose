

export default function ProductTypeFilter({
  activeTab,
  setActiveTab,
  onCategoryClick,
}: {
  activeTab: string;
  setActiveTab: (value: string) => void;
  onCategoryClick?: (label: string) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 flex-nowrap w-full" style={{ WebkitOverflowScrolling: "touch" }}>
      {categories.map((cat) => (
        <button
          key={cat.label}
          onClick={() => {
            setActiveTab(cat.value);
            if (onCategoryClick) onCategoryClick(cat.value);
          }}
          className={`px-4 py-2 rounded-[35px] text-xs font-medium whitespace-nowrap ${activeTab === cat.value
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
  { label: "Kids", value: "kids" },
  { label: "Kitchen Ware", value: "kitchen ware" },
  { label: "Household Items", value: "household items" },
  { label: "Electronics & Gadgets", value: "electronics and gadgets" },
];
