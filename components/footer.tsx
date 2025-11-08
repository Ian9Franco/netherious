"use client"

import { motion } from "framer-motion"
import { Instagram, Linkedin, Github, Globe } from "lucide-react"
import { useSoundEffects } from "@/hooks/use-sound-effects"

const socialLinks = [
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/ian.franco._/",
    color: "hover:text-[#E4405F]",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/ian-franco-collada-pontorno",
    color: "hover:text-[#0A66C2]",
  },
  { name: "GitHub", icon: Github, url: "https://github.com/Ian9Franco", color: "hover:text-foreground" },
  {
    name: "Portfolio",
    icon: Globe,
    url: "https://ian-pontorno-portfolio.vercel.app/",
    color: "hover:text-[#73DB24]",
  },
]

export function Footer() {
  const { playSound } = useSoundEffects()
  const currentYear = new Date().getFullYear()

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
                  onClick={() => playSound("redirect")}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 flex items-center justify-center bg-background border-4 border-border transition-colors ${link.color} minecraft-button`}
                  aria-label={link.name}
                >
                  <Icon className="w-5 h-5 pixelated" />
                </motion.a>
              )
            })}
          </div>

          {/* Copyright / Email */}
          <div className="flex flex-col items-center md:items-end gap-1">
            <motion.a
              href="mailto:ian9franco@gmail.com"
              onClick={() => playSound("redirect")}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="text-lg md:text-xl text-muted-foreground font-[family-name:var(--font-vt323)] cursor-pointer transition-colors hover:text-cyan-400"
            >
              ian9franco@gmail.com
            </motion.a>

            <motion.a
              href="https://ian-pontorno-portfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playSound("redirect")}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="text-lg md:text-xl text-muted-foreground font-[family-name:var(--font-vt323)] cursor-pointer transition-colors hover:text-orange-500"
            >
              © {currentYear} Ian Pontorno — Todos los derechos reservados.
            </motion.a>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
