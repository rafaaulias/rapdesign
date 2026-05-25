import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextReveal from './TextReveal'

gsap.registerPlugin(ScrollTrigger)

export const ContactSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const line = lineRef.current
    if (!line) return

    gsap.fromTo(
      line,
      { scaleX: 0 },
      {
        scaleX: 1,
        transformOrigin: 'center',
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      }
    )
  }, [])

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative w-full bg-[#FAF8F5] py-24 px-6 md:px-12 lg:px-24 text-[#1E1C1A] overflow-hidden border-t-2 border-[#1E1C1A]"
    >
      <div className="retro-grid-bg absolute inset-0 opacity-40" />

      {/* Grid line dividers */}
      <div className="absolute top-0 bottom-0 left-[8%] w-[1.5px] bg-[#1E1C1A]/5" />
      <div className="absolute top-0 bottom-0 right-[8%] w-[1.5px] bg-[#1E1C1A]/5" />

      <div className="relative mx-auto max-w-6xl z-10">
        
        {/* Terminal Connect block - Restored Premium Minimalist Editorial Directory */}
        <div className="border-2 border-[#1E1C1A] bg-white shadow-[4px_4px_0px_#1E1C1A] md:shadow-[8px_8px_0px_#1E1C1A] p-6 sm:p-8 md:p-12 mb-12 md:mb-16">
          <div className="flex justify-between items-center border-b border-[#1E1C1A]/10 pb-4 mb-6 md:mb-8">
            <span className="font-mono text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-[#B55A30]">
              [ CONNECT_TERMINAL // DIRECT_DIRECTORY ]
            </span>
            <div className="flex gap-1.5">
              <div className="h-2 w-2 md:h-2.5 md:w-2.5 bg-[#B55A30] animate-pulse" />
              <div className="h-2 w-2 md:h-2.5 md:w-2.5 bg-[#1E1C1A]/20" />
            </div>
          </div>

          <div className="grid gap-8 md:gap-12 md:grid-cols-2">
            
            {/* Left Column: Left-aligned elegant editorial titles */}
            <div className="flex flex-col justify-between gap-4 md:gap-8">
              <div>
                <TextReveal
                  tag="h2"
                  text="LET'S CREATE"
                  className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1E1C1A] leading-none"
                  stagger={0.03}
                />
                <TextReveal
                  tag="h2"
                  text="SOMETHING TACTILE"
                  className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1E1C1A] leading-none mt-1 md:mt-2"
                  stagger={0.03}
                  delay={0.15}
                />
                <p className="mt-4 md:mt-6 font-sans text-xs sm:text-sm md:text-base leading-relaxed text-[#7A7570]">
                  Ready to collaborate on engineering high-end creative web experiences, interaction-heavy digital interfaces, and bespoke design system architecture. Let's make something mature and premium.
                </p>
              </div>
            </div>

            {/* Right Column: Direct mail and active social channels */}
            <div className="flex flex-col justify-center gap-6 md:gap-8 md:border-l md:border-[#1E1C1A]/10 md:pl-12 pt-6 md:pt-0 border-t border-[#1E1C1A]/5 md:border-t-0">
              <div>
                <span className="font-mono text-[8px] md:text-[9px] font-black tracking-[0.25em] text-[#7A7570] uppercase">
                  // EMAIL_SANDBOX
                </span>
                <div className="mt-1 md:mt-2">
                  <a
                    href="mailto:rap@rapdesign.io"
                    className="group relative inline-block font-serif text-xl sm:text-2xl md:text-4xl font-extrabold tracking-tight text-[#B55A30] hover:text-[#1E1C1A] transition-colors duration-300 break-all"
                  >
                    rap@rapdesign.io
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#1E1C1A] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                  </a>
                </div>
              </div>

              <div>
                <span className="font-mono text-[8px] md:text-[9px] font-black tracking-[0.25em] text-[#7A7570] uppercase">
                  // DIRECT_CHANNELS
                </span>
                <div className="flex flex-col gap-2.5 mt-3 md:mt-4">
                  {[
                    { name: 'GITHUB', url: '#', handle: '@rapdesign' },
                    { name: 'LINKEDIN', url: '#', handle: 'in/rapdesign' },
                    { name: 'DRIBBBLE', url: '#', handle: 'dribbble/rap' },
                    { name: 'INSTAGRAM', url: '#', handle: '@rap.design' },
                  ].map((chan) => (
                    <a
                      key={chan.name}
                      href={chan.url}
                      className="group flex justify-between items-center border-b border-[#1E1C1A]/10 pb-1.5 hover:border-[#1E1C1A] transition-colors"
                    >
                      <span className="font-mono text-[10px] md:text-xs font-bold text-[#1E1C1A] group-hover:text-[#B55A30] transition-colors flex items-center gap-1.5">
                        <span className="h-1 w-1 md:h-1.5 md:w-1.5 bg-[#B55A30] transition-transform group-hover:scale-125" />
                        {chan.name}
                      </span>
                      <span className="font-mono text-[9px] md:text-[10px] text-[#7A7570] group-hover:text-[#1E1C1A] transition-colors">
                        {chan.handle} [↗]
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Center line divider */}
        <div ref={lineRef} className="my-16 h-[2px] w-full bg-[#1E1C1A]/10 will-change-transform" />

        {/* Triple-Column Minimalist Footer (Clean & Elegant) */}
        <div className="grid gap-12 sm:grid-cols-3 text-[#7A7570] font-mono text-xs font-bold pt-4">
          
          {/* Column 1: location & copyright */}
          <div className="flex flex-col gap-2">
            <span className="text-[#1E1C1A] font-black tracking-widest text-sm font-sans mb-1">RAPDESIGN</span>
            <span>© 2026. ALL RIGHTS RESERVED.</span>
            <span>Surabaya, Indonesia</span>
          </div>

          {/* Column 2: Index directory */}
          <div className="flex flex-col gap-2 sm:pl-8">
            <span className="text-[#1E1C1A]/50 tracking-wider text-[10px] uppercase mb-1">DIRECTORY</span>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-left hover:text-[#1E1C1A] transition-colors">INDEX</button>
            <button onClick={() => document.querySelector('#story')?.scrollIntoView({ behavior: 'smooth' })} className="text-left hover:text-[#1E1C1A] transition-colors">STORY</button>
            <button onClick={() => document.querySelector('#showcase')?.scrollIntoView({ behavior: 'smooth' })} className="text-left hover:text-[#1E1C1A] transition-colors">SHOWCASE</button>
          </div>

          {/* Column 3: Social channels: GitHub - LinkedIn - Dribbble - Instagram */}
          <div className="flex flex-col gap-2 sm:pl-8">
            <span className="text-[#1E1C1A]/50 tracking-wider text-[10px] uppercase mb-1">CHANNELS</span>
            <div className="grid grid-cols-2 gap-2">
              <a href="#" className="hover:text-[#1E1C1A] transition-colors">GITHUB [↗]</a>
              <a href="#" className="hover:text-[#1E1C1A] transition-colors">LINKEDIN [↗]</a>
              <a href="#" className="hover:text-[#1E1C1A] transition-colors">DRIBBBLE [↗]</a>
              <a href="#" className="hover:text-[#1E1C1A] transition-colors">INSTAGRAM [↗]</a>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default ContactSection
