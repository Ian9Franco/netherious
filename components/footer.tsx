"use client"

import { motion } from "framer-motion"
// import { useSoundEffects } from "@/hooks/use-sound-effects" // Asumimos que este hook existe en tu proyecto
import { Instagram, Linkedin, Github, Globe } from "lucide-react"

// --- Hook de marcador de posición ---
// Dado que no tengo el archivo de tu hook, usaré este
// para que el código sea funcional.
// ¡Simplemente borra esto si tu hook está en la ruta correcta!
const useSoundEffects = () => {
  // FIX: Se agregó 'sound: string' para resolver el error TS7006 (implicit any)
  const playSound = (sound: string) => {
    console.log(`Playing sound: ${sound}`)
  }
  return { playSound }
}
// --- Fin del marcador de posición ---

// Social links
const socialLinks = [
  { name: "Instagram", icon: Instagram, url: "https://www.instagram.com/ian.franco._/", color: "hover:text-[#E4405F]" },
  { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/in/ian-franco-collada-pontorno", color: "hover:text-[#0A66C2]" },
  { name: "GitHub", icon: Github, url: "https://github.com/Ian9Franco", color: "hover:text-[#000000]" },
  { name: "Portfolio", icon: Globe, url: "https://ian-pontorno-portfolio.vercel.app/", color: "hover:text-[#73DB24]" },
]

export function Footer() {
  const { playSound } = useSoundEffects()

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="relative z-30 border-t-4 border-border bg-card/95 backdrop-blur-sm"
    >
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon
              return (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => playSound("hover")}
                  onClick={() => playSound("click")}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 flex items-center justify-center bg-background border-4 border-border transition-colors ${link.color} minecraft-button`} // Asumo que minecraft-button es una clase global tuya
                  aria-label={link.name}
                >
                  <Icon className="w-5 h-5 pixelated" />
                </motion.a>
              )
            })}
          </div>

          {/* Copyright / Email */}
          <div className="flex flex-col items-center md:items-end gap-1">
            {/* Email Link */}
            <motion.a
              href="mailto:ian9franco@gmail.com"
              onMouseEnter={() => playSound("hover")}
              onClick={() => playSound("click")}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="text-lg md:text-xl text-muted-foreground font-[family-name:var(--font-vt323)] cursor-pointer transition-colors hover:text-cyan-400"
            >
              ian9franco@gmail.com
            </motion.a>

            {/* Copyright/Portfolio Link */}
            <motion.a
              href="https://ian-pontorno-portfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => playSound("hover")}
              onClick={() => playSound("click")}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="text-lg md:text-xl text-muted-foreground font-[family-name:var(--font-vt323)] cursor-pointer transition-colors hover:text-orange-500"
            >
              © 2025 Ian Pontorno — All rights reserved.
            </motion.a>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
