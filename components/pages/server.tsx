import { PixelButton } from '@/components/pixel-button'
import { PixelContainer } from '@/components/pixel-container'
import Image from 'next/image'
import serverData from '@/data/server.json'

export function ServerLeftPage() {
  const { title, subtitle, ip, intro } = serverData;

  return (
    <div className="space-y-5 font-[family-name:var(--font-pixel)] h-full overflow-y-auto pr-1 custom-scrollbar">
      <div className="border-b-4 border-[#8B4513] pb-2 mb-4">
        <h1 className="text-[20px] text-[#8B4513] uppercase tracking-wide drop-shadow-sm">{title}</h1>
        <p className="text-[10px] text-[#5c3d1a] font-bold pl-1">{subtitle}</p>
      </div>

      <div className="bg-[#d4c4a8]/30 p-3 border-2 border-[#8B4513] relative overflow-visible">
        <div className="absolute -top-5 right-3 bg-[#e8dcc8] px-1 border border-[#8B4513]">
          <Image src="/assets/mini/5.png" alt="Conn" width={36} height={36} style={{ imageRendering: 'pixelated' }} />
        </div>
        <h2 className="text-[13px] text-[#8B4513] uppercase mb-2 font-bold border-b border-[#8B4513]/20 pb-1">Conexión</h2>
        <div className="space-y-2 text-[11px] text-[#3a2010]">
          <div className="flex flex-col gap-1">
            <span className="font-bold text-[#8B4513] text-[10px]">DIRECCIÓN IP:</span>
            <code className="text-[12px] bg-[#3a2010] text-[#e8dcc8] px-2 py-1.5 block text-center rounded-sm font-mono tracking-wide select-all">{ip}</code>
          </div>
          <div className="flex justify-between items-center px-1">
            <span className="font-bold text-[#8B4513] text-[10px]">ESTADO:</span>
            <span className="text-[10px] flex items-center gap-1 font-bold text-green-700"><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> ONLINE</span>
          </div>
        </div>
      </div>

      <div className="relative pl-10 mt-6 min-h-[40px]">
        <Image
          src="/assets/mini/9.png"
          alt="Info"
          width={36}
          height={36}
          className="absolute left-[-4px] top-[-2px]"
          style={{ imageRendering: 'pixelated' }}
        />
        <h2 className="text-[13px] text-[#8B4513] uppercase mb-0.5 font-bold">{intro.title}</h2>
        <p className="text-[9px] text-[#3a2010] leading-relaxed">{intro.description}</p>
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
        <h2 className="text-[13px] text-[#8B4513] uppercase mb-2 font-bold border-b border-[#8B4513]/20 pb-1">Requisitos</h2>
        <div className="space-y-2">
          {requirements.map((req, i) => (
            <div key={i} className="flex flex-col bg-[#d4c4a8]/30 border border-[#8B4513]/20 p-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold text-[#8B4513]">{req.label}</span>
                <span className="text-[9px] font-bold text-[#3a2010] bg-[#e8dcc8] px-1">{req.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2 pt-2">
        <h2 className="text-[13px] text-[#8B4513] uppercase mb-1 font-bold flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-[#8B4513] transform rotate-45"></div> Especificaciones
        </h2>
        {specs.map((spec, i) => (
          <div key={i} className="flex gap-2 text-[10px] items-start pl-3">
            <div className="min-w-[4px] h-[4px] bg-[#8B4513] mt-1.5 rounded-full opacity-50"></div>
            <div>
              <span className="font-bold text-[#8B4513] block">{spec.label}</span>
              <span className="text-[#3a2010] text-[9px] leading-tight">{spec.value}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mt-4 justify-center pt-2">
        <PixelButton variant="primary" className="text-[10px] py-1 px-3 shadow-[0_3px_0_#3a2010]">DISCORD</PixelButton>
        <PixelButton variant="secondary" className="text-[10px] py-1 px-3 shadow-[0_3px_0_#3a2010]">WIKI</PixelButton>
      </div>
    </div>
  )
}
