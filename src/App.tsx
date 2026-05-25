import { useState } from 'react'
import SmoothScroll from './components/SmoothScroll'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StorySection from './components/StorySection'
import ShowcaseSection from './components/ShowcaseSection'
import ContactSection from './components/ContactSection'
import Preloader from './components/Preloader'

function App() {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <>
      {/* 1. Preloader overlay: slides off screen then unmounts */}
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}
      
      {/* 2. Global smooth scroll and pixelated trailing cursor */}
      <SmoothScroll>
        <CustomCursor />
        {isLoaded && <Navbar />}
        <main className="relative bg-[#FAF8F5] w-full min-h-screen">
          <Hero />
          <StorySection />
          <ShowcaseSection />
          <ContactSection />
        </main>
      </SmoothScroll>
    </>
  )
}

export default App
