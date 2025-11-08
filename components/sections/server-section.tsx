"use client"

import { motion } from "framer-motion"
import { SectionContainer } from "@/components/section-container"
import { GlassCard } from "@/components/glass-card"
import { Copy, CheckCircle2, Server, Cpu, Coffee, Zap, HardDrive, Sparkles, Globe, Shield, Gauge } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"
import { useSoundEffects } from "@/hooks/use-sound-effects"
import serverData from "@/data/server.json"

const iconMap: Record<string, any> = {
  Server,
  Cpu,
  Coffee,
  Zap,
  HardDrive,
  Sparkles,
  Globe, // Agregados nuevos íconos para specs del servidor
  Shield,
  Gauge,
}

export function ServerSection() {
  const { copied, copy } = useCopyToClipboard()
  const { playSound } = useSoundEffects()

  const handleCopy = () => {
    playSound("copy")
    copy(serverData.ip)
  }

  return (
    <SectionContainer>
      <div className="space-y-10 pixel-dissolve">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center space-y-6 relative"
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 bg-primary/30 rounded-sm"
                style={{
                  left: `${15 + i * 15}%`,
                  top: `${Math.random() * 50}%`,
                }}
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.2, 0.6, 0.2],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 2 + Math.random(),
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>

          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-balance pixel-text drop-shadow-lg">{serverData.title}</h2>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-[family-name:var(--font-vt323)] max-w-3xl mx-auto">
            {serverData.subtitle}
          </p>
        </motion.div>

        <GlassCard delay={0.15} className="space-y-4 crt-flicker relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
          <h3 className="text-2xl md:text-3xl font-bold pixel-text relative z-10">{serverData.intro.title}</h3>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-[family-name:var(--font-vt323)] relative z-10">
            {serverData.intro.description}
          </p>
        </GlassCard>

        <GlassCard delay={0.2} className="text-center space-y-8 crt-flicker p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />

          <div className="space-y-6 relative z-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="w-16 h-16 mx-auto"
            >
              <Globe className="w-full h-full text-primary pixelated opacity-20" />
            </motion.div>

            <h3 className="text-base md:text-lg font-semibold text-muted-foreground pixel-text">
              Dirección del Servidor
            </h3>

            <motion.div
              animate={copied ? { scale: [1, 1.08, 1] } : {}}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex items-center justify-center gap-4 flex-wrap"
            >
              <code className="font-mono font-bold text-primary bg-primary/10 px-6 py-3 pixel-border text-[clamp(0.65rem,3.5vw,1.125rem)] max-w-full break-words text-center block overflow-hidden leading-tight shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                {serverData.ip}
              </code>

              <Button
                onClick={handleCopy}
                onMouseEnter={() => playSound("hover")}
                size="lg"
                variant={copied ? "default" : "copy"}
                className="h-14 text-base md:text-lg pixel-border minecraft-button"
              >
                {copied ? (
                  <>
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 180, damping: 12 }}
                    >
                      <CheckCircle2 className="w-6 h-6 mr-2" />
                    </motion.div>
                    ¡Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-6 h-6 mr-2" />
                    Copiar IP
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </GlassCard>

        <GlassCard delay={0.3} className="space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-2xl md:text-3xl font-bold pixel-text">Requisitos del Sistema</h3>
            <p className="text-lg text-muted-foreground font-[family-name:var(--font-vt323)]">
              Especificaciones mínimas para jugar
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {serverData.requirements.map((req, index) => {
              const Icon = iconMap[req.icon as keyof typeof iconMap]

              return (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  whileHover={{ y: -8, scale: 1.05 }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                  className="space-y-4 text-center p-6 bg-background/50 border-4 rounded-none relative overflow-hidden group"
                  style={{ borderColor: req.color }}
                >
                  {/* Hover effect background */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{ backgroundColor: req.color }}
                  />

                  <div
                    className="w-14 h-14 mx-auto flex items-center justify-center border-4 rounded relative z-10"
                    style={{ borderColor: req.color, backgroundColor: `${req.color}20` }}
                  >
                    {Icon && <Icon className="w-7 h-7 pixelated" style={{ color: req.color }} />}
                  </div>

                  <div className="relative z-10">
                    <div className="font-semibold text-base md:text-lg pixel-text" style={{ color: req.color }}>
                      {req.label}
                    </div>
                    <div className="text-lg md:text-2xl text-foreground font-[family-name:var(--font-vt323)] leading-relaxed font-bold">
                      {req.value}
                    </div>
                  </div>

                  <p className="text-xs md:text-sm text-muted-foreground italic relative z-10">{req.description}</p>
                </motion.div>
              )
            })}
          </div>
        </GlassCard>

        <GlassCard delay={0.4} className="space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-2xl md:text-3xl font-bold pixel-text">Características del Servidor</h3>
            <p className="text-lg text-muted-foreground font-[family-name:var(--font-vt323)]">
              Lo que hace especial a Netherious
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {serverData.specs.map((spec, index) => {
              const Icon = iconMap[spec.icon as keyof typeof iconMap]

              return (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-6 bg-accent/5 border-4 border-accent/30 rounded relative group"
                >
                  <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                    className="w-12 h-12 mx-auto mb-3 flex items-center justify-center bg-accent/20 border-2 border-accent/50 rounded relative z-10"
                  >
                    {Icon && <Icon className="w-6 h-6 text-accent pixelated" />}
                  </motion.div>

                  <p className="font-semibold pixel-text text-sm md:text-base relative z-10">{spec.label}</p>
                  <p className="text-accent font-bold text-lg md:text-xl font-[family-name:var(--font-vt323)] relative z-10">
                    {spec.value}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </GlassCard>
      </div>
    </SectionContainer>
  )
}
