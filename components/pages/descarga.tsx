import { PixelButton } from '@/components/pixel-button'
import { PixelContainer } from '@/components/pixel-container'
import Image from 'next/image'
import installData from '@/data/install.json'

export function DescargaLeftPage() {
  const { title, subtitle, intro, sections } = installData;
  const leftSections = sections.slice(0, 3);

  return (
    <div className="space-y-4 font-[family-name:var(--font-pixel)] h-full overflow-y-auto pr-1 custom-scrollbar">
      <div className="border-b-4 border-[#8B4513] pb-2 mb-2 ornamental-underline">
        <h1 className="text-[20px] text-[#8B4513] uppercase tracking-wide drop-shadow-[2px_2px_0_rgba(0,0,0,0.3)]">{title}</h1>
        <p className="text-[10px] text-[#5c3d1a] font-bold pl-1">{subtitle}</p>
      </div>

      <div className="space-y-5 relative">
        <div className="absolute left-[15px] top-[14px] bottom-[10px] w-0.5 bg-[#8B4513]/30"></div>
        {leftSections.map((section, index) => (
          <div key={section.id} className="relative pl-10">
            <div className="absolute left-0 top-0 w-8 h-8 flex items-center justify-center bg-gradient-to-br from-[#ff6b9d] to-[#ff1744] border-4 border-black text-white text-[12px] font-black shadow-[4px_4px_0_#000] z-10">
              {index + 1}
            </div>
            <div>
              <h3 className="text-[13px] text-[#8B4513] uppercase font-bold bg-white/60 backdrop-blur-sm inline-block px-2 py-1 border-3 border-black mb-1 shadow-[3px_3px_0_rgba(0,0,0,0.2)]">{section.title}</h3>
              {section.recommendation && (
                <div className="text-[9px] text-[#c2410c] font-bold mb-1 leading-tight">{section.recommendation}</div>
              )}
              <p className="text-[10px] text-[#3a2010] bg-white/40 backdrop-blur-sm p-2 border-3 border-black mb-2 leading-tight shadow-[3px_3px_0_rgba(0,0,0,0.2)]">
                {section.description}
              </p>
              {section.downloadUrl && (
                <a href={section.downloadUrl} target="_blank" rel="noopener noreferrer">
                  <PixelButton variant="primary" className="text-[9px] py-1 px-2 shadow-[0_2px_0_#3a2010] mb-1">DESCARGAR</PixelButton>
                </a>
              )}
              {section.link && (
                <a href={section.link} target="_blank" rel="noopener noreferrer">
                  <PixelButton variant="secondary" className="text-[9px] py-1 px-2 shadow-[0_2px_0_#3a2010] mb-1 ml-1">IR AL SITIO</PixelButton>
                </a>
              )}
              {section.extraLinks && section.extraLinks.map((extra, i) => (
                <div key={i} className="mt-1">
                  <a href={extra.url} target="_blank" rel="noopener noreferrer">
                    <PixelButton variant="secondary" className="text-[8px] py-1 px-2 shadow-[0_2px_0_#3a2010]">{extra.label}</PixelButton>
                  </a>
                </div>
              ))}
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
              <h3 className="text-[13px] text-[#8B4513] uppercase font-bold bg-[#e8dcc8] inline-block px-1 border border-[#8B4513]/30 mb-1 drop-shadow-[1px_1px_0_rgba(0,0,0,0.2)]">{section.title}</h3>
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
      </div>

      <div className="flex justify-center pt-4">
        <a href="https://discord.gg/netherious" target="_blank" rel="noopener noreferrer" className="inline-block">
          <div className="relative bg-gradient-to-br from-[#7289da] to-[#5865F2] border-4 border-black p-3 flex items-center gap-3 shadow-[8px_8px_0_#000] hover:shadow-[4px_4px_0_#000] hover:translate-x-[4px] hover:translate-y-[4px] transition-all cursor-pointer">
            <Image src="/assets/rocksmall.png" alt="Discord" width={64} height={64} style={{ imageRendering: 'pixelated' }} className="drop-shadow-[2px_2px_0_#000]" />
            <p className="text-[11px] text-white font-black uppercase tracking-wider drop-shadow-[2px_2px_0_#000]" style={{ textShadow: '2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000' }}>
              💬 Únete al<br/>Discord!
            </p>
            <div className="absolute inset-0 bg-[url('/assets/grid-overlay.png')] opacity-10 pointer-events-none" style={{ backgroundSize: '2px 2px' }}></div>
          </div>
        </a>
      </div>
    </div>
  )
}
