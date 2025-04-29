/** The Emoji Category */
export class EmojiCategory {
    constructor(public emoji: string, public name: string) { }
}

// Define categories only once
export const CATEGORIES = {
    ALL: new EmojiCategory('✨', 'All'),
    SMILEYS: new EmojiCategory('😊', 'Smileys'),
    GESTURES: new EmojiCategory('🫶', 'Gestures'),
    PEOPLE: new EmojiCategory('👥', 'People'),
    CLOTHING: new EmojiCategory('👚', 'Clothing & Accessories'),
};

// Generate the categories map dynamically from CATEGORIES
export const categories: Record<string, EmojiCategory> = {};
Object.values(CATEGORIES).forEach(category => {
    categories[category.name] = category;
});

/** The Emoji Class */
export class Emoji { constructor(public emoji: string, public description: string, public category: EmojiCategory) { } }

// Shorthand methods
export const E = (emoji: string, description: string, category: EmojiCategory): Emoji => new Emoji(emoji, description, category);
export const ES = (emoji: string, description: string): Emoji => new Emoji(emoji, description, CATEGORIES.SMILEYS);
export const EG = (emoji: string, description: string): Emoji => new Emoji(emoji, description, CATEGORIES.GESTURES);
export const EP = (emoji: string, description: string): Emoji => new Emoji(emoji, description, CATEGORIES.PEOPLE);
export const EC = (emoji: string, description: string): Emoji => new Emoji(emoji, description, CATEGORIES.CLOTHING);
