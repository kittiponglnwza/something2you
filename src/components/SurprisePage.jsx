import { useState } from 'react'

export default function SurprisePage({ onNext }) {
  const [opening, setOpening] = useState(false)

  const handleOpen = () => {
    if (opening) return
    setOpening(true)
    // Delay slightly longer for the elegant fade/scale out
    setTimeout(onNext, 1400)
  }

  return (
    <div className="h-full flex flex-col items-center justify-center relative px-6 select-none overflow-hidden">
      
      {/* Subtle elegant ambient light */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
         <div className="w-[30rem] h-[30rem] bg-rose-100/50 rounded-full blur-[120px]" />
      </div>

      {/* Floating particles (very subtle and elegant) */}
      <div className="absolute inset-0 pointer-events-none">
         {[...Array(6)].map((_, i) => (
            <div 
              key={i}
              className="absolute bg-rose-200/40 rounded-full blur-sm"
              style={{
                width: Math.random() * 4 + 2 + 'px',
                height: Math.random() * 4 + 2 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animation: `float ${Math.random() * 4 + 6}s ease-in-out infinite alternate`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
         ))}
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Elegant typography */}
        <h2 
          className={`font-display text-2xl sm:text-3xl md:text-4xl text-slate-600 mb-2 font-light tracking-wide transition-all duration-1000 ${opening ? 'opacity-0 -translate-y-8' : 'opacity-100 translate-y-0'}`}
          style={{ animation: 'slide-up 0.8s ease-out' }}
        >
          Something special
        </h2>
        <p 
          className={`font-hand text-xl sm:text-2xl text-rose-400 mb-14 transition-all duration-1000 delay-75 ${opening ? 'opacity-0 -translate-y-8' : 'opacity-100 translate-y-0'}`}
          style={{ animation: 'slide-up 0.8s 0.2s ease-out both' }}
        >
          just for you...
        </p>

        {/* Minimalist Envelope */}
        <div 
          onClick={handleOpen}
          className={`group cursor-pointer relative transition-all duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            opening ? 'scale-[3] opacity-0 blur-md' : 'scale-100 opacity-100 hover:-translate-y-2'
          }`}
          style={{ animation: 'slide-up 1s 0.4s ease-out both' }}
        >
          {/* Envelope Body */}
          <div className="w-56 h-36 sm:w-64 sm:h-40 bg-white/90 backdrop-blur-xl rounded-lg shadow-[0_10px_40px_rgb(225,29,72,0.1)] border border-white flex items-center justify-center relative overflow-hidden group-hover:shadow-[0_20px_50px_rgb(225,29,72,0.15)] transition-shadow duration-700">
             
             {/* Subtle internal envelope lines using SVG */}
             <div className="absolute inset-0 pointer-events-none opacity-40">
                <svg className="w-full h-full text-rose-300" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <line x1="0" y1="0" x2="50" y2="45" stroke="currentColor" strokeWidth="0.5"/>
                    <line x1="100" y1="0" x2="50" y2="45" stroke="currentColor" strokeWidth="0.5"/>
                    <line x1="0" y1="100" x2="50" y2="45" stroke="currentColor" strokeWidth="0.5"/>
                    <line x1="100" y1="100" x2="50" y2="45" stroke="currentColor" strokeWidth="0.5"/>
                </svg>
             </div>

             {/* Elegant Wax Seal */}
             <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-rose-500 shadow-md flex items-center justify-center z-10 group-hover:scale-110 transition-transform duration-500">
                <span className="text-rose-50 font-display italic text-2xl leading-none drop-shadow-sm font-medium pr-0.5">A</span>
             </div>
          </div>

          {/* Glow effect on hover */}
          <div className="absolute inset-0 bg-rose-400/20 rounded-xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        </div>

        {/* Minimalist prompt */}
        <p 
          className={`mt-12 text-slate-400 text-[0.65rem] sm:text-xs font-body font-light tracking-[0.3em] uppercase transition-all duration-700 delay-150 ${opening ? 'opacity-0 translate-y-4' : 'opacity-100'}`}
          style={{ animation: 'slide-up 1s 0.6s ease-out both' }}
        >
          Tap to open
        </p>
      </div>

    </div>
  )
}
