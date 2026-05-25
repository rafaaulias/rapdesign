# Design System & Visual Identity - Rapdesign

## Core Theme
- **Concept:** Sleek Pixel-Warm Linen. Playful tactile retro physics combined with premium modern editorial grids.
- **Visual Vibes:** Tactile micro-interactions, flat neo-brutalist block shadows, explorer visual windows, grid paper backgrounds, diagnostic status monitors.
- **Colors:** Warm Cream (`#FAF8F5`), Dark Charcoal (`#1E1C1A`), terracotta Rust (`#B55A30`).

## Centered Full-Width Clean Navbar
- **Positioning**: full-width top aligned `w-full fixed top-0 left-0 z-40`.
- **Aesthetic**: light bottom border `border-b border-[#1E1C1A]/10`, transparent warm cream background with backdrop blur `bg-[#FAF8F5]/85 backdrop-blur-md`, shadow-free `shadow-none`.
- **Hide on Scroll**: translates up (`y: -130`) on scroll down, and slides down (`y: 0`) immediately on scroll up.

## 3x3 Pinned Showcase Abstract Grid Spec
- **Track Container**: pins in viewport over `350%` scroll height (`end: "+=350%"`), min height `min-h-[120vh]` to fit abstract layout slots and generous gaps.
- **Viewport Centered Highlight**: Card 1 starts perfectly centered in the screen viewport at scroll progress 0 (`left: 15%`, `top: 10vh`, `width: 70%`, `height: 60vh`).
- **Scattered Coordinates**: cards fly outward from center to scattered coordinate positions with large gaps (e.g. Card 2 offset down, Card 3 offset up, etc.).
- **Card Aspect**: all cards use their original fluid aspect ratios (landscape rectangles) to prevent squashing.
- **Animation Isolation**: Outer Wrapper handles ScrollTrigger scrub, Inner Card handles mouse hover tilt. Prevents stutters and lag.
- **Double 3D Parallax**: Grid track tilts on mousemove, and hovered cards tilt individually for added depth.

## Balanced Contact Section & Footer
- **CTA**: minimalist dual-column directories (LET'S CREATE text + direct links and social links).
- **Footer**: Elegant 3-column directory list (copyright, page index, and social links to: `GitHub` - `LinkedIn` - `Dribbble` - `Instagram`).