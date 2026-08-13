import { useState, useEffect, useRef } from 'react'

export default function MusicPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef(null)

  // Format time (e.g. 65 -> "1:05")
  const formatTime = (time) => {
    if (isNaN(time)) return "0:00"
    const m = Math.floor(time / 60)
    const s = Math.floor(time % 60)
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateProgress = () => {
      setCurrentTime(audio.currentTime)
      setProgress((audio.currentTime / audio.duration) * 100)
    }

    const setAudioData = () => {
      setDuration(audio.duration)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setProgress(0)
      setCurrentTime(0)
    }

    audio.addEventListener('timeupdate', updateProgress)
    audio.addEventListener('loadedmetadata', setAudioData)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateProgress)
      audio.removeEventListener('loadedmetadata', setAudioData)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [])

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(e => console.error("Play failed", e))
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = x / rect.width
    const newTime = percentage * duration
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
    setProgress(percentage * 100)
  }

  return (
    <div className="h-full flex flex-col items-center justify-center relative px-6 select-none overflow-hidden">
      
      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef} 
        src="/music/song.mp3" 
        preload="metadata"
      />

      {/* Decorative blurs */}
      <div className="absolute top-1/4 right-10 w-48 h-48 bg-purple-200/20 rounded-full blur-[80px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-10 w-56 h-56 bg-rose-200/20 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Floating music notes */}
      <div className="absolute inset-0 pointer-events-none z-0">
         {['♪', '♫', '♬', '♩'].map((note, i) => (
            <div 
              key={i}
              className={`absolute text-slate-300/40 text-2xl sm:text-4xl font-display transition-opacity duration-1000 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
              style={{
                left: `${15 + (i * 25)}%`,
                top: `${80 - (i * 10)}%`,
                animation: `float ${4 + i}s ease-in-out infinite alternate`,
                animationPlayState: isPlaying ? 'running' : 'paused',
                animationDelay: `${i * 0.5}s`
              }}
            >
              {note}
            </div>
         ))}
      </div>

      <div className="relative z-10 w-full max-w-sm" style={{ animation: 'slide-up 0.8s ease-out' }}>
        <p className="font-display text-xl sm:text-2xl text-slate-500 mb-6 text-center italic font-light">
          Our Song
        </p>
        
        {/* Music Player Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 shadow-2xl shadow-rose-200/30 border border-white">
          
          {/* Album Cover */}
          <div className="relative w-full aspect-square bg-gradient-to-br from-slate-100 to-rose-50 rounded-2xl shadow-inner mb-6 overflow-hidden flex items-center justify-center group">
            <img 
              src="/music/cover.jpg" 
              alt="Album Art" 
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[10s] ease-linear ${isPlaying ? 'scale-110' : 'scale-100'}`}
            />
            {/* Spinning vinyl effect overlay when playing */}
            {isPlaying && (
              <div className="absolute inset-0 bg-black/5 mix-blend-multiply animate-spin-slow pointer-events-none rounded-full scale-150" style={{ animationDuration: '4s' }} />
            )}
          </div>

          {/* Song Info */}
          <div className="text-center mb-6">
            <h3 className="font-display text-2xl text-slate-700 font-bold mb-1">17</h3>
            <p className="font-body text-sm text-slate-400 font-light">Dept</p>
          </div>

          {/* Progress Bar (Interactive) */}
          <div 
            className="w-full h-2 bg-slate-100 rounded-full mb-3 overflow-hidden cursor-pointer relative group"
            onClick={handleSeek}
          >
            {/* Hover preview line */}
            <div className="absolute inset-0 bg-slate-200 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div 
              className="h-full bg-gradient-to-r from-pink-400 to-rose-400 rounded-full relative transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            >
               <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          
          <div className="flex justify-between text-[0.65rem] text-slate-400 font-body mb-6 font-medium tracking-wider">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 text-slate-400">
            {/* Back (rewind 10s) */}
            <button 
              onClick={() => { audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10) }}
              className="hover:text-rose-400 transition-colors active:scale-90"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/>
              </svg>
            </button>

            {/* Play/Pause */}
            <button 
              onClick={togglePlay}
              className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-rose-400 to-rose-500 text-white rounded-full shadow-lg hover:shadow-[0_8px_20px_rgb(225,29,72,0.3)] hover:scale-105 transition-all active:scale-95"
            >
              {isPlaying ? (
                // Pause icon
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              ) : (
                // Play icon
                <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>

            {/* Forward (skip 10s) */}
            <button 
              onClick={() => { audioRef.current.currentTime = Math.min(audioRef.current.duration, audioRef.current.currentTime + 10) }}
              className="hover:text-rose-400 transition-colors active:scale-90"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/>
              </svg>
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
