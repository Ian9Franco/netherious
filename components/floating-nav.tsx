"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Home, Download, Server, BookOpen, Menu, X } from "lucide-react"
import { useAppStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import { useSoundEffects } from "@/hooks/use-sound-effects"
import Image from "next/image"
import { useState } from "react"

type Section = "home" | "install" | "server" | "lore"

const navItems = [
  { id: "home" as Section, icon: Home, label: "Inicio" },
  { id: "install" as Section, icon: Download, label: "Mods" },
  { id: "server" as Section, icon: Server, label: "Server" },
  { id: "lore" as Section, icon: BookOpen, label: "Lore" },
]

export function FloatingNav() {
  const { currentSection, setCurrentSection } = useAppStore()
  const { playSound } = useSoundEffects()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNavClick = (section: Section) => {
    playSound("transition")
    setCurrentSection(section)
    setMenuOpen(false)
  }

  return (
    <>
      {/* --- LOGO (Desktop + Mobile) --- */}
      {currentSection !== "home" && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="fixed left-4 top-4 z-50 flex items-center"
        >
          <Image
            src="/logo/logo.png"
            alt="Netherious Logo"
            width={160}
            height={120}
            className="w-32 h-auto drop-shadow-[0_0_12px_rgba(255,150,80,0.5)]"
          />
        </motion.div>
      )}

      {/* --- DESKTOP NAV --- */}
      <motion.nav
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-5"
      >
        {navItems.map((item, index) => {
          const Icon = item.icon
          const isActive = currentSection === item.id

          return (
            <motion.button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              onMouseEnter={() => playSound("hover")}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
              className={cn(
                "group relative w-14 h-14 flex items-center justify-center border-2 transition-all duration-200 rounded-none",
                "bg-gradient-to-br from-[#1d1a17] to-[#2e2924] shadow-[inset_1px_1px_0_#5a4c43,inset_-1px_-1px_0_#0d0a09,3px_3px_0_rgba(0,0,0,0.4)]",
                isActive
                  ? "from-[#3a2c26] to-[#5b3b2e] shadow-[inset_2px_2px_0_#e57c35,inset_-2px_-2px_0_#29180f,0_0_12px_rgba(255,130,60,0.8)]"
                  : "hover:from-[#322720] hover:to-[#4b3529] hover:shadow-[inset_2px_2px_0_#d38c4a,inset_-2px_-2px_0_#120b07,0_0_6px_rgba(255,130,60,0.5)]",
              )}
            >
              <Icon
                className={cn(
                  "w-6 h-6 pixelated transition-all",
                  isActive
                    ? "text-[#ffb680] drop-shadow-[0_0_6px_rgba(255,180,100,0.8)]"
                    : "text-[#f2e3c6] group-hover:text-[#ff9e59]",
                )}
              />

              {/* Pixel highlight corners when active */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute top-0 left-0 w-2 h-2 bg-[#ff9e59]" />
                  <div className="absolute top-0 right-0 w-2 h-2 bg-[#ff9e59]" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 bg-[#ff9e59]" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#ff9e59]" />
                </motion.div>
              )}
            </motion.button>
          )
        })}
      </motion.nav>

      {/* --- MOBILE NAV --- */}
      <div className="fixed top-0 left-0 w-full z-50 flex items-center justify-between bg-[#1b1613]/80 backdrop-blur-md p-4 md:hidden border-b border-[#ff9e59]/30">
        {currentSection !== "home" && (
          <Image
            src="/logo/logo3.png"
            alt="Netherious Logo"
            width={100}
            height={70}
            className="w-20 h-auto drop-shadow-[0_0_10px_rgba(255,150,80,0.5)]"
          />
        )}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          onMouseEnter={() => playSound("hover")}
          className="p-2 border-2 border-[#ff9e59]/70 bg-[#2b221e] hover:bg-[#3b2a24] shadow-[2px_2px_0_#0d0a09,inset_1px_1px_0_#5a4c43] transition-all"
        >
          {menuOpen ? (
            <X className="w-6 h-6 text-[#ffb680]" />
          ) : (
            <Menu className="w-6 h-6 text-[#ffb680]" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 w-full bg-[#1a1512]/95 border-t border-[#ff9e59]/20 backdrop-blur-md z-40 flex flex-col items-center gap-3 p-5"
          >
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = currentSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={cn(
                    "w-full flex items-center justify-center gap-3 py-3 text-lg font-medium border-2 transition-all duration-200",
                    "bg-gradient-to-br from-[#241d18] to-[#382e26] text-[#f2e3c6]",
                    isActive
                      ? "border-[#ff9e59] text-[#ffb680] shadow-[0_0_12px_rgba(255,130,60,0.6)]"
                      : "border-[#ff9e59]/30 hover:border-[#ff9e59]/60 hover:text-[#ffb680]",
                  )}
                >
                  <Icon className="w-6 h-6" />
                  {item.label}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
