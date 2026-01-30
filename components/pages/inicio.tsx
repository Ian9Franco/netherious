import { PixelButton } from '@/components/pixel-button'
import { PixelContainer } from '@/components/pixel-container'
import Image from 'next/image'
import homeData from '@/data/home.json'

export function InicioLeftPage() {
  const { hero, intro } = homeData;

  return (
    <div className="space-y-6 font-[family-name:var(--font-pixel)] h-full overflow-y-auto pr-1 custom-scrollbar flex flex-col justify-center">
      {/* Hero Section */}
      <div className="flex flex-col items-center mb-6 relative">
        <Image
          src="/assets/logo/logo.png"
          alt="Netherious"
          width={140}
          height={45}
          className="block h-auto w-auto drop-shadow-[4px_4px_0_rgba(139,69,19,0.4)]"
          style={{ imageRendering: 'pixelated' }}
          priority
        />
        <p className="text-[11px] text-[#5c3d1a] font-bold mt-4 text-center leading-relaxed max-w-[90%] drop-shadow-[1px_1px_0_rgba(0,0,0,0.2)]">
          {hero.subtitle}
        </p>
      </div>

      <div className="codex-divider"></div>

      {/* Intro Section */}
      <div className="relative pl-20 min-h-[60px] parchment-texture">
        <Image
          src="/assets/craiyon_211530_image.png"
          alt="Info"
          width={84}
          height={84}
          className="absolute left-[-10px] top-[-8px]"
          style={{ imageRendering: 'pixelated' }}
        />
        <h2 className="text-[14px] text-[#8B4513] uppercase mb-2 font-bold drop-shadow-[1px_1px_0_rgba(0,0,0,0.2)]">{intro.title}</h2>
        <p className="text-[10px] leading-relaxed text-[#3a2010] drop-cap pr-2">
          {intro.paragraph}
        </p>
      </div>
    </div>
  )
}

export function InicioRightPage() {
  const { features, cards, cta } = homeData;

  return (
    <div className="space-y-4 font-[family-name:var(--font-pixel)] h-full overflow-y-auto pr-1 custom-scrollbar">
      {/* All Features with POP ART */}
      <div className="space-y-4">
        {features.map((feature, index) => {
          const gradients = [
            'from-[#ff6b9d] to-[#ff1744]',
            'from-[#00ff88] to-[#00cc66]',
            'from-[#5555ff] to-[#3d5afe]',
            'from-[#ffdd00] to-[#ffaa00]',
            'from-[#ff6f00] to-[#e65100]'
          ];
          const accents = ['#ff6b9d', '#00ff88', '#5555ff', '#ffdd00', '#ff6f00'];
          const gradient = gradients[index % gradients.length];
          const accent = accents[index % accents.length];
          
          return (
            <div key={index} className="relative pl-16 marginalia">
              {/* Icon with comic burst */}
              <div className="absolute left-[-4px] top-[-2px]">
                <Image
                  src={`/assets/mini/${(index % 8) + 1}.png`}
                  alt="Feature"
                  width={48}
                  height={48}
                  className="relative z-10 drop-shadow-[4px_4px_0_#000]"
                  style={{ imageRendering: 'pixelated' }}
                />
                <div className="absolute inset-0 -z-10 scale-125 opacity-20" style={{
                  backgroundImage: `repeating-conic-gradient(from 0deg, ${accent} 0deg 15deg, transparent 15deg 30deg)`
                }}></div>
              </div>
              
              <div className="bg-white/40 backdrop-blur-sm border-4 border-black p-2 shadow-[4px_4px_0_rgba(0,0,0,0.3)]">
                <h3 className={`text-[12px] font-black uppercase mb-0.5 bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                  {feature.title}
                </h3>
                <p className="text-[9px] text-[#3a2010] leading-tight font-bold">{feature.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="codex-divider"></div>

      {/* Highlights / Cards */}
      <div className="grid grid-cols-1 gap-2 mt-2">
        {cards.map((card, idx) => (
          <div key={idx} className="bg-[#d4c4a8]/30 border border-[#8B4513]/30 p-2 relative pl-2 hover:bg-[#d4c4a8]/50 transition-colors gothic-corners aged-paper">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-1.5 bg-[#8B4513] transform rotate-45"></div>
              <h4 className="text-[10px] uppercase font-bold text-[#8B4513]">{card.title}</h4>
            </div>
            <p className="text-[9px] text-[#3a2010] leading-tight pl-3.5">{card.text}</p>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-4 pt-2 px-1">
        <div className="bg-[#e8dcc8] relative p-4 scroll-edge shadow-md group">
          {/* Decorative Corners */}
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#8B4513]"></div>
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#8B4513]"></div>
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#8B4513]"></div>
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#8B4513]"></div>

          {/* Inner Border */}
          <div className="absolute inset-[3px] border border-[#8B4513]/30 pointer-events-none"></div>

          <div className="absolute -top-3 left-1/2 -translate-x-1/2 wax-seal z-10">
            <span className="text-[9px] font-bold text-[#e8dcc8] uppercase absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">⚔</span>
          </div>
          <h3 className="text-[14px] text-[#8B4513] font-bold mb-1 text-center mt-1 drop-shadow-[2px_2px_0_rgba(0,0,0,0.2)]">{cta.title}</h3>
          <p className="text-[10px] text-[#3a2010] mb-3 text-center leading-relaxed">{cta.description}</p>
          <div className="flex justify-center gap-2">
            <PixelButton variant="primary" className="text-[10px] py-1 px-4 shadow-[0_3px_0_#3a2010] hover:translate-y-[-1px] transition-transform">{cta.button}</PixelButton>
          </div>
        </div>
      </div>
    </div>
  )
}
