"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAppStore } from "@/lib/store"
import loadingTips from "@/data/loading-tips.json"

// ============================================
// TIPOS
// ============================================
interface Particle {
  id: number
  x: number
  y: number
  size: number
  imageNumber: number
  opacity: number
  duration: number
  delay: number
}

// ============================================
// COMPONENTE: Vapor del café - pixel art
// ============================================
function CoffeeSteam() {
  return (
    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-20 h-16 overflow-visible pointer-events-none">
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 left-1/2 w-2 h-2 bg-white/50 border border-white/20"
          style={{ imageRendering: "pixelated" }}
          initial={{ y: 0, x: -4, opacity: 0 }}
          animate={{
            y: [-10, -25, -40],
            x: [-4 + (i - 2) * 4, -4 + (i - 2) * 8, -4 + (i - 2) * 12],
            opacity: [0, 0.7, 0],
            scale: [0.5, 1, 1.5],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.3,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

// ============================================
// Asa pixel art
// ============================================
function CoffeeHandle() {
  return (
    <div className="absolute right-[-18px] top-[35%] w-6 h-14 md:w-7 md:h-16 z-10">
      <div
        className="absolute inset-0 bg-[#4A4A4A] border-[3px] border-[#1A1A1A]"
        style={{
          clipPath: "polygon(0 15%, 100% 15%, 100% 85%, 0 85%)",
          imageRendering: "pixelated",
        }}
      />
      <div className="absolute top-[15%] left-0 w-full h-[25%] bg-[#6A6A6A]" style={{ imageRendering: "pixelated" }} />
      <div
        className="absolute right-[3px] top-1/2 -translate-y-1/2 w-2 h-8 md:w-3 md:h-10 bg-[#0A0A0A] border-2 border-[#000000]"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  )
}

// ============================================
// Espuma 16-bit
// ============================================
function CoffeeFoam() {
  return (
    <div className="absolute top-0 left-0 w-full h-2 overflow-visible">
      <div className="w-full h-full bg-[#D4B99F] border-b-2 border-[#967B6C]" style={{ imageRendering: "pixelated" }} />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-[#E5D4C1]" />
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#E5D4C1] border border-[#C9A88A]"
          style={{
            left: `${10 + i * 18}%`,
            top: "-2px",
            imageRendering: "pixelated",
          }}
          animate={{
            opacity: [0, 1, 0],
            y: [0, -4, -8],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.4,
          }}
        />
      ))}
    </div>
  )
}

// ============================================
// Burbujas flotantes
// ============================================
function CoffeeBubbles() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-[#D4B99F] border border-[#AF9D91]"
          style={{
            left: `${15 + i * 12}%`,
            filter: "drop-shadow(0 0 2px rgba(255,255,255,0.4))",
            imageRendering: "pixelated",
          }}
          initial={{ y: 10, opacity: 0, scale: 0 }}
          animate={{
            y: [10, -5, 2, -3, 0],
            opacity: [0, 0.8, 0.6, 0.4, 0],
            scale: [0, 1, 0.9, 0.8, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.5,
            ease: "easeOut",
          }}
        />
      ))}
    </>
  )
}

// ============================================
// Reflejo de luz
// ============================================
function CoffeeReflection() {
  return (
    <motion.div
      className="absolute top-2 left-2 w-6 h-6 bg-white/20 blur-sm"
      style={{ imageRendering: "pixelated" }}
      animate={{
        opacity: [0.2, 0.4, 0.2],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    />
  )
}

// ============================================
// Taza completa pixel art
// ============================================
function CoffeeCup({ loadingProgress }: { loadingProgress: number }) {
  return (
    <motion.div
      className="relative w-36 h-36 md:w-44 md:h-44 flex items-end justify-center"
      initial={{ scale: 0.8, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "backOut" }}
      style={{ imageRendering: "pixelated" }}
    >
      <CoffeeSteam />
      <CoffeeHandle />
      <div
        className="relative w-28 h-32 md:w-36 md:h-40 bg-gradient-to-b from-[#555555] to-[#3A3A3A] border-4 border-[#2A2A2A] overflow-hidden"
        style={{
          boxShadow: "inset 4px 4px 0 #6A6A6A, inset -4px -4px 0 #252525, 8px 8px 0 rgba(0,0,0,0.7)",
          imageRendering: "pixelated",
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-[#6A6A6A] to-[#555555] border-b-2 border-[#2A2A2A]"
          style={{
            boxShadow: "inset 0 2px 0 #7A7A7A",
            imageRendering: "pixelated",
          }}
        />

        <motion.div
          className="absolute bottom-0 left-0 w-full bg-gradient-to-b from-[#8B5E44] to-[#6F4E37]"
          style={{
            height: `${loadingProgress}%`,
            boxShadow: "inset 0 3px 6px rgba(0,0,0,0.4), inset 0 -2px 4px rgba(139,94,68,0.3)",
            imageRendering: "pixelated",
          }}
          animate={{
            boxShadow: [
              "inset 0 3px 6px rgba(0,0,0,0.4), inset 0 -2px 4px rgba(139,94,68,0.3)",
              "inset 0 3px 6px rgba(0,0,0,0.5), inset 0 -2px 4px rgba(139,94,68,0.4)",
            ],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <CoffeeFoam />
          <CoffeeBubbles />
          <CoffeeReflection />
        </motion.div>

        <div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-2 md:w-40 md:h-3 bg-gradient-to-b from-[#4A4A4A] to-[#3A3A3A] border-2 border-[#2A2A2A]"
          style={{
            boxShadow: "inset 0 2px 0 #5A5A5A, 0 4px 8px rgba(0,0,0,0.6)",
            imageRendering: "pixelated",
          }}
        />
      </div>

      <AnimatePresence>
        {loadingProgress > 20 &&
          Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-1 h-1 bg-[#8B5E44]"
              initial={{ scale: 0, x: 0, y: -10, opacity: 0 }}
              animate={{
                scale: [0, 1.5, 0],
                x: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 40],
                y: [-10, 30, 50],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.4,
                ease: "easeOut",
              }}
              style={{ imageRendering: "pixelated" }}
            />
          ))}
      </AnimatePresence>
    </motion.div>
  )
}

// ============================================
// Fondo: caída simple de PNGs sin físicas
// ============================================
function FallingImages({ windowSize }: { windowSize: { width: number; height: number } }) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const generated: Particle[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * windowSize.width,
      y: Math.random() * windowSize.height,
      size: 100 + Math.random() * 60,
      imageNumber: (i % 9) + 1,
      opacity: 0.1 + Math.random() * 0.1,
      duration: 6 + Math.random() * 4,
      delay: Math.random() * 4,
    }))
    setParticles(generated)
  }, [windowSize])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute border-2 border-white/10"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            imageRendering: "pixelated",
          }}
          animate={{
            y: [p.y, windowSize.height + 100],
            opacity: [p.opacity, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "linear",
          }}
        >
          <img
            src={`/mini/${p.imageNumber}.png`}
            alt="png de loading"
            className="w-full h-full object-cover"
            style={{ imageRendering: "pixelated" }}
          />
        </motion.div>
      ))}
    </div>
  )
}

// ============================================
// Barra de progreso
// ============================================
function ProgressBar({ loadingProgress }: { loadingProgress: number }) {
  return (
    <div className="w-64 md:w-80 space-y-2">
      <div
        className="w-full h-8 bg-[#1A1A1A] border-4 border-[#555555] relative overflow-hidden"
        style={{
          boxShadow: "inset 2px 2px 0 #0A0A0A, inset -2px -2px 0 #2A2A2A",
          imageRendering: "pixelated",
        }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#7CB342] via-[#8BC34A] to-[#7CB342]"
          style={{
            width: `${loadingProgress}%`,
            boxShadow: "inset 2px 2px 0 #9CCC65, inset -2px -2px 0 #558B2F",
            imageRendering: "pixelated",
          }}
          animate={{ backgroundPosition: ["0% 0%", "100% 0%"] }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-[#CDDC39] opacity-60" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-[#558B2F] opacity-60" />
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-white font-bold text-sm md:text-base pixel-text z-10"
            style={{ textShadow: "2px 2px 0 #000" }}
          >
            {loadingProgress}%
          </span>
        </div>
      </div>
      <div className="flex justify-center gap-1">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-4 h-4 md:w-5 md:h-5 border-2"
            style={{
              backgroundColor: loadingProgress > i * 10 ? "#7CB342" : "#2A2A2A",
              borderColor: loadingProgress > i * 10 ? "#558B2F" : "#1A1A1A",
              boxShadow:
                loadingProgress > i * 10
                  ? "inset 1px 1px 0 #9CCC65, 2px 2px 0 rgba(0,0,0,0.5)"
                  : "inset 1px 1px 0 #1A1A1A",
              imageRendering: "pixelated",
            }}
            animate={loadingProgress > i * 10 ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  )
}

// ============================================
// LOADING SCREEN
// ============================================
export function LoadingScreen() {
  const { isLoading, setIsLoading } = useAppStore()
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("Generando mundo...")
  const [currentTip, setCurrentTip] = useState("")
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 })

  const loadingMessages = [
    "Generando mundo...",
    "Colocando bloques...",
    "Cargando estructuras...",
    "Aplicando texturas...",
    "Preparando aventura...",
  ]

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
      const randomTip = loadingTips.tips[Math.floor(Math.random() * loadingTips.tips.length)]
      setCurrentTip(randomTip)
    }
  }, [])

  useEffect(() => {
    if (!isLoading) return

    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2
      })
    }, 50)

    const textInterval = setInterval(() => {
      setLoadingText((prev) => {
        const currentIndex = loadingMessages.indexOf(prev)
        const nextIndex = (currentIndex + 1) % loadingMessages.length
        return loadingMessages[nextIndex]
      })
    }, 600)

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2800)

    return () => {
      clearInterval(progressInterval)
      clearInterval(textInterval)
      clearTimeout(timer)
    }
  }, [isLoading, setIsLoading])

  if (!isLoading) return null

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{
        background: "linear-gradient(180deg, #0F0F0F 0%, #1A1A1A 50%, #0F0F0F 100%)",
        imageRendering: "pixelated",
      }}
    >
      {/* ============================================ */}
      {/* FONDO: Imágenes flotantes con físicas */}
      {/* ============================================ */}
      <FallingImages windowSize={windowSize} />

      {/* ============================================ */}
      {/* CONTENIDO PRINCIPAL */}
      {/* ============================================ */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-4">
        <CoffeeCup loadingProgress={loadingProgress} />

        {/* ============================================ */}
        {/* NOMBRE DEL SERVIDOR */}
        {/* ============================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center space-y-2"
        >
          <h1
            className="text-2xl md:text-4xl font-bold text-[#FFD700] pixel-text"
            style={{
              textShadow: "4px 4px 0 #8B4513, 0 0 20px #FFD700, 0 0 30px #FFA500",
              imageRendering: "pixelated",
            }}
          >
            NETHERIOUS
          </h1>
          <motion.p
            className="text-xs md:text-sm text-[#AAAAAA] font-mono"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          >
            {loadingText}
          </motion.p>
        </motion.div>

        {/* ============================================ */}
        {/* BARRA DE PROGRESO */}
        {/* ============================================ */}
        <ProgressBar loadingProgress={loadingProgress} />

        {/* ============================================ */}
        {/* TIP ALEATORIO */}
        {/* ============================================ */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="text-[0.65rem] md:text-xs text-[#666666] font-mono text-center max-w-xs px-4"
        >
          {currentTip}
        </motion.p>
      </div>
    </motion.div>
  )
}
