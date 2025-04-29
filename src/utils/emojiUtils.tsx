import { Emoji } from "../emojis/data";

// Function to filter emojis based on search and category
const filterEmojis = (
    emojis: Emoji[],
    searchTerm: string,
    selectedCategory: string
): Emoji[] => {
    return emojis.filter(emoji => {
        // First check if emoji matches the category filter
        const categoryMatch = selectedCategory === "All" || emoji.category === selectedCategory;

        // If no search term or category doesn't match, just return category match
        if (!searchTerm.trim() || !categoryMatch) {
            return categoryMatch;
        }

        // Otherwise check if search term is in emoji description (case insensitive)
        const searchLower = searchTerm.toLowerCase();
        return emoji.description.toLowerCase().includes(searchLower);
    });
};

// Function to copy emoji to clipboard
const copyEmojiToClipboard = async (emoji: string): Promise<void> => {
    return navigator.clipboard.writeText(emoji);
};


export { filterEmojis, copyEmojiToClipboard }