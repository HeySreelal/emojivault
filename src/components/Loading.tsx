// Loading animation component
const Loading: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => (
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


export default Loading;