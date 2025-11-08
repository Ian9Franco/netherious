"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useState, useEffect } from "react"
import { useAppStore } from "@/lib/store"

const sectionColors = {
  home: "#5b9bd5",
  install: "#8fce00",
  server: "#ef4444",
  lore: "#a855f7",
}

export function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true)
  const { currentSection } = useAppStore()

  const currentColor = sectionColors[currentSection as keyof typeof sectionColors] || "#5b9bd5"

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
        >
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center gap-2"
          >
            <span
              className="text-xs md:text-sm font-bold pixel-text drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              style={{ color: `${currentColor}CC` }}
            >
              SCROLL
            </span>

            <div className="relative">
              <motion.div
                className="w-10 h-10 md:w-12 md:h-12 border-4 flex items-center justify-center pixel-border"
                style={{
                  borderColor: currentColor,
                  backgroundColor: `${currentColor}33`,
                }}
                animate={{
                  boxShadow: [`0 0 0px ${currentColor}80`, `0 0 20px ${currentColor}CC`, `0 0 0px ${currentColor}80`],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <ChevronDown
                  className="w-6 h-6 md:w-7 md:h-7 pixelated"
                  strokeWidth={3}
                  style={{ color: currentColor }}
                />
              </motion.div>
            </div>

            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-none"
                style={{
                  backgroundColor: currentColor,
                  left: `${20 + i * 20}%`,
                  top: "50%",
                }}
                animate={{
                  y: [0, 30, 60],
                  opacity: [1, 0.5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                  ease: "easeOut",
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
