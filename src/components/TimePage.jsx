import { useState, useEffect, useCallback } from 'react'

export default function TimePage() {
  const MET = new Date(2026, 5, 3)

  const calc = useCallback(() => {
    const now = new Date()
    let y = now.getFullYear() - MET.getFullYear()
    let mo = now.getMonth() - MET.getMonth()
    let d = now.getDate() - MET.getDate()
    let h = now.getHours() - MET.getHours()
    let m = now.getMinutes() - MET.getMinutes()
    let s = now.getSeconds() - MET.getSeconds()
    if (s < 0) { s += 60; m-- }
    if (m < 0) { m += 60; h-- }
    if (h < 0) { h += 24; d-- }
    if (d < 0) { d += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); mo-- }
    if (mo < 0) { mo += 12; y-- }
    const totalDays = Math.floor((now - MET) / 86400000)
    return { y, mo, d, h, m, s, totalDays }
  }, [])

  const [t, setT] = useState(calc)
  const [mobileView, setMobileView] = useState('time')

  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000)
    return () => clearInterval(id)
  }, [calc])

  // Sequence for mobile: switch to letter after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setMobileView('letter')
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  // Minimalist units
  const units = [
    ...(t.y > 0 ? [{ v: t.y, l: 'Years', grad: 'from-violet-500 to-purple-500' }] : []),
    { v: t.mo, l: 'Months', grad: 'from-indigo-400 to-violet-500' },
    { v: t.d, l: 'Days', grad: 'from-amber-400 to-orange-500' },
    { v: String(t.h).padStart(2, '0'), l: 'Hours', grad: 'from-pink-400 to-rose-500' },
    { v: String(t.m).padStart(2, '0'), l: 'Mins', grad: 'from-cyan-400 to-blue-500' },
    { v: String(t.s).padStart(2, '0'), l: 'Secs', grad: 'from-rose-400 to-pink-500' },
  ]

  return (
    <div className="h-full flex flex-col lg:flex-row items-center justify-center px-4 sm:px-8 select-none relative gap-8 lg:gap-16 w-full max-w-7xl mx-auto pt-16 pb-20 overflow-y-auto lg:overflow-hidden">
      
      {/* Decorative blurs */}
      <div className="absolute top-12 right-1/4 w-36 h-36 bg-pink-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-24 left-10 w-44 h-44 bg-violet-200/15 rounded-full blur-3xl pointer-events-none" />

      {/* Mobile Toggle Button */}
      <div className="lg:hidden absolute bottom-32 left-0 right-0 flex justify-center z-50 pointer-events-none">
        <button 
          onClick={() => setMobileView(mobileView === 'time' ? 'letter' : 'time')}
          className="pointer-events-auto bg-white/90 backdrop-blur-xl border border-pink-100 text-rose-500 px-6 py-2.5 rounded-full text-sm font-body font-medium shadow-[0_8px_30px_rgb(225,29,72,0.15)] active:scale-95 transition-all flex items-center gap-2 hover:bg-rose-50"
          style={{ animation: 'slide-up 0.5s 1s ease-out both' }}
        >
          {mobileView === 'time' ? 'อ่านจดหมาย 💌' : 'ย้อนกลับไปดูเวลา ⏱️'}
        </button>
      </div>

      {/* LEFT SIDE: TIME COUNTER */}
      <div 
        className={`flex-col items-center justify-center flex-1 w-full lg:max-w-2xl z-10 shrink-0 lg:flex ${mobileView === 'time' ? 'flex' : 'hidden'}`}
        style={{ animation: mobileView === 'time' ? 'bounce-in 0.6s ease-out both' : 'none' }}
      >
        <div className="mt-[-8vh] lg:mt-0 flex flex-col items-center">
          <h2
            className="font-display text-3xl sm:text-4xl lg:text-5xl text-slate-700 mb-1"
            style={{ animation: 'slide-up 0.5s ease-out' }}
          >
            Time with you
          </h2>
          <p
            className="text-[0.65rem] sm:text-xs text-rose-400 font-body mb-8 sm:mb-10 tracking-widest uppercase"
            style={{ animation: 'slide-up 0.5s 0.1s ease-out both' }}
          >
            Since June 3, 2026
          </p>
        </div>

        {/* TIME UNITS CONTAINER - Wrapped elegantly instead of squished */}
        <div 
          className="flex flex-wrap justify-center items-stretch gap-3 sm:gap-4 md:gap-5 w-full max-w-[90vw] sm:max-w-xl mb-8 sm:mb-10"
        >
          {units.map((u, i) => (
            <div
              key={u.l}
              className="group relative flex-none w-[4.5rem] sm:w-[5.5rem] md:w-[6.5rem] bg-white/65 backdrop-blur-md rounded-2xl p-3 sm:p-4 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-center"
              style={{ animation: `bounce-in 0.4s ${i * 0.08}s cubic-bezier(0.34,1.56,0.64,1) both` }}
            >
              <div className={`absolute top-0 left-2 right-2 h-[3px] rounded-b-full bg-gradient-to-r ${u.grad} opacity-50 group-hover:opacity-100 transition-opacity`} />
              <span className={`block font-display text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-br ${u.grad} bg-clip-text text-transparent leading-none`}>
                {u.v}
              </span>
              <span className="block text-[0.55rem] sm:text-[0.6rem] md:text-[0.65rem] text-slate-400 mt-2 font-body uppercase tracking-[0.15em] font-medium whitespace-nowrap">
                {u.l}
              </span>
            </div>
          ))}
        </div>

        <div className="text-center" style={{ animation: 'slide-up 0.5s 0.5s ease-out both' }}>
          <p className="text-sm sm:text-base md:text-lg text-slate-400 font-body font-light leading-relaxed">
            A total of{' '}
            <span className="font-semibold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent text-base sm:text-lg md:text-xl px-1">
              {t.totalDays.toLocaleString()}
            </span>{' '}
            beautiful days.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: LETTER CONTAINER WITH FLOWERS */}
      <div 
        className={`flex-1 w-full max-w-[90vw] sm:max-w-md lg:max-w-lg z-10 relative mt-8 lg:mt-0 lg:block ${mobileView === 'letter' ? 'block' : 'hidden'}`} 
        style={{ animation: mobileView === 'letter' ? 'bounce-in 0.8s ease-out both' : 'none' }}
      >
        {/* Decorative Flower SVG (Minimalist style) */}
        <div className="absolute -top-10 -right-4 sm:-right-8 w-20 h-20 sm:w-24 sm:h-24 text-pink-300/40 rotate-12 z-0 pointer-events-none">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M50,10 C40,30 20,40 10,50 C20,60 40,70 50,90 C60,70 80,60 90,50 C80,40 60,30 50,10 Z" />
          </svg>
        </div>
        <div className="absolute -bottom-8 -left-4 sm:-left-6 w-14 h-14 sm:w-16 sm:h-16 text-rose-300/40 -rotate-12 z-20 pointer-events-none">
           <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M50,10 C40,30 20,40 10,50 C20,60 40,70 50,90 C60,70 80,60 90,50 C80,40 60,30 50,10 Z" />
          </svg>
        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(225,29,72,0.08)] border border-pink-100 text-left relative overflow-hidden group hover:shadow-[0_15px_40px_rgb(225,29,72,0.12)] transition-shadow duration-500 z-10 flex flex-col max-h-[65vh] lg:max-h-[70vh]">
          
          <h3 className="font-display text-xl sm:text-2xl md:text-3xl text-slate-700 mb-4 sm:mb-5 border-b border-rose-100/50 pb-3 relative z-10 font-bold shrink-0">
            สุขสันต์วันเกิดนะ 🎂🤍
          </h3>
          
          <div className="font-body text-slate-600 text-[0.75rem] sm:text-[0.85rem] leading-[1.8] space-y-4 font-light relative z-10 overflow-y-auto pr-2 custom-scrollbar">
             <p style={{ animation: mobileView === 'letter' ? 'slide-up 0.5s 0.2s both' : 'none' }}>
               ไม่รู้ว่าเราจะเดินไปด้วยกันได้นานแค่ไหน แต่ตอนนี้เรารู้สึกว่าทุกวันที่มีเธออยู่มันก็ดีมาก ๆ เลยนะะ
             </p>
             <p style={{ animation: mobileView === 'letter' ? 'slide-up 0.5s 0.3s both' : 'none' }}>
               เราชอบเวลาที่ได้เล่นเกมด้วยกัน ชอบเวลาที่ได้คุยกัน ถึงบางทีจะกวนตีนไปบ้าง 55634555 แต่มันก็เป็นช่วงเวลาที่เรามีความสุขดี
             </p>
             <p style={{ animation: mobileView === 'letter' ? 'slide-up 0.5s 0.4s both' : 'none' }}>
               ถึงเราสองคนจะยังไม่เคยเจอกันจริง ๆ แต่เราก็รู้สึกชอบในตัวตนของเธอที่เราได้รู้จักผ่านการคุยกันและเล่นเกมด้วยกันนะ
             </p>
             <p style={{ animation: mobileView === 'letter' ? 'slide-up 0.5s 0.5s both' : 'none' }}>
               วันเกิดปีนี้ก็ขอให้เธอมีความสุขมาก ๆ เจอแต่เรื่องดี ๆ อยากทำอะไรก็ได้ทำ มีเรื่องอะไรเข้ามาก็ขอให้ผ่านไปได้ง่าย ๆ แล้วก็อย่าลืมดูแลตัวเองด้วย
             </p>
             <p style={{ animation: mobileView === 'letter' ? 'slide-up 0.5s 0.6s both' : 'none' }}>
               ขอบคุณที่เข้ามาเป็นส่วนหนึ่งในชีวิตเรานะ หวังว่าเราจะได้เล่นเกมด้วยกัน ได้คุยกัน และได้มีช่วงเวลาแบบนี้ไปอีกเรื่อย ๆ
             </p>
             <p style={{ animation: mobileView === 'letter' ? 'slide-up 0.5s 0.7s both' : 'none' }}>
               ส่วนความรู้สึกที่เรามีตอนนี้ เราก็อยาก keep มันไว้แบบนี้ไปนาน ๆ เลยยยยย
             </p>
             <p className="font-medium text-rose-500 pt-2 text-right text-sm sm:text-base italic" style={{ animation: mobileView === 'letter' ? 'slide-up 0.5s 0.8s both' : 'none' }}>
               สุขสันต์วันเกิดนะ 🤍
             </p>
            <p>

            </p>
            <p>
              
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}
