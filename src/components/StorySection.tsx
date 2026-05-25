import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Magnetic } from './Navbar'

gsap.registerPlugin(ScrollTrigger)

export const StorySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      // Desktop: Horizontal pin and scroll scrub timeline
      mm.add("(min-width: 768px)", () => {
        // Set initial state for incoming text slides (AOS style)
        gsap.set('.aos-2', { opacity: 0, y: 35 })
        gsap.set('.aos-3', { opacity: 0, y: 35 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1.5,
            start: 'top top',
            end: '+=200%',
            invalidateOnRefresh: true,
          },
        })

        tl.to({}, { duration: 0.15 })

        // Translate the track horizontally across viewport widths
        tl.to(track, {
          xPercent: -66.666,
          ease: 'power1.inOut',
          duration: 2.0,
        }, 0.15)

        // AOS text reveals synced with scroll progress
        tl.to('.aos-2', { opacity: 1, y: 0, duration: 0.8 }, 0.7)
        tl.to('.aos-3', { opacity: 1, y: 0, duration: 0.8 }, 1.4)
      })

      // Mobile: Vertical flow sequential scroll reveals (Without pinning or horizontal translation)
      mm.add("(max-width: 767px)", () => {
        // Reset translate properties
        gsap.set(track, { xPercent: 0 })

        // Stagger fade-in reveals as panels enter view
        const aosElements = ['.aos-1', '.aos-2', '.aos-3']
        aosElements.forEach((selector) => {
          gsap.set(selector, { opacity: 0, y: 30 })
          gsap.to(selector, {
            scrollTrigger: {
              trigger: selector,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          })
        })
      })

    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative h-auto md:h-screen w-full overflow-visible md:overflow-hidden bg-[#FAF8F5] border-t-2 border-b-2 border-[#1E1C1A] py-16 md:py-0"
    >
      {/* Background visual indicators */}
      <div className="pointer-events-none absolute top-10 left-12 z-20 font-mono text-[10px] font-black tracking-[0.4em] text-[#7A7570] uppercase hidden md:block">
        [ SECTION_02 // SYSTEM_TIMELINE ]
      </div>

      {/* Responsive Track: Flex column list on mobile, horizontal row track on desktop */}
      <div ref={trackRef} className="flex flex-col md:flex-row h-auto md:h-full w-full md:w-[300vw] will-change-transform gap-24 md:gap-0">
        
        {/* PANEL 1: CHAPTER 01 - THE SPARK */}
        <div className="relative flex flex-col md:flex-row h-auto md:h-full w-full md:w-[100vw] items-center justify-center px-6 md:px-12 lg:px-24 py-8 md:py-0">
          <div className="retro-grid-bg absolute inset-0 opacity-40" />
          <div className="relative mx-auto flex max-w-6xl w-full flex-col md:flex-row items-center gap-8 md:gap-12 z-10">
            {/* Text details */}
            <div className="flex-grow flex-1 flex flex-col justify-center aos-1">
              <span className="font-mono text-[11px] font-black uppercase tracking-[0.3em] text-[#B55A30]">
                [ 01 // WIREFRAME ]
              </span>
              <h2 className="mt-3 font-serif text-5xl font-extrabold tracking-tight sm:text-6xl text-[#1E1C1A]">
                The UX Wireframe
              </h2>
              <p className="mt-6 font-sans text-base leading-relaxed text-[#7A7570] sm:text-lg">
                Before writing a single line of interface styling, we map user behaviors. 
                Isolating pure, uncluttered user flows, wireframes, and design blueprints. 
                We structure interactions with a retro-pixel tactile framework to make user journeys feel organic and satisfying.
              </p>
            </div>
            {/* Visual Panel */}
            <div className="flex-1 flex items-center justify-center">
              <div className="w-80 h-64 border-2 border-[#1E1C1A] bg-white shadow-[6px_6px_0px_#1E1C1A] p-6 flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-[#1E1C1A]/10 pb-2">
                  <span className="font-mono text-[8px] font-bold text-[#7A7570]">FLOW_MAP</span>
                  <div className="h-1.5 w-1.5 bg-[#B55A30]" />
                </div>
                {/* Visual grid lines */}
                <div className="flex flex-col gap-2 flex-grow justify-center">
                  <div className="h-2 w-full border border-dashed border-[#1E1C1A]/20 bg-[#FAF8F5]" />
                  <div className="h-2 w-[80%] border border-dashed border-[#1E1C1A]/20 bg-[#FAF8F5]" />
                  <div className="h-2 w-[90%] border border-dashed border-[#1E1C1A]/20 bg-[#FAF8F5]" />
                </div>
                <span className="font-mono text-[8px] text-[#B55A30] font-black tracking-widest uppercase">
                  [ STEP_01: UX_RESEARCH ]
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* PANEL 2: CHAPTER 02 - THE CRAFT */}
        <div className="relative flex flex-col md:flex-row h-auto md:h-full w-full md:w-[100vw] items-center justify-center px-6 md:px-12 lg:px-24 py-8 md:py-0 bg-[#F5F2EB]">
          <div className="retro-grid-bg absolute inset-0 opacity-40" />
          <div className="relative mx-auto flex max-w-6xl w-full flex-col md:flex-row items-center gap-8 md:gap-12 z-10">
            {/* Text details */}
            <div className="flex-grow flex-1 flex flex-col justify-center aos-2">
              <span className="font-mono text-[11px] font-black uppercase tracking-[0.3em] text-[#B55A30]">
                [ 02 // INTERFACE ]
              </span>
              <h2 className="mt-3 font-serif text-5xl font-extrabold tracking-tight sm:text-6xl text-[#1E1C1A]">
                The Design System
              </h2>
              <p className="mt-6 font-sans text-base leading-relaxed text-[#7A7570] sm:text-lg">
                Crafting modern design tokens. We combine high-contrast Playfair typography with precise geometric grids and tactile components. All spacing is mathematical; all color systems are warm, light, and optimized for immediate human focus.
              </p>
            </div>
            {/* Visual Panel */}
            <div className="flex-1 flex items-center justify-center">
              <div className="w-80 h-64 border-2 border-[#1E1C1A] bg-white shadow-[6px_6px_0px_#B55A30] p-6 flex flex-col justify-between">
                <div className="flex justify-between items-center border-b border-[#1E1C1A]/10 pb-2">
                  <span className="font-mono text-[8px] font-bold text-[#7A7570]">SYSTEM_TOKENS</span>
                  <span className="font-mono text-[8px] text-[#B55A30] font-bold">V1.0</span>
                </div>
                {/* Visual blocks */}
                <div className="flex gap-4 justify-center items-center flex-grow">
                  <div className="h-12 w-12 border-2 border-[#1E1C1A] bg-[#B55A30] shadow-[2px_2px_0px_#1E1C1A]" />
                  <div className="h-12 w-12 border-2 border-[#1E1C1A] bg-[#FAF8F5] shadow-[2px_2px_0px_#1E1C1A] rotate-12" />
                  <div className="h-12 w-12 border-2 border-[#1E1C1A] bg-[#E6E2DA] shadow-[2px_2px_0px_#1E1C1A] -rotate-12" />
                </div>
                <span className="font-mono text-[8px] text-[#1E1C1A] font-black tracking-widest uppercase">
                  [ STEP_02: COMPONENT_ISOLATION ]
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* PANEL 3: CHAPTER 03 - THE ENGINEERING */}
        <div className="relative flex flex-col md:flex-row h-auto md:h-full w-full md:w-[100vw] items-center justify-center px-6 md:px-12 lg:px-24 py-8 md:py-0">
          <div className="retro-grid-bg absolute inset-0 opacity-40" />
          <div className="relative mx-auto flex max-w-6xl w-full flex-col md:flex-row items-center gap-8 md:gap-12 z-10">
            {/* Text details */}
            <div className="flex-grow flex-1 flex flex-col justify-center aos-3">
              <span className="font-mono text-[11px] font-black uppercase tracking-[0.3em] text-[#B55A30]">
                [ 03 // ENGINEERING ]
              </span>
              <h2 className="mt-3 font-serif text-5xl font-extrabold tracking-tight sm:text-6xl text-[#1E1C1A]">
                The Engineering
              </h2>
              <p className="mt-6 font-sans text-base leading-relaxed text-[#7A7570] sm:text-lg">
                Bringing design layouts to life using highly customized interaction physics. 
                Integrating hardware-accelerated 3D transforms, Lenis smooth scrolling, and GSAP timelines. 
                Making layouts feel tactile, responsive, and physically connected to your scroll velocity.
              </p>
              <div className="mt-8">
                <Magnetic>
                  <button
                    onClick={() =>
                      document.querySelector('#showcase')?.scrollIntoView({ behavior: 'smooth' })
                    }
                    className="cursor-pointer border-2 border-[#1E1C1A] bg-[#B55A30] px-6 py-3.5 font-mono text-[11px] font-bold uppercase tracking-widest text-white shadow-[3px_3px_0px_#1E1C1A] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#1E1C1A] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
                  >
                    View Showcase
                  </button>
                </Magnetic>
              </div>
            </div>
            {/* Visual Panel */}
            <div className="flex-1 flex items-center justify-center">
              <div className="w-80 h-64 border-2 border-[#1E1C1A] bg-white shadow-[6px_6px_0px_#1E1C1A] p-6 flex flex-col justify-between">
                <div className="flex justify-between items-center border-b border-[#1E1C1A]/10 pb-2">
                  <span className="font-mono text-[8px] font-bold text-[#7A7570]">COMPILER_LOG</span>
                  <div className="h-2 w-2 rounded-full bg-[#1E1C1A] animate-ping" />
                </div>
                {/* Code visual */}
                <div className="flex-grow flex flex-col justify-center">
                  <code className="font-mono text-[8px] text-[#1E1C1A] leading-relaxed">
                    $ npm run compile
                    <br />
                    &gt; Bundle size: 30.78 kB [PASS]
                    <br />
                    &gt; Physics initialized successfully
                  </code>
                </div>
                <span className="font-mono text-[8px] text-[#B55A30] font-black tracking-widest uppercase">
                  [ STEP_03: HARDWARE_ACCEL ]
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default StorySection
