import { Emoji } from "../types/types";

// Component for a single emoji display in the luxury format
interface EmojiDisplayProps {
    emoji: Emoji;
    onCopy: (emoji: Emoji) => void;
}

const EmojiDisplay: React.FC<EmojiDisplayProps> = ({ emoji, onCopy }) => {
    return (
        <div
            onClick={() => onCopy(emoji)}
            className="group cursor-pointer relative overflow-hidden transition-all duration-500 ease-out
                hover:scale-105 hover:z-10 hover:shadow-purple-500/30 
                hover:shadow-xl backdrop-blur-sm p-6 rounded-3xl 
                bg-gradient-to-br from-gray-900/40 to-purple-900/40
                border border-purple-900/50"
            title={`${emoji.description} - Click to copy`}
        >
            <div className="flex items-center justify-center aspect-square">
                <div className="transform transition-all duration-500 ease-out group-hover:scale-125 group-hover:-translate-y-1">
                    <span className="text-6xl filter drop-shadow-sm">{emoji.emoji}</span>
                </div>
            </div>

            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-tr 
                from-purple-800 to-indigo-600 
                transition-opacity duration-500 rounded-3xl"></div>
        </div>
    );
};

export default EmojiDisplay;