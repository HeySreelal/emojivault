// Loading animation component
const Loading: React.FC = () => (
    <div className="flex flex-col justify-center items-center h-64">
        <div className="relative w-24 h-24">
            <div className={`absolute top-0 left-0 w-full h-full rounded-full border-4 border-purple-800/30`}></div>
            <div className={`absolute top-0 left-0 w-full h-full rounded-full border-t-4 border-l-4 border-purple-400 animate-spin`}></div>
        </div>
        <p className={`mt-8 text-lg font-light tracking-widest text-purple-300`}>
            CURATING COLLECTION
        </p>
    </div>
);


export default Loading;