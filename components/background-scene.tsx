"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useAppStore } from "@/lib/store"
import { useEffect, useMemo, useState } from "react"

// conjuntos de imágenes por sección
const sectionBackgrounds = {
  home: ["/images/bg-over.jpg", "/images/bg-nether.jpg"],
  lore: ["/images/bg-end.jpg", "/images/bg-dunge.jpg"],
  install: ["/images/bg-cozy.jpg", "/images/bg-cave.jpg"],
  server: ["/images/bg-forest.jpg", "/images/bg-ocean.jpg"],
}


export function BackgroundScene() {
  const { currentSection } = useAppStore()
  const [currentBg, setCurrentBg] = useState(sectionBackgrounds.home[0])
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [index, setIndex] = useState(0)

  // cambiar fondo según sección
  useEffect(() => {
    const images = sectionBackgrounds[currentSection] || sectionBackgrounds.home
    setIndex(0)
    setCurrentBg(images[0])
  }, [currentSection])

  // rotación automática dentro del set actual
  useEffect(() => {
    const images = sectionBackgrounds[currentSection] || sectionBackgrounds.home
    if (images.length <= 1) return

    const interval = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % images.length
        setCurrentBg(images[next])
        return next
      })
    }, 25000) // cada 25 segundos cambia

    return () => clearInterval(interval)
  }, [currentSection])

  // Parallax con mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 10,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const particles = useMemo(
    () =>
      Array.from({ length: 25 }, () => ({
        size: Math.random() * 3 + 1,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.4 + 0.2,
      })),
    []
  )

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentBg}
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 1, scale: 1.15 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Imagen principal (sin tocar visualización original) */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${currentBg})`,
              filter: "blur(3px) brightness(1.05)",
            }}
            animate={{
              y: ["0%", "-10%", "0%"],
              x: [mouse.x * 0.5, mouse.x * 0.3, mouse.x * 0.5],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Capas de gradiente y atmósfera */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-background/30 to-background/70" />
          <div className="absolute inset-0 backdrop-blur-[1px]" />
        </motion.div>
      </AnimatePresence>

      {/* Partículas flotantes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/40 shadow-[0_0_8px_rgba(255,255,255,0.3)]"
            style={{
              width: p.size,
              height: p.size,
              left: p.x,
              top: p.y,
              opacity: p.opacity,
            }}
            animate={{
              y: [p.y, -50],
              opacity: [0, p.opacity, 0],
              x: [p.x, p.x + Math.random() * 50 - 25],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  )
}
