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
        <div className="relative p-4 bg-[#e8dcc8] border-4 border-[#8B4513] shadow-[0_6px_8px_rgba(0,0,0,0.3)] transform hover:scale-95 transition-transform duration-300">
          <Image
            src="/assets/logo/logo.png"
            alt="Netherious"
            width={140}
            height={45}
            className="block h-auto w-auto"
            style={{ imageRendering: 'pixelated' }}
            priority
          />
          <div className="absolute top-0 left-0 w-2 h-2 bg-[#8B4513]" />
          <div className="absolute top-0 right-0 w-2 h-2 bg-[#8B4513]" />
          <div className="absolute bottom-0 left-0 w-2 h-2 bg-[#8B4513]" />
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#8B4513]" />
        </div>
        <p className="text-[11px] text-[#5c3d1a] font-bold mt-4 text-center leading-relaxed max-w-[90%] drop-shadow-sm">
          {hero.subtitle}
        </p>
      </div>

      {/* Intro Section */}
      <div className="relative pl-10 min-h-[60px]">
        <Image
          src="/assets/mini/9.png"
          alt="Info"
          width={42}
          height={42}
          className="absolute left-[-4px] top-[-2px]"
          style={{ imageRendering: 'pixelated' }}
        />
        <h2 className="text-[14px] text-[#8B4513] uppercase mb-2 font-bold">{intro.title}</h2>
        <p className="text-[10px] leading-relaxed text-[#3a2010]">
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
      {/* All Features */}
      <div className="space-y-4">
        {features.map((feature, index) => (
          <div key={index} className="relative pl-10">
            <Image
              src={`/assets/mini/${(index % 8) + 1}.png`}
              alt="Feature"
              width={36}
              height={36}
              className="absolute left-[-4px] top-[-2px]"
              style={{ imageRendering: 'pixelated' }}
            />
            <h3 className="text-[12px] text-[#8B4513] uppercase font-bold mb-0.5">{feature.title}</h3>
            <p className="text-[9px] text-[#3a2010] leading-tight">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Highlights / Cards */}
      <div className="grid grid-cols-1 gap-2 mt-2">
        {cards.map((card, idx) => (
          <div key={idx} className="bg-[#d4c4a8]/30 border border-[#8B4513]/30 p-2 relative pl-2 hover:bg-[#d4c4a8]/50 transition-colors">
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
        <div className="bg-[#e8dcc8] relative p-4 border-2 border-[#8B4513] shadow-md group">
          {/* Decorative Corners */}
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#8B4513]"></div>
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#8B4513]"></div>
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#8B4513]"></div>
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#8B4513]"></div>

          {/* Inner Border */}
          <div className="absolute inset-[3px] border border-[#8B4513]/30 pointer-events-none"></div>

          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#e8dcc8] px-2 border-2 border-[#8B4513] shadow-sm z-10">
            <span className="text-[9px] font-bold text-[#8B4513] uppercase">Únete</span>
          </div>
          <h3 className="text-[14px] text-[#8B4513] font-bold mb-1 text-center mt-1">{cta.title}</h3>
          <p className="text-[10px] text-[#3a2010] mb-3 text-center leading-relaxed">{cta.description}</p>
          <div className="flex justify-center gap-2">
            <PixelButton variant="primary" className="text-[10px] py-1 px-4 shadow-[0_3px_0_#3a2010] hover:translate-y-[-1px] transition-transform">{cta.button}</PixelButton>
          </div>
        </div>
      </div>
    </div>
  )
}
