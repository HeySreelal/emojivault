// Component for displaying a notification
export interface NotificationProps {
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
export default Notification;
