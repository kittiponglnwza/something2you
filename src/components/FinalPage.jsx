import { useState, useEffect } from 'react'

export default function FinalPage() {
  const [step, setStep] = useState(0)
  
  useEffect(() => {
    // Cinematic sequence timeline
    const sequence = [
      setTimeout(() => setStep(1), 800),   // 1. สุขภาพ
      setTimeout(() => setStep(2), 3500),  // 2. ร่างกาย
      setTimeout(() => setStep(3), 6000),  // 3. โอกาส
      setTimeout(() => setStep(4), 8500),  // 4. ชวนกินข้าว
      setTimeout(() => setStep(5), 11500), // 5. Final HBD
    ]
    return () => sequence.forEach(clearTimeout)
  }, [])

  return (
    <div className="h-full w-full flex flex-col items-center justify-center px-6 relative select-none overflow-hidden bg-gradient-to-b from-transparent to-rose-50/30">
      
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,113,133,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative w-full h-full flex items-center justify-center text-center">
        
        {/* Sentence 1 */}
        <div 
          className={`absolute w-full px-4 transition-all duration-1000 ease-in-out ${
            step === 1 ? 'opacity-100 translate-y-0 blur-0 scale-100' : 
            step > 1 ? 'opacity-0 -translate-y-8 blur-md scale-105' : 'opacity-0 translate-y-8 blur-sm scale-95'
          }`}
        >
          <p className="font-body text-2xl sm:text-3xl text-slate-600 font-light tracking-wide leading-relaxed">
            สุดท้ายนี้เค้าขอให้เธอ<br/>มีความสุขเยอะๆ
          </p>
        </div>

        {/* Sentence 2 */}
        <div 
          className={`absolute w-full px-4 transition-all duration-1000 ease-in-out ${
            step === 2 ? 'opacity-100 translate-y-0 blur-0 scale-100' : 
            step > 2 ? 'opacity-0 -translate-y-8 blur-md scale-105' : 'opacity-0 translate-y-8 blur-sm scale-95'
          }`}
        >
          <p className="font-body text-2xl sm:text-3xl text-slate-600 font-light tracking-wide">
            ร่างกายแข็งแรงนะ
          </p>
        </div>

        {/* Sentence 3 */}
        <div 
          className={`absolute w-full px-4 transition-all duration-1000 ease-in-out ${
            step === 3 ? 'opacity-100 translate-y-0 blur-0 scale-100' : 
            step > 3 ? 'opacity-0 -translate-y-8 blur-md scale-105' : 'opacity-0 translate-y-8 blur-sm scale-95'
          }`}
        >
          <p className="font-body text-xl sm:text-2xl text-slate-500 font-light tracking-widest">
            ไว้กลับมาไทยถ้ามีโอกาส...
          </p>
        </div>

        {/* Sentence 4 */}
        <div 
          className={`absolute w-full px-4 transition-all duration-1000 ease-in-out ${
            step === 4 ? 'opacity-100 translate-y-0 blur-0 scale-100' : 
            step > 4 ? 'opacity-0 -translate-y-8 blur-md scale-105' : 'opacity-0 translate-y-8 blur-sm scale-95'
          }`}
        >
          <p className="font-body text-3xl sm:text-4xl text-rose-500 font-medium tracking-wide">
            ไว้ไปกินข้าวด้วยกันนะ :)
          </p>
        </div>

        {/* Final Scene (Stays on screen) */}
        <div 
          className={`absolute w-full px-4 transition-all duration-[1.5s] ease-out ${
            step >= 5 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-90'
          }`}
        >
          <p className="font-hand text-4xl sm:text-5xl md:text-6xl text-rosegold mb-2 drop-shadow-sm">
            Happy Birthday
          </p>
          <p className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-slate-600 tracking-tight drop-shadow-md">
            Aommy
          </p>
          
          <div className="mt-8 flex justify-center gap-3">
             <span className="text-xl sm:text-2xl opacity-80" style={{ animation: 'float 3s ease-in-out infinite' }}>✨</span>
             <span className="text-xl sm:text-2xl opacity-80" style={{ animation: 'float 3s 0.5s ease-in-out infinite' }}>🤍</span>
             <span className="text-xl sm:text-2xl opacity-80" style={{ animation: 'float 3s 1s ease-in-out infinite' }}>✨</span>
          </div>
        </div>

      </div>

    </div>
  )
}
