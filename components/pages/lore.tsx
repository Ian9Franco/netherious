import { PixelContainer } from '@/components/pixel-container'
import { PixelButton } from '@/components/pixel-button'
import Image from 'next/image'
import loreData from '@/data/lore.json'
import { useEffect, useState } from 'react'

// Category color schemes - each category gets unique colors!
const categoryColors: Record<string, { gradient: string, label: string, accent: string }> = {
  'criaturas': { gradient: 'from-[#00ff88] to-[#00cc66]', label: 'from-[#00ff88] to-[#00cc66]', accent: '#00ff88' },
  'enemigos': { gradient: 'from-[#ff5555] to-[#ff1744]', label: 'from-[#ff5555] to-[#ff1744]', accent: '#ff5555' },
  'estructuras': { gradient: 'from-[#ff6b9d] to-[#c06c84]', label: 'from-[#ff6b9d] to-[#c06c84]', accent: '#ff6b9d' },
  'herramientas': { gradient: 'from-[#ffdd00] to-[#ffaa00]', label: 'from-[#ffdd00] to-[#ffaa00]', accent: '#ffdd00' },
  'jefes': { gradient: 'from-[#ff1744] to-[#d50000]', label: 'from-[#ff1744] to-[#d50000]', accent: '#ff1744' },
  'mundos': { gradient: 'from-[#5555ff] to-[#3d5afe]', label: 'from-[#5555ff] to-[#3d5afe]', accent: '#5555ff' },
  'progresion': { gradient: 'from-[#9c27b0] to-[#7b1fa2]', label: 'from-[#9c27b0] to-[#7b1fa2]', accent: '#9c27b0' },
  'clases': { gradient: 'from-[#ff6f00] to-[#e65100]', label: 'from-[#ff6f00] to-[#e65100]', accent: '#ff6f00' },
  'tecnologia': { gradient: 'from-[#00bcd4] to-[#0097a7]', label: 'from-[#00bcd4] to-[#0097a7]', accent: '#00bcd4' },
  'vanilla': { gradient: 'from-[#8bc34a] to-[#689f38]', label: 'from-[#8bc34a] to-[#689f38]', accent: '#8bc34a' },
}

const categorySubtitles: Record<string, string> = {
  'criaturas': 'Bestiario & Compañeros',
  'enemigos': 'Peligros de Grado S',
  'estructuras': 'Saqueo & Arqueología',
  'herramientas': 'Arsenal de Supervivencia',
  'jefes': 'Retos de Sangre',
  'mundos': 'Planos Inexplorados',
  'progresion': 'Evolución de Poder',
  'clases': 'Roles del Gremio',
  'tecnologia': 'Vapor & Automatización',
  'vanilla': 'Esencia Refinada',
}

// Helper component for Stat Bar with ENHANCED Pop Art Style
const StatBar = ({ label, value, type, categoryId }: { label: string, value: number, type: string, categoryId: string }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(value * 10);
    }, 100);
    return () => clearTimeout(timer);
  }, [value]);

  const colors = categoryColors[categoryId] || categoryColors['criaturas'];

  return (
    <div className="flex items-center gap-3 text-[10px] w-full mb-3">
      {/* Label badge with comic style */}
      <div className={`relative min-w-[80px] bg-gradient-to-br ${colors.label} text-black font-black text-center leading-none py-2 px-3 border-4 border-black shadow-[4px_4px_0_#000] uppercase text-[9px]`}>
        <span className="relative z-10">{label}</span>
        {/* Halftone dots effect */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)',
          backgroundSize: '4px 4px'
        }}></div>
      </div>

      {/* Bar container - LARGER! */}
      <div className="flex-1 max-w-[160px] h-6 bg-black border-4 border-black relative shadow-[4px_4px_0_rgba(0,0,0,0.4)]">
        <div
          className={`h-full bg-gradient-to-r ${colors.gradient} relative transition-all duration-1000 ease-out`}
          style={{ width: `${width}%` }}
        >
          {/* Comic-style shine effect */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/70"></div>
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black/30"></div>
          {/* Speed lines for dynamic effect */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/30 transform -translate-y-1/2"></div>
          </div>
          {/* Pixel grid overlay */}
          <div className="absolute inset-0 bg-[url('/assets/grid-overlay.png')] opacity-15 pointer-events-none" style={{ backgroundSize: '2px 2px' }}></div>
        </div>
      </div>

      {/* Value badge with comic burst */}
      <div className="relative">
        <div className="relative w-8 h-8 bg-white border-4 border-black flex items-center justify-center shadow-[3px_3px_0_#000] rotate-3">
          <span className="text-black font-black text-[11px] relative z-10">{value}</span>
          {/* Comic burst background */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `repeating-conic-gradient(from 0deg, ${colors.accent} 0deg 10deg, transparent 10deg 20deg)`
          }}></div>
        </div>
        {/* Small accent burst */}
        <div className={`absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br ${colors.label} border-2 border-black rounded-full`}></div>
      </div>
    </div>
  )
}

export function LoreLeftPage() {
  const { intro, categories } = loreData;

  return (
    <div className="space-y-6 font-[family-name:var(--font-pixel)] h-full overflow-y-auto overflow-x-hidden pr-2 custom-scrollbar flex flex-col">
      {/* Intro Header */}
      <div className="border-b-4 border-[#8B4513] pb-3 mb-2 flex flex-col items-center">
        <div className="flex items-center gap-4 mb-2">
          <Image
            src="/assets/mini/general/la historia comienza.png"
            alt="La Historia Comienza"
            width={320}
            height={90}
            className="drop-shadow-[3px_3px_0_rgba(0,0,0,0.3)]"
            style={{ imageRendering: 'pixelated' }}
          />
          {intro.icon && (
            <Image
              src={intro.icon}
              alt="Intro"
              width={180}
              height={180}
              className="drop-shadow-[3px_3px_0_rgba(0,0,0,0.3)]"
              style={{ imageRendering: 'pixelated' }}
            />
          )}
        </div>
        <p className="text-[9px] text-[#3a2010] leading-relaxed mt-2 text-center">
          {intro.paragraph1}
        </p>
      </div>

      {/* Category Index - Simple List */}
      <div className="flex-1">
        <h2 className="text-[13px] text-[#8B4513] uppercase mb-4 font-bold text-center drop-shadow-[1px_1px_0_rgba(0,0,0,0.2)]">
          Categorías
        </h2>
        <div className="space-y-2">
          {categories.map((cat, index) => {
            const colors = categoryColors[cat.id] || categoryColors['criaturas'];
            return (
              <div key={cat.id} className="flex items-center gap-3 bg-[#d4c4a8]/40 border-2 border-[#8B4513]/30 p-2 hover:bg-[#d4c4a8]/60 transition-colors cursor-pointer relative">
                {/* Icon */}
                <div className="flex-shrink-0 relative">
                  <Image
                    src={cat.icon}
                    alt="Icon"
                    width={86}
                    height={86}
                    className="drop-shadow-[3px_3px_0_rgba(0,0,0,0.3)] hover:scale-110 transition-transform duration-300 cursor-pointer"
                    style={{ imageRendering: 'pixelated' }}
                  />
                  {/* Color accent */}
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 bg-gradient-to-br ${colors.label} border-2 border-black`}></div>
                </div>
                {/* Label */}
                <div className="flex-1 flex flex-col gap-0.5">
                  <h3 className="text-[11px] font-black text-[#633a1e] uppercase leading-tight drop-shadow-[0.5px_0.5px_0_rgba(255,255,255,0.4)]">
                    {cat.title}
                  </h3>
                  <div className="flex">
                    <div className={`px-2 py-0.5 bg-[#e8dcc8] border-l-4 border-2 border-black rounded-sm shadow-[2px_2px_0_rgba(0,0,0,0.15)] flex items-center gap-1.5`} style={{ borderColor: `black black black ${colors.accent}` }}>
                      <span className="text-[8px] text-[#5c3d1a] font-black uppercase tracking-wider leading-none">
                        {categorySubtitles[cat.id] || `${cat.stats.length} características`}
                      </span>
                    </div>
                  </div>
                </div>
                {/* Indicator */}
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-[#8B4513] transform rotate-45"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export function LoreRightPage() {
  const { categories, outro } = loreData;
  // Show ALL categories in detail
  const featuredCategories = categories;

  return (
    <div className="space-y-5 font-[family-name:var(--font-pixel)] h-full overflow-y-auto overflow-x-hidden pr-2 custom-scrollbar">
      <div className="flex items-center justify-between mb-2 border-b-2 border-[#8B4513]/30 pb-2">
        <div className="flex items-center gap-2">
          <Image
            src="/assets/mini/lore/codex.png"
            alt="Codex Icon"
            width={150}
            height={150}
            className="drop-shadow-[3px_3px_0_rgba(0,0,0,0.3)] mb-4 mr-4"
            style={{ imageRendering: 'pixelated' }}
          />
          <Image
            src="/assets/mini/general/codex.png"
            alt="Codex Title"
            width={320}
            height={100}
            className="drop-shadow-[4px_4px_0_rgba(0,0,0,0.3)] mb-4"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>


      </div>

      {/* Featured Categories with Details */}
      <div className="space-y-6">
        {featuredCategories.map((cat, index) => {
          const colors = categoryColors[cat.id] || categoryColors['criaturas'];
          return (
            <div key={cat.id} className="relative">
              {/* Category Header with Large Icon */}
              <div className="flex items-center gap-3 mb-3 bg-gradient-to-r from-[#e8dcc8] to-[#d4c4a8] border-2 border-[#8B4513] p-3">
                <Image
                  src={cat.icon}
                  alt="Icon"
                  width={121}
                  height={121}
                  className="drop-shadow-[4px_4px_0_rgba(0,0,0,0.4)] hover:scale-110 transition-transform duration-300 cursor-pointer"
                  style={{ imageRendering: 'pixelated' }}
                />
                <div className="flex-1">
                  <h3 className="text-[13px] text-[#8B4513] uppercase font-bold drop-shadow-[1px_1px_0_rgba(0,0,0,0.2)]">
                    {cat.title}
                  </h3>
                  <p className="text-[9px] text-[#3a2010] leading-tight mt-1">
                    {cat.description}
                  </p>
                </div>
              </div>

              {/* Stats Container */}
              <div className="relative space-y-1 bg-white/50 backdrop-blur-sm p-3 border-4 border-black shadow-[6px_6px_0_rgba(0,0,0,0.3)]">
                {/* Comic corner accents */}
                <div className={`absolute top-0 left-0 w-3 h-3 bg-gradient-to-br ${colors.label} border-r-4 border-b-4 border-black`}></div>
                <div className={`absolute top-0 right-0 w-3 h-3 bg-gradient-to-bl ${colors.label} border-l-4 border-b-4 border-black`}></div>

                {cat.stats.map((stat, i) => (
                  <StatBar key={i} label={stat.label} value={stat.value} type={stat.type} categoryId={cat.id} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="codex-divider mt-4"></div>

      {/* Outro */}
      <div className="relative pl-48 parchment-texture mt-12 min-h-[160px] flex flex-col justify-center">
        <Image
          src={outro.icon}
          alt="Outro"
          width={180}
          height={180}
          className="absolute left-[-30px] top-[-20px] z-10"
          style={{ imageRendering: 'pixelated' }}
        />
        <h2 className="text-[14px] text-[#8B4513] uppercase mb-1 font-bold drop-shadow-[1px_1px_0_rgba(0,0,0,0.2)]">
          {outro.title}
        </h2>
        <p className="text-[10px] text-[#3a2010] leading-relaxed">
          {outro.paragraph}
        </p>
      </div>
    </div>
  )
}
