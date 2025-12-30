import { Category, CategoryTabsProps } from "@/types/interface/dashboard";

const CategoryTabs = ({
  selectedCategory,
  onCategoryChange,
}: CategoryTabsProps) => {
  const categories: Category[] = ["Adult", "Campus", "Youth", "Children"];

  return (
    <div className="border-b border-black/10 dark:border-white/10 mb-6">
      <div className="flex gap-6 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`pb-4 px-2 text-sm uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
              selectedCategory === category
                ? "border-b-2 border-navy dark:border-white text-navy dark:text-white font-bold"
                : "text-black/60 dark:text-white/60 hover:text-navy dark:hover:text-white"
            }`}
          >
            {category} {category === "Campus" ? "Fellowship" : "Church"}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;
