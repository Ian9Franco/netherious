import { PixelButton } from '@/components/pixel-button'
import { PixelContainer } from '@/components/pixel-container'
import Image from 'next/image'
import serverData from '@/data/server.json'
import { FingerprintSection } from '@/components/fingerprint-section'
import { useState } from 'react'
import { useSoundEffects } from '@/hooks/use-sound-effects'

export function ServerLeftPage() {
  const { title, subtitle, ip, intro, requirements } = serverData;
  const [copiedIp, setCopiedIp] = useState(false)

  const { playSound } = useSoundEffects()
  const handleCopyIp = async () => {
    await navigator.clipboard.writeText(ip)
    playSound('success-orb')
    setCopiedIp(true)
    setTimeout(() => setCopiedIp(false), 2000)
  }

  return (
    <div className="space-y-6 font-[family-name:var(--font-pixel)] h-full overflow-y-auto overflow-x-hidden pr-1 custom-scrollbar flex flex-col">
      {/* Header */}
      <div className="border-b-4 border-[#8B4513] pb-3 mb-2 flex flex-col items-center">
        <Image
          src="/assets/mini/server/conexion al servidor1.png"
          alt="Conexión"
          width={360}
          height={120}
          className="mb-2 drop-shadow-[2px_2px_0_rgba(0,0,0,0.3)] hover:scale-105 transition-transform duration-300 cursor-pointer"
          style={{ imageRendering: 'pixelated' }}
        />
        <p className="text-[9px] text-[#5c3d1a] font-bold text-center mt-1">
          {subtitle}
        </p>
      </div>

      {/* Connection Info - Featured */}
      <div className="bg-gradient-to-br from-[#e8dcc8] to-[#d4c4a8] p-4 border-4 border-[#8B4513] relative shadow-lg">

        <div className="flex justify-center mb-3">
          <Image
            src="/assets/mini/general/netherious.png"
            alt="Conexión"
            width={240}
            height={60}
            style={{ imageRendering: 'pixelated' }}
            className="drop-shadow-[3px_3px_0_rgba(0,0,0,0.3)]"
          />
        </div>
        <div className="space-y-2 text-[11px] text-[#3a2010]">
          <div className="flex flex-col gap-2">
            <span className="font-bold text-[#8B4513] text-[10px] text-center">DIRECCIÓN IP:</span>
            <div className="flex gap-2 items-center">
              <code className="text-[13px] bg-[#3a2010] text-[#e8dcc8] px-3 py-2 flex-1 text-center rounded-sm font-mono tracking-wide select-all font-bold">
                {ip}
              </code>
              <button
                onClick={handleCopyIp}
                className="bg-[#8B4513] hover:bg-[#a0522d] text-[#e8dcc8] text-[9px] font-bold py-2 px-3 border-2 border-[#5c3d1a] shadow-[0_3px_0_#3a2010] hover:shadow-[0_1px_0_#3a2010] hover:translate-y-[2px] transition-all uppercase tracking-wide whitespace-nowrap"
              >
                {copiedIp ? '✓' : 'COPIAR'}
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center px-1 pt-2">
            <span className="font-bold text-[#8B4513] text-[10px]">ESTADO:</span>
            <span className="text-[11px] flex items-center gap-1 font-bold text-green-700">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> ONLINE
            </span>
          </div>
        </div>
      </div>

      <div className="codex-divider"></div>

      {/* Requirements Index */}
      <div className="flex-1">
        <h2 className="text-[13px] text-[#8B4513] uppercase mb-3 font-bold text-center drop-shadow-[1px_1px_0_rgba(0,0,0,0.2)]">
          Requisitos
        </h2>
        <div className="space-y-2">
          {requirements.map((req, i) => (
            <div key={i} className="flex items-center justify-between bg-[#d4c4a8]/40 border-2 border-[#8B4513]/30 p-2 hover:bg-[#d4c4a8]/60 transition-colors">
              <span className="text-[10px] font-bold text-[#8B4513]">{req.label}</span>
              <span className="text-[10px] font-bold text-[#3a2010] bg-[#e8dcc8] px-2 py-0.5 border border-[#8B4513]/20">
                {req.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ServerRightPage() {
  const { intro, specs } = serverData;

  return (
    <div className="space-y-5 font-[family-name:var(--font-pixel)] h-full overflow-y-auto overflow-x-hidden pr-1 custom-scrollbar flex flex-col">
      {/* Featured Content with Large Icon */}
      <div className="bg-gradient-to-br from-[#e8dcc8] to-[#d4c4a8] border-4 border-[#8B4513] p-4 relative">
        {/* Large Icon */}
        <div className="flex justify-center mb-2">
          <Image
            src="/assets/mini/server/expansion netherious.png"
            alt="Expansion"
            width={240}
            height={80}
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
        <h2 className="text-[14px] text-[#8B4513] uppercase mb-2 font-bold text-center drop-shadow-[2px_2px_0_rgba(0,0,0,0.3)] flex items-center justify-center gap-2">
          <Image src="/assets/bookmagic.gif" alt="Magic" width={60} height={60} className="pixelated" />
          {intro.title}
          <Image src="/assets/bookmagic.gif" alt="Magic" width={60} height={60} className="pixelated -scale-x-100" />
        </h2>

        {/* Description */}
        <p className="text-[10px] text-[#3a2010] leading-relaxed text-center px-2">
          {intro.description}
        </p>

        {/* Decorative corners */}
        <div className="absolute -top-2 -left-2 w-3 h-3 bg-[#8B4513]"></div>
        <div className="absolute -top-2 -right-2 w-3 h-3 bg-[#8B4513]"></div>
        <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-[#8B4513]"></div>
        <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-[#8B4513]"></div>
      </div>

      <div className="codex-divider"></div>

      {/* Fingerprint Section */}
      <FingerprintSection />

      <div className="codex-divider"></div>

      {/* Specifications */}
      <div className="flex-1">
        <h2 className="text-[13px] text-[#8B4513] uppercase mb-3 font-bold flex items-center justify-center gap-2 drop-shadow-[1px_1px_0_rgba(0,0,0,0.2)]">
          <div className="w-2 h-2 bg-[#8B4513] transform rotate-45"></div>
          Especificaciones
        </h2>
        <div className="space-y-2">
          {specs.map((spec, i) => (
            <div key={i} className="bg-[#d4c4a8]/40 border-2 border-[#8B4513]/30 p-2">
              <span className="font-bold text-[#8B4513] block text-[10px] mb-0.5">{spec.label}</span>
              <span className="text-[#3a2010] text-[9px] leading-tight">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center pt-3 mt-auto">
        <a href="https://discord.gg/netherious" target="_blank" rel="noopener noreferrer" className="inline-block">
          <button className="relative bg-gradient-to-br from-[#7289da] to-[#5865F2] text-white text-[11px] font-black py-2 px-5 border-4 border-black shadow-[6px_6px_0_#000] hover:shadow-[3px_3px_0_#000] hover:translate-x-[3px] hover:translate-y-[3px] transition-all uppercase tracking-wide flex items-center gap-2">
            <Image src={serverData.outro.discord_icon} alt="Discord" width={20} height={20} style={{ imageRendering: 'pixelated' }} />
            <span className="relative z-10">DISCORD</span>
            <div className="absolute inset-0 bg-[url('/assets/grid-overlay.png')] opacity-10 pointer-events-none" style={{ backgroundSize: '2px 2px' }}></div>
          </button>
        </a>
        <PixelButton
          variant="comic"
          className="py-2 px-5 text-[11px]"
          onClick={() => window.open('/modlist/modlist.html', '_blank')}
        >
          📚 WIKI
        </PixelButton>
      </div>
    </div>
  )
}
