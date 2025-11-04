"use client"

import { motion } from "framer-motion"
import { SectionContainer } from "@/components/section-container"
import { GlassCard } from "@/components/glass-card"
import { Download, Package, Palette, Sparkles, ExternalLink, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useSoundEffects } from "@/hooks/use-sound-effects"
import installData from "@/data/install.json"

const iconMap: Record<string, any> = {
  Download,
  Package,
  Palette,
  Sparkles,
  Settings,
}

export function InstallSection() {
  const [downloading, setDownloading] = useState<string | null>(null)
  const { toast } = useToast()
  const { playSound } = useSoundEffects()

  const handleDownload = (itemId: string, itemName: string) => {
    playSound("click")
    setDownloading(itemId)

    setTimeout(() => {
      setDownloading(null)
      toast({
        title: "Descarga iniciada",
        description: `${itemName} se está descargando.`,
      })
    }, 1500)
  }

  const iconoRotacion = {
    animate: { rotate: 360 },
    transition: { duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" as const },
  }

  return (
    <SectionContainer>
      <div className="space-y-10 pixel-dissolve">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-balance pixel-text">{installData.title}</h2>
          <p className="text-2xl md:text-4xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-[family-name:var(--font-vt323)]">
            {installData.subtitle}
          </p>

        </motion.div>

        {/* Intro */}
        {installData.intro && (
          <GlassCard delay={0.15} className="text-center space-y-4 crt-flicker">
            <h3 className="text-2xl md:text-3xl font-bold pixel-text">{installData.intro.title}</h3>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-[family-name:var(--font-vt323)]">
              {installData.intro.steps}
            </p>

          </GlassCard>
        )}

        {/* Sections */}
        {installData.sections.map((section, delayIndex) => {
          const Icon = iconMap[section.icon as keyof typeof iconMap]

          return (
            <GlassCard
              key={section.id}
              delay={0.2 + delayIndex * 0.1}
              className="space-y-6 crt-flicker p-8"
            >
              {/* Header */}
              <div className="flex items-start gap-6">
                <div
                  className="w-14 h-14 flex items-center justify-center pixel-border flex-shrink-0 rounded"
                  style={{ backgroundColor: `${section.color}20`, borderColor: section.color }}
                >
                  {Icon && <Icon className="w-7 h-7" style={{ color: section.color }} />}
                </div>
                <div className="space-y-3 flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl md:text-3xl font-bold pixel-text">{section.title}</h3>
                   {section.critical && (
                    <span
                      className="
                        px-2 py-1 
                        font-bold rounded pixel-border 
                        text-[clamp(0.55rem,2.5vw,0.75rem)] 
                        leading-tight text-center block 
                        max-w-full break-words overflow-hidden
                      "
                      style={{
                        backgroundColor: `${section.color}30`,
                        borderColor: section.color,
                        color: section.color,
                      }}
                    >
                      ESENCIAL
                    </span>
                  )}

                  {section.count && (
                    <span
                      className="
                        ml-auto 
                        text-[clamp(0.55rem,2.5vw,0.75rem)] 
                        text-muted-foreground 
                        leading-tight block max-w-full break-words overflow-hidden
                      "
                    >
                      {section.count}
                    </span>
                  )}

                  </div>
                 <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-[family-name:var(--font-vt323)] tracking-wide">
                  {section.description}
                </p>


                  {section.recommendation && (
                    <p className="text-sm text-muted-foreground italic">
                      {section.recommendation}
                    </p>
                  )}
                </div>
              </div>

              {/* Lista o botones */}
              {section.links ? (
                <div className="space-y-3">
                  {section.links.map((shader, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      className="w-full h-12 text-sm md:text-base font-semibold pixel-border justify-between bg-transparent transition-all"
                      size="lg"
                      asChild
                      style={{
                        borderColor: `${section.color}40`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = `${section.color}30`
                        e.currentTarget.style.borderColor = section.color
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent"
                        e.currentTarget.style.borderColor = `${section.color}40`
                      }}
                    >
                      <a href={shader.url} target="_blank" rel="noopener noreferrer">
                        <div className="text-left">
                          <div className="font-semibold">{shader.name}</div>
                          <div className="text-xs text-muted-foreground">
                            Dificultad: {shader.difficulty}
                          </div>
                        </div>
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </Button>
                  ))}
                </div>
              ) : section.items ? (
                <div
                  className="space-y-3 pl-6 bg-background/40 p-4 border-l-4"
                  style={{ borderColor: section.color }}
                >
                  {section.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 text-base md:text-lg"
                    >
                      <span className="text-muted-foreground font-mono font-bold">{idx + 1}.</span>
                      <span className="text-foreground font-[family-name:var(--font-vt323)]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              ) : section.checkpoints ? (
                <div className="space-y-3 pl-6">
                  {section.checkpoints.map((checkpoint, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <span
                        className="font-bold text-2xl md:text-3xl flex-shrink-0 leading-none"
                        style={{ color: section.color }}
                      >
                        ✓
                      </span>
                      <span className="text-lg md:text-xl text-foreground font-[family-name:var(--font-vt323)] leading-snug">
                        {checkpoint}
                      </span>
                    </div>
                  ))}
                </div>
                            ) : null}

              {/* Botón principal */}
              {section.action && (
                <Button
                  onClick={() => handleDownload(section.id, section.title)}
                  disabled={downloading === section.id}
                  className="w-full h-12 text-sm md:text-base font-semibold pixel-border minecraft-button transition-all"
                  size="lg"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${section.color}30`
                    e.currentTarget.style.borderColor = section.color
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = ""
                    e.currentTarget.style.borderColor = ""
                  }}
                >
                  {downloading === section.id ? (
                    <>
                      <motion.div
                        {...iconoRotacion}
                        className="w-4 h-4 border-2 border-current border-t-transparent"
                        style={{ borderRadius: "2px" }}
                      />
                      Descargando...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      {section.action}
                    </>
                  )}
                </Button>
              )}
            </GlassCard>
          )
        })}
      </div>
    </SectionContainer>
  )
}
