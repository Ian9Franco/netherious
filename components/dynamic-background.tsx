'use client'

import { useEffect, useState } from 'react'

const backgrounds = [
  '/assets/images/bg-cave.jpg',
  '/assets/images/bg-cozy.jpg',
  '/assets/images/bg-dunge.jpg',
  '/assets/images/bg-end.jpg',
  '/assets/images/bg-forest.jpg',
  '/assets/images/bg-mystic.jpg',
  '/assets/images/bg-nether.jpg',
  '/assets/images/bg-ocean.jpg',
  '/assets/images/bg-over.jpg',
]

export function DynamicBackground() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [nextIndex, setNextIndex] = useState(1)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Vertical scroll animation (slower)
  useEffect(() => {
    const scrollInterval = setInterval(() => {
      setScrollPosition((prev) => {
        // Scroll from 0% to 100% (top to bottom) - slower speed
        const newPosition = prev + 0.05 // Reduced from 0.15 to 0.05 for slower movement
        if (newPosition >= 100) {
          // Start transition to next image
          setIsTransitioning(true)
          setTimeout(() => {
            setCurrentIndex(nextIndex)
            setNextIndex((nextIndex + 1) % backgrounds.length)
            setIsTransitioning(false)
          }, 1000) // 1 second smooth fade
          return 0
        }
        return newPosition
      })
    }, 50) // Smooth 60fps animation

    return () => clearInterval(scrollInterval)
  }, [nextIndex])

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 15 // Reduced movement
      const y = (e.clientY / window.innerHeight - 0.5) * 15
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      {/* Current background with vertical scroll and parallax */}
      <div
        className="fixed inset-0 transition-opacity duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${backgrounds[currentIndex]})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: `${50 + mousePosition.x * 0.3}% ${scrollPosition + mousePosition.y * 0.3}%`,
          filter: 'blur(4px)',
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
          opacity: isTransitioning ? 0 : 1,
          zIndex: -3,
        }}
      />
      
      {/* Next background for smooth transition */}
      <div
        className="fixed inset-0 transition-opacity duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${backgrounds[nextIndex]})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '50% 0%',
          filter: 'blur(4px)',
          opacity: isTransitioning ? 1 : 0,
          zIndex: -2,
        }}
      />
      
      {/* Dark overlay for better readability */}
      <div
        className="fixed inset-0 bg-black/30 pointer-events-none"
        style={{ zIndex: -1 }}
      />
    </>
  )
}
