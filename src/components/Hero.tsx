import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextReveal from './TextReveal'
import { Magnetic } from './Navbar'

gsap.registerPlugin(ScrollTrigger)

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const card1Ref = useRef<HTMLDivElement>(null)
  const card2Ref = useRef<HTMLDivElement>(null)
  const card3Ref = useRef<HTMLDivElement>(null)
  const gridPaperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const c1 = card1Ref.current
    const c2 = card2Ref.current
    const c3 = card3Ref.current
    const grid = gridPaperRef.current
    if (!container || !c1 || !c2 || !c3 || !grid) return

    // Infinite yoyo floats for cards on mobile viewports since there's no mouse move
    let floatTween1: gsap.core.Tween | null = null
    let floatTween2: gsap.core.Tween | null = null
    let floatTween3: gsap.core.Tween | null = null

    const startFloating = () => {
      floatTween1 = gsap.to(c1, {
        y: 20,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        duration: 3.5,
      })
      floatTween2 = gsap.to(c2, {
        y: 20,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        duration: 4.2,
      })
      floatTween3 = gsap.to(c3, {
        y: 20,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        duration: 3.8,
      })
    }

    // 1. Mouse Move Parallax Logic - High fidelity tilt for desktop windows only
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const width = window.innerWidth
      const height = window.innerHeight

      const normX = clientX / width - 0.5
      const normY = clientY / height - 0.5

      gsap.to(c1, {
        x: normX * 90,
        y: normY * 90,
        rotateX: -normY * 12,
        rotateY: normX * 12,
        duration: 0.8,
        ease: 'power2.out',
        overwrite: 'auto',
      })
      gsap.to(c2, {
        x: normX * -110,
        y: normY * -110,
        rotateX: normY * 15,
        rotateY: -normX * 15,
        duration: 0.8,
        ease: 'power2.out',
        overwrite: 'auto',
      })
      gsap.to(c3, {
        x: normX * 70,
        y: normY * -70,
        rotateX: -normY * 10,
        rotateY: normX * 18,
        duration: 0.8,
        ease: 'power2.out',
        overwrite: 'auto',
      })

      // Grid paper moves subtly
      gsap.to(grid, {
        x: normX * 25,
        y: normY * 25,
        duration: 1.2,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    const isMobileDevice = window.innerWidth < 768

    if (isMobileDevice) {
      startFloating()
    } else {
      window.addEventListener('mousemove', handleMouseMove)
    }

    // 2. Scroll Parallax and Fade out (Desktop only)
    const ctx = gsap.context(() => {
      if (isMobileDevice) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      tl.to(c1, { y: -200, opacity: 0, scale: 0.9, ease: 'none' }, 0)
        .to(c2, { y: -380, opacity: 0, scale: 0.85, ease: 'none' }, 0)
        .to(c3, { y: -280, opacity: 0, scale: 0.92, ease: 'none' }, 0)
        .to('.hero-text-content', { y: -120, opacity: 0, scale: 0.96, ease: 'none' }, 0)
        .to(grid, { y: -50, opacity: 0.3, ease: 'none' }, 0)
    }, container)

    return () => {
      if (!isMobileDevice) {
        window.removeEventListener('mousemove', handleMouseMove)
      }
      if (floatTween1) floatTween1.kill()
      if (floatTween2) floatTween2.kill()
      if (floatTween3) floatTween3.kill()
      ctx.revert()
    }
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden bg-[#FAF8F5] px-4 py-24"
      style={{ perspective: '1000px' }}
    >
      {/* Retro Paper Grid Background Pattern */}
      <div
        ref={gridPaperRef}
        className="retro-grid-bg absolute inset-0 opacity-100 will-change-transform"
      />

      {/* Window 1: Wireframe.exe */}
      <div
        ref={card1Ref}
        className="hero-floating-card pointer-events-none md:pointer-events-auto md:cursor-pointer absolute left-[2%] top-[12%] z-0 w-36 md:w-48 flex flex-col rounded-none border-2 border-[#1E1C1A] bg-white shadow-[4px_4px_0px_#1E1C1A] md:z-10 md:left-[10%] md:top-[22%] opacity-30 md:opacity-100"
      >
        {/* Retro Header Bar */}
        <div className="flex items-center justify-between border-b-2 border-[#1E1C1A] bg-[#1E1C1A] p-1.5 px-3">
          <span className="font-mono text-[8px] font-bold text-white tracking-widest uppercase">
            WIREFRAME.EXE
          </span>
          <div className="h-2.5 w-2.5 border border-white bg-white/20" />
        </div>
        <div className="flex flex-col gap-3 p-4">
          <div className="flex flex-col gap-1">
            <div className="h-1 w-full bg-[#1E1C1A]/10" />
            <div className="h-1 w-[80%] bg-[#1E1C1A]/10" />
            <div className="h-1 w-[90%] bg-[#1E1C1A]/10" />
          </div>
          <span className="font-mono text-[8px] font-black text-[#B55A30] tracking-widest">
            STATUS: ACTIVE
          </span>
        </div>
      </div>

      {/* Window 2: Mockup.svg */}
      <div
        ref={card2Ref}
        className="hero-floating-card pointer-events-none md:pointer-events-auto md:cursor-pointer absolute right-[2%] top-[16%] z-0 w-40 md:w-56 flex flex-col rounded-none border-2 border-[#1E1C1A] bg-white shadow-[6px_6px_0px_#B55A30] md:z-10 md:right-[8%] md:top-[28%] opacity-30 md:opacity-100"
      >
        <div className="flex items-center justify-between border-b-2 border-[#1E1C1A] bg-[#B55A30] p-1.5 px-3">
          <span className="font-mono text-[8px] font-bold text-white tracking-widest uppercase">
            MOCKUP.SVG
          </span>
          <div className="h-2.5 w-2.5 border border-white bg-white/20" />
        </div>
        <div className="p-4 flex flex-col gap-3">
          {/* Mockup layout lines */}
          <div className="h-20 w-full border border-dashed border-[#1E1C1A]/20 bg-[#FAF8F5] flex items-center justify-center">
            <div className="h-8 w-8 border border-solid border-[#1E1C1A]/30 rotate-45" />
          </div>
          <span className="font-mono text-[8px] font-bold text-[#7A7570] tracking-widest uppercase text-right">
            GRID_V2.0
          </span>
        </div>
      </div>

      {/* Window 3: Physics.ts */}
      <div
        ref={card3Ref}
        className="hero-floating-card pointer-events-none md:pointer-events-auto md:cursor-pointer absolute bottom-[10%] left-[2%] z-0 w-44 md:w-60 flex flex-col rounded-none border-2 border-[#1E1C1A] bg-white shadow-[4px_4px_0px_#1E1C1A] md:z-10 md:left-[8%] md:bottom-[15%] opacity-30 md:opacity-100"
      >
        <div className="flex items-center justify-between border-b-2 border-[#1E1C1A] bg-[#1E1C1A] p-1.5 px-3">
          <span className="font-mono text-[8px] font-bold text-white tracking-widest uppercase">
            PHYSICS.TS
          </span>
          <div className="h-2.5 w-2.5 border border-white bg-white/20" />
        </div>
        <div className="p-4">
          <code className="font-mono text-[8px] text-[#1E1C1A]/80 leading-relaxed block">
            const physics = &#123;
            <br />
            &nbsp;&nbsp;friction: 0.15,
            <br />
            &nbsp;&nbsp;scrollVelocity: true,
            <br />
            &nbsp;&nbsp;theme: "WarmLinen"
            <br />
            &#125;;
          </code>
        </div>
      </div>

      {/* Hero Content */}
      <div className="hero-text-content relative z-20 flex max-w-4xl flex-col items-center text-center">
        {/* Playful Tag */}
        <span className="mb-4 inline-block font-mono text-[9px] font-black uppercase tracking-[0.35em] text-[#B55A30] md:mb-6">
          [ PORTFOLIO_V4.0 ]
        </span>

        {/* Editorial Serif Heading */}
        <TextReveal
          tag="h1"
          text="RAPDESIGN"
          className="justify-center text-center font-serif text-6xl font-black tracking-tight text-[#1E1C1A] sm:text-7xl md:text-8xl lg:text-9xl"
          stagger={0.03}
        />
        {/* Monospaced Professional Title */}
        <h2 className="mt-4 font-mono text-xs font-black tracking-[0.4em] text-[#B55A30] sm:text-sm md:mt-6 uppercase">
          // CREATIVE UI/UX ENGINEER
        </h2>

        {/* Minimalist Bio */}
        <p className="mt-8 max-w-lg font-sans text-sm leading-relaxed text-[#7A7570] sm:text-base md:mt-10">
          We shape digital environments where pixel-tactile physics and organic layout dynamics converge. 
          Bringing luxury retro aesthetics and high-performance scrolling mechanics to life.
        </p>

        {/* Scroll Indicator */}
        <div className="mt-12 md:mt-16">
          <Magnetic>
            <button
              onClick={() =>
                document.querySelector('#story')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="group flex flex-col items-center gap-3 cursor-pointer"
            >
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-[#7A7570] transition-colors duration-300 group-hover:text-[#1E1C1A]">
                SCROLL_TO_START
              </span>
              <div className="relative flex h-9 w-5 items-start justify-center border-2 border-[#1E1C1A] bg-white p-0.5 shadow-[2px_2px_0px_#1E1C1A]">
                <div className="h-1.5 w-1.5 bg-[#B55A30] animate-bounce" />
              </div>
            </button>
          </Magnetic>
        </div>
      </div>
    </section>
  )
}

export default Hero
