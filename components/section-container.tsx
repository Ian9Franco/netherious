"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface SectionContainerProps {
  children: ReactNode
  className?: string
}

export function SectionContainer({ children, className = "" }: SectionContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className={`w-full min-h-screen flex items-center justify-center px-12 py-6 ${className}`}
    >
      <div className="w-full max-w-6xl">{children}</div>
    </motion.div>
  )
}
