"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Home, Download, Server, BookOpen, Menu, X } from "lucide-react"
import { useAppStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useSoundEffects } from "@/hooks/use-sound-effects"

type Section = "home" | "install" | "server" | "lore"

const navItems = [
  { id: "home" as Section, icon: Home, label: "Inicio" },
  { id: "install" as Section, icon: Download, label: "Mods" },
  { id: "server" as Section, icon: Server, label: "Server" },
  { id: "lore" as Section, icon: BookOpen, label: "Lore" },
]

export function MobileNav() {
  const { currentSection, setCurrentSection } = useAppStore()
  const [isOpen, setIsOpen] = useState(false)

  // Hook para reproducir sonidos
  const { playSound } = useSoundEffects()

  const handleNavClick = (section: Section) => {
    setCurrentSection(section)
    setIsOpen(false)
    playSound("redirect") // sonido solo al click
  }

  return (
    <>
      {/* Botón del menú */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="fixed top-6 right-6 z-40 md:hidden"
        style={{ imageRendering: "pixelated" }}
      >
        <Button
          onClick={() => {
            setIsOpen(!isOpen)
            playSound("click") // sonido solo al click
          }}
          size="icon"
          className={cn(
            "w-14 h-14 rounded-none border-4 transition-all duration-200",
            "bg-[#3C3C3C] border-[#2B2B2B]",
            "shadow-[inset_2px_2px_0_#4A4A4A,inset_-2px_-2px_0_#1E1E1E]",
            "hover:bg-[#4A4A4A] hover:border-[#5A5A5A]",
            "active:shadow-[inset_1px_1px_0_#5A5A5A,inset_-1px_-1px_0_#2B2B2B]"
          )}
          style={{ imageRendering: "pixelated" }}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-[#F5DEB3]" strokeWidth={3} />
          ) : (
            <Menu className="w-6 h-6 text-[#F5DEB3]" strokeWidth={3} />
          )}
        </Button>
      </motion.div>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/70 z-30 md:hidden"
            />

            <motion.nav
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed left-0 top-0 bottom-0 w-64 bg-[#3C3C3C] border-r-8 border-[#2B2B2B] z-40 md:hidden p-6 flex flex-col justify-between shadow-[inset_-4px_0_0_#1E1E1E,inset_4px_0_0_#5A5A5A]"
              style={{ imageRendering: "pixelated" }}
            >
              {/* Items del menú */}
              <div className="space-y-3 mt-20">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = currentSection === item.id

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-none transition-all duration-200 border-3 font-medium",
                        isActive
                          ? "bg-[#5A5A5A] border-[#7A7A7A] shadow-[inset_2px_2px_0_#8A8A8A,inset_-2px_-2px_0_#3A3A3A,0_0_8px_rgba(255,255,255,0.3)] text-white scale-105"
                          : "bg-[#373737] border-[#2B2B2B] shadow-[inset_2px_2px_0_#4A4A4A,inset_-2px_-2px_0_#1E1E1E] text-[#AAAAAA] hover:bg-[#4A4A4A] hover:text-white hover:border-[#5A5A5A]"
                      )}
                      style={{ imageRendering: "pixelated" }}
                    >
                      <Icon className="w-5 h-5" strokeWidth={2.5} />
                      <span style={{ textShadow: "2px 2px 0 #000" }}>{item.label}</span>
                    </button>
                  )
                })}
              </div>

              {/* Logo */}
              <div className="flex justify-center mb-6">
                <Image
                  src="/logo/logo.png"
                  alt="Netherious RPG Logo"
                  width={160}
                  height={120}
                  className="opacity-90 hover:opacity-100 transition-opacity drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                  style={{ imageRendering: "pixelated" }}
                />
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
