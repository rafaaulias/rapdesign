import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface TextRevealProps {
  text: string
  className?: string
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'
  delay?: number
  duration?: number
  stagger?: number
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className = '',
  tag: Tag = 'h2',
  delay = 0,
  duration = 1.2,
  stagger = 0.03,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Find all character inner elements
    const chars = container.querySelectorAll('.char-inner')
    if (chars.length === 0) return

    // Set initial hidden state — GSAP is the SOLE owner of the transform property
    gsap.set(chars, { yPercent: 100 })

    // Viewport-aware trigger logic:
    // If the element is already visible in the viewport on mount (e.g. Hero h1 above the fold),
    // a ScrollTrigger with start: 'top 85%' will never fire because it's already past.
    // In that case, run a simple delayed entrance animation instead.
    const rect = container.getBoundingClientRect()
    const isAlreadyInView = rect.top < window.innerHeight && rect.bottom > 0

    const ctx = gsap.context(() => {
      if (isAlreadyInView) {
        // Element is already visible on mount — animate immediately with delay
        gsap.to(chars, {
          yPercent: 0,
          duration: duration,
          delay: delay + 0.3, // slight base delay for page settle
          ease: 'power4.out',
          stagger: stagger,
        })
      } else {
        // Element is below the fold — use ScrollTrigger to reveal on scroll
        gsap.to(chars, {
          yPercent: 0,
          duration: duration,
          delay: delay,
          ease: 'power4.out',
          stagger: stagger,
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      }
    }, container)

    return () => {
      ctx.revert()
    }
  }, [text, delay, duration, stagger])

  // Split text into words, then split words into characters
  const words = text.split(' ')

  return (
    // We cast Tag to any here to satisfy React element type constraints dynamically
    <Tag ref={containerRef as any} className={`${className} flex flex-wrap leading-tight pointer-events-none`}>
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.25em] overflow-hidden py-[0.1em] -my-[0.1em]">
          {word.split('').map((char, charIdx) => (
            <span key={charIdx} className="inline-block overflow-hidden align-bottom">
              <span className="char-inner inline-block will-change-transform font-inherit">
                {char}
              </span>
            </span>
          ))}
        </span>
      ))}
    </Tag>
  )
}

export default TextReveal

