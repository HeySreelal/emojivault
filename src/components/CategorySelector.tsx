import React, { useRef } from 'react';
import { EmojiCategory } from '../types/types';

// Updated props to use your EmojiCategory class
interface CategorySelectorProps {
    categories: EmojiCategory[];
    selectedCategory: EmojiCategory | null;
    onSelect: (categoryId: EmojiCategory | null) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
    categories,
    selectedCategory,
    onSelect,
}) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300; // Adjust this value based on your needs
            const currentScroll = scrollContainerRef.current.scrollLeft;

            scrollContainerRef.current.scrollTo({
                left: direction === 'left'
                    ? currentScroll - scrollAmount
                    : currentScroll + scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="relative flex items-center w-full">
            {/* Left chevron */}
            <button
                onClick={() => scroll('left')}
                className={`absolute left-0 z-10 flex items-center justify-center w-8 h-8 rounded-full shadow-md bg-gray-800 text-gray-200 hover:bg-gray-700`}
                aria-label="Scroll left"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
            </button>

            {/* Scrollable container */}
            <div
                ref={scrollContainerRef}
                className="overflow-x-auto scrollbar-hide py-2 mx-10 w-full"
            >
                <div className="flex gap-3 pb-1 min-w-max">
                    {categories.map(category => {
                        const isSelected = category === selectedCategory;

                        return (
                            <button
                                key={category.name ?? 'all'}
                                onClick={() => onSelect(category)}
                                className={`whitespace-nowrap px-6 py-3 rounded-full text-sm font-light tracking-wide transition-all duration-300
                                    ${isSelected
                                        ? 'bg-gradient-to-r from-purple-800 to-indigo-700 text-white shadow-lg shadow-purple-600/20'
                                        : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/70'
                                    }`}
                            >
                                <span className="mr-2">{category.emoji}</span>
                                {category.name}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Right chevron */}
            <button
                onClick={() => scroll('right')}
                className={`absolute right-0 z-10 flex items-center justify-center w-8 h-8 rounded-full shadow-md bg-gray-800 text-gray-200 hover:bg-gray-700`}
                aria-label="Scroll right"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    );
};

export default CategorySelector;