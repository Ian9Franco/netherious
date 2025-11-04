"use client"

import { motion } from "framer-motion"
import { SectionContainer } from "@/components/section-container"
import { GlassCard } from "@/components/glass-card"
import { Copy, CheckCircle2, Server, Cpu, Coffee, Zap, HardDrive, Sparkles } from "lucide-react"
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
          className="text-center space-y-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-balance pixel-text">{serverData.title}</h2>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-[family-name:var(--font-vt323)]">
            {serverData.subtitle}   
          </p>
        </motion.div>

        <GlassCard delay={0.15} className="space-y-4 crt-flicker">
          <h3 className="text-2xl md:text-3xl font-bold pixel-text">{serverData.intro.title}</h3>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-[family-name:var(--font-vt323)]">
          {serverData.intro.description}
        </p>

        </GlassCard>

        <GlassCard delay={0.2} className="text-center space-y-8 crt-flicker p-8">
          <div className="space-y-6">
            <h3 className="text-base md:text-lg font-semibold text-muted-foreground pixel-text">
              Dirección del Servidor
            </h3>
            <motion.div
              animate={copied ? { scale: [1, 1.08, 1] } : {}}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex items-center justify-center gap-4 flex-wrap"
            >
             <code
              className="
                font-mono font-bold text-primary bg-primary/10 
                px-6 py-3 pixel-border 
                text-[clamp(0.65rem,3.5vw,1.125rem)] 
                max-w-full break-words text-center block 
                overflow-hidden leading-tight
              "
            >
              {serverData.ip}
            </code>

              <Button
                onClick={handleCopy}
                size="lg"
                variant={copied ? "default" : "outline"}
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
          <h3 className="text-2xl md:text-3xl font-bold pixel-text text-center">Requisitos Mínimos</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {serverData.requirements.map((req, index) => {
              const Icon = iconMap[req.icon as keyof typeof iconMap]

              return (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                  className="space-y-4 text-center p-6 bg-background/50 border-4 rounded-none"
                  style={{ borderColor: req.color }}
                >
                  <div
                    className="w-14 h-14 mx-auto flex items-center justify-center border-4 rounded"
                    style={{ borderColor: req.color, backgroundColor: `${req.color}20` }}
                  >
                    {Icon && <Icon className="w-7 h-7 pixelated" style={{ color: req.color }} />}
                  </div>
                  <div>
                    <div className="font-semibold text-base md:text-lg pixel-text" style={{ color: req.color }}>
                      {req.label}
                    </div>
                    <div className="text-lg md:text-2xl text-muted-foreground font-[family-name:var(--font-vt323)] leading-relaxed">
                      {req.value}
                    </div>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground italic">{req.description}</p>
                </motion.div>
              )
            })}
          </div>
        </GlassCard>

        {serverData.specs && (
          <GlassCard delay={0.4} className="space-y-8">
            <h3 className="text-2xl md:text-3xl font-bold pixel-text text-center">Especificaciones Recomendadas</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {serverData.specs.map((spec, index) => {
                const Icon = iconMap[spec.icon as keyof typeof iconMap]

                return (
                  <motion.div
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center p-6 bg-accent/5 border-2 border-accent/30 rounded"
                  >
                    <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center bg-accent/20 border-2 border-accent/50 rounded">
                      {Icon && <Icon className="w-6 h-6 text-accent pixelated" />}
                    </div>
                    <p className="font-semibold pixel-text text-sm md:text-base">{spec.label}</p>
                    <p className="text-accent font-bold text-lg md:text-xl font-[family-name:var(--font-vt323)]">
                      {spec.value}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </GlassCard>
        )}
      </div>
    </SectionContainer>
  )
}
