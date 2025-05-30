import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Search, X, Heart, ArrowUp } from "lucide-react";
import { categories, CATEGORIES, Emoji, EmojiCategory } from "./types/types";
import { emojis as emojiData } from "./emojis/data";
import Notification, { NotificationProps } from "./components/Notification";
import { copyEmojiToClipboard, filterEmojis } from "./utils/emojiUtils";
import CategorySelector from "./components/CategorySelector";
import Loading from "./components/Loading";
import EmojiDisplay from "./components/EmojiDisplay";
import { analytics } from "./config/firebase";
import { logEvent } from "firebase/analytics";

// Main App component
const App: React.FC = () => {
  // Initialize emojis directly from imported data - no need for state setter
  const emojis = useMemo(() => emojiData, []);

  // Extract unique categories and add "All" as the first option
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<EmojiCategory | null>(CATEGORIES.ALL);
  const [loading, setLoading] = useState<boolean>(true);
  const [notification, setNotification] = useState<NotificationProps | null>(null);
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [showScrollToTop, setShowScrollToTop] = useState<boolean>(false);
  const [searchInitiated, setSearchInitiated] = useState<boolean>(false);

  // Create a ref for the search input
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Show notification and automatically hide it after a delay
  const showNotification = useCallback((message: string, emoji?: string): void => {
    setNotification({ message, emoji });
    setTimeout(() => setNotification(null), 2000);
  }, []);


  // Log app_open event when the component mounts
  useEffect(() => {
    logEvent(analytics, 'app_open', {
      timestamp: new Date().toISOString(),
    });
  }, []);

  // Simulate loading for a brief period to show intro screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      // Hide intro after data loads + small delay for animation
      setTimeout(() => setShowIntro(false), 1000);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Add keyboard shortcut listener for "/"
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only focus if "/" is pressed and user is not typing in an input field
      if (e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault(); // Prevent "/" from being entered in the input
        searchInputRef.current?.focus();

        // Log shortcut usage
        logEvent(analytics, 'keyboard_shortcut_used', {
          shortcut: 'slash_to_search'
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handle scroll events to show/hide the scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      // Show button when scrolled down 300px from the top
      setShowScrollToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Log search event when searchTerm changes (with debounce)
  useEffect(() => {
    if (searchTerm && searchTerm.length > 0) {
      setSearchInitiated(true);
      const timer = setTimeout(() => {
        logEvent(analytics, 'search', {
          search_term: searchTerm,
          current_category: selectedCategory?.name || 'All',
          results_count: filterEmojis(emojis, searchTerm, selectedCategory).length
        });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [searchTerm, selectedCategory, emojis]);

  // Handle copying emoji to clipboard
  const handleCopyEmoji = useCallback(async (emoji: Emoji): Promise<void> => {
    try {
      await copyEmojiToClipboard(emoji.emoji);

      // Track emoji copy event
      logEvent(analytics, 'emoji_copied', {
        emoji: emoji.emoji,
        emoji_description: emoji.description,
        emoji_category: emoji.category.name,
        search_term: searchTerm || 'none'
      });

      showNotification(`Emoji copied to your clipboard`, emoji.emoji);
    } catch {
      logEvent(analytics, 'emoji_copy_failed', {
        emoji: emoji.emoji
      });
      showNotification("Failed to copy emoji");
    }
  }, [showNotification, searchTerm]);

  // Clear search field
  const clearSearch = useCallback((): void => {
    if (searchInitiated) {
      logEvent(analytics, 'search_cleared', {
        previous_search: searchTerm
      });
      setSearchInitiated(false);
    }
    setSearchTerm("");
    searchInputRef.current?.focus();
  }, [searchTerm, searchInitiated]);

  // Scroll to top function
  const scrollToTop = useCallback((): void => {
    logEvent(analytics, 'scroll_to_top', {
      scroll_position: window.scrollY
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);

  // Track external link clicks
  const handleExternalLinkClick = useCallback((linkName: string, url: string): void => {
    logEvent(analytics, 'external_link_click', {
      link_name: linkName,
      url: url
    });
  }, []);

  // Memoize filtered emojis to prevent unnecessary recomputation
  const filteredEmojis = useMemo(() =>
    filterEmojis(emojis, searchTerm, selectedCategory),
    [emojis, searchTerm, selectedCategory]
  );

  // Main app background - dark theme only
  const mainBackground = "bg-gradient-to-br from-black via-purple-950 to-indigo-950 text-white";

  // Intro screen animation
  if (showIntro) {
    return (
      <div className={`${mainBackground} min-h-screen flex items-center justify-center transition-colors duration-500`}>
        <div className="flex flex-col items-center justify-center text-center">
          <img src="/logo.png" alt="Logo" className="w-48 h-48 mb-8 animate-bounce" />
          <p className="text-2xl font-light tracking-wide text-purple-300">
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
        <div className="flex flex-col items-center mb-12 px-4">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extralight tracking-widest mb-4 text-center">EMOJIVAULT</h1>
          <p className="text-sm md:text-lg font-light tracking-wider text-center text-purple-300/80">
            A CURATED COLLECTION OF DIGITAL EXPRESSIONS
          </p>
        </div>

        {/* Search bar with luxury styling */}
        <div className="bg-gray-900/50 backdrop-blur-md rounded-full shadow-xl transition-all duration-300 max-w-3xl mx-auto relative">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-purple-400" />
            </div>
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search the collection..."
              className="pl-16 pr-16 py-5 w-full bg-transparent border-none rounded-full focus:outline-none focus:ring-0 
                text-white placeholder-gray-500 text-lg font-light tracking-wide"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-6 flex items-center"
              >
                <X className="h-5 w-5 text-gray-400 hover:text-purple-400 transition-colors" />
              </button>
            )}
          </div>
          {/* Keyboard shortcut indicator */}
          <div className="absolute right-0 -bottom-8 text-xs text-gray-500 font-light tracking-wide flex items-center">
            <span className="px-2 py-1 bg-gray-800/50 rounded-md mr-2">/</span>
            <span>to focus search</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        {/* Controls section */}
        <div className="flex justify-between items-center mb-8 px-4">
          <CategorySelector
            categories={Object.values(categories)}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>
        {/* Notification display */}
        {notification && <Notification {...notification} />}

        {/* Emoji Gallery */}
        <div className="px-4">
          {loading ? (
            <Loading />
          ) : filteredEmojis.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                {filteredEmojis.map((emoji, index) => (
                  <EmojiDisplay
                    key={`${emoji.emoji}-${index}`}
                    emoji={emoji}
                    onCopy={handleCopyEmoji}
                  />
                ))}
              </div>

              {/* Results info */}
              <div className="mt-12 mb-8 text-sm text-gray-400 flex justify-between items-center">
                <div className="flex items-center">
                  <Heart className="h-4 w-4 mr-2 text-purple-400" />
                  <span className="font-light tracking-wider">
                    Displaying <span className="font-medium text-purple-300">{filteredEmojis.length}</span> of <span className="font-medium">{emojis.length}</span> expressions
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="p-8 rounded-full mb-8 bg-purple-900/20">
                <Search className="h-12 w-12 text-purple-300" />
              </div>
              <h3 className="text-2xl font-light tracking-wider text-purple-300 mb-4">No matches found</h3>
              <p className="text-gray-400 mb-8 font-light tracking-wide">
                We couldn't find anything matching "{searchTerm}" in our collection
              </p>
              <button
                onClick={clearSearch}
                className="px-10 py-4 bg-purple-800 hover:bg-purple-700 
                  text-white font-light tracking-widest rounded-full transition-colors shadow-lg"
              >
                CLEAR SEARCH
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Scroll to top button - appears when scrolled */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110
            bg-purple-800 hover:bg-purple-700 text-white z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      {/* Footer */}
      <footer className="mt-20 text-center text-gray-500 text-sm p-8">
        <p className="font-light">
          EMOJIVAULT, made with ❤️ by{" "}
          <a
            href="https://github.com/heysreelal"
            className="text-blue-400 hover:text-blue-300 font-medium"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleExternalLinkClick('github_profile', 'https://github.com/heysreelal')}
          >
            @HeySreelal
          </a>
          {" • "}
          <a
            href="https://github.com/heysreelal/emojivault"
            className="text-blue-400 hover:text-blue-300 font-medium"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleExternalLinkClick('github_repo', 'https://github.com/heysreelal/emojivault')}
          >
            Open Source
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;