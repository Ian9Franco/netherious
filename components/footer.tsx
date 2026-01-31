"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Instagram, Linkedin, Github, Globe, ChevronUp, ChevronDown } from "lucide-react"
import { useSoundEffects } from "@/hooks/use-sound-effects"
import Image from "next/image"

const socialLinks = [
    {
        name: "Instagram",
        icon: Instagram,
        url: "https://www.instagram.com/ian.franco._/",
        color: "hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#E4405F] hover:to-[#FCAF45]",
        hoverText: "hover:text-white",
    },
    {
        name: "LinkedIn",
        icon: Linkedin,
        url: "https://www.linkedin.com/in/ian-franco-collada-pontorno",
        color: "hover:bg-[#0A66C2]",
        hoverText: "hover:text-white",
    },
    {
        name: "GitHub",
        icon: Github,
        url: "https://github.com/Ian9Franco",
        color: "hover:bg-[#333]",
        hoverText: "hover:text-white",
    },
    {
        name: "Portfolio",
        icon: Globe,
        url: "https://ian-pontorno-portfolio.vercel.app/",
        color: "hover:bg-gradient-to-br hover:from-[#73DB24] hover:to-[#4CAF50]",
        hoverText: "hover:text-white",
    },
]

export function Footer() {
    const [isExpanded, setIsExpanded] = useState(false)
    const { playSound } = useSoundEffects()
    const currentYear = new Date().getFullYear()

    const toggleFooter = () => {
        playSound("nav-forward")
        setIsExpanded(!isExpanded)
    }

    return (
        <div className="fixed bottom-0 left-0 w-full z-40">
            {/* Toggle Button */}
            <motion.button
                onClick={toggleFooter}
                className="absolute -top-10 left-1/2 -translate-x-1/2 z-50 
                           bg-gradient-to-b from-[#2a1810] to-[#1a0f0a] 
                           border-2 border-[#8B4513] border-b-0
                           px-4 py-1.5 flex items-center gap-2
                           shadow-[0_-4px_12px_rgba(0,0,0,0.3)]
                           hover:from-[#3a2820] hover:to-[#2a1810]
                           transition-all duration-200"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{
                    clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)',
                }}
            >
                <Image
                    src="/assets/eyeender.gif"
                    alt="Toggle"
                    width={24}
                    height={24}
                    className="pixelated"
                />
                <span className="text-[10px] font-[family-name:var(--font-pixel)] text-[#d4c4a8] uppercase tracking-wider hidden sm:inline">
                    {isExpanded ? "Cerrar" : "Créditos"}
                </span>
                {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-[#d4c4a8]" />
                ) : (
                    <ChevronUp className="w-4 h-4 text-[#d4c4a8]" />
                )}
            </motion.button>

            {/* Expandable Footer Content */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.footer
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "100%", opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative bg-gradient-to-b from-[#1a0f0a]/95 to-[#0d0705]/98 
                                   backdrop-blur-xl border-t-4 border-[#8B4513]
                                   shadow-[0_-8px_32px_rgba(0,0,0,0.5)]"
                    >
                        {/* Decorative pixel border top */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#d4c4a8]/30 to-transparent" />

                        <div className="container mx-auto px-4 md:px-8 py-6">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">

                                {/* Left: Eye of Ender with glow */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                    transition={{ delay: 0.1, type: "spring", damping: 15 }}
                                    className="relative"
                                >
                                    <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full scale-150" />
                                    <Image
                                        src="/assets/eyeender.gif"
                                        alt="Eye of Ender"
                                        width={80}
                                        height={80}
                                        className="pixelated relative z-10 drop-shadow-[0_0_20px_rgba(168,85,247,0.6)]"
                                    />
                                </motion.div>

                                {/* Center: Social Links */}
                                <motion.div
                                    className="flex flex-col items-center gap-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <h3 className="text-[12px] font-[family-name:var(--font-pixel)] text-[#8B4513] uppercase tracking-[0.3em]">
                                        Sígueme
                                    </h3>
                                    <div className="flex items-center gap-3">
                                        {socialLinks.map((link, index) => {
                                            const Icon = link.icon
                                            return (
                                                <motion.a
                                                    key={link.name}
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={() => playSound("nav-forward")}
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: 0.3 + index * 0.1 }}
                                                    whileHover={{ scale: 1.15, y: -4 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className={`w-12 h-12 flex items-center justify-center 
                                                               bg-[#2a1810] border-3 border-[#8B4513] 
                                                               text-[#d4c4a8] transition-all duration-200
                                                               shadow-[4px_4px_0_#000] hover:shadow-[2px_2px_0_#000]
                                                               hover:translate-x-[2px] hover:translate-y-[2px]
                                                               ${link.color} ${link.hoverText}`}
                                                    aria-label={link.name}
                                                >
                                                    <Icon className="w-5 h-5" style={{ imageRendering: 'pixelated' }} />
                                                </motion.a>
                                            )
                                        })}
                                    </div>
                                </motion.div>

                                {/* Right: Credits */}
                                <motion.div
                                    className="flex flex-col items-center md:items-end gap-2 text-center md:text-right"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <motion.a
                                        href="mailto:ian9franco@gmail.com"
                                        onClick={() => playSound("nav-forward")}
                                        whileHover={{ scale: 1.05, x: -4 }}
                                        className="text-[14px] font-[family-name:var(--font-pixel)] text-[#d4c4a8] 
                                                   hover:text-cyan-400 transition-colors tracking-wider"
                                    >
                                        @notorious
                                    </motion.a>

                                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#8B4513] to-transparent" />

                                    <motion.a
                                        href="https://ian-pontorno-portfolio.vercel.app/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => playSound("nav-forward")}
                                        whileHover={{ scale: 1.02 }}
                                        className="text-[10px] font-[family-name:var(--font-pixel)] text-[#8B4513]/80 
                                                   hover:text-orange-400 transition-colors"
                                    >
                                        © {currentYear} Ian Pontorno
                                    </motion.a>
                                    <span className="text-[8px] font-[family-name:var(--font-pixel)] text-[#5c3d1a]/60">
                                        Todos los derechos reservados
                                    </span>
                                </motion.div>
                            </div>
                        </div>

                        {/* Bottom decorative line */}
                        <div className="h-1 bg-gradient-to-r from-[#8B4513] via-[#d4c4a8]/50 to-[#8B4513]" />
                    </motion.footer>
                )}
            </AnimatePresence>
        </div>
    )
}
