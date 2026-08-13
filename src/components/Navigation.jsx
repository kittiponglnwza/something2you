export default function Navigation({ current, total, onGoTo, onNext, onPrev }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3">
      {/* Previous Button */}
      <button
        onClick={onPrev}
        disabled={current <= 1}
        className="w-10 h-10 rounded-full bg-white/75 backdrop-blur-md border border-pink-100/50 shadow-sm flex items-center justify-center text-pink-400 hover:bg-white hover:scale-105 transition-all disabled:opacity-0 disabled:pointer-events-none text-xl active:scale-95"
      >
        ‹
      </button>

      {/* Dots Container */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-white/60 backdrop-blur-md rounded-full shadow-[0_4px_15px_rgb(0,0,0,0.03)] border border-white/50">
        {Array.from({ length: total - 1 }, (_, i) => i + 1).map((i) => (
          <button
            key={i}
            onClick={() => onGoTo(i)}
            className={`rounded-full transition-all duration-300 ${
              current === i
                ? 'w-6 h-2.5 bg-pink-500 shadow-md shadow-pink-500/30'
                : 'w-2.5 h-2.5 bg-pink-200 hover:bg-pink-300'
            }`}
          />
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={onNext}
        disabled={current >= total - 1}
        className="w-10 h-10 rounded-full bg-white/75 backdrop-blur-md border border-pink-100/50 shadow-sm flex items-center justify-center text-pink-400 hover:bg-white hover:scale-105 transition-all disabled:opacity-0 disabled:pointer-events-none text-xl active:scale-95"
      >
        ›
      </button>
    </div>
  )
}
