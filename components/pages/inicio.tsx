import { PixelButton } from '@/components/pixel-button'
import { PixelContainer } from '@/components/pixel-container'
import Image from 'next/image'
import homeData from '@/data/home.json'

interface InicioProps {
  onPageChange?: (page: string) => void
}

export function InicioLeftPage({ onPageChange }: InicioProps) {
  const { hero, features } = homeData;

  return (
    <div className="space-y-6 font-[family-name:var(--font-pixel)] h-full overflow-y-auto overflow-x-hidden pr-1 custom-scrollbar flex flex-col">
      {/* Hero Section - Larger Logo */}
      <div className="flex flex-col items-center mb-4 relative">
        <div className="hover:scale-105 transition-transform duration-500 cursor-pointer ease-out-back">
          <Image
            src="/assets/logo/logo.png"
            alt="Netherious"
            width={240}
            height={72}
            className="block h-auto w-auto drop-shadow-[6px_6px_0_rgba(139,69,19,0.4)]"
            style={{ imageRendering: 'pixelated' }}
            priority
          />
        </div>
        <p className="text-[11px] text-[#5c3d1a] font-bold mt-4 text-center leading-relaxed max-w-[90%] drop-shadow-[1px_1px_0_rgba(0,0,0,0.2)]">
          {hero.subtitle}
        </p>
      </div>

      <div className="codex-divider"></div>

      {/* Features Index - Simple List like Coffee Menu */}
      <div className="flex-1">
        <h2 className="text-[14px] text-[#8B4513] uppercase mb-4 font-bold text-center drop-shadow-[1px_1px_0_rgba(0,0,0,0.2)]">
          Características
        </h2>
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3 bg-[#d4c4a8]/40 border-2 border-[#8B4513]/30 p-2 hover:bg-[#d4c4a8]/60 transition-colors cursor-pointer">
              {/* Icon */}
              <div className="flex-shrink-0">
                <Image
                  src={index === 0 ? "/assets/mini/inicio/inicio mundosvivos.png" : index === 1 ? "/assets/mini/inicio/inicio combate.png" : "/assets/mini/inicio/inicio progresion rpg.png"}
                  alt="Feature"
                  width={160}
                  height={160}
                  className="drop-shadow-[6px_6px_0_rgba(0,0,0,0.3)] hover:scale-110 transition-transform duration-300 cursor-pointer"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>
              {/* Label */}
              <div className="flex-1">
                <h3 className="text-[11px] font-bold text-[#8B4513] uppercase leading-tight">
                  {feature.title}
                </h3>
              </div>
              {/* Indicator */}
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-[#8B4513] transform rotate-45"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function InicioRightPage({ onPageChange }: InicioProps) {
  const { intro, cards, cta } = homeData;

  return (
    <div className="space-y-6 font-[family-name:var(--font-pixel)] h-full overflow-y-auto overflow-x-hidden pr-1 custom-scrollbar flex flex-col">
      {/* Featured Visual - Large Image */}
      <div className="relative">
        <div className="bg-[#e8dcc8] border-4 border-[#8B4513] p-4 relative">
          {/* Large Featured Icon */}
          <div className="flex justify-center mb-4">
            <Image
              src="/assets/craiyon_211530_image.png"
              alt="Featured"
              width={220}
              height={220}
              className="drop-shadow-[10px_10px_0_rgba(0,0,0,0.4)]"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>

          {/* Title */}
          <h2 className="text-[16px] text-[#8B4513] uppercase mb-3 font-bold text-center drop-shadow-[2px_2px_0_rgba(0,0,0,0.3)] flex items-center justify-center gap-4">
            <Image src="/assets/bookmagic.gif" alt="Magic" width={60} height={60} className="pixelated shrink-0" />
            {intro.title}
            <Image src="/assets/bookmagic.gif" alt="Magic" width={60} height={60} className="pixelated -scale-x-100 shrink-0" />
          </h2>

          {/* Description */}
          <p className="text-[11px] leading-relaxed text-[#3a2010] text-center px-2">
            {intro.paragraph}
          </p>

          {/* Decorative corners */}
          <div className="absolute -top-2 -left-2 w-3 h-3 bg-[#8B4513]"></div>
          <div className="absolute -top-2 -right-2 w-3 h-3 bg-[#8B4513]"></div>
          <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-[#8B4513]"></div>
          <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-[#8B4513]"></div>
        </div>
      </div>

      <div className="codex-divider"></div>

      {/* Highlights Cards */}
      <div className="flex-1 space-y-3">
        <h3 className="text-[18px] text-[#8B4513] uppercase font-bold mb-5 drop-shadow-[2px_2px_0_rgba(0,0,0,0.2)] flex items-center gap-6">
          <Image src="/assets/mini/inicio/destacados.png" alt="Highlight icon" width={160} height={160} style={{ imageRendering: 'pixelated' }} className="drop-shadow-[6px_6px_0_rgba(0,0,0,0.3)]" />
          Destacados
        </h3>
        {cards.map((card, idx) => (
          <div key={idx} className="bg-[#d4c4a8]/40 border-2 border-[#8B4513]/30 p-3 relative hover:bg-[#d4c4a8]/60 transition-colors">
            <div className="flex items-start gap-2 mb-1">
              <div className="w-2 h-2 bg-[#8B4513] transform rotate-45 mt-1 flex-shrink-0"></div>
              <div className="flex-1">
                <h4 className="text-[11px] uppercase font-bold text-[#8B4513] mb-1">{card.title}</h4>
                <p className="text-[10px] text-[#3a2010] leading-tight">{card.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section - Action Buttons */}
      <div className="mt-auto pt-4">
        <div className="bg-gradient-to-br from-[#e8dcc8] to-[#d4c4a8] relative p-4 border-4 border-[#8B4513] shadow-lg">
          <h3 className="text-[13px] text-[#8B4513] font-bold mb-2 text-center uppercase drop-shadow-[2px_2px_0_rgba(0,0,0,0.2)]">
            {cta.title}
          </h3>
          <p className="text-[10px] text-[#3a2010] mb-3 text-center leading-relaxed">
            {cta.description}
          </p>
          <div className="flex justify-center">
            <PixelButton
              variant="comic"
              className="text-[12px] py-4 px-8 font-black flex flex-col items-center gap-2 shadow-[8px_8px_0_0_#000] hover:scale-110 transition-transform"
              onClick={() => onPageChange?.('descarga')}
            >
              <Image src="/assets/mini/general/cofre.png" alt="Chest" width={64} height={64} style={{ imageRendering: 'pixelated' }} className="drop-shadow-[6px_6px_0_rgba(0,0,0,0.3)]" />
              <span>{cta.button}</span>
            </PixelButton>
          </div>
        </div>
      </div>
    </div>
  )
}
