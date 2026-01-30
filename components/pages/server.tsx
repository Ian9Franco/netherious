import { PixelButton } from '@/components/pixel-button'
import { PixelContainer } from '@/components/pixel-container'
import Image from 'next/image'
import serverData from '@/data/server.json'
import { FingerprintSection } from '@/components/fingerprint-section'
import { useState } from 'react'

export function ServerLeftPage() {
  const { title, subtitle, ip, intro } = serverData;
  const [copiedIp, setCopiedIp] = useState(false)

  const handleCopyIp = async () => {
    await navigator.clipboard.writeText(ip)
    setCopiedIp(true)
    setTimeout(() => setCopiedIp(false), 2000)
  }

  return (
    <div className="space-y-5 font-[family-name:var(--font-pixel)] h-full overflow-y-auto pr-1 custom-scrollbar">
      <div className="border-b-4 border-[#8B4513] pb-2 mb-4 ornamental-underline">
        <h1 className="text-[20px] text-[#8B4513] uppercase tracking-wide drop-shadow-[2px_2px_0_rgba(0,0,0,0.3)]">{title}</h1>
        <p className="text-[10px] text-[#5c3d1a] font-bold pl-1">{subtitle}</p>
      </div>

      <div className="bg-[#d4c4a8]/30 p-3 border-2 border-[#8B4513] relative overflow-visible scroll-edge aged-paper">
        <div className="absolute -top-5 right-3 wax-seal">
          <Image src="/assets/mini/5.png" alt="Conn" width={24} height={24} style={{ imageRendering: 'pixelated' }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        <h2 className="text-[13px] text-[#8B4513] uppercase mb-2 font-bold border-b border-[#8B4513]/20 pb-1 drop-shadow-[1px_1px_0_rgba(0,0,0,0.2)]">Conexión</h2>
        <div className="space-y-2 text-[11px] text-[#3a2010]">
          <div className="flex flex-col gap-1">
            <span className="font-bold text-[#8B4513] text-[10px]">DIRECCIÓN IP:</span>
            <div className="flex gap-2 items-center">
              <code className="text-[12px] bg-[#3a2010] text-[#e8dcc8] px-2 py-1.5 flex-1 text-center rounded-sm font-mono tracking-wide select-all">{ip}</code>
              <button
                onClick={handleCopyIp}
                className="bg-[#8B4513] hover:bg-[#a0522d] text-[#e8dcc8] text-[8px] font-bold py-1.5 px-2 border border-[#5c3d1a] shadow-[0_2px_0_#3a2010] hover:shadow-[0_1px_0_#3a2010] hover:translate-y-[1px] transition-all uppercase tracking-wide whitespace-nowrap"
              >
                {copiedIp ? '✓' : 'COPIAR'}
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center px-1">
            <span className="font-bold text-[#8B4513] text-[10px]">ESTADO:</span>
            <span className="text-[10px] flex items-center gap-1 font-bold text-green-700"><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> ONLINE</span>
          </div>
        </div>
      </div>

      <div className="codex-divider"></div>

      <FingerprintSection />

      <div className="relative pl-20 mt-6 min-h-[40px] parchment-texture">
        <Image
          src="/assets/rockbig.png"
          alt="Info"
          width={84}
          height={84}
          className="absolute left-[-10px] top-[-8px]"
          style={{ imageRendering: 'pixelated' }}
        />
        <h2 className="text-[13px] text-[#8B4513] uppercase mb-0.5 font-bold drop-shadow-[1px_1px_0_rgba(0,0,0,0.2)]">{intro.title}</h2>
        <p className="text-[9px] text-[#3a2010] leading-relaxed drop-cap pr-2">{intro.description}</p>
      </div>
    </div>
  )
}

export function ServerRightPage() {
  const { requirements, specs } = serverData;

  return (
    <div className="space-y-4 font-[family-name:var(--font-pixel)] h-full overflow-y-auto pr-1 custom-scrollbar">
      <div className="relative pl-10">
        <Image
          src="/assets/mini/6.png"
          alt="Reqs"
          width={36}
          height={36}
          className="absolute left-[-4px] top-[-2px]"
          style={{ imageRendering: 'pixelated' }}
        />
        <h2 className="text-[13px] text-[#8B4513] uppercase mb-2 font-bold border-b border-[#8B4513]/20 pb-1 drop-shadow-[1px_1px_0_rgba(0,0,0,0.2)]">Requisitos</h2>
        <div className="space-y-2">
          {requirements.map((req, i) => (
            <div key={i} className="flex flex-col bg-[#d4c4a8]/30 border border-[#8B4513]/20 p-2 gothic-corners aged-paper">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold text-[#8B4513]">{req.label}</span>
                <span className="text-[9px] font-bold text-[#3a2010] bg-[#e8dcc8] px-1">{req.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="codex-divider"></div>

      <div className="space-y-2 pt-2">
        <h2 className="text-[13px] text-[#8B4513] uppercase mb-1 font-bold flex items-center gap-2 drop-shadow-[1px_1px_0_rgba(0,0,0,0.2)]">
          <div className="w-1.5 h-1.5 bg-[#8B4513] transform rotate-45"></div> Especificaciones
        </h2>
        {specs.map((spec, i) => (
          <div key={i} className="flex gap-2 text-[10px] items-start pl-3 marginalia">
            <div className="min-w-[4px] h-[4px] bg-[#8B4513] mt-1.5 rounded-full opacity-50"></div>
            <div>
              <span className="font-bold text-[#8B4513] block">{spec.label}</span>
              <span className="text-[#3a2010] text-[9px] leading-tight">{spec.value}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 mt-4 justify-center pt-2">
        <a href="https://discord.gg/netherious" target="_blank" rel="noopener noreferrer" className="inline-block">
          <button className="relative bg-gradient-to-br from-[#7289da] to-[#5865F2] text-white text-[10px] font-black py-2 px-4 border-4 border-black shadow-[6px_6px_0_#000] hover:shadow-[3px_3px_0_#000] hover:translate-x-[3px] hover:translate-y-[3px] transition-all uppercase tracking-wide">
            <span className="relative z-10">💬 DISCORD</span>
            <div className="absolute inset-0 bg-[url('/assets/grid-overlay.png')] opacity-10 pointer-events-none" style={{ backgroundSize: '2px 2px' }}></div>
          </button>
        </a>
        <a href="#" className="inline-block">
          <button className="relative bg-gradient-to-br from-[#ffdd00] to-[#ffaa00] text-black text-[10px] font-black py-2 px-4 border-4 border-black shadow-[6px_6px_0_#000] hover:shadow-[3px_3px_0_#000] hover:translate-x-[3px] hover:translate-y-[3px] transition-all uppercase tracking-wide">
            <span className="relative z-10">📚 WIKI</span>
            <div className="absolute inset-0 bg-[url('/assets/grid-overlay.png')] opacity-10 pointer-events-none" style={{ backgroundSize: '2px 2px' }}></div>
          </button>
        </a>
      </div>
    </div>
  )
}
