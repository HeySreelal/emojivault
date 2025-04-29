import { Emoji } from "./emojis/data";
/**
 * Filter emojis based on search term and category
 * @param emojis List of emojis to filter
 * @param searchTerm Search term to filter by
 * @param selectedCategory Category to filter by
 * @returns Filtered list of emojis
 */
export const filterEmojis = (
    emojis: Emoji[],
    searchTerm: string,
    selectedCategory: string
): Emoji[] => {
    return emojis.filter(emoji => {
        const matchesSearch = searchTerm === "" ||
            emoji.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emoji.emoji.includes(searchTerm);
        const matchesCategory = selectedCategory === "All" || emoji.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });
};

/**
 * Copy emoji to clipboard
 * @param emoji The emoji to copy
 * @returns Promise that resolves when copying is done
 */
export const copyEmojiToClipboard = async (emoji: string): Promise<void> => {
    return navigator.clipboard.writeText(emoji);
};