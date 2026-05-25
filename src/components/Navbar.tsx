import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'

// Reusable Magnetic Wrapper with Sleek Pixel-Tactile Shifts
export const Magnetic: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const rect = el.getBoundingClientRect()
      const x = clientX - (rect.left + rect.width / 2)
      const y = clientY - (rect.top + rect.height / 2)

      gsap.to(el, {
        x: x * 0.25,
        y: y * 0.25,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.4)',
      })
    }

    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      {children}
    </div>
  )
}

export const Navbar: React.FC = () => {
  const navRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Trigger high-end staggered slide reveal when mobile menu state opens
  useEffect(() => {
    if (isMobileMenuOpen && mobileMenuRef.current) {
      const links = mobileMenuRef.current.querySelectorAll('.mobile-nav-link')
      const cta = mobileMenuRef.current.querySelector('.mobile-nav-cta')

      gsap.fromTo(
        links,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          overwrite: 'auto',
        }
      )

      if (cta) {
        gsap.fromTo(
          cta,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            delay: 0.3,
            ease: 'power3.out',
            overwrite: 'auto',
          }
        )
      }

      // Safe lock document scroll during mobile fullscreen overlays
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    // Initial entrance fade-down
    gsap.fromTo(
      navRef.current,
      { y: -120, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 }
    )

    // Hide on scroll down, show on scroll up logic
    let lastScrollY = window.pageYOffset
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset
      if (!navRef.current) return

      // Do not auto-hide the nav bar on scroll if the mobile fullscreen overlay menu is open
      if (isMobileMenuOpen) return

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scroll Down - hide nav bar instantly upon scrolling down without lag
        gsap.to(navRef.current, {
          y: -110,
          duration: 0.15,
          ease: 'expo.out',
          overwrite: 'auto',
        })
      } else {
        // Scroll Up - reveal nav bar immediately
        gsap.to(navRef.current, {
          y: 0,
          duration: 0.2,
          ease: 'power3.out',
          overwrite: 'auto',
        })
      }
      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isMobileMenuOpen])

  const handleLinkClick = (selector: string) => {
    const target = document.querySelector(selector)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 z-40 w-full border-b border-[#1E1C1A]/10 bg-[#FAF8F5]/85 p-4 px-6 shadow-none backdrop-blur-md transition-all duration-300 md:px-12"
        style={{ willChange: 'transform' }}
      >
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          {/* Bolder and Larger Brand Logo without .exe */}
          <Magnetic>
            <div
              onClick={() => {
                setIsMobileMenuOpen(false)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="group flex cursor-pointer items-center font-mono text-lg md:text-xl font-black tracking-[0.3em] text-[#1E1C1A]"
            >
              RAPDESIGN
              <span className="ml-2.5 h-2.5 w-2.5 bg-[#B55A30] shadow-[1px_1px_0px_#1E1C1A] transition-transform duration-300 group-hover:scale-125" />
            </div>
          </Magnetic>

          {/* Navigation Links */}
          <div className="hidden items-center gap-10 md:flex">
            {['Story', 'Showcase', 'Contact'].map((item) => (
              <Magnetic key={item}>
                <button
                  onClick={() => handleLinkClick(`#${item.toLowerCase()}`)}
                  className="cursor-pointer font-mono text-[11px] font-bold uppercase tracking-widest text-[#7A7570] transition-colors duration-300 hover:text-[#1E1C1A] hover:-translate-y-0.5 active:translate-y-0 active:translate-x-0"
                >
                  {item}
                </button>
              </Magnetic>
            ))}
          </div>

          {/* Tactile CTA Button */}
          <Magnetic className="hidden md:inline-block">
            <button
              onClick={() => handleLinkClick('#contact')}
              className="group relative cursor-pointer border border-[#1E1C1A]/20 bg-white px-5 py-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#1E1C1A] shadow-[2px_2px_0px_#1E1C1A] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#B55A30] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              Let's Talk
            </button>
          </Magnetic>

          {/* Mobile Burger Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex flex-col justify-between w-6 h-4 cursor-pointer md:hidden z-50 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <span
              className={`w-full h-[2px] bg-[#1E1C1A] transition-transform duration-300 ease-in-out origin-left ${
                isMobileMenuOpen ? 'rotate-45 translate-y-[-1.5px] translate-x-[1.5px]' : ''
              }`}
            />
            <span
              className={`w-full h-[2px] bg-[#1E1C1A] transition-opacity duration-300 ease-in-out ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-full h-[2px] bg-[#1E1C1A] transition-transform duration-300 ease-in-out origin-left ${
                isMobileMenuOpen ? '-rotate-45 translate-y-[1.5px] translate-x-[1.5px]' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* High-End Mobile Full-Screen Navigation Overlay */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-30 flex flex-col justify-between bg-[#FAF8F5]/98 px-8 py-28 backdrop-blur-lg md:hidden"
        >
          {/* Mobile links container */}
          <div className="flex flex-col gap-8 mt-12">
            {['Story', 'Showcase', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  handleLinkClick(`#${item.toLowerCase()}`)
                }}
                className="mobile-nav-link text-left cursor-pointer font-serif text-3xl font-extrabold uppercase tracking-wider text-[#1E1C1A] hover:text-[#B55A30] transition-colors"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Bottom details of Mobile Menu Overlay */}
          <div className="mobile-nav-cta flex flex-col gap-4">
            <div className="h-[1px] w-full bg-[#1E1C1A]/10" />
            <span className="font-mono text-[9px] font-bold text-[#7A7570] tracking-[0.2em] uppercase">
              [ RAPDESIGN // DIGITAL SCHEMATICS ]
            </span>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false)
                handleLinkClick('#contact')
              }}
              className="cursor-pointer text-center w-full border-2 border-[#1E1C1A] bg-[#1E1C1A] py-3.5 font-mono text-[10px] font-bold uppercase tracking-widest text-white shadow-[3px_3px_0px_#B55A30] hover:bg-[#B55A30] hover:border-[#B55A30] active:translate-x-[2px] active:translate-y-[2px] transition-colors"
            >
              Let's Talk
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
