"use client"

import { motion } from "framer-motion"
import { SectionContainer } from "@/components/section-container"
import { GlassCard } from "@/components/glass-card"
import { Download, Package, Palette, Sparkles, ExternalLink, Settings, ChevronDown, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useSoundEffects } from "@/hooks/use-sound-effects"
import installData from "@/data/install.json"
import { cn } from "@/lib/utils"
import { AnimatePresence } from "framer-motion"

const iconMap: Record<string, any> = {
  Download,
  Package,
  Palette,
  Sparkles,
  Settings,
}

export function InstallSection() {
  const [downloading, setDownloading] = useState<string | null>(null)
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false)
  const [copiedStep, setCopiedStep] = useState<number | null>(null)
  const { toast } = useToast()
  const { playSound } = useSoundEffects()

  const handleDownload = (itemId: string, itemName: string, downloadUrl?: string, isRedirect?: boolean) => {
    playSound("click")
    setDownloading(itemId)

    if (downloadUrl) {
      playSound("redirect")
      window.open(downloadUrl, "_blank")
    }

    setTimeout(() => {
      setDownloading(null)
      playSound("download")
      if (isRedirect) {
        toast({
          title: "Redirigiendo",
          description: `Serás redirigido a la página de descarga de ${itemName}.`,
        })
      } else {
        toast({
          title: "Descarga iniciada",
          description: `${itemName} se está descargando.`,
        })
      }
    }, 1500)
  }

  const handleCopy = async (text: string, stepIndex: number) => {
    playSound("click")
    try {
      await navigator.clipboard.writeText(text)
      setCopiedStep(stepIndex)
      toast({
        title: "Copiado",
        description: "Comando copiado al portapapeles",
      })
      setTimeout(() => setCopiedStep(null), 2000)
    } catch (err) {
      toast({
        title: "Error",
        description: "No se pudo copiar al portapapeles",
        variant: "destructive",
      })
    }
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

        {/* Sections */}
        {installData.sections.map((section, delayIndex) => {
          const Icon = iconMap[section.icon as keyof typeof iconMap]

          return (
            <GlassCard key={section.id} delay={0.2 + delayIndex * 0.1} className="space-y-6 crt-flicker p-8">
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

                  {section.id === "forge" && section.instructions && (
                    <div className="mt-4">
                      <Button
                        onClick={() => {
                          setIsInstructionsOpen(!isInstructionsOpen)
                          playSound("click")
                        }}
                        variant="ghost"
                        className="w-full flex items-center justify-between p-4 h-auto hover:bg-primary/10 transition-all border-2 border-dashed"
                        style={{ borderColor: `${section.color}50` }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 flex items-center justify-center border-3 rounded pixel-border"
                            style={{
                              borderColor: section.color,
                              backgroundColor: `${section.color}20`,
                            }}
                          >
                            <Download className="w-4 h-4" style={{ color: section.color }} />
                          </div>
                          <span className="text-lg font-bold pixel-text" style={{ color: section.color }}>
                            {isInstructionsOpen ? "Ocultar Instructivo Básico" : "Desplegar Instructivo Básico"}
                          </span>
                        </div>
                        <motion.div animate={{ rotate: isInstructionsOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                          <ChevronDown className="w-5 h-5" style={{ color: section.color }} strokeWidth={3} />
                        </motion.div>
                      </Button>

                      <AnimatePresence>
                        {isInstructionsOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div
                              className="space-y-3 mt-4 p-6 border-l-4 rounded-md bg-background/40"
                              style={{ borderColor: section.color }}
                            >
                              {section.instructions.map((step: string, idx: number) => (
                                <div key={idx} className="flex items-start gap-4 group">
                                  <span
                                    className="text-muted-foreground font-mono font-bold flex-shrink-0 mt-1"
                                    style={{ color: section.color }}
                                  >
                                    {idx + 1}.
                                  </span>
                                  <span className="text-base md:text-lg text-foreground font-[family-name:var(--font-vt323)] flex-1">
                                    {step}
                                  </span>
                                  {step.includes("java -version") && (
                                    <Button
                                      variant="copy"
                                      size="icon-sm"
                                      onClick={() => handleCopy("java -version", idx)}
                                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                                      style={{
                                        backgroundColor: `${section.color}20`,
                                        borderColor: section.color,
                                      }}
                                    >
                                      {copiedStep === idx ? (
                                        <Check className="w-4 h-4" style={{ color: section.color }} />
                                      ) : (
                                        <Copy className="w-4 h-4" style={{ color: section.color }} />
                                      )}
                                    </Button>
                                  )}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {section.id !== "forge" && section.instructions && (
                    <div
                      className="space-y-3 pl-6 bg-background/40 p-4 border-l-4 rounded-md"
                      style={{ borderColor: section.color }}
                    >
                      {section.instructions.map((step: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-4 text-base md:text-lg">
                          <span className="text-muted-foreground font-mono font-bold">{idx + 1}.</span>
                          <span
                            className="text-foreground font-[family-name:var(--font-vt323)]"
                            style={{ color: section.color }}
                          >
                            {step}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.recommendation && (
                    <p className="text-sm text-muted-foreground italic">{section.recommendation}</p>
                  )}
                </div>
              </div>

              {/* Links - Solo para Shaders */}
              {section.links && (
                <div className="space-y-3">
                  {section.links.map((shader, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      size="lg"
                      onClick={() => {
                        playSound("click")
                        playSound("redirect")
                        window.open(shader.url, "_blank")
                        setTimeout(() => {
                          playSound("download")
                          toast({
                            title: "Redirigiendo",
                            description: `Abriendo página de descarga para ${shader.name}.`,
                          })
                        }, 300)
                      }}
                      className={cn(
                        "w-full h-12 font-semibold pixel-border justify-between transition-all bg-transparent",
                        "hover:brightness-110 hover:shadow-[0_0_10px_rgba(0,0,0,0.2)]",
                      )}
                      style={{
                        borderColor: `${section.color}50`,
                        color: section.color,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = `${section.color}20`
                        e.currentTarget.style.borderColor = section.color
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent"
                        e.currentTarget.style.borderColor = `${section.color}50`
                      }}
                    >
                      <div className="text-left">
                        <div className="font-semibold">{shader.name}</div>
                        <div className="text-xs text-muted-foreground">Dificultad: {shader.difficulty}</div>
                      </div>
                      <ExternalLink className="w-5 h-5" />
                    </Button>
                  ))}
                </div>
              )}

              {/* Items */}
              {section.items && (
                <div
                  className="space-y-3 pl-6 bg-background/40 p-4 border-l-4 rounded-md"
                  style={{ borderColor: section.color }}
                >
                  {section.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 text-base md:text-lg">
                      <span className="text-muted-foreground font-mono font-bold">{idx + 1}.</span>
                      <span
                        className="text-foreground font-[family-name:var(--font-vt323)]"
                        style={{ color: section.color }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Checkpoints */}
              {section.checkpoints && (
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
              )}

              {/* Botón principal */}
              {section.action && (
                <>
                  {section.link ? (
                    <Button
                      onClick={() => handleDownload(section.id, section.title, section.link, true)}
                      disabled={downloading === section.id}
                      variant="download"
                      size="lg"
                      className={cn(
                        "w-full h-12 font-semibold pixel-border minecraft-button transition-all",
                        "hover:brightness-110",
                      )}
                      style={{
                        backgroundColor: `${section.color}30`,
                        borderColor: section.color,
                        color: section.color,
                      }}
                    >
                      {downloading === section.id ? (
                        <>
                          <motion.div
                            {...iconoRotacion}
                            className="w-4 h-4 border-2 border-current border-t-transparent"
                            style={{ borderRadius: "2px" }}
                          />
                          Redirigiendo...
                        </>
                      ) : (
                        <>
                          <ExternalLink className="w-5 h-5" />
                          <span className="ml-2">{section.action}</span>
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleDownload(section.id, section.title, section.downloadUrl, false)}
                      disabled={downloading === section.id}
                      variant="download"
                      size="lg"
                      className={cn(
                        "w-full h-12 font-semibold pixel-border minecraft-button transition-all",
                        "hover:brightness-110",
                      )}
                      style={{
                        backgroundColor: `${section.color}30`,
                        borderColor: section.color,
                        color: section.color,
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
                          <span className="ml-2">{section.action}</span>
                        </>
                      )}
                    </Button>
                  )}
                </>
              )}

              {/* EXTRA LINKS */}
              {section.extraLinks && (
                <div className="flex flex-col gap-2 mt-3">
                  {section.extraLinks.map((extra, idx) => (
                    <Button
                      key={idx}
                      onClick={() => {
                        playSound("click")
                        playSound("redirect")
                        window.open(
                          "https://download.oracle.com/java/21/archive/jdk-21.0.7_windows-x64_bin.exe",
                          "_blank",
                        )
                        setTimeout(() => {
                          playSound("download")
                          toast({
                            title: "Descarga iniciada",
                            description: `${extra.label} se está descargando.`,
                          })
                        }, 1500)
                      }}
                      variant="download"
                      size="lg"
                      className="w-full h-12 font-semibold pixel-border minecraft-button transition-all hover:brightness-110 bg-transparent"
                      style={{
                        borderColor: "#ef4444",
                        color: "#ef4444",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#ef444420"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent"
                      }}
                    >
                      <div className="flex items-center justify-center w-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-5 h-5 mr-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 8V7a2 2 0 00-2-2H6a2 2 0 00-2 2v1m13 0h1a3 3 0 110 6h-1m-1-6v6a4 4 0 01-4 4H7a4 4 0 01-4-4V8h14z"
                          />
                        </svg>
                        <span>{extra.label}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              )}
            </GlassCard>
          )
        })}
      </div>
    </SectionContainer>
  )
}
