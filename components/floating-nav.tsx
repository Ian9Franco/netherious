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
      {/* Logo - visible en todas las vistas */}
      {currentSection !== "home" && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="fixed left-4 top-4 z-50 flex items-center"
        >
          <Image
            src="/logo3.png"
            alt="Netherious Logo"
            width={160}
            height={120}
            className="w-32 h-auto drop-shadow-[0_0_10px_rgba(255,107,53,0.6)]"
          />
        </motion.div>
      )}

      {/* --- DESKTOP NAV (vertical) --- */}
      <motion.nav
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4"
        role="navigation"
        aria-label="Main navigation"
      >
        {navItems.map((item, index) => {
          const Icon = item.icon
          const isActive = currentSection === item.id

          return (
            <motion.button
              key={item.id}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              onClick={() => handleNavClick(item.id)}
              onMouseEnter={() => playSound("hover")}
              className={cn(
                "group relative w-14 h-14 flex items-center justify-center transition-all duration-200 rounded-none border-4",
                isActive
                  ? "bg-primary border-primary-foreground shadow-lg"
                  : "bg-card border-border hover:bg-[#ff6b35] hover:border-[#ff8c5a]",
                "shadow-[inset_2px_2px_0_rgba(255,255,255,0.2),inset_-2px_-2px_0_rgba(0,0,0,0.3),4px_4px_0_rgba(0,0,0,0.3)]",
                "hover:shadow-[inset_2px_2px_0_rgba(255,255,255,0.3),inset_-2px_-2px_0_rgba(0,0,0,0.2),3px_3px_0_rgba(0,0,0,0.3),0_0_12px_rgba(255,107,53,0.6)]",
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon
                className={cn(
                  "w-6 h-6 transition-colors pixelated",
                  isActive
                    ? "text-primary-foreground"
                    : "text-card-foreground group-hover:text-white",
                )}
              />
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute inset-0 border-4 border-[#ff6b35] pointer-events-none"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              )}
            </motion.button>
          )
        })}
      </motion.nav>

      {/* --- MOBILE NAV (burger + dropdown) --- */}
      <div className="fixed top-0 left-0 w-full z-50 flex items-center justify-between bg-black/40 backdrop-blur-md p-4 md:hidden border-b border-[#ff6b35]/30">
        {/* Logo */}
        {currentSection !== "home" && (
          <Image
            src="/logo/logo3.png"
            alt="Netherious Logo"
            width={100}
            height={70}
            className="w-20 h-auto drop-shadow-[0_0_10px_rgba(255,107,53,0.6)]"
          />
        )}

        {/* Burger Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          onMouseEnter={() => playSound("hover")}
          className="p-2 border-2 border-[#ff6b35] bg-card hover:bg-[#ff6b35]/30 transition-all duration-200"
        >
          {menuOpen ? (
            <X className="w-6 h-6 text-[#ff6b35]" />
          ) : (
            <Menu className="w-6 h-6 text-[#ff6b35]" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 w-full bg-black/80 backdrop-blur-md z-40 flex flex-col items-center gap-4 p-6 border-t border-[#ff6b35]/30 md:hidden"
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
                    isActive
                      ? "bg-[#ff6b35] text-black border-[#ff6b35]"
                      : "bg-card text-white border-[#ff6b35]/40 hover:bg-[#ff6b35]/20",
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
