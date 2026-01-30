import { PixelButton } from '@/components/pixel-button'
import { PixelContainer } from '@/components/pixel-container'
import Image from 'next/image'
import installData from '@/data/install.json'

export function DescargaLeftPage() {
  const { title, subtitle, intro, sections } = installData;
  const leftSections = sections.slice(0, 3);

  return (
    <div className="space-y-4 font-[family-name:var(--font-pixel)] h-full overflow-y-auto pr-1 custom-scrollbar">
      <div className="border-b-4 border-[#8B4513] pb-2 mb-2">
        <h1 className="text-[20px] text-[#8B4513] uppercase tracking-wide drop-shadow-sm">{title}</h1>
        <p className="text-[10px] text-[#5c3d1a] font-bold pl-1">{subtitle}</p>
      </div>

      <div className="space-y-5 relative">
        <div className="absolute left-[15px] top-[14px] bottom-[10px] w-0.5 bg-[#8B4513]/30"></div>
        {leftSections.map((section, index) => (
          <div key={section.id} className="relative pl-10">
            <div className="absolute left-0 top-0 w-8 h-8 flex items-center justify-center bg-[#8B4513] border-2 border-[#f5e6d3] text-[#f5e6d3] text-[12px] font-bold rounded shadow-sm z-10">
              {index + 1}
            </div>
            <div>
              <h3 className="text-[13px] text-[#8B4513] uppercase font-bold bg-[#e8dcc8] inline-block px-1 border border-[#8B4513]/30 mb-1">{section.title}</h3>
              {section.recommendation && (
                <div className="text-[9px] text-[#c2410c] font-bold mb-1 leading-tight">{section.recommendation}</div>
              )}
              <p className="text-[10px] text-[#3a2010] bg-[#d4c4a8]/30 p-2 border border-[#8B4513]/20 mb-2 leading-tight">
                {section.description}
              </p>
              {section.downloadUrl && (
                <PixelButton variant="primary" className="text-[9px] py-1 px-2 shadow-[0_2px_0_#3a2010] mb-1">DESCARGAR</PixelButton>
              )}
              {section.link && (
                <PixelButton variant="secondary" className="text-[9px] py-1 px-2 shadow-[0_2px_0_#3a2010] mb-1">IR AL SITIO</PixelButton>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function DescargaRightPage() {
  const { sections } = installData;
  const rightSections = sections.slice(3);

  return (
    <div className="space-y-4 font-[family-name:var(--font-pixel)] h-full overflow-y-auto pr-1 custom-scrollbar">
      <div className="space-y-4 relative mt-4">
        <div className="absolute left-[15px] top-[14px] bottom-[10px] w-0.5 bg-[#8B4513]/30"></div>

        {rightSections.map((section, index) => (
          <div key={section.id} className="relative pl-10">
            <div className="absolute left-0 top-0 w-8 h-8 flex items-center justify-center bg-[#8B4513] border-2 border-[#f5e6d3] text-[#f5e6d3] text-[12px] font-bold rounded shadow-sm z-10">
              {index + 4}
            </div>
            <div>
              <h3 className="text-[13px] text-[#8B4513] uppercase font-bold bg-[#e8dcc8] inline-block px-1 border border-[#8B4513]/30 mb-1">{section.title}</h3>
              <p className="text-[10px] text-[#3a2010] mb-2 leading-tight">
                {section.description}
              </p>
              {section.checkpoints && (
                <ul className="text-[9px] list-disc ml-3 text-[#3a2010]">
                  {section.checkpoints.map((pt, i) => <li key={i}>{pt}</li>)}
                </ul>
              )}
            </div>
          </div>
        ))}

        <div className="relative pl-10 pt-2">
          <div className="bg-[#2a2a2a] p-3 border-2 border-[#8B4513] text-center shadow-lg">
            <div className="text-[#f5e6d3] text-[10px] mb-1">IP DEL SERVIDOR</div>
            <div className="text-[#55ff55] text-[12px] font-bold tracking-widest border border-[#55ff55]/30 p-1 bg-black/50 select-all">play.netherious.net</div>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-2">
        <div className="bg-[#e8dcc8] border border-[#8B4513] p-2 flex items-center gap-2 shadow-sm">
          <Image src="/assets/mini/9.png" alt="Help" width={36} height={36} style={{ imageRendering: 'pixelated' }} />
          <p className="text-[10px] text-[#3a2010] font-bold">¿Necesitas ayuda? <span className="underline cursor-pointer">Discord</span></p>
        </div>
      </div>
    </div>
  )
}
