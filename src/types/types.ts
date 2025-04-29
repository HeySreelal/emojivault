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
    ANIMALS: new EmojiCategory('🐱', 'Animals'),
    NATURE: new EmojiCategory('🌿', 'Nature'),
    CELESTIAL: new EmojiCategory('🌟', 'Celestial'),
    WEATHER: new EmojiCategory('☀️', 'Weather'),
    FRUITS: new EmojiCategory('🍎', 'Fruits'),
    FOOD: new EmojiCategory('🍔', 'Food'),
    DRINKS: new EmojiCategory('🥤', 'Drinks'),
    VEHICLES: new EmojiCategory('🚗', 'Vehicles'),
    PLACES: new EmojiCategory('🏙️', 'Places'),
    SCENERY: new EmojiCategory('🏞️', 'Scenery'),
    HEARTS: new EmojiCategory('❤️', 'Hearts'),
    SPORTS: new EmojiCategory('⚽️', 'Sports'),
    OBJECTS: new EmojiCategory('📱', 'Objects'),
    SYMBOLS: new EmojiCategory('🔣', 'Symbols'),
    FLAGS: new EmojiCategory('🏴', 'Flags'),

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
export const EA = (emoji: string, description: string): Emoji => new Emoji(emoji, description, CATEGORIES.ANIMALS);
export const EN = (emoji: string, description: string): Emoji => new Emoji(emoji, description, CATEGORIES.NATURE);
export const ECl = (emoji: string, description: string): Emoji => new Emoji(emoji, description, CATEGORIES.CELESTIAL);
export const EW = (emoji: string, description: string): Emoji => new Emoji(emoji, description, CATEGORIES.WEATHER);
export const EF = (emoji: string, description: string): Emoji => new Emoji(emoji, description, CATEGORIES.FRUITS);
export const EFood = (emoji: string, description: string): Emoji => new Emoji(emoji, description, CATEGORIES.FOOD);
export const ED = (emoji: string, description: string): Emoji => new Emoji(emoji, description, CATEGORIES.DRINKS);
export const EV = (emoji: string, description: string): Emoji => new Emoji(emoji, description, CATEGORIES.VEHICLES);
export const EPlaces = (emoji: string, description: string): Emoji => new Emoji(emoji, description, CATEGORIES.PLACES);
export const ESC = (emoji: string, description: string): Emoji => new Emoji(emoji, description, CATEGORIES.SCENERY);
export const EH = (emoji: string, description: string): Emoji => new Emoji(emoji, description, CATEGORIES.HEARTS);
export const ESP = (emoji: string, description: string): Emoji => new Emoji(emoji, description, CATEGORIES.SPORTS);
export const EO = (emoji: string, description: string): Emoji => new Emoji(emoji, description, CATEGORIES.OBJECTS);
export const ESY = (emoji: string, description: string): Emoji => new Emoji(emoji, description, CATEGORIES.SYMBOLS);
export const EFlag = (emoji: string, description: string): Emoji => new Emoji(emoji, description, CATEGORIES.FLAGS);
