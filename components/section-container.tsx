"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionContainerProps {
  children: ReactNode
  className?: string
  id?: string
}

export function SectionContainer({ children, className, id }: SectionContainerProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={cn(
        "relative min-h-screen w-full py-12 md:py-20 px-4 md:px-8 flex items-center justify-center",
        className,
      )}
    >
      <div className="w-full max-w-6xl mx-auto">{children}</div>
    </motion.section>
  )
}
