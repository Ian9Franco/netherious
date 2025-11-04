"use client"

import { motion } from "framer-motion"
import { SectionContainer } from "@/components/section-container"
import { GlassCard } from "@/components/glass-card"
import { Scroll } from "lucide-react"
import { useState } from "react"
import loreData from "@/data/lore.json"
import { getCategoryIcon, categoryColors } from "@/components/getCategoryIcon"

interface Category {
  id: string
  title: string
  description: string
  image: string
  details: string[]
  color: string
  icon?: string
}

export function LoreSection() {
  const [activeCategory, setActiveCategory] = useState("dungeons")

  const loreCategories = loreData.categories as Category[]
  const intro = loreData.intro
  const about = loreData.about
  
  const outro = loreData.outro

  const selectedCategory = loreCategories.find((cat) => cat.id === activeCategory)
  const categoryColor = categoryColors[selectedCategory?.id || ""] || "#ffffff"

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
              src="/images/treasure-chest.gif"
              alt="Cofre Encantado"
              className="w-[200px] md:w-[260px] h-[200px] md:h-[260px] object-contain pixelated drop-shadow-[0_0_12px_rgba(0,0,0,0.6)]"
              style={{ imageRendering: "pixelated" }}
              animate={{ y: [0, -10, 0], scale: [1, 1.02, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          <div className="text-center md:text-left space-y-5 max-w-2xl flex-1">
            <h2 className="text-4xl md:text-5xl font-bold pixel-text">{intro.title}</h2>
            {/* --- TAMAÑO DE FUENTE AUMENTADO AQUÍ ("paragraph1") --- */}
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-[family-name:var(--font-vt323)]">
              Bienvenido a <span className="text-primary font-bold">Netherious</span>, donde cada bloque cuenta una
              historia y cada aventura deja su huella en la tierra.
            </p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              // --- TAMAÑO DE FUENTE AUMENTADO AQUÍ ---
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

          {/* --- TAMAÑO DE FUENTE AUMENTADO AQUÍ --- */}
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
                  <div className="flex items-center justify-center">
                    {getCategoryIcon(category.id, color, 26)}
                  </div>
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
            <motion.div
              className="relative rounded-lg overflow-hidden border-4 border-border h-64 md:h-full min-h-80"
              whileHover={{ scale: 1.02 }}
            >
              <img src={selectedCategory.image || "/placeholder.svg"} alt={selectedCategory.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <p className="font-bold pixel-text text-lg">{selectedCategory.title}</p>
              </div>
            </motion.div>

            <GlassCard className="space-y-5 crt-flicker flex flex-col">
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="w-12 h-12 flex items-center justify-center border-4 rounded-lg flex-shrink-0"
                  style={{ backgroundColor: `${categoryColor}20`, borderColor: categoryColor }}
                >
                  {getCategoryIcon(selectedCategory.id, categoryColor, 28)}
                </motion.div>
                <p className="text-sm md:text-base text-muted-foreground italic">{selectedCategory.description}</p>
              </div>

              <div className="space-y-2 flex-1">
                {selectedCategory.details.map((detail, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.06, duration: 0.3 }}
                    className="flex gap-3 p-3 bg-card/60 rounded hover:bg-card/80 transition-colors"
                    style={{ borderLeft: `4px solid ${categoryColor}60` }}
                  >
                    <span className="font-bold text-lg flex-shrink-0" style={{ color: categoryColor }}>
                      ▸
                    </span>
                    <span className="text-sm md:text-base text-muted-foreground leading-snug">{detail}</span>
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
          {/* --- TAMAÑO DE FUENTE AUMENTADO AQUÍ --- */}
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed font-[family-name:var(--font-vt323)]">
            {outro.paragraph}
          </p>
        </motion.div>

      </div>
    </SectionContainer>
  )
}
