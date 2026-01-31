"use client"

import { motion } from "framer-motion"
import { Instagram, Linkedin, Github, Globe } from "lucide-react"
import { useSoundEffects } from "@/hooks/use-sound-effects"
import Image from "next/image"

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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="fixed bottom-0 left-0 w-full z-40 border-t-2 border-white/5 bg-black/40 backdrop-blur-xl"
        >
            <div className="container mx-auto px-6 py-1">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Social Links */}
                    <div className="flex items-center gap-3">
                        {socialLinks.map((link) => {
                            const Icon = link.icon
                            return (
                                <motion.a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => playSound("nav-forward")}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`w-8 h-8 flex items-center justify-center bg-background border-2 border-border transition-colors ${link.color} minecraft-button`}
                                    aria-label={link.name}
                                >
                                    <Icon className="w-4 h-4 pixelated" />
                                </motion.a>
                            )
                        })}
                    </div>

                    {/* Decorative Eye */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="relative hidden md:block"
                    >
                        <Image
                            src="/assets/eyeender.gif"
                            alt="Eye of Ender"
                            width={40}
                            height={40}
                            className="pixelated drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]"
                        />
                    </motion.div>

                    {/* Copyright / Email */}
                    <div className="flex flex-col items-center md:items-end gap-0.5">
                        <motion.a
                            href="mailto:ian9franco@gmail.com"
                            onClick={() => playSound("nav-forward")}
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="text-lg md:text-xl text-muted-foreground font-[family-name:var(--font-vt323)] cursor-pointer transition-colors hover:text-cyan-400 leading-none"
                        >
                            @notorious
                        </motion.a>

                        <motion.a
                            href="https://ian-pontorno-portfolio.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => playSound("nav-forward")}
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="text-lg md:text-xl text-muted-foreground font-[family-name:var(--font-vt323)] cursor-pointer transition-colors hover:text-orange-500 leading-none"
                        >
                            © {currentYear} Ian Pontorno — Todos los derechos reservados.
                        </motion.a>
                    </div>
                </div>
            </div>
        </motion.footer>
    )
}
