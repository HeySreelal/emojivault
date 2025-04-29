import React from 'react';
import { EmojiCategory } from '../types/types';


// Updated props to use your EmojiCategory class
interface CategorySelectorProps {
    categories: EmojiCategory[];
    selectedCategory: EmojiCategory | null;
    onSelect: (categoryId: EmojiCategory | null) => void;
    isDarkMode: boolean;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
    categories,
    selectedCategory,
    onSelect,
    isDarkMode
}) => {
    return (
        <div className="overflow-x-auto scrollbar-hide py-2">
            <div className="flex gap-3 pb-1">
                {categories.map(category => {
                    const isSelected = category === selectedCategory;

                    return (
                        <button
                            key={category.name ?? 'all'}
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
                            <span className="mr-2">{category.emoji}</span>
                            {category.name}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default CategorySelector;