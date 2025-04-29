import { CATEGORIES, Emoji, EmojiCategory } from "../emojis/data";

/**
 * Filters emoji list based on search terms and category selection.
 * Supports partial word matching for better user experience while typing.
 * Prevents false positive matches (e.g., "unhappy" won't match when searching for "happy").
 * 
 * @param {Emoji[]} emojis - The complete array of emoji objects to filter
 * @param {string} searchTerm - User-provided search string (can contain multiple words)
 * @param {EmojiCategory | null} selectedCategory - The currently selected emoji category filter
 * @returns {Emoji[]} Filtered array of emoji objects matching both search and category criteria
 */
const filterEmojis = (
    emojis: Emoji[],
    searchTerm: string,
    selectedCategory: EmojiCategory | null
): Emoji[] => {
    return emojis.filter(emoji => {
        // First check if emoji matches the category filter
        const categoryMatch = selectedCategory === CATEGORIES.ALL || emoji.category === selectedCategory;

        // If no search term or category doesn't match, just return category match
        if (!searchTerm.trim() || !categoryMatch) {
            return categoryMatch;
        }

        // Split the search term into individual words
        const searchTerms = searchTerm.toLowerCase().split(/\s+/).filter(term => term.length > 0);

        // If we have search terms, check if any of them match
        if (searchTerms.length > 0) {
            // Get all words from the description
            const descriptionWords = emoji.description.toLowerCase().split(/\s+/).filter(word => word.length > 0);

            return searchTerms.some(searchTerm => {
                // Prevent matching substrings inside negative words
                // Example: avoid matching "happy" inside "unhappy"
                const negativeMatches = ['un', 'not', 'non'].some(prefix => {
                    return descriptionWords.some(word =>
                        word.startsWith(prefix) &&
                        word.substring(prefix.length) === searchTerm
                    );
                });

                if (negativeMatches) {
                    return false;
                }

                // Check for word starts-with match (partial word matching)
                // This ensures "hap" will match "happy"
                return descriptionWords.some(word => word.startsWith(searchTerm));
            });
        }

        return categoryMatch;
    });
};

// Function to copy emoji to clipboard
const copyEmojiToClipboard = async (emoji: string): Promise<void> => {
    return navigator.clipboard.writeText(emoji);
};


export { filterEmojis, copyEmojiToClipboard }