"use client"

import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SectionContainer } from "@/components/section-container"
import { GlassCard } from "@/components/glass-card"
import { Scroll, ChevronLeft, ChevronRight, X } from "lucide-react"
import { useState } from "react"
import loreData from "@/data/lore.json"
import { getCategoryIcon, categoryColors } from "@/components/getCategoryIcon"

interface Category {
  id: string
  title: string
  description: string
  images: string[]
  details: string[]
  color: string
  icon?: string
}

export function LoreSection() {
  const [activeCategory, setActiveCategory] = useState("world_structures")
  const [expandedImage, setExpandedImage] = useState<number | null>(null)

  const loreCategories = loreData.categories as Category[]
  const intro = loreData.intro
  const about = loreData.about
  const outro = loreData.outro

  const selectedCategory = loreCategories.find((cat) => cat.id === activeCategory)
  const categoryColor = categoryColors[selectedCategory?.id || ""] || "#ffffff"

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (expandedImage !== null && selectedCategory) {
      const newIndex = expandedImage === 0 ? selectedCategory.images.length - 1 : expandedImage - 1
      setExpandedImage(newIndex)
    }
  }

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (expandedImage !== null && selectedCategory) {
      const newIndex = expandedImage === selectedCategory.images.length - 1 ? 0 : expandedImage + 1
      setExpandedImage(newIndex)
    }
  }

  const handleImageClick = (idx: number) => {
    setExpandedImage(expandedImage === idx ? null : idx)
  }

  const handleCloseExpanded = () => {
    setExpandedImage(null)
  }

  return (
    <SectionContainer>
      <div className="space-y-12 pixel-dissolve relative flex flex-col">
        {/* INTRO */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -80, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            className="relative flex-shrink-0"
          >
            <motion.img
              src="/treasure-chest.gif"
              alt="Cofre Encantado"
              className="w-[200px] md:w-[260px] h-[200px] md:h-[260px] object-contain pixelated drop-shadow-[0_0_12px_rgba(0,0,0,0.6)]"
              style={{ imageRendering: "pixelated" }}
              animate={{ y: [0, -10, 0], scale: [1, 1.02, 1] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
          </motion.div>

          <div className="text-center md:text-left space-y-5 max-w-2xl flex-1">
            <h2 className="text-4xl md:text-5xl font-bold pixel-text">{intro.title}</h2>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-[family-name:var(--font-vt323)]">
              Bienvenido a <span className="text-primary font-bold">Netherious</span>, donde cada bloque cuenta una
              historia y cada aventura deja su huella en la tierra.
            </p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-2xl md:text-3xl text-yellow-400 font-bold leading-snug drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] font-[family-name:var(--font-vt323)]"
            >
              {intro.paragraph2}
            </motion.p>
          </div>
        </div>

        {/* ABOUT */}
        <GlassCard delay={0.2} className="space-y-5 crt-flicker">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 bg-primary/30 flex items-center justify-center border-4 border-primary flex-shrink-0"
            >
              <Scroll className="w-5 h-5 text-primary pixelated" />
            </motion.div>
            <h3 className="text-lg md:text-2xl font-bold pixel-text">{about.title}</h3>
          </div>

          <div className="space-y-3 text-muted-foreground leading-relaxed text-xl md:text-2xl font-[family-name:var(--font-vt323)]">
            {about.paragraphs.map((paragraph: string, idx: number) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </GlassCard>

        {/* CATEGORIES */}
        <div className="space-y-6">
          <h3 className="text-3xl md:text-4xl font-bold pixel-text text-center">Explora el Mundo</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
            {loreCategories.map((category, index) => {
              const color = categoryColors[category.id] || "#ccc"
              const isActive = activeCategory === category.id

              return (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-all duration-300 ${
                    isActive ? "shadow-lg" : "border-border bg-card/50 hover:bg-card/70"
                  }`}
                  style={
                    isActive
                      ? {
                          borderColor: color,
                          backgroundColor: `${color}20`,
                          boxShadow: `0 0 12px ${color}80`,
                        }
                      : { borderColor: `${color}40` }
                  }
                >
                  <div className="flex items-center justify-center">{getCategoryIcon(category.id, color, 26)}</div>
                  <span
                    className="text-xs md:text-sm font-bold text-center pixel-text line-clamp-2 leading-tight"
                    style={{ color }}
                  >
                    {category.title}
                  </span>
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* SELECTED CATEGORY */}
        {selectedCategory && (
          <motion.div
            key={selectedCategory.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 gap-8 items-stretch"
          >
{/* Contenedor imágenes */}
<div className="relative rounded-lg overflow-hidden border-4 border-border bg-black/20 flex-1 flex flex-col">
  <AnimatePresence mode="wait">
    {expandedImage === null ? (
      <motion.div
        key="grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-1 grid grid-cols-3 grid-rows-2 gap-2 p-2"
      >
        {selectedCategory.images.map((image, idx) => (
          <motion.div
            key={idx}
            className="relative overflow-hidden rounded cursor-pointer group"
            onClick={() => handleImageClick(idx)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.08, duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`${selectedCategory.title} ${idx + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-2 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="font-bold pixel-text text-xs" style={{ color: categoryColor }}>
                Art {idx + 1}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    ) : (
      /* Expanded view ocupa todo el contenedor y la imagen usa object-cover */
      <motion.div
        key={`expanded-${expandedImage}`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="w-full h-full relative flex items-center justify-center"
      >
        <img
          src={selectedCategory.images[expandedImage] || "/placeholder.svg"}
          alt={`${selectedCategory.title} ${expandedImage + 1}`}
          className="w-full h-full object-cover"
        />

        {/* Close button */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          onClick={handleCloseExpanded}
          className="absolute top-4 right-4 w-10 h-10 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center transition-colors z-20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-6 h-6 text-white" />
        </motion.button>

        {/* Prev/Next */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          onClick={handlePrevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center transition-colors z-20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="w-8 h-8 text-white" />
        </motion.button>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          onClick={handleNextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center transition-colors z-20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="w-8 h-8 text-white" />
        </motion.button>

        {/* Counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/70 rounded-full text-white font-bold pixel-text"
        >
          {expandedImage + 1} / {selectedCategory.images.length}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
</div>


            {/* Contenedor detalles */}
            <GlassCard className="space-y-4 crt-flicker flex flex-col flex-1">
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="w-10 h-10 flex items-center justify-center border-4 rounded-lg flex-shrink-0"
                  style={{ backgroundColor: `${categoryColor}20`, borderColor: categoryColor }}
                >
                  {getCategoryIcon(selectedCategory.id, categoryColor, 24)}
                </motion.div>
                <p className="text-xs md:text-sm text-muted-foreground italic leading-snug">
                  {selectedCategory.description}
                </p>
              </div>

              <div className="space-y-2 flex-1">
                {selectedCategory.details.map((detail, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.06, duration: 0.3 }}
                    className="flex gap-2 p-2 rounded border-l-4 transition-all duration-300 cursor-pointer"
                    style={{ borderColor: `${categoryColor}60` }}
                    whileHover={{
                      backgroundColor: `${categoryColor}20`,
                      scale: 1.02,
                    }}
                  >
                    <span className="font-bold text-base flex-shrink-0" style={{ color: categoryColor }}>
                      ▸
                    </span>
                    <span className="text-xs md:text-sm text-muted-foreground leading-snug">{detail}</span>
                  </motion.div>
                ))}
              </div>

            </GlassCard>
          </motion.div>
        )}

        {/* Nota Final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="p-6 md:p-8 bg-primary/10 border-2 border-primary/30 rounded-lg text-center space-y-3"
        >
          <p className="text-2xl md:text-3xl font-bold text-primary pixel-text">{outro.title}</p>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed font-[family-name:var(--font-vt323)]">
            {outro.paragraph}
          </p>
        </motion.div>
      </div>
    </SectionContainer>
  )
}
