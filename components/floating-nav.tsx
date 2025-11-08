"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Home, Download, Server, ImageIcon, BookOpen, Menu, X } from "lucide-react"
import { useAppStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import { useSoundEffects } from "@/hooks/use-sound-effects"
import Image from "next/image"
import { useState } from "react"

type Section = "home" | "install" | "server" | "lore"

const sectionColors = {
  home: "#5b9bd5",
  install: "#8fce00",
  server: "#ef4444",
  lore: "#a855f7",
    // gallery: "#ff9f43",
}

const navItems = [
  { id: "home" as Section, icon: Home, label: "Inicio" },
  { id: "install" as Section, icon: Download, label: "Mods" },
  { id: "server" as Section, icon: Server, label: "Server" },
  { id: "lore" as Section, icon: BookOpen, label: "Lore" },
  //{ id: "gallery" as Section, icon: ImageIcon, label: "Galería" },
  
]

export function FloatingNav() {
  const { currentSection, setCurrentSection } = useAppStore()
  const { playSound } = useSoundEffects()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNavClick = (section: Section) => {
    playSound("click")
    setCurrentSection(section)
    setMenuOpen(false)
  }

  return (
    <>
      {/* --- LOGO --- */}
      {currentSection !== "home" && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="fixed left-4 top-4 z-50 flex items-center"
          style={{ imageRendering: "pixelated" }}
        >
          <Image
            src="/logo/logo.png"
            alt="Netherious Logo"
            width={160}
            height={120}
            className="w-32 h-auto drop-shadow-[0_0_16px_rgba(255,150,80,0.6)]"
            style={{ imageRendering: "pixelated" }}
          />
        </motion.div>
      )}

      {/* --- DESKTOP NAV --- */}
      <motion.nav
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-2"
        style={{ imageRendering: "pixelated" }}
      >
        {navItems.map((item, index) => {
          const Icon = item.icon
          const isActive = currentSection === item.id
          const itemColor = sectionColors[item.id]

          return (
            <motion.button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
              className={cn(
                "group relative w-16 h-16 flex items-center justify-center border-4 transition-all duration-250 rounded-none",
                isActive
                  ? "bg-[#5A5A5A] border-[#8B8B8B] shadow-[inset_2px_2px_0_#B0B0B0,inset_-2px_-2px_0_#2A2A2A,0_0_10px_rgba(255,255,255,0.3)]"
                  : "bg-[#373737] border-[#555555] shadow-[inset_2px_2px_0_#4D4D4D,inset_-2px_-2px_0_#1A1A1A,4px_4px_0_rgba(0,0,0,0.4)] hover:bg-[#4A4A4A] hover:border-[#6A6A6A]",
              )}
              style={{ imageRendering: "pixelated" }}
            >
              <Icon
                className={cn(
                  "w-7 h-7 transition-all duration-300 ease-out",
                  isActive
                    ? "text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]"
                    : "text-[#AAAAAA] group-hover:text-white",
                )}
                strokeWidth={2.5}
                style={
                  isActive
                    ? {
                        color: itemColor,
                        filter: `drop-shadow(0 0 8px ${itemColor})`,
                      }
                    : {}
                }
              />
              {/* Textura sutil interna */}
              <div className="absolute inset-2 pointer-events-none opacity-15">
                <div className="w-1 h-1 bg-white absolute top-0 left-0" />
                <div className="w-1 h-1 bg-black absolute bottom-0 right-0" />
              </div>
            </motion.button>
          )
        })}
      </motion.nav>

      {/* --- MOBILE NAV --- */}
      <div
        className="fixed top-0 left-0 w-full z-50 flex items-center justify-between bg-[#3C3C3C] p-4 md:hidden border-b-4 border-[#2B2B2B] shadow-[inset_0_4px_0_#5A5A5A,inset_0_-4px_0_#1E1E1E]"
        style={{ imageRendering: "pixelated" }}
      >
        {currentSection !== "home" && (
          <Image
            src="/logo/logo3.png"
            alt="Netherious Logo"
            width={100}
            height={70}
            className="w-20 h-auto drop-shadow-[0_0_10px_rgba(255,150,80,0.5)]"
            style={{ imageRendering: "pixelated" }}
          />
        )}

        <button
          onClick={() => {
            playSound("click")
            setMenuOpen(!menuOpen)
          }}
          className="p-2 border-4 border-[#2B2B2B] bg-[#3C3C3C] hover:bg-[#4A4A4A] shadow-[inset_2px_2px_0_#4D4D4D,inset_-2px_-2px_0_#1A1A1A,3px_3px_0_rgba(0,0,0,0.5)] active:shadow-[inset_2px_2px_0_#2B2B2B] transition-all duration-200 rounded-none"
          style={{ imageRendering: "pixelated" }}
        >
          {menuOpen ? (
            <X className="w-6 h-6 text-[#F5DEB3]" strokeWidth={3} />
          ) : (
            <Menu className="w-6 h-6 text-[#F5DEB3]" strokeWidth={3} />
          )}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed top-20 left-0 w-full bg-[#3C3C3C]/98 border-y-4 border-[#2B2B2B] z-40 flex flex-col items-center gap-2 p-5 shadow-[inset_0_4px_0_#5A5A5A,inset_0_-4px_0_#1E1E1E]"
            style={{ imageRendering: "pixelated" }}
          >
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = currentSection === item.id
              const itemColor = sectionColors[item.id]

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={cn(
                    "w-full flex items-center justify-center gap-3 py-3 text-lg font-bold border-4 transition-all duration-200 rounded-none",
                    isActive
                      ? "bg-[#5A5A5A] border-[#8B8B8B] text-white shadow-[inset_2px_2px_0_#B0B0B0,inset_-2px_-2px_0_#2A2A2A,0_0_10px_rgba(255,255,255,0.4)] scale-105"
                      : "bg-[#373737] border-[#555555] text-[#AAAAAA] shadow-[inset_2px_2px_0_#4D4D4D,inset_-2px_-2px_0_#1A1A1A] hover:bg-[#4A4A4A] hover:border-[#6A6A6A] hover:text-white",
                  )}
                  style={{
                    imageRendering: "pixelated",
                    textShadow: "2px 2px 0 #000",
                  }}
                >
                  <Icon
                    className="w-6 h-6"
                    strokeWidth={2.5}
                    style={
                      isActive
                        ? {
                            color: itemColor,
                            filter: `drop-shadow(0 0 6px ${itemColor})`,
                          }
                        : {}
                    }
                  />
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
