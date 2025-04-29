import { useState, useEffect, useCallback, useMemo } from "react";
import { Search, X, Heart, Sun, Moon } from "lucide-react";
import { Emoji, emojis as emojiData } from "./emojis/data";


// Component for displaying a notification
interface NotificationProps {
  message: string;
  emoji?: string;
}

const Notification: React.FC<NotificationProps> = ({ message, emoji }) => {
  return (
    <div
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-8 py-4 rounded-full flex items-center z-50 shadow-2xl backdrop-blur-md"
      style={{ animation: "floatUp 0.5s cubic-bezier(0.22, 1, 0.36, 1)" }}
    >
      {emoji && <span className="text-2xl mr-3">{emoji}</span>}
      <span className="font-light tracking-wide">{message}</span>
    </div>
  );
};

// Component for a single emoji display in the luxury format
interface EmojiDisplayProps {
  emoji: Emoji;
  onCopy: (emoji: Emoji) => void;
  isDarkMode: boolean;
}

const EmojiDisplay: React.FC<EmojiDisplayProps> = ({ emoji, onCopy, isDarkMode }) => {
  return (
    <div
      onClick={() => onCopy(emoji)}
      className={`group cursor-pointer relative overflow-hidden transition-all duration-500 ease-out
        hover:scale-105 hover:z-10 ${isDarkMode ? 'hover:shadow-purple-500/30' : 'hover:shadow-indigo-500/30'} 
        hover:shadow-xl backdrop-blur-sm p-6 rounded-3xl 
        ${isDarkMode ? 'bg-gradient-to-br from-gray-900/40 to-purple-900/40' : 'bg-gradient-to-br from-white/40 to-indigo-50/40'}
        border ${isDarkMode ? 'border-purple-900/50' : 'border-indigo-100/80'}`}
      title={`${emoji.description} - Click to copy`}
    >
      <div className="flex items-center justify-center aspect-square">
        <div className="transform transition-all duration-500 ease-out group-hover:scale-125 group-hover:-translate-y-1">
          <span className="text-6xl filter drop-shadow-sm">{emoji.emoji}</span>
        </div>
      </div>

      <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-tr 
        ${isDarkMode ? 'from-purple-800 to-indigo-600' : 'from-indigo-400 to-purple-300'} 
        transition-opacity duration-500 rounded-3xl`}></div>
    </div>
  );
};

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

// Loading animation component
const LoadingAnimation: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => (
  <div className="flex flex-col justify-center items-center h-64">
    <div className="relative w-24 h-24">
      <div className={`absolute top-0 left-0 w-full h-full rounded-full ${isDarkMode ? 'border-4 border-purple-800/30' : 'border-4 border-indigo-200/50'}`}></div>
      <div className={`absolute top-0 left-0 w-full h-full rounded-full ${isDarkMode ? 'border-t-4 border-l-4 border-purple-400' : 'border-t-4 border-l-4 border-indigo-600'} animate-spin`}></div>
    </div>
    <p className={`mt-8 text-lg font-light tracking-widest ${isDarkMode ? 'text-purple-300' : 'text-indigo-600'}`}>
      CURATING COLLECTION
    </p>
  </div>
);

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

// Main App component
const App: React.FC = () => {
  // Initialize emojis directly from imported data - no need for state setter
  const emojis = useMemo(() => emojiData, []);

  // Extract unique categories and add "All" as the first option
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(emojiData.map(emoji => emoji.category)));
    return ["All", ...uniqueCategories];
  }, []);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [loading, setLoading] = useState<boolean>(true);
  const [notification, setNotification] = useState<NotificationProps | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true); // Default to dark mode for luxury feel
  const [showIntro, setShowIntro] = useState<boolean>(true);

  // Show notification and automatically hide it after a delay
  const showNotification = useCallback((message: string, emoji?: string): void => {
    setNotification({ message, emoji });
    setTimeout(() => setNotification(null), 2000);
  }, []);

  // Simulate loading for a brief period to show intro screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      // Hide intro after data loads + small delay for animation
      setTimeout(() => setShowIntro(false), 1000);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Handle copying emoji to clipboard
  const handleCopyEmoji = useCallback(async (emoji: Emoji): Promise<void> => {
    try {
      await copyEmojiToClipboard(emoji.emoji);
      showNotification(`Emoji copied to your clipboard`, emoji.emoji);
    } catch {
      showNotification("Failed to copy emoji");
    }
  }, [showNotification]);

  // Clear search field
  const clearSearch = useCallback((): void => {
    setSearchTerm("");
  }, []);

  // Toggle dark mode
  const toggleDarkMode = useCallback((): void => {
    setIsDarkMode(prev => !prev);
  }, []);

  // Memoize filtered emojis to prevent unnecessary recomputation
  const filteredEmojis = useMemo(() =>
    filterEmojis(emojis, searchTerm, selectedCategory),
    [emojis, searchTerm, selectedCategory]
  );

  // Main app background based on dark mode
  const mainBackground = isDarkMode
    ? "bg-gradient-to-br from-black via-purple-950 to-indigo-950 text-white"
    : "bg-gradient-to-br from-white via-indigo-50 to-purple-50 text-gray-800";

  // Intro screen animation
  if (showIntro) {
    return (
      <div className={`${mainBackground} min-h-screen flex items-center justify-center transition-colors duration-500`}>
        <div className="text-center">
          <div className="text-9xl mb-6 animate-bounce">✨</div>
          <h1 className="text-6xl font-thin tracking-widest mb-4">EMOJIVAULT</h1>
          <p className={`text-lg font-light tracking-wide ${isDarkMode ? 'text-purple-300' : 'text-indigo-600'}`}>
            Curating your premium emoji experience...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${mainBackground} min-h-screen transition-colors duration-500 p-4 md:p-6`}>
      {/* Header with luxury branding */}
      <header className="max-w-7xl mx-auto pt-8 pb-12 px-4">
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-7xl font-extralight tracking-widest mb-4">EMOJIVAULT</h1>
          <p className={`text-lg font-light tracking-wider ${isDarkMode ? 'text-purple-300/80' : 'text-indigo-600/80'}`}>
            A CURATED COLLECTION OF DIGITAL EXPRESSIONS
          </p>
        </div>

        {/* Search bar with luxury styling */}
        <div className={`${isDarkMode ? 'bg-gray-900/50' : 'bg-white/70'} backdrop-blur-md rounded-full shadow-xl transition-all duration-300 max-w-3xl mx-auto`}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <Search className={`h-5 w-5 ${isDarkMode ? 'text-purple-400' : 'text-indigo-400'}`} />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search the collection..."
              className={`pl-16 pr-16 py-5 w-full bg-transparent border-none rounded-full focus:outline-none focus:ring-0 
                ${isDarkMode ? 'text-white placeholder-gray-500' : 'text-gray-800 placeholder-gray-400'} 
                text-lg font-light tracking-wide`}
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-6 flex items-center"
              >
                <X className={`h-5 w-5 ${isDarkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-400 hover:text-indigo-600'} transition-colors`} />
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        {/* Controls section */}
        <div className="flex justify-between items-center mb-8 px-4">
          <CategorySelector
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
            isDarkMode={isDarkMode}
          />

          <button
            onClick={toggleDarkMode}
            className={`ml-4 p-3 rounded-full ${isDarkMode ? 'bg-purple-900/50 text-purple-300' : 'bg-indigo-100 text-indigo-600'} transition-colors`}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>

        {/* Notification display */}
        {notification && <Notification {...notification} />}

        {/* Emoji Gallery */}
        <div className="px-4">
          {loading ? (
            <LoadingAnimation isDarkMode={isDarkMode} />
          ) : filteredEmojis.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                {filteredEmojis.map((emoji, index) => (
                  <EmojiDisplay
                    key={`${emoji.emoji}-${index}`}
                    emoji={emoji}
                    onCopy={handleCopyEmoji}
                    isDarkMode={isDarkMode}
                  />
                ))}
              </div>

              {/* Results info */}
              <div className={`mt-12 mb-8 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} flex justify-between items-center`}>
                <div className="flex items-center">
                  <Heart className={`h-4 w-4 mr-2 ${isDarkMode ? 'text-purple-400' : 'text-indigo-400'}`} />
                  <span className="font-light tracking-wider">
                    Displaying <span className={`font-medium ${isDarkMode ? 'text-purple-300' : 'text-indigo-600'}`}>{filteredEmojis.length}</span> of <span className="font-medium">{emojis.length}</span> expressions
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <div className={`p-8 rounded-full mb-8 ${isDarkMode ? 'bg-purple-900/20' : 'bg-indigo-100/50'}`}>
                <Search className={`h-12 w-12 ${isDarkMode ? 'text-purple-300' : 'text-indigo-500'}`} />
              </div>
              <h3 className={`text-2xl font-light tracking-wider ${isDarkMode ? 'text-purple-300' : 'text-indigo-700'} mb-4`}>No matches found</h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-8 font-light tracking-wide`}>
                We couldn't find anything matching "{searchTerm}" in our collection
              </p>
              <button
                onClick={clearSearch}
                className={`px-10 py-4 ${isDarkMode ? 'bg-purple-800 hover:bg-purple-700' : 'bg-indigo-600 hover:bg-indigo-700'} 
                  text-white font-light tracking-widest rounded-full transition-colors shadow-lg`}
              >
                CLEAR SEARCH
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className={`mt-20 text-center ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} text-sm p-8`}>
        <p className="font-light tracking-widest">EMOJIVAULT • PREMIUM EXPRESSIONS • ESTABLISHED 2025</p>
      </footer>
    </div>
  );
};

export default App;