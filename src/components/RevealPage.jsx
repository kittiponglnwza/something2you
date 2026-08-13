import { useEffect, useState, useRef } from 'react'

export default function RevealPage({ onNext }) {
  const [confetti] = useState(() => {
    const colors = ['#ff7096', '#ffbc94', '#ffc2d4', '#d4a574', '#ff4778', '#a78bfa', '#fbbf24', '#fb923c', '#f472b6']
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: colors[i % colors.length],
      dur: Math.random() * 3 + 2.5,
      delay: Math.random() * 2,
      w: Math.random() * 8 + 4,
      h: Math.random() * 6 + 3,
      round: Math.random() > 0.5,
    }))
  })
  
  const [show, setShow] = useState(false)
  const ctxRef = useRef(null)

  useEffect(() => {
    setTimeout(() => setShow(true), 200)
    try {
      const AC = window.AudioContext || window.webkitAudioContext
      const ctx = new AC()
      ctxRef.current = ctx
      const notes = [
        [262,0.3],[262,0.3],[294,0.6],[262,0.6],[349,0.6],[330,1.0],
        [262,0.3],[262,0.3],[294,0.6],[262,0.6],[392,0.6],[349,1.0],
        [262,0.3],[262,0.3],[523,0.6],[440,0.6],[349,0.6],[330,0.6],[294,1.0],
        [466,0.3],[466,0.3],[440,0.6],[349,0.6],[392,0.6],[349,1.2],
      ]
      let t = ctx.currentTime + 0.1
      notes.forEach(([freq, dur]) => {
        const o = ctx.createOscillator()
        const g = ctx.createGain()
        o.type = 'triangle'
        o.frequency.value = freq
        g.gain.setValueAtTime(0.05, t)
        g.gain.exponentialRampToValueAtTime(0.001, t + dur * 0.9)
        o.connect(g).connect(ctx.destination)
        o.start(t)
        o.stop(t + dur)
        t += dur
      })
    } catch (e) {}
    return () => { if (ctxRef.current) ctxRef.current.close() }
  }, [])

  // Brought the polaroids much closer to the center on mobile
  const photos = [
    { id: 1, caption: 'คนเก่งของเค้า 💖', pos: 'top-[20%] left-[8%] sm:top-12 sm:left-12 lg:top-20 lg:left-32', rot: '-rotate-12', animDelay: '1.2s', floatDelay: '0s' },
    { id: 2, caption: 'ยิ้มเยอะๆ นะ 🌻', pos: 'top-[26%] right-[4%] sm:top-10 sm:right-10 lg:top-16 lg:right-28', rot: 'rotate-12', animDelay: '1.4s', floatDelay: '1s' },
    { id: 3, caption: 'น่ารักที่สุดเลย 💕', pos: 'bottom-[30%] left-[5%] sm:bottom-20 sm:left-16 lg:bottom-32 lg:left-40', rot: '-rotate-6', animDelay: '1.6s', floatDelay: '2s' },
    { id: 4, caption: 'มีความสุขมากๆ น้า ✨', pos: 'bottom-[22%] right-[10%] sm:bottom-16 sm:right-12 lg:bottom-24 lg:right-32', rot: 'rotate-[15deg]', animDelay: '1.8s', floatDelay: '1.5s' },
    { id: 5, caption: '🤍', pos: 'hidden md:block top-1/2 -translate-y-1/2 left-8 lg:left-16', rot: '-rotate-3', animDelay: '2s', floatDelay: '0.5s' },
    { id: 6, caption: '🥰', pos: 'hidden md:block top-1/2 -translate-y-1/2 right-6 lg:right-16', rot: 'rotate-6', animDelay: '2.2s', floatDelay: '2.5s' },
  ]

  return (
    <div className="h-full flex flex-col items-center justify-center relative px-6 overflow-hidden select-none">
      
      {/* Warm radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.1)_0%,transparent_60%)] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(244,114,182,0.08)_0%,transparent_50%)] pointer-events-none z-0" />

      {/* Confetti */}
      {confetti.map((c) => (
        <div
          key={c.id}
          className="fixed top-0 pointer-events-none z-0"
          style={{
            left: `${c.left}%`,
            width: `${c.w}px`,
            height: `${c.h}px`,
            backgroundColor: c.color,
            borderRadius: c.round ? '50%' : '2px',
            animation: `confetti-fall ${c.dur}s ${c.delay}s linear forwards`,
          }}
        />
      ))}

      {show && (
        <>
          {/* Scatter Photo Gallery */}
          {photos.map((p) => (
            <div 
              key={p.id}
              className={`absolute z-10 ${p.pos} opacity-0`}
              style={{ animation: `bounce-in 0.8s ${p.animDelay} cubic-bezier(0.34,1.56,0.64,1) forwards, float 5s ${p.floatDelay} ease-in-out infinite alternate` }}
            >
              {/* Scaled down slightly for mobile, normal for sm+ */}
              <div className={`bg-white/95 backdrop-blur-sm p-1.5 pb-5 sm:p-3 sm:pb-8 shadow-2xl rounded-sm border border-slate-100 ${p.rot} hover:rotate-0 hover:scale-110 hover:z-50 transition-all duration-500 group scale-[0.85] sm:scale-100 origin-center`}>
                
                <div className="bg-gradient-to-br from-pink-50 to-rose-100 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center overflow-hidden relative shadow-inner">
                  {/* USER: Change src to your image path e.g. src="/images/pic1.jpg" */}
                  <img 
                    src={`/images/pic${p.id}.jpg`} 
                    alt={`Photo ${p.id}`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden absolute inset-0 flex-col items-center justify-center">
                    <span className="text-xl sm:text-3xl opacity-40 mb-1">📸</span>
                    <span className="text-[0.5rem] sm:text-[0.6rem] text-rose-400/60 font-body tracking-wider uppercase">รูปที่ {p.id}</span>
                  </div>
                </div>
                
                <p className="font-hand text-center mt-1.5 sm:mt-3 text-slate-600 text-[0.65rem] sm:text-sm md:text-base leading-tight">
                  {p.caption}
                </p>
                {/* Vintage tape overlay */}
                <div className="absolute -top-2 sm:-top-3 left-1/2 -translate-x-1/2 w-6 h-3 sm:w-10 sm:h-4 bg-white/40 backdrop-blur-md border border-white/20 rotate-[-4deg] shadow-sm" />
              </div>
            </div>
          ))}

          {/* Main Title (Center) */}
          <div className="text-center z-20 pointer-events-none relative" style={{ marginTop: '5vh' }}>
            {/* Soft backdrop blur just for the text to ensure it's readable over photos */}
            <div className="absolute inset-0 bg-white/20 backdrop-blur-md rounded-full scale-[1.6] sm:scale-150 blur-2xl opacity-70" />
            
            <p
              className="font-hand text-3xl sm:text-4xl md:text-5xl text-rosegold mb-1 drop-shadow-sm relative"
              style={{ animation: 'bounce-in 0.5s 0.2s cubic-bezier(0.34,1.56,0.64,1) both' }}
            >
              Happy
            </p>
            <h1
              className="font-display text-[3.8rem] sm:text-7xl md:text-8xl lg:text-9xl font-bold bg-gradient-to-b from-pink-400 to-rose-500 bg-clip-text text-transparent leading-none tracking-tight relative drop-shadow-sm"
              style={{ animation: 'bounce-in 0.5s 0.35s cubic-bezier(0.34,1.56,0.64,1) both' }}
            >
              Birthday
            </h1>
            <p
              className="font-hand text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gold mt-1 sm:mt-2 drop-shadow-sm relative"
              style={{ animation: 'bounce-in 0.5s 0.5s cubic-bezier(0.34,1.56,0.64,1) both' }}
            >
              Aommy
            </p>
            
            <div
              className="mt-6 sm:mt-8 text-2xl sm:text-3xl space-x-3 relative"
              style={{ animation: 'bounce-in 0.5s 0.7s cubic-bezier(0.34,1.56,0.64,1) both' }}
            >
              <span className="inline-block animate-[float_2s_ease-in-out_infinite]">✨</span>
              <span className="inline-block animate-[float_2s_0.3s_ease-in-out_infinite] text-rose-400 text-3xl sm:text-4xl">🎂</span>
              <span className="inline-block animate-[float_2s_0.6s_ease-in-out_infinite]">✨</span>
            </div>
          </div>
        </>
      )}

      {/* Helper swipe text */}
      <div className="absolute bottom-6 sm:bottom-10 z-50 text-center w-full pointer-events-none">
        <p className="text-pink-400/40 text-[0.6rem] sm:text-[0.65rem] font-body tracking-[0.3em] uppercase animate-pulse">
          swipe to continue →
        </p>
      </div>
      
    </div>
  )
}
