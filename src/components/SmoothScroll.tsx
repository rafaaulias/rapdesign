import React, { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

interface SmoothScrollProps {
  children: React.ReactNode
}

export const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential ease
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    })

    lenisRef.current = lenis

    // Synchronize Lenis scroll with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Bind Lenis to GSAP Ticker
    const tickerUpdate = (time: number) => {
      // Lenis raf expects time in milliseconds
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerUpdate)

    // Turn off lag smoothing for ScrollTrigger compatibility
    gsap.ticker.lagSmoothing(0)

    // Cleanup on unmount
    return () => {
      lenis.destroy()
      gsap.ticker.remove(tickerUpdate)
      lenisRef.current = null
    }
  }, [])

  return <>{children}</>
}

export default SmoothScroll
