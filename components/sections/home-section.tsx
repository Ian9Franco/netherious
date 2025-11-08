"use client"

import { motion, type Variants, easeOut } from "framer-motion"
import { SectionContainer } from "@/components/section-container"
import { GlassCard } from "@/components/glass-card"
import { Download, Sparkles, Zap, Users } from "lucide-react"
import { useSoundEffects } from "@/hooks/use-sound-effects"
import Image from "next/image"
import homeData from "@/data/home.json"
import { Button } from "../ui/button"

// Variants
const containerVariant: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.25, ease: easeOut } },
}

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
}

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
  hover: {
    scale: 1.05,
    rotate: [0, -5, 5, 0],
    boxShadow: "0 0 12px rgba(91,155,213,0.4)",
    transition: { duration: 0.4, ease: easeOut },
  },
}

const logoVariant: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const iconMap: Record<string, any> = {
  Download,
  Sparkles,
  Zap,
  Users, // Agregado ícono de Discord
}

export function HomeSection() {
  const { playSound } = useSoundEffects()

  const pixelText = "pixel-font text-lg md:text-2xl leading-relaxed text-foreground"
  const pixelSubText = "pixel-font text-base md:text-lg leading-relaxed text-muted-foreground"

  return (
    <SectionContainer className="min-h-screen flex flex-col justify-center overflow-hidden px-4 md:px-12">
      <motion.div
        variants={containerVariant}
        initial="hidden"
        animate="show"
        className="space-y-8 md:space-y-12 pixel-dissolve"
      >
        {/* Header */}
        <motion.div className="text-center space-y-4 md:space-y-6">
          <motion.div
            variants={logoVariant}
            initial="hidden"
            animate="show"
            className="flex justify-center animate-float"
          >
            <Image
              src="/logo/logo.png"
              alt="Netherious RPG Logo"
              width={800}
              height={400}
              priority
              className="w-auto h-auto max-h-[60vh] md:max-h-[70vh] drop-shadow-[0_0_50px_rgba(255,107,53,0.9)] pixel-glow"
            />
          </motion.div>

          <motion.div className="space-y-2 md:space-y-3">
            <motion.p variants={fadeUpVariant} className={pixelText + " max-w-2xl mx-auto"}>
              {homeData.hero.title}
            </motion.p>
            <motion.p variants={fadeUpVariant} className={pixelSubText + " max-w-2xl mx-auto"}>
              {homeData.hero.subtitle}
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Intro */}
        <GlassCard delay={0.3} className="text-center space-y-5 p-6 md:p-10 crt-flicker">
          <h2 className="text-2xl md:text-3xl font-bold pixel-text">{homeData.intro.title}</h2>
          <p className="text-2xl md:text-3xl text-muted-foreground leading-relaxed font-[family-name:var(--font-vt323)]">
            {homeData.intro.paragraph}
          </p>
        </GlassCard>

        {/* Cards */}
        <motion.div className="grid md:grid-cols-3 gap-4 md:gap-6 justify-items-center">
          {homeData.cards.map((item, i) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap]
            return (
              <GlassCard
                key={i}
                delay={0.6 + i * 0.1}
                className="text-center space-y-3 md:space-y-4 p-4 md:p-6 crt-flicker min-h-[180px] max-w-xs md:max-w-sm animate-float"
              >
                <motion.div
                  variants={cardVariant}
                  initial="hidden"
                  animate="show"
                  whileHover="hover"
                  className="w-16 h-16 mx-auto flex items-center justify-center border-4 rounded-lg"
                  style={{ borderColor: item.color, backgroundColor: `${item.color}20` }}
                >
                  {Icon && <Icon className="w-8 h-8 pixelated" style={{ color: item.color }} />}
                </motion.div>
                <motion.h3 variants={fadeUpVariant} className="text-sm font-bold pixel-text">
                  {item.title}
                </motion.h3>
                <motion.p variants={fadeUpVariant} className={pixelSubText}>
                  {item.text}
                </motion.p>
              </GlassCard>
            )
          })}
        </motion.div>


        {/* Discord Card with Sound Redirect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
          className="relative p-8 md:p-12 bg-gradient-to-br from-[#5865F2]/20 to-[#5865F2]/5 border-4 border-[#5865F2]/40 rounded-lg text-center space-y-6 overflow-hidden"
        >
          {/* Decorative particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-[#5865F2] rounded-sm"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <Users className="w-16 h-16 mx-auto text-[#5865F2] pixelated drop-shadow-[0_0_10px_rgba(88,101,242,0.5)]" />
          </motion.div>

          <div className="relative z-10 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-[#5865F2] pixel-text drop-shadow-lg">
              ¡unite a Nuestro SAS!
            </h2>
            <p className="text-xl md:text-2xl text-foreground/90 leading-relaxed font-[family-name:var(--font-vt323)] max-w-2xl mx-auto">
              Conéctate con el Mati, participa en el SAS y mantente al día con las últimas SAS en nuestro
              servidor de Discord
            </p>

            <Button
              size="lg"
              variant="default"
              asChild
              onClick={() => {
                playSound("redirect")
              }}
              className="mt-6 bg-[#5865F2] hover:bg-[#4752C4] text-white border-4 border-[#4752C4] shadow-[0_0_20px_rgba(88,101,242,0.4)] hover:shadow-[0_0_30px_rgba(88,101,242,0.6)] transition-all text-lg md:text-xl px-8 py-6"
            >
              <a href="https://discord.gg/nCaCK3pF" target="_blank" rel="noopener noreferrer">
                <Users className="w-6 h-6 mr-2 inline-block" />
                Que sasle?
              </a>
            </Button>
          </div>
        </motion.div>

        {/* CTA with Navigation to Install Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="p-6 md:p-8 bg-primary/10 border-4 border-primary/30 rounded-lg text-center space-y-4"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-primary pixel-text">{homeData.cta.title}</h2>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-[family-name:var(--font-vt323)]">
            {homeData.cta.description}
          </p>

          <Button
            size="lg"
            variant="default"
            onClick={() => {
              playSound("click")
              const section = document.getElementById("install")
              if (section) {
                section.scrollIntoView({ behavior: "smooth", block: "start" })
              }
            }}
            className="mt-4 bg-primary/20 hover:bg-primary/30 text-primary border-4 border-primary/40 backdrop-blur-md transition-all text-lg px-8 py-4"
          >
            {homeData.cta.button}
          </Button>
        </motion.div>
      </motion.div>
    </SectionContainer>
  )
}
