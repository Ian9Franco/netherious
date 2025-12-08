"use client"

import { motion } from "framer-motion"
import { SectionContainer } from "@/components/section-container"
import { GlassCard } from "@/components/glass-card"
import { Download, Package, Sparkles, ExternalLink, Settings, ChevronDown, Copy, Check } from "lucide-react"
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
  Sparkles,
  Settings,
}

export function InstallSection() {
  const [downloading, setDownloading] = useState<string | null>(null)
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false)
  const [isOptionalModsOpen, setIsOptionalModsOpen] = useState(false)
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

        {/* Sections Grid */}
        <div className="space-y-8">
          {installData.sections.map((section, delayIndex) => {
            const Icon = iconMap[section.icon as keyof typeof iconMap]

            return (
              <GlassCard key={section.id} delay={0.2 + delayIndex * 0.1} className="space-y-6 crt-flicker p-8">
                {/* Section Header */}
                <div className="flex items-start gap-6">
                  <div
                    className="w-14 h-14 flex items-center justify-center pixel-border flex-shrink-0 rounded"
                    style={{ backgroundColor: `${section.color}20`, borderColor: section.color }}
                  >
                    {Icon && <Icon className="w-7 h-7" style={{ color: section.color }} />}
                  </div>
                  <div className="space-y-3 flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
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
                    </div>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-[family-name:var(--font-vt323)]">
                      {section.description}
                    </p>

                    {section.recommendation && (
                      <p className="text-sm text-muted-foreground italic mt-2">{section.recommendation}</p>
                    )}
                  </div>
                </div>

                {section.id === "optional_mods" && section.optionalModsList && (
                  <div className="mt-6 space-y-4">
                    <Button
                      onClick={() => {
                        setIsOptionalModsOpen(!isOptionalModsOpen)
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
                          <Sparkles className="w-4 h-4" style={{ color: section.color }} />
                        </div>
                        <span className="text-lg font-bold pixel-text" style={{ color: section.color }}>
                          {isOptionalModsOpen ? "Ocultar Lista de Mods" : "Ver Lista de Mods"}
                        </span>
                      </div>
                      <motion.div animate={{ rotate: isOptionalModsOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                        <ChevronDown className="w-5 h-5" style={{ color: section.color }} strokeWidth={3} />
                      </motion.div>
                    </Button>

                    <AnimatePresence>
                      {isOptionalModsOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div
                            className="p-6 border-l-4 rounded-md bg-background/40"
                            style={{ borderColor: section.color }}
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                              {section.optionalModsList.map((modName: string, idx: number) => (
                                <div
                                  key={idx}
                                  className="px-4 py-2 rounded pixel-border"
                                  style={{
                                    borderColor: `${section.color}40`,
                                    backgroundColor: `${section.color}10`,
                                  }}
                                >
                                  <span className="text-sm md:text-base text-foreground font-[family-name:var(--font-vt323)]">
                                    {modName}
                                  </span>
                                </div>
                              ))}
                            </div>
                            <p className="text-sm text-muted-foreground italic mt-4">
                              Elimina cualquiera de estos mods si experimentas problemas de rendimiento
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Forge Instructions */}
                {section.id === "forge" && section.instructions && (
                  <div className="mt-6">
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

                {/* Server Core Instructions */}
                {section.id === "server_core" && section.instructions && (
                  <div
                    className="space-y-3 pl-6 bg-background/40 p-4 border-l-4 rounded-md"
                    style={{ borderColor: section.color }}
                  >
                    {section.instructions.map((step: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-4">
                        <span className="text-muted-foreground font-mono font-bold flex-shrink-0">{idx + 1}.</span>
                        <span
                          className="text-base md:text-lg text-foreground font-[family-name:var(--font-vt323)]"
                          style={{ color: section.color }}
                        >
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Checkpoints */}
                {section.checkpoints && (
                  <div className="space-y-4 mt-6">
                    {section.checkpoints.map((checkpoint, idx) => (
                      <div key={idx} className="flex gap-4 items-start">
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

                {/* Action Buttons */}
                {section.link && (
                  <Button
                    onClick={() => handleDownload(section.id, section.title, section.link, true)}
                    disabled={downloading === section.id}
                    variant="download"
                    size="lg"
                    className={cn(
                      "w-full h-12 font-semibold pixel-border minecraft-button transition-all mt-6",
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
                )}

                {section.downloadUrl && section.id !== "optional_mods" && (
                  <Button
                    onClick={() => handleDownload(section.id, section.title, section.downloadUrl, false)}
                    disabled={downloading === section.id}
                    variant="download"
                    size="lg"
                    className={cn(
                      "w-full h-12 font-semibold pixel-border minecraft-button transition-all mt-6",
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

                {section.extraLinks && (
                  <div className="flex flex-col gap-2 mt-4">
                    {section.extraLinks.map((extra, idx) => (
                      <Button
                        key={idx}
                        onClick={() => {
                          playSound("click")
                          playSound("redirect")
                          window.open(extra.url, "_blank")
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
                        <Download className="w-5 h-5 mr-2" />
                        {extra.label}
                      </Button>
                    ))}
                  </div>
                )}
              </GlassCard>
            )
          })}
        </div>
      </div>
    </SectionContainer>
  )
}
