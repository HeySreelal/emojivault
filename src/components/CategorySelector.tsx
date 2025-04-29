
// Category selector component with luxury styling
interface CategorySelectorProps {
    categories: string[];
    selectedCategory: string;
    onSelect: (category: string) => void;
    isDarkMode: boolean;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
    categories,
    selectedCategory,
    onSelect,
    isDarkMode
}) => {
    // Get emoji for category
    const getCategoryEmoji = (category: string): string => {
        switch (category) {
            case "All":
                return "✨";
            case "Smileys":
                return "😊";
            default:
                return "🔍";
        }
    };

    return (
        <div className="overflow-x-auto py-2 no-scrollbar">
            <div className="flex gap-3">
                {categories.map(category => {
                    const isSelected = selectedCategory === category;
                    const displayName = category === "All" ? "All" : category;

                    return (
                        <button
                            key={category}
                            onClick={() => onSelect(category)}
                            className={`whitespace-nowrap px-6 py-3 rounded-full text-sm font-light tracking-wide transition-all duration-300
                ${isSelected
                                    ? isDarkMode
                                        ? 'bg-gradient-to-r from-purple-800 to-indigo-700 text-white shadow-lg shadow-purple-600/20'
                                        : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                                    : isDarkMode
                                        ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/70'
                                        : 'bg-white/50 hover:bg-white/80 text-gray-700 border border-gray-200/50'
                                }`}
                        >
                            <span className="mr-2">{getCategoryEmoji(category)}</span>
                            {displayName}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
export default CategorySelector;