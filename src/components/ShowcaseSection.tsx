import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextReveal from './TextReveal'
import { Magnetic } from './Navbar'

gsap.registerPlugin(ScrollTrigger)

interface ProjectItem {
  id: string
  title: string
  category: string
  year: string
  imageUrl: string
  desc: string
  tech: string[]
  previewUrl?: string
  sourceUrl?: string
}

const PROJECTS: ProjectItem[] = [
  {
    id: '02',
    title: 'AETHER CORE',
    category: 'AUDIO SYNTH WIREFRAME',
    year: '2026',
    imageUrl: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=800&q=80',
    desc: 'An interactive synthesizer interface wireframe constructed for dynamic hardware signal mapping. Built with reactive math nodes, customized canvas wave rendering, and physics-driven spring dials.',
    tech: ['GSAP', 'HTML5 Canvas', 'Web Audio API'],
    previewUrl: 'https://aether.rapdesign.io',
    sourceUrl: 'https://github.com/rapdesign/aether-core',
  },
  {
    id: '01',
    title: 'NEXUS',
    category: 'WEB3 DESIGN SYSTEM',
    year: '2026',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    desc: 'A futuristic Web3 visual framework engineered with modular token matrices, high-contrast layouts, and responsive tactile variables. Designed to map complex financial ledger charts into playful retro-pixel visual components.',
    tech: ['TypeScript', 'Tailwind CSS', 'Vite', 'React'],
    previewUrl: 'https://nexus.rapdesign.io',
    sourceUrl: 'https://github.com/rapdesign/nexus-system',
  },
  {
    id: '03',
    title: 'HELIOS CANVAS',
    category: 'PHYSICS MOCKUP',
    year: '2025',
    imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
    desc: 'A high-performance canvas physics simulator built to verify fluid page scrolls, elastic borders, and modular neo-brutalist block grids. Features complete GPU hardware acceleration overlays.',
    tech: ['Rolldown', 'PostCSS', 'TypeScript'],
    previewUrl: 'https://helios.rapdesign.io',
    sourceUrl: 'https://github.com/rapdesign/helios-canvas',
  },
  {
    id: '04',
    title: 'VESPER LABS',
    category: 'BRAND SCHEMATIC',
    year: '2025',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    desc: 'A sleek digital brand lookbook schematic designed for premium apparel launches. Integrates staggered scrolling layouts, horizontal image galleries, and trailing custom mouse-cursors.',
    tech: ['Lenis', 'Vite', 'CSS Grid'],
    previewUrl: 'https://vesper.rapdesign.io',
    sourceUrl: 'https://github.com/rapdesign/vesper-labs',
  },
  {
    id: '05',
    title: 'SPECTRA DAT',
    category: 'COLOR MATRIX ALGORITHM',
    year: '2025',
    imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
    desc: 'A responsive visual color palette generator that dynamically compiles harmonious warm HSL themes. Auto-injects computed custom properties directly into global theme configurations.',
    tech: ['React hooks', 'Tailwind v4', 'JSON Schema'],
    previewUrl: 'https://spectra.rapdesign.io',
    sourceUrl: 'https://github.com/rapdesign/spectra-dat',
  },
  {
    id: '06',
    title: 'CHRONOS LOG',
    category: 'LAYOUT ENGINE',
    year: '2024',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    desc: 'A highly structured visual log engine designed to render real-time compiling audits and build verification matrices. Built with clean, retro monospaced layouts.',
    tech: ['Eslint', 'PostCSS', 'Vite Bundler'],
    previewUrl: 'https://chronos.rapdesign.io',
    sourceUrl: 'https://github.com/rapdesign/chronos-log',
  },
  {
    id: '07',
    title: 'VORTEX CANVAS',
    category: 'PARTICLE SIMULATOR',
    year: '2024',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    desc: 'An fluid-dynamics vector particle simulation driving high-refresh background layout visuals. Features optimized canvas performance arrays.',
    tech: ['WebGL', 'Math Matrix', 'TypeScript'],
    previewUrl: 'https://vortex.rapdesign.io',
    sourceUrl: 'https://github.com/rapdesign/vortex-canvas',
  },
  {
    id: '08',
    title: 'QUARK BIN',
    category: 'QUANTUM INTERFACE',
    year: '2024',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    desc: 'A minimalist tech prototype demonstrating quantum state registry updates and layout mapping transitions in full viewport screens.',
    tech: ['Vite', 'React TS', 'CSS variables'],
    previewUrl: 'https://quark.rapdesign.io',
    sourceUrl: 'https://github.com/rapdesign/quark-bin',
  },
  {
    id: '09',
    title: 'NEBULA MATRIX',
    category: 'AMBIENT SCHEMATIC',
    year: '2024',
    imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
    desc: 'A visual ambient generative lookbook layout mapping warm ochre and linen schematics to digital fashion visual assets.',
    tech: ['GSAP Scroll', 'Tailwind CSS', 'React'],
    previewUrl: 'https://nebula.rapdesign.io',
    sourceUrl: 'https://github.com/rapdesign/nebula-matrix',
  },
]

export const ShowcaseSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null)
  const [showAlert, setShowAlert] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Track responsive viewport state
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Dynamic Array Ref to store the project card wrapper DOM nodes
  const slotRefs = useRef<(HTMLDivElement | null)[]>([])
  
  // High-performance GSAP 3D hover refs for throttling, edge-deadzones, and targeted card tracking
  const hoveredIndexRef = useRef<number | null>(null)
  const animFrameIdRef = useRef<number | null>(null)
  const latestMousePosRef = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const container = containerRef.current
    const track = trackRef.current
    const cta = ctaRef.current
    if (!container || !track || !cta) return

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      // Desktop Configuration (768px and up): Golden-Ratio Symmetrical/Abstract Scattered Grid
      mm.add("(min-width: 768px)", () => {
        const slots = [
          slotRefs.current[0],
          slotRefs.current[1],
          slotRefs.current[2],
          slotRefs.current[3],
          slotRefs.current[4],
        ].filter((s): s is HTMLDivElement => s !== null)
        if (slots.length < 5) return

        // 1. Initial State: NEXUS (index 1) starts centered and enlarged
        gsap.set(slots[1], {
          left: '50%',
          top: '50%',
          xPercent: -50,
          yPercent: -50,
          scale: 1.5,
          opacity: 1,
          zIndex: 20,
          x: 0,
          y: 0,
        })

        // All other slots start collapsed behind center
        slots.forEach((slot, idx) => {
          if (idx === 1) return
          gsap.set(slot, {
            left: '50%',
            top: '50%',
            xPercent: -50,
            yPercent: -50,
            scale: 0,
            opacity: 0,
            zIndex: 10,
            x: 0,
            y: 0,
          })
        })

        // Reset track position
        gsap.set(track, { y: 0 })

        // Initial state for the Explore Archives button - hidden
        gsap.set(cta, { opacity: 0, scale: 0.85, y: 12 })

        // 2. Pinned scroll timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: '+=150%',
            pin: true,
            scrub: 1.2,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        })

        // Pin Quiet Buffer at scroll start
        tl.to({}, { duration: 0.15 })

        // NEXUS shrinks in-place to normal scale
        tl.to(slots[1], {
          scale: 1.0,
          ease: 'power2.inOut',
          duration: 1.0,
        }, 0.15)

        // Viewport-relative GPU offsets for scattered pattern
        // index 0 = AETHER CORE (Upper Left), index 1 = NEXUS (Center), index 2 = HELIOS (Upper Right)
        // index 3 = VESPER (Lower Left), index 4 = SPECTRA (Lower Right)
        const DESKTOP_OFFSETS = [
          { x: '-34vw', y: '-18vh' },
          { x: 0, y: 0 },
          { x: '28vw', y: '-16vh' },
          { x: '-28vw', y: '22vh' },
          { x: '34vw', y: '20vh' },
        ]

        slots.forEach((slot, index) => {
          if (index === 1) return
          const offset = DESKTOP_OFFSETS[index]
          tl.to(slot, {
            x: offset.x,
            y: offset.y,
            scale: 0.85,
            opacity: 1,
            ease: 'power2.inOut',
            duration: 1.0,
          }, 0.15)
        })

        // Fade in the Explore Archives button
        tl.to(cta, {
          opacity: 1,
          scale: 1,
          y: 0,
          ease: 'power2.out',
          duration: 0.5,
        }, 0.8)

        // Pin Quiet Buffer at scroll release
        tl.to({}, { duration: 0.15 })
      })

      // Mobile Configuration: zero ScrollTrigger overhead, instant static render
      mm.add("(max-width: 767px)", () => {
        const slots = [
          slotRefs.current[0],
          slotRefs.current[1],
          slotRefs.current[2],
          slotRefs.current[3],
          slotRefs.current[4],
        ].filter((s): s is HTMLDivElement => s !== null)

        gsap.set(track, { y: 0 })
        gsap.set(cta, { opacity: 1, y: 0 })

        slots.forEach((slot) => {
          gsap.set(slot, {
            left: 'auto',
            top: 'auto',
            xPercent: 0,
            yPercent: 0,
            scale: 1,
            opacity: 1,
            x: 0,
            y: 0,
            zIndex: 10,
          })
        })
      })

    }, container)

    // 3D Grid Track Mouse Perspective Tilt (Desktop only)
    const handleMouseMove = (e: MouseEvent) => {
      if (!track || window.innerWidth < 768) return
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const normX = x / rect.width - 0.5
      const normY = y / rect.height - 0.5

      gsap.to(track, {
        rotateY: normX * 8,
        rotateX: -normY * 8,
        transformPerspective: 1200,
        ease: 'power2.out',
        duration: 0.6,
        overwrite: 'auto',
      })
    }

    const handleMouseLeaveGrid = () => {
      if (!track) return
      gsap.to(track, {
        rotateY: 0,
        rotateX: 0,
        ease: 'power3.out',
        duration: 0.8,
        overwrite: 'auto',
      })
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeaveGrid)

    return () => {
      ctx.revert()
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeaveGrid)
    }
  }, [])

  // High-performance GSAP 3D hover update routine running strictly on the browser rendering tick
  const updatePerspective = () => {
    const index = hoveredIndexRef.current
    if (index === null || !latestMousePosRef.current) {
      animFrameIdRef.current = null
      return
    }

    const wrapper = slotRefs.current[index]
    if (!wrapper) {
      animFrameIdRef.current = null
      return
    }
    const card = wrapper.querySelector('.inner-card-node') as HTMLDivElement
    if (!card) {
      animFrameIdRef.current = null
      return
    }

    const rect = wrapper.getBoundingClientRect()
    const { x: clientX, y: clientY } = latestMousePosRef.current
    const x = clientX - rect.left
    const y = clientY - rect.top

    // Edge Buffer / Deadzone (25px around all boundaries)
    const DEADZONE = 25
    const dx = Math.min(x, rect.width - x)
    const dy = Math.min(y, rect.height - y)
    
    const dampX = dx < DEADZONE ? Math.max(0, dx / DEADZONE) : 1
    const dampY = dy < DEADZONE ? Math.max(0, dy / DEADZONE) : 1
    const edgeDamping = Math.min(dampX, dampY)

    // Normalized coordinates (-0.5 to 0.5)
    const normX = x / rect.width - 0.5
    const normY = y / rect.height - 0.5

    // Max rotation clamping (24 degrees max)
    const MAX_ROTATION = 24
    let rotY = normX * MAX_ROTATION * edgeDamping
    let rotX = -normY * MAX_ROTATION * edgeDamping

    rotY = Math.max(-MAX_ROTATION, Math.min(MAX_ROTATION, rotY))
    rotX = Math.max(-MAX_ROTATION, Math.min(MAX_ROTATION, rotX))

    gsap.to(card, {
      rotateY: rotY,
      rotateX: rotX,
      transformPerspective: 600,
      duration: 0.25,
      ease: 'power2.out',
      overwrite: 'auto',
    })

    animFrameIdRef.current = null
  }

  // Sibling and hover state triggers - executed strictly ONCE on Enter/Leave
  const handleCardMouseEnter = (index: number) => {
    hoveredIndexRef.current = index
    
    const wrapper = slotRefs.current[index]
    if (!wrapper) return
    const card = wrapper.querySelector('.inner-card-node') as HTMLDivElement
    if (!card) return

    gsap.to(wrapper, { zIndex: 30, duration: 0.1, overwrite: 'auto' })

    gsap.to(card, {
      scale: 1.06,
      boxShadow: '8px 8px 0px #B55A30',
      borderColor: '#B55A30',
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto',
    })

    // Dim all sibling cards exactly once
    slotRefs.current.forEach((ref, idx) => {
      if (idx === index || !ref) return
      const siblingCard = ref.querySelector('.inner-card-node')
      if (siblingCard) {
        gsap.to(siblingCard, {
          opacity: 0.45,
          scale: 0.96,
          duration: 0.35,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }
    })
  }

  // Card Hover Tilt physics targeting only rotations inside onMouseMove
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (hoveredIndexRef.current !== index) return
    latestMousePosRef.current = { x: e.clientX, y: e.clientY }
    if (animFrameIdRef.current === null) {
      animFrameIdRef.current = requestAnimationFrame(updatePerspective)
    }
  }

  const handleCardMouseLeave = (index: number) => {
    if (hoveredIndexRef.current === index) {
      hoveredIndexRef.current = null
      latestMousePosRef.current = null
      if (animFrameIdRef.current !== null) {
        cancelAnimationFrame(animFrameIdRef.current)
        animFrameIdRef.current = null
      }
    }

    const wrapper = slotRefs.current[index]
    if (!wrapper) return
    const card = wrapper.querySelector('.inner-card-node') as HTMLDivElement
    if (!card) return
    
    // NEXUS (index 1) is the center highlight card with elevated baseline z-index
    gsap.to(wrapper, { zIndex: index === 1 ? 20 : 10, duration: 0.15, overwrite: 'auto' })

    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      opacity: 1,
      boxShadow: '4px 4px 0px #1E1C1A',
      borderColor: '#1E1C1A',
      duration: 0.4,
      ease: 'power2.out',
      overwrite: 'auto',
    })
    
    // Restore all siblings
    slotRefs.current.forEach((ref) => {
      if (!ref) return
      const siblingCard = ref.querySelector('.inner-card-node')
      if (siblingCard) {
        gsap.to(siblingCard, {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }
    })
  }

  // Clean up animation frames on unmount
  useEffect(() => {
    return () => {
      if (animFrameIdRef.current !== null) {
        cancelAnimationFrame(animFrameIdRef.current)
      }
    }
  }, [])

  return (
    <section
      ref={containerRef}
      id="showcase"
      className="relative w-full h-auto md:h-screen bg-[#FAF8F5] px-6 md:px-12 lg:px-24 text-[#1E1C1A] overflow-hidden"
    >
      <div className="retro-grid-bg absolute inset-0 opacity-40" />

      {/* Decorative vertical lines */}
      <div className="absolute top-0 bottom-0 left-[8%] w-[1.5px] bg-[#1E1C1A]/5" />
      <div className="absolute top-0 bottom-0 right-[8%] w-[1.5px] bg-[#1E1C1A]/5" />

      {/* 
        DESKTOP ARCHITECTURE:
        - The section is h-screen and gets pinned by ScrollTrigger.
        - The inner wrapper is h-full with flex justify-center items-center.
        - The header is ABSOLUTELY positioned at top-left (out of flow).
        - The CTA is ABSOLUTELY positioned at bottom-center (out of flow).
        - The track is the SOLE in-flow child, perfectly centered in the viewport.
        
        MOBILE ARCHITECTURE:
        - Everything stacks vertically in natural document flow.
        - No absolute positioning, no pinning, no scroll animations.
      */}
      <div className="relative mx-auto max-w-6xl w-full h-auto md:h-full flex flex-col md:justify-center md:items-center z-10 py-12">
        
        {/* Section Header: absolute on desktop (out of flow), relative on mobile (in flow) */}
        <div className="relative md:absolute md:top-10 md:left-0 w-full z-20 pointer-events-none select-none mb-6 md:mb-0">
          <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-[#B55A30]">
            [ 02 // SELECTED WORK ]
          </span>
          <TextReveal
            tag="h2"
            text="Selected Work"
            className="font-serif text-3xl font-extrabold tracking-tight sm:text-4xl text-[#1E1C1A] pointer-events-none"
            stagger={0.04}
          />
        </div>

        {/* Responsive Grid Track */}
        <div 
          ref={trackRef} 
          className="relative w-full h-auto flex flex-col items-center gap-6 md:w-[80vw] md:h-[70vh] md:block"
          style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
        >
          {PROJECTS.slice(0, 5).map((project, index) => (
            <div
              key={project.id}
              ref={(el) => { slotRefs.current[index] = el; }}
              onMouseEnter={() => handleCardMouseEnter(index)}
              onMouseMove={(e) => handleCardMouseMove(e, index)}
              onMouseLeave={() => handleCardMouseLeave(index)}
              className="relative md:absolute will-change-transform w-full sm:w-[70vw] md:w-[26vw] aspect-auto md:aspect-[1.4]"
              style={isMobile ? {
                position: 'relative',
                opacity: 1,
                zIndex: 10,
              } : undefined}
            >
              {isMobile ? (
                /* Clean text-based LIST view for mobile (no images, no layout thrashing) */
                <div
                  onClick={() => setActiveProject(project)}
                  className="w-full border-2 border-[#1E1C1A] bg-white p-4 shadow-[3px_3px_0px_#1E1C1A] flex items-center justify-between cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs font-bold text-[#B55A30]">{project.id}</span>
                    <div className="flex flex-col text-left">
                      <h3 className="font-serif text-sm font-extrabold tracking-tight text-[#1E1C1A] leading-tight">
                        {project.title}
                      </h3>
                      <span className="font-mono text-[8px] text-[#7A7570] uppercase tracking-wider mt-0.5">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[9px] text-[#7A7570]">{project.year}</span>
                    <span className="font-mono text-[8px] font-bold text-[#B55A30] border border-[#B55A30] px-1.5 py-0.5">
                      OPEN [↗]
                    </span>
                  </div>
                </div>
              ) : (
                /* Desktop 3D card with image, hover tilt, and perspective */
                <div
                  onClick={() => setActiveProject(project)}
                  className="inner-card-node w-full h-full border-2 border-[#1E1C1A] bg-white p-4 shadow-[4px_4px_0px_#1E1C1A] flex flex-col justify-between cursor-pointer"
                  style={{ transformStyle: 'preserve-3d', willChange: 'transform, box-shadow, border-color, opacity' }}
                >
                  {/* Header info */}
                  <div className="flex justify-between items-start" style={{ transform: 'translateZ(10px)' }}>
                    <div>
                      <span className="font-mono text-[8px] font-bold tracking-[0.25em] text-[#B55A30] uppercase block">
                        {project.category}
                      </span>
                      <h3 className="mt-0.5 font-serif text-[11px] md:text-xs font-extrabold tracking-tight leading-tight text-[#1E1C1A]">
                        {project.title}
                      </h3>
                    </div>
                    <span className="font-mono text-[9px] font-bold text-[#7A7570]">{project.year}</span>
                  </div>

                  {/* Image Box */}
                  <div className="my-2.5 flex-grow overflow-hidden border border-[#1E1C1A]/10" style={{ transform: 'translateZ(20px)' }}>
                    <img 
                      src={project.imageUrl} 
                      alt="" 
                      className="w-full h-full object-cover grayscale transition-all duration-500 hover:grayscale-0" 
                      style={{ imageRendering: 'pixelated' }}
                    />
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-center text-[8px] font-mono text-[#7A7570]" style={{ transform: 'translateZ(10px)' }}>
                    <span>OPEN_FILE</span>
                    <span className="text-[#B55A30] font-bold">{project.id}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Showcase Footer CTA: absolute on desktop, relative on mobile */}
        <div 
          ref={ctaRef}
          className="relative md:absolute md:bottom-10 md:left-1/2 md:-translate-x-1/2 z-20 mt-6 md:mt-0"
        >
          <Magnetic>
            <button
              onClick={() => setShowAlert(true)}
              className="group relative cursor-pointer border-2 border-[#1E1C1A] bg-white px-8 py-2.5 font-mono text-[11px] font-bold uppercase tracking-widest text-[#1E1C1A] shadow-[3px_3px_0px_#1E1C1A] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#B55A30] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
            >
              EXPLORE_ARCHIVES
            </button>
          </Magnetic>
        </div>

      </div>

      {/* 1. PROJECT DETAILS MODAL */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAF8F5]/80 backdrop-blur-md p-4">
          <div className="w-full max-w-xl border-2 border-[#1E1C1A] bg-white shadow-[8px_8px_0px_#1E1C1A] flex flex-col overflow-hidden animate-[scaleUp_0.3s_cubic-bezier(0.34,1.56,0.64,1)]">
            <div className="flex items-center justify-between border-b-2 border-[#1E1C1A] bg-[#1E1C1A] p-2.5 px-4 text-white">
              <span className="font-mono text-[10px] font-bold tracking-widest uppercase">
                PROJECT_EXPLORER // {activeProject.title}
              </span>
              <button
                onClick={() => setActiveProject(null)}
                className="cursor-pointer font-mono text-xs font-black hover:text-[#B55A30] transition-colors"
              >
                [X]
              </button>
            </div>
            <div className="p-6 flex flex-col gap-6 max-h-[75vh] overflow-y-auto">
              <div className="border border-[#1E1C1A]/10 h-48 overflow-hidden">
                <img src={activeProject.imageUrl} alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="font-mono text-[9px] font-black text-[#B55A30] tracking-widest uppercase">
                  {activeProject.category} // {activeProject.year}
                </span>
                <h3 className="mt-1.5 font-serif text-3xl font-extrabold text-[#1E1C1A]">
                  {activeProject.title}
                </h3>
                <p className="mt-4 font-sans text-sm leading-relaxed text-[#7A7570]">
                  {activeProject.desc}
                </p>
              </div>
              <div className="border-2 border-dashed border-[#1E1C1A]/15 bg-[#FAF8F5] p-4 flex flex-col gap-2">
                <span className="font-mono text-[8px] font-bold text-[#7A7570] uppercase">
                  TECHNICAL_MATRIX_REGISTRY
                </span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {activeProject.tech.map((t) => (
                    <span key={t} className="border border-[#1E1C1A] bg-white px-2 py-0.5 font-mono text-[9px] font-black text-[#1E1C1A]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Dynamic Modal Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                {activeProject.previewUrl && (
                  <a
                    href={activeProject.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer text-center border-2 border-[#1E1C1A] bg-[#B55A30] py-2.5 font-mono text-[10px] font-bold uppercase tracking-widest text-white shadow-[3px_3px_0px_#1E1C1A] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#1E1C1A] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all block"
                  >
                    PREVIEW_PROJECT
                  </a>
                )}
                {activeProject.sourceUrl && (
                  <a
                    href={activeProject.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer text-center border-2 border-[#1E1C1A] bg-white py-2.5 font-mono text-[10px] font-bold uppercase tracking-widest text-[#1E1C1A] shadow-[3px_3px_0px_#1E1C1A] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#B55A30] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all block"
                  >
                    SOURCE_CODE
                  </a>
                )}
              </div>

              <button
                onClick={() => setActiveProject(null)}
                className="cursor-pointer text-center w-full border-2 border-[#1E1C1A] bg-[#1E1C1A] py-2.5 font-mono text-[10px] font-bold uppercase tracking-widest text-white hover:bg-[#B55A30] hover:border-[#B55A30] transition-colors"
              >
                CLOSE_EXPLORER
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. EXPLORE ARCHIVES SYSTEM DIALOG */}
      {showAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAF8F5]/85 backdrop-blur-md p-4">
          <div className="w-full max-w-sm border-2 border-[#1E1C1A] bg-white shadow-[6px_6px_0px_#1E1C1A] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#1E1C1A] bg-[#B55A30] p-2 px-4 text-white">
              <span className="font-mono text-[9px] font-bold tracking-widest uppercase">
                SYSTEM_NOTIFICATION
              </span>
            </div>
            <div className="p-6 flex flex-col items-center text-center gap-4">
              <div className="h-10 w-10 border-2 border-[#1E1C1A] rounded-none flex items-center justify-center bg-[#B55A30]/10">
                <span className="font-mono text-lg font-black text-[#B55A30]">!</span>
              </div>
              <div>
                <h4 className="font-mono text-xs font-black text-[#1E1C1A] uppercase tracking-wider">
                  ACCESS_GRANTED
                </h4>
                <p className="mt-2 font-mono text-[9px] text-[#7A7570] leading-relaxed uppercase">
                  42 archived project schematics loaded in the sandbox environment. 
                  Contact Rapdesign to request fully unzipped source files and wireframe vectors.
                </p>
              </div>
              <button
                onClick={() => setShowAlert(false)}
                className="cursor-pointer w-full border-2 border-[#1E1C1A] bg-white py-2 font-mono text-[9px] font-bold uppercase tracking-widest text-[#1E1C1A] shadow-[2px_2px_0px_#1E1C1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none hover:bg-[#FAF8F5] transition-colors"
              >
                CLOSE_WINDOW
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scaleUp {
          from { transform: scale(0.92); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </section>
  )
}

export default ShowcaseSection
