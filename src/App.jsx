import { useState, useCallback, useEffect } from 'react'
import SurprisePage from './components/SurprisePage'
import RevealPage from './components/RevealPage'
import TimePage from './components/TimePage'
import MusicPage from './components/MusicPage'
import FinalPage from './components/FinalPage'
import Navigation from './components/Navigation'

const PAGES = [
  { id: 'surprise', Component: SurprisePage, bg: 'bg-gradient-to-br from-neutral-50 via-rose-50 to-stone-50' },
  { id: 'reveal', Component: RevealPage, bg: 'bg-gradient-to-br from-pink-100 via-rose-50 to-amber-50' },
  { id: 'time', Component: TimePage, bg: 'bg-gradient-to-br from-violet-50 via-pink-50 to-orange-50' },
  { id: 'music', Component: MusicPage, bg: 'bg-gradient-to-br from-slate-50 via-purple-50 to-rose-50' },
  { id: 'final', Component: FinalPage, bg: 'bg-[length:200%_200%] animate-[gradient-drift_6s_ease_infinite] bg-gradient-to-br from-pink-200 via-rose-100 to-amber-100' },
]

export default function App() {
  const [currentPage, setCurrentPage] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const total = PAGES.length

  const goTo = useCallback((i) => {
    if (transitioning || i === currentPage || i < 0 || i >= total) return
    setTransitioning(true)
    setTimeout(() => {
      setCurrentPage(i)
      setTransitioning(false)
    }, 350)
  }, [currentPage, transitioning, total])

  const next = useCallback(() => goTo(currentPage + 1), [currentPage, goTo])
  const prev = useCallback(() => goTo(currentPage - 1), [currentPage, goTo])

  // Keyboard
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault()
        next()
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        prev()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [next, prev])

  // Touch swipe
  useEffect(() => {
    let sx = 0, sy = 0
    const start = (e) => { sx = e.touches[0].clientX; sy = e.touches[0].clientY }
    const end = (e) => {
      const dx = sx - e.changedTouches[0].clientX
      const dy = sy - e.changedTouches[0].clientY
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        // Only trigger page change on horizontal swipe
        dx > 0 ? next() : prev()
      }
    }
    window.addEventListener('touchstart', start, { passive: true })
    window.addEventListener('touchend', end, { passive: true })
    return () => {
      window.removeEventListener('touchstart', start)
      window.removeEventListener('touchend', end)
    }
  }, [next, prev])

  const { Component, bg } = PAGES[currentPage]

  return (
    <div className={`h-dvh w-full ${bg} transition-all duration-700 overflow-hidden relative`}>
      <div
        key={currentPage}
        className={`h-full w-full ${transitioning ? 'page-exit' : 'page-enter'}`}
      >
        <Component onNext={next} onPrev={prev} />
      </div>

      {currentPage > 0 && (
        <Navigation
          current={currentPage}
          total={total}
          onGoTo={goTo}
          onNext={next}
          onPrev={prev}
        />
      )}
    </div>
  )
}
