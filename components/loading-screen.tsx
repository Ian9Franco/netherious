"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { useAppStore } from "@/lib/store"

const BLOCK_COUNT = 10

export function LoadingScreen() {
  const { isLoading, setIsLoading } = useAppStore()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500)
    return () => clearTimeout(timer)
  }, [setIsLoading])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1c1c1c]">
      {/* Logo / Cubo animado */}
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 1.2 }}
        className="w-20 h-20 bg-[#2a7fff] pixel-border flex items-center justify-center"
      >
        <div className="w-10 h-10 bg-[#5fd3ff] pixel-border" />
      </motion.div>

      {/* Texto */}
      <motion.h2
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-4 text-xl font-bold font-[family-name:var(--font-vt323)] text-[#e0e0e0] pixel-text"
      >
        Loading World...
      </motion.h2>

      {/* Barra de bloques tipo Minecraft */}
      <div className="mt-4 flex space-x-1">
        {Array.from({ length: BLOCK_COUNT }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ delay: i * 0.1, repeat: Infinity, duration: 0.8 }}
            className="w-4 h-4 bg-[#2a7fff] pixel-border"
          />
        ))}
      </div>
    </div>
  )
}
