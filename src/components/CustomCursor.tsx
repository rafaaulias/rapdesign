import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // 1. Mobile touch screens do not have cursors, bypass initialization entirely
    if (window.innerWidth < 768) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Position setup - offset perfectly centered for blocks
    gsap.set(dot, { xPercent: -50, yPercent: -50 })
    gsap.set(ring, { xPercent: -50, yPercent: -50 })

    const xToDot = gsap.quickTo(dot, 'x', { duration: 0.05, ease: 'power3.out' })
    const yToDot = gsap.quickTo(dot, 'y', { duration: 0.05, ease: 'power3.out' })

    const xToRing = gsap.quickTo(ring, 'x', { duration: 0.3, ease: 'power3.out' })
    const yToRing = gsap.quickTo(ring, 'y', { duration: 0.3, ease: 'power3.out' })

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true)

      xToDot(e.clientX)
      yToDot(e.clientY)

      xToRing(e.clientX)
      yToRing(e.clientY)
    }

    const onMouseLeaveWindow = () => {
      setIsVisible(false)
    }

    const onMouseEnterWindow = () => {
      setIsVisible(true)
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeaveWindow)
    document.addEventListener('mouseenter', onMouseEnterWindow)

    // Sleek Pixel-Retro Hover Effects (Transforms block into rotated crosshair grid)
    const addHoverEffect = () => {
      gsap.to(ring, {
        scale: 2.2,
        rotation: 45, // crosshair rotated layout
        backgroundColor: 'rgba(181, 90, 48, 0.2)',
        borderColor: '#B55A30',
        borderWidth: '2px',
        duration: 0.25,
        ease: 'power2.out',
      })
      gsap.to(dot, {
        scale: 0,
        duration: 0.15,
        ease: 'power2.out',
      })
    }

    const removeHoverEffect = () => {
      gsap.to(ring, {
        scale: 1,
        rotation: 0,
        backgroundColor: 'rgba(181, 90, 48, 0.15)',
        borderColor: '#1E1C1A',
        borderWidth: '1px',
        duration: 0.25,
        ease: 'power2.out',
      })
      gsap.to(dot, {
        scale: 1,
        duration: 0.15,
        ease: 'power2.out',
      })
    }

    const setupHoverListeners = () => {
      const targets = document.querySelectorAll('a, button, [data-magnetic], .interactive, [role="button"]')
      targets.forEach((target) => {
        target.addEventListener('mouseenter', addHoverEffect)
        target.addEventListener('mouseleave', removeHoverEffect)
      })
    }

    setupHoverListeners()

    // Dynamic node observers
    const observer = new MutationObserver(() => {
      setupHoverListeners()
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeaveWindow)
      document.removeEventListener('mouseenter', onMouseEnterWindow)
      observer.disconnect()

      const targets = document.querySelectorAll('a, button, [data-magnetic], .interactive, [role="button"]')
      targets.forEach((target) => {
        target.removeEventListener('mouseenter', addHoverEffect)
        target.removeEventListener('mouseleave', removeHoverEffect)
      })
    }
  }, [isVisible])

  return (
    <>
      {/* Outer trailing pixelated square (hidden md:block suppresses rendering on mobile screens) */}
      <div
        ref={ringRef}
        className={`pointer-events-none fixed top-0 left-0 z-50 h-5 w-5 rounded-none border border-[#1E1C1A] bg-[#B55A30]/15 transition-opacity duration-300 hidden md:block ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ willChange: 'transform' }}
      />
      {/* Inner precise pixel dot */}
      <div
        ref={dotRef}
        className={`pointer-events-none fixed top-0 left-0 z-50 h-1.5 w-1.5 rounded-none bg-[#B55A30] transition-opacity duration-300 hidden md:block ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ willChange: 'transform' }}
      />
    </>
  )
}

export default CustomCursor
