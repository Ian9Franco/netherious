"use client"

import type React from "react"

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

  const essentialSections = installData.sections.filter((s) => s.critical)
  const optionalSections = installData.sections.filter((s) => !s.critical)

  return (
    <SectionContainer>
      <div className="space-y-12 pixel-dissolve">
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

        {essentialSections.length > 0 && (
          <div className="space-y-6">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold pixel-text text-accent flex items-center gap-3"
              style={{
                textShadow: "2px 2px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000",
              }}
            >
              <span className="text-2xl">⚡</span>
              Instalación Esencial
            </motion.h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {essentialSections.map((section, delayIndex) => {
                const Icon = iconMap[section.icon as keyof typeof iconMap]

                return (
                  <SectionCard
                    key={section.id}
                    section={section}
                    Icon={Icon}
                    delayIndex={delayIndex}
                    downloading={downloading}
                    isInstructionsOpen={isInstructionsOpen}
                    isOptionalModsOpen={isOptionalModsOpen}
                    copiedStep={copiedStep}
                    onDownload={handleDownload}
                    onCopy={handleCopy}
                    onToggleInstructions={() => {
                      setIsInstructionsOpen(!isInstructionsOpen)
                      playSound("click")
                    }}
                    onToggleOptionalMods={() => {
                      setIsOptionalModsOpen(!isOptionalModsOpen)
                      playSound("click")
                    }}
                    iconoRotacion={iconoRotacion}
                  />
                )
              })}
            </div>
          </div>
        )}

        {optionalSections.length > 0 && (
          <div className="space-y-6">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold pixel-text text-primary flex items-center gap-3"
              style={{
                textShadow: "2px 2px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000",
              }}
            >
              <span className="text-2xl">✨</span>
              Adicionales y Personalizaciones
            </motion.h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {optionalSections.map((section, delayIndex) => {
                const Icon = iconMap[section.icon as keyof typeof iconMap]

                return (
                  <SectionCard
                    key={section.id}
                    section={section}
                    Icon={Icon}
                    delayIndex={delayIndex + essentialSections.length}
                    downloading={downloading}
                    isInstructionsOpen={isInstructionsOpen}
                    isOptionalModsOpen={isOptionalModsOpen}
                    copiedStep={copiedStep}
                    onDownload={handleDownload}
                    onCopy={handleCopy}
                    onToggleInstructions={() => {
                      setIsInstructionsOpen(!isInstructionsOpen)
                      playSound("click")
                    }}
                    onToggleOptionalMods={() => {
                      setIsOptionalModsOpen(!isOptionalModsOpen)
                      playSound("click")
                    }}
                    iconoRotacion={iconoRotacion}
                  />
                )
              })}
            </div>
          </div>
        )}
      </div>
    </SectionContainer>
  )
}

interface SectionCardProps {
  section: any
  Icon: any
  delayIndex: number
  downloading: string | null
  isInstructionsOpen: boolean
  isOptionalModsOpen: boolean
  copiedStep: number | null
  onDownload: (id: string, name: string, url?: string, isRedirect?: boolean) => void
  onCopy: (text: string, idx: number) => Promise<void>
  onToggleInstructions: () => void
  onToggleOptionalMods: () => void
  iconoRotacion: any
}

function SectionCard({
  section,
  Icon,
  delayIndex,
  downloading,
  isInstructionsOpen,
  isOptionalModsOpen,
  copiedStep,
  onDownload,
  onCopy,
  onToggleInstructions,
  onToggleOptionalMods,
  iconoRotacion,
}: SectionCardProps) {
  return (
    <GlassCard delay={0.2 + delayIndex * 0.1} className="space-y-6 crt-flicker p-8 h-full flex flex-col">
      {/* Section Header */}
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 flex items-center justify-center pixel-border flex-shrink-0 rounded"
          style={{ backgroundColor: `${section.color}20`, borderColor: section.color }}
        >
          {Icon && <Icon className="w-6 h-6" style={{ color: section.color }} />}
        </div>
        <div className="space-y-2 flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-2xl md:text-3xl font-bold pixel-text">{section.title}</h3>
            {section.critical && (
              <span
                className="px-2 py-1 font-bold rounded pixel-border text-xs leading-tight text-center"
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
            <p className="text-sm md:text-base text-muted-foreground italic mt-1">{section.recommendation}</p>
          )}
        </div>
      </div>

      {/* Expandable Content */}
      {section.id === "optional_mods" && section.optionalModsList && (
        <ExpandableSection
          title={isOptionalModsOpen ? "Ocultar Lista de Mods" : "Ver Lista de Mods"}
          icon={Sparkles}
          color={section.color}
          isOpen={isOptionalModsOpen}
          onToggle={onToggleOptionalMods}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {section.optionalModsList.map((modName: string, idx: number) => (
              <div
                key={idx}
                className="px-3 py-2 rounded pixel-border text-sm"
                style={{
                  borderColor: `${section.color}40`,
                  backgroundColor: `${section.color}10`,
                }}
              >
                <span className="text-foreground font-[family-name:var(--font-vt323)]">{modName}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground italic mt-3">
            Elimina cualquiera de estos mods si experimentas problemas de rendimiento
          </p>
        </ExpandableSection>
      )}

      {section.id === "forge" && section.instructions && (
        <ExpandableSection
          title={isInstructionsOpen ? "Ocultar Instructivo Básico" : "Desplegar Instructivo Básico"}
          icon={Download}
          color={section.color}
          isOpen={isInstructionsOpen}
          onToggle={onToggleInstructions}
        >
          <div className="space-y-2">
            {section.instructions.map((step: string, idx: number) => (
              <div key={idx} className="flex items-start gap-3 group">
                <span className="text-sm font-mono font-bold flex-shrink-0" style={{ color: section.color }}>
                  {idx + 1}.
                </span>
                <span className="text-sm text-foreground font-[family-name:var(--font-vt323)]">{step}</span>
                {step.includes("java -version") && (
                  <Button
                    variant="copy"
                    size="icon-sm"
                    onClick={() => onCopy("java -version", idx)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto"
                    style={{
                      backgroundColor: `${section.color}20`,
                      borderColor: section.color,
                    }}
                  >
                    {copiedStep === idx ? (
                      <Check className="w-3 h-3" style={{ color: section.color }} />
                    ) : (
                      <Copy className="w-3 h-3" style={{ color: section.color }} />
                    )}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </ExpandableSection>
      )}

      {section.id === "server_core" && section.instructions && (
        <div
          className="space-y-2 pl-4 bg-background/40 p-4 border-l-4 rounded-md"
          style={{ borderColor: section.color }}
        >
          {section.instructions.map((step: string, idx: number) => (
            <div key={idx} className="flex items-start gap-3">
              <span className="text-sm font-mono font-bold flex-shrink-0">{idx + 1}.</span>
              <span className="text-sm text-foreground font-[family-name:var(--font-vt323)]">{step}</span>
            </div>
          ))}
        </div>
      )}

      {/* Checkpoints */}
      {section.checkpoints && (
        <div className="space-y-3 mt-4">
          {section.checkpoints.map((checkpoint: string, idx: number) => (
            <div key={idx} className="flex gap-3 items-start">
              <span className="font-bold text-xl flex-shrink-0 leading-none" style={{ color: section.color }}>
                ✓
              </span>
              <span className="text-sm md:text-base text-foreground font-[family-name:var(--font-vt323)] leading-snug">
                {checkpoint}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Action Buttons - Flex grow to push to bottom */}
      <div className="space-y-2 mt-auto pt-4">
        {section.link && (
          <Button
            onClick={() => onDownload(section.id, section.title, section.link, true)}
            disabled={downloading === section.id}
            variant="download"
            size="lg"
            className={cn(
              "w-full h-11 font-semibold pixel-border minecraft-button transition-all text-sm",
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
                  className="w-3 h-3 border-2 border-current border-t-transparent"
                  style={{ borderRadius: "2px" }}
                />
                <span className="ml-2 text-xs md:text-sm">Redirigiendo...</span>
              </>
            ) : (
              <>
                <ExternalLink className="w-4 h-4" />
                <span className="ml-2 text-xs md:text-sm">{section.action}</span>
              </>
            )}
          </Button>
        )}

        {section.downloadUrl && section.id !== "optional_mods" && (
          <Button
            onClick={() => onDownload(section.id, section.title, section.downloadUrl, false)}
            disabled={downloading === section.id}
            variant="download"
            size="lg"
            className={cn(
              "w-full h-11 font-semibold pixel-border minecraft-button transition-all text-sm",
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
                  className="w-3 h-3 border-2 border-current border-t-transparent"
                  style={{ borderRadius: "2px" }}
                />
                <span className="ml-2 text-xs md:text-sm">Descargando...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span className="ml-2 text-xs md:text-sm">{section.action}</span>
              </>
            )}
          </Button>
        )}

        {section.extraLinks && (
          <div className="flex flex-col gap-2 mt-2">
            {section.extraLinks.map((extra: any, idx: number) => (
              <Button
                key={idx}
                onClick={() => {}}
                variant="download"
                size="lg"
                className="w-full h-11 font-semibold pixel-border minecraft-button transition-all hover:brightness-110 bg-transparent text-xs md:text-sm"
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
                <Download className="w-4 h-4" />
                <span className="ml-2">{extra.label}</span>
              </Button>
            ))}
          </div>
        )}
      </div>
    </GlassCard>
  )
}

interface ExpandableSectionProps {
  title: string
  icon: any
  color: string
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
}

function ExpandableSection({ title, icon: Icon, color, isOpen, onToggle, children }: ExpandableSectionProps) {
  return (
    <div className="space-y-3 mt-4">
      <Button
        onClick={onToggle}
        variant="ghost"
        className="w-full flex items-center justify-between p-3 h-auto hover:bg-primary/10 transition-all border-2 border-dashed"
        style={{ borderColor: `${color}50` }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 flex items-center justify-center border-3 rounded pixel-border"
            style={{
              borderColor: color,
              backgroundColor: `${color}20`,
            }}
          >
            <Icon className="w-3 h-3" style={{ color }} />
          </div>
          <span className="text-sm md:text-base font-bold pixel-text" style={{ color }}>
            {title}
          </span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="w-4 h-4" style={{ color }} strokeWidth={3} />
        </motion.div>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-4 border-l-4 rounded-md bg-background/40 space-y-3" style={{ borderColor: color }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
