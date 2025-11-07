"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Home, Download, Server, BookOpen, Menu, X } from "lucide-react"
import { useAppStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

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

  const handleNavClick = (section: Section) => {
    setCurrentSection(section)
    setIsOpen(false)
  }

  return (
    <>
      {/* Mobile menu button — moved to right */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="fixed top-6 right-6 z-40 md:hidden"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          variant="outline"
          className="w-12 h-12 rounded-full backdrop-blur-md bg-background/40 border-border"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </motion.div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 md:hidden"
            />

            <motion.nav
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed left-0 top-0 bottom-0 w-64 bg-card/95 backdrop-blur-xl border-r border-border z-40 md:hidden p-6 flex flex-col justify-between"
            >
              {/* Menu items */}
              <div className="space-y-2 mt-20">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = currentSection === item.id

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-lg"
                          : "hover:bg-accent text-foreground",
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  )
                })}
              </div>

              {/* Logo at bottom */}
              <div className="flex justify-center mb-6">
                <Image
                  src="/logo/logo.png"
                   alt="Netherious RPG Logo"
                  width={160}
                  height={120}
                  className="opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
