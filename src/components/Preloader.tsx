import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'

interface PreloaderProps {
  onComplete: () => void
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obj = { val: 0 }
    
    // Animate progress to 100
    const tl = gsap.timeline({
      onComplete: () => {
        // Graceful slide up exit
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 1.0,
          ease: 'power4.inOut',
          onComplete: onComplete,
        })
      },
    })

    tl.to(obj, {
      val: 100,
      duration: 2.0,
      ease: 'power2.out',
      onUpdate: () => {
        setProgress(Math.floor(obj.val))
      },
    })

    return () => {
      tl.kill()
    }
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF8F5] text-[#1E1C1A]"
    >
      {/* Grid Pattern overlay for tech visual feel */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(30,28,26,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,28,26,0.02)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />

      <div className="relative flex flex-col items-center p-8 text-center">
        {/* Terminal Header */}
        <span className="font-mono text-[10px] font-bold tracking-[0.35em] text-[#B55A30] uppercase mb-6">
          INITIALIZING_SYSTEM_ASSETS...
        </span>

        {/* Brand Name */}
        <h1 className="font-serif text-3xl font-extrabold tracking-tight mb-8">
          RAPDESIGN<span className="text-[#B55A30]">.EXE</span>
        </h1>

        {/* Pixel-Brutalist Loading Bar Container */}
        <div className="w-64 h-6 border-2 border-[#1E1C1A] bg-white p-1 shadow-[4px_4px_0px_#1E1C1A] flex items-center justify-start overflow-hidden">
          <div
            className="h-full bg-[#B55A30] transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage Counter in Monospace */}
        <span className="font-mono text-sm font-black mt-6 text-[#1E1C1A]">
          {progress.toString().padStart(3, '0')}% LOADED
        </span>

        {/* Dynamic status labels */}
        <div className="h-4 mt-2 overflow-hidden">
          <span className="font-mono text-[9px] text-[#7A7570] uppercase animate-pulse">
            {progress < 30 && 'Reading design specifications...'}
            {progress >= 30 && progress < 60 && 'Injecting tactile physics engine...'}
            {progress >= 60 && progress < 90 && 'Allocating horizontal matrices...'}
            {progress >= 90 && 'Ready to initialize.'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Preloader
