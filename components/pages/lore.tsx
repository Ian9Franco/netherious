import { PixelContainer } from '@/components/pixel-container'
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
  const { intro, about, categories } = loreData;
  const leftCategories = categories.slice(0, 3);

  return (
    <div className="space-y-4 font-[family-name:var(--font-pixel)] h-full overflow-y-auto pr-2 custom-scrollbar">
      {/* Intro - Keep vintage */}
      <div className="border-b-4 border-[#8B4513] pb-2 mb-4 ornamental-underline">
        <h1 className="text-[20px] text-[#8B4513] uppercase tracking-wide drop-shadow-[2px_2px_0_rgba(0,0,0,0.3)]">{intro.title}</h1>
        <p className="text-[9px] text-[#3a2010] leading-relaxed mt-2 drop-cap">{intro.paragraph1}</p>
        <p className="text-[9px] text-[#3a2010] leading-relaxed mt-1">{intro.paragraph2}</p>
      </div>

      <div className="codex-divider"></div>

      {/* About - Keep vintage */}
      <div className="relative pl-10 parchment-texture">
        <Image
          src="/assets/mini/1.png"
          alt="About"
          width={36}
          height={36}
          className="absolute left-[-4px] top-[-2px]"
          style={{ imageRendering: 'pixelated' }}
        />
        <h2 className="text-[13px] text-[#8B4513] uppercase mb-1 font-bold border-b border-[#8B4513]/20 pb-1 drop-shadow-[1px_1px_0_rgba(0,0,0,0.2)]">{about.title}</h2>
        {about.paragraphs.map((p, i) => (
          <p key={i} className="text-[9px] text-[#3a2010] leading-relaxed mb-1">{p}</p>
        ))}
      </div>

      <div className="codex-divider"></div>

      {/* Categories with ENHANCED POP ART */}
      <div className="space-y-6 mt-6">
        {leftCategories.map((cat, index) => {
          const colors = categoryColors[cat.id] || categoryColors['criaturas'];
          return (
            <div key={cat.id} className="relative pl-20 marginalia">
              {/* Icon with comic burst */}
              <div className="absolute left-[-10px] top-[-8px]">
                <Image
                  src={cat.icon}
                  alt="Icon"
                  width={78}
                  height={78}
                  className="relative z-10 drop-shadow-[5px_5px_0_#000]"
                  style={{ imageRendering: 'pixelated' }}
                />
                {/* Comic burst behind icon */}
                <div className={`absolute inset-0 -z-10 scale-110 opacity-30`} style={{
                  backgroundImage: `repeating-conic-gradient(from 0deg, ${colors.accent} 0deg 15deg, transparent 15deg 30deg)`
                }}></div>
              </div>

              <h2 className="text-[14px] text-[#8B4513] uppercase mb-1 font-bold drop-shadow-[1px_1px_0_rgba(0,0,0,0.2)]">{cat.title}</h2>
              <p className="text-[10px] text-[#3a2010] mb-2 leading-tight pr-2">{cat.description}</p>
              
              {/* Pop art container with comic details */}
              <div className="relative space-y-1 bg-white/50 backdrop-blur-sm p-4 border-4 border-black shadow-[8px_8px_0_rgba(0,0,0,0.3)] mt-3">
                {/* Comic corner accents */}
                <div className={`absolute top-0 left-0 w-4 h-4 bg-gradient-to-br ${colors.label} border-r-4 border-b-4 border-black`}></div>
                <div className={`absolute top-0 right-0 w-4 h-4 bg-gradient-to-bl ${colors.label} border-l-4 border-b-4 border-black`}></div>
                <div className={`absolute bottom-0 left-0 w-4 h-4 bg-gradient-to-tr ${colors.label} border-r-4 border-t-4 border-black`}></div>
                <div className={`absolute bottom-0 right-0 w-4 h-4 bg-gradient-to-tl ${colors.label} border-l-4 border-t-4 border-black`}></div>
                
                {cat.stats.map((stat, i) => (
                  <StatBar key={i} label={stat.label} value={stat.value} type={stat.type} categoryId={cat.id} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export function LoreRightPage() {
  const { categories, outro } = loreData;
  const rightCategories = categories.slice(3, 6);

  return (
    <div className="space-y-4 font-[family-name:var(--font-pixel)] h-full overflow-y-auto pr-2 custom-scrollbar">
      <div className="flex items-center gap-2 mb-2 border-b border-[#8B4513]/30 pb-2 ornamental-underline">
        <Image
          src="/assets/mini/4.png"
          alt="Icon"
          width={48}
          height={48}
          style={{ imageRendering: 'pixelated' }}
        />
        <h2 className="text-[16px] text-[#8B4513] uppercase font-bold drop-shadow-[2px_2px_0_rgba(0,0,0,0.3)]">El Codex</h2>
      </div>

      {/* Categories with ENHANCED POP ART */}
      <div className="space-y-6">
        {rightCategories.map((cat, index) => {
          const colors = categoryColors[cat.id] || categoryColors['criaturas'];
          return (
            <div key={cat.id} className="relative pl-20 marginalia">
              {/* Icon with comic burst */}
              <div className="absolute left-[-10px] top-[-8px]">
                <Image
                  src={cat.icon}
                  alt="Icon"
                  width={78}
                  height={78}
                  className="relative z-10 drop-shadow-[5px_5px_0_#000]"
                  style={{ imageRendering: 'pixelated' }}
                />
                {/* Comic burst behind icon */}
                <div className={`absolute inset-0 -z-10 scale-110 opacity-30`} style={{
                  backgroundImage: `repeating-conic-gradient(from 0deg, ${colors.accent} 0deg 15deg, transparent 15deg 30deg)`
                }}></div>
              </div>

              <h2 className="text-[14px] text-[#8B4513] uppercase mb-1 font-bold drop-shadow-[1px_1px_0_rgba(0,0,0,0.2)]">{cat.title}</h2>
              <p className="text-[10px] text-[#3a2010] mb-2 leading-tight pr-2">{cat.description}</p>
              
              {/* Pop art container with comic details */}
              <div className="relative space-y-1 bg-white/50 backdrop-blur-sm p-4 border-4 border-black shadow-[8px_8px_0_rgba(0,0,0,0.3)] mt-3">
                {/* Comic corner accents */}
                <div className={`absolute top-0 left-0 w-4 h-4 bg-gradient-to-br ${colors.label} border-r-4 border-b-4 border-black`}></div>
                <div className={`absolute top-0 right-0 w-4 h-4 bg-gradient-to-bl ${colors.label} border-l-4 border-b-4 border-black`}></div>
                <div className={`absolute bottom-0 left-0 w-4 h-4 bg-gradient-to-tr ${colors.label} border-r-4 border-t-4 border-black`}></div>
                <div className={`absolute bottom-0 right-0 w-4 h-4 bg-gradient-to-tl ${colors.label} border-l-4 border-t-4 border-black`}></div>
                
                {cat.stats.map((stat, i) => (
                  <StatBar key={i} label={stat.label} value={stat.value} type={stat.type} categoryId={cat.id} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="codex-divider mt-6"></div>

      {/* Outro - Keep vintage */}
      <div className="relative pl-10 parchment-texture mt-4">
        <Image
          src="/assets/mini/10.png"
          alt="Outro"
          width={36}
          height={36}
          className="absolute left-[-4px] top-[-2px]"
          style={{ imageRendering: 'pixelated' }}
        />
        <h2 className="text-[13px] text-[#8B4513] uppercase mb-1 font-bold drop-shadow-[1px_1px_0_rgba(0,0,0,0.2)]">{outro.title}</h2>
        <p className="text-[9px] text-[#3a2010] leading-relaxed">{outro.paragraph}</p>
      </div>
    </div>
  )
}
