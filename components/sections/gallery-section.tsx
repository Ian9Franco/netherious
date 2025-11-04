"use client"

import { motion } from "framer-motion"
import { SectionContainer } from "@/components/section-container"
import { GlassCard } from "@/components/glass-card"

export function GallerySection() {
  const galleryItems = [
    {
      id: 1,
      title: "Server Preview",
      description: "Vista del servidor en acción",
      image: "/minecraft-server-landscape.png",
    },
    {
      id: 2,
      title: "Mods Showcase",
      description: "Mods personalizados del servidor",
      image: "/minecraft-custom-mods.jpg",
    },
    {
      id: 3,
      title: "Netherious2 Logo",
      description: "El logo oficial del servidor",
      image: "/minecraft-logo-design.jpg",
    },
  ]

  return (
    <SectionContainer>
      <div className="space-y-10 pixel-dissolve">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center space-y-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-balance pixel-text">Galería</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-[family-name:var(--font-vt323)]">
            Descubre el mundo de Netherious2 con estas imágenes del servidor
          </p>
        </motion.div>

        <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {galleryItems.map((item, index) => (
            <GlassCard key={item.id} delay={0.2 + index * 0.1} className="overflow-hidden flex flex-col crt-flicker">
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative w-full h-64 md:h-80 overflow-hidden"
              >
                <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </motion.div>

              <div className="flex-1 flex flex-col justify-between p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold pixel-text">{item.title}</h3>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-[family-name:var(--font-vt323)]">
                    {item.description}
                  </p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        <GlassCard delay={0.5} className="text-center space-y-4 p-8 border-2 border-primary/50">
          <h3 className="text-2xl font-bold pixel-text">¿Tienes imágenes propias?</h3>
          <p className="text-lg text-muted-foreground leading-relaxed font-[family-name:var(--font-vt323)] max-w-2xl mx-auto">
            Reemplaza los paths en la sección de configuración de la galería con tus logos y capturas del servidor.
          </p>
        </GlassCard>
      </div>
    </SectionContainer>
  )
}
