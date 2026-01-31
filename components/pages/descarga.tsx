import { ActionButton } from '@/components/ui/action-button'
import { PixelContainer } from '@/components/pixel-container'
import Image from 'next/image'
import installData from '@/data/install.json'
import { motion } from 'framer-motion'

export function DescargaLeftPage() {
  const { title, subtitle, sections } = installData;

  return (
    <div className="space-y-6 font-[family-name:var(--font-pixel)] h-full overflow-y-auto overflow-x-hidden pr-1 custom-scrollbar flex flex-col">
      {/* Header */}
      <div className="border-b-4 border-[#8B4513] pb-3 mb-2 flex flex-col items-center">
        <div className="flex items-center gap-4 mb-2">
          {installData.icon && (
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Image
                src={installData.icon}
                alt="Install"
                width={250}
                height={250}
                className="drop-shadow-[6px_6px_0_rgba(0,0,0,0.3)] hover:scale-110 transition-transform duration-300 cursor-pointer"
                style={{ imageRendering: 'pixelated' }}
              />
            </motion.div>
          )}
          <Image
            src="/assets/mini/general/instalacion completa.png"
            alt="Instalación Completa"
            width={280}
            height={84}
            className="drop-shadow-[3px_3px_0_rgba(0,0,0,0.3)]"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
        <p className="text-[9px] text-[#5c3d1a] font-bold text-center mt-1">
          {subtitle}
        </p>
      </div>

      {/* Steps Index - Simple List */}
      <div className="flex-1">
        <h2 className="text-[13px] text-[#8B4513] uppercase mb-4 font-bold text-center drop-shadow-[1px_1px_0_rgba(0,0,0,0.2)]">
          Pasos de Instalación
        </h2>
        <div className="space-y-2">
          {sections.map((section, index) => (
            <div key={section.id} className="flex items-center gap-3 bg-[#d4c4a8]/40 border-2 border-[#8B4513]/30 p-2 hover:bg-[#d4c4a8]/60 transition-colors cursor-pointer">
              {/* Step Number */}
              <div className="flex-shrink-0">
                <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-[#ff6b9d] to-[#ff1744] border-3 border-black text-white text-[12px] font-black shadow-[3px_3px_0_#000]">
                  {index + 1}
                </div>
              </div>
              {/* Label */}
              <div className="flex-1">
                <h3 className="text-[10px] font-bold text-[#8B4513] uppercase leading-tight">
                  {section.title}
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

      {/* Nefarious Trio Image moved to left page */}
      <div className="flex justify-center pt-4 mt-auto">
        <Image
          src="/assets/mini/descarga/the-nefarious-trio-png.png"
          alt="The Nefarious Trio"
          width={360}
          height={180}
          style={{ imageRendering: 'pixelated' }}
          className="drop-shadow-[10px_10px_0_rgba(0,0,0,0.4)] hover:scale-105 transition-transform duration-500 cursor-pointer"
        />
      </div>
    </div >
  )
}

export function DescargaRightPage() {
  const { sections } = installData;

  return (
    <div className="space-y-5 font-[family-name:var(--font-pixel)] h-full overflow-y-auto overflow-x-hidden pr-1 custom-scrollbar">
      <div className="border-b-2 border-[#8B4513]/30 pb-2 mb-2">
        <h2 className="text-[14px] text-[#8B4513] uppercase font-bold text-center drop-shadow-[2px_2px_0_rgba(0,0,0,0.3)]">
          Instrucciones Detalladas
        </h2>
      </div>

      {/* Featured Steps with Details */}
      <div className="space-y-8">
        {sections.map((section, index) => (
          <div key={section.id} className="relative">
            {/* Step Header */}
            <div className="flex items-start gap-3 mb-2 bg-gradient-to-r from-[#e8dcc8] to-[#d4c4a8] border-2 border-[#8B4513] p-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-[#ff6b9d] to-[#ff1744] border-4 border-black text-white text-[14px] font-black shadow-[4px_4px_0_#000]">
                  {index + 1}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-[12px] text-[#8B4513] uppercase font-bold mb-1 drop-shadow-[1px_1px_0_rgba(0,0,0,0.2)]">
                  {section.title}
                </h3>
                {section.recommendation && (
                  <div className="text-[8px] text-[#c2410c] font-bold leading-tight">
                    {section.recommendation}
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white/50 backdrop-blur-sm p-3 border-3 border-black mb-3 shadow-[4px_4px_0_rgba(0,0,0,0.2)]">
              <p className="text-[10px] text-[#3a2010] font-bold leading-tight">
                {section.description}
              </p>
            </div>

            {/* Instructions List */}
            {section.instructions && (
              <div className="bg-[#fdf6e3]/80 p-3 border-2 border-[#8B4513]/40 mb-3 shadow-[2px_2px_0_rgba(0,0,0,0.1)]">
                <ul className="space-y-2">
                  {section.instructions.map((inst, i) => (
                    <li key={i} className="text-[9px] text-[#5c3d1a] flex gap-2 items-start">
                      <span className="text-[#8B4513] font-bold mt-[-2px]">»</span>
                      <span className="leading-tight font-medium">{inst}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Optional Mods List */}
            {section.optionalModsList && (
              <div className="bg-[#f0fdfa]/60 p-3 border-2 border-[#0d9488]/30 mb-3 shadow-[2px_2px_0_rgba(0,0,0,0.1)]">
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                  {section.optionalModsList.map((mod, i) => (
                    <div key={i} className="text-[8px] text-[#0f766e] flex items-center gap-1.5 font-bold">
                      <div className="w-1.5 h-1.5 bg-[#0d9488] rotate-45 flex-shrink-0" />
                      <span className="truncate">{mod}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Checkpoints */}
            {section.checkpoints && (
              <div className="bg-[#f0fdf4]/60 p-3 border-2 border-[#16a34a]/30 mb-3 shadow-[2px_2px_0_rgba(0,0,0,0.1)]">
                <ul className="space-y-2">
                  {section.checkpoints.map((check, i) => (
                    <li key={i} className="text-[9px] text-[#166534] flex gap-2 items-start">
                      <div className="w-3 h-3 border-2 border-[#16a34a] flex-shrink-0 flex items-center justify-center mt-0.5 bg-white">
                        <div className="w-1.5 h-1.5 bg-[#16a34a]" />
                      </div>
                      <span className="leading-tight font-bold">{check}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-6 mt-6 items-center">
              {section.downloadUrl && (
                <div className="w-full flex justify-center">
                  <ActionButton
                    buttonKey="descarga-modpack"
                    overrideUrl={section.downloadUrl}
                  />
                </div>
              )}

              <div className="flex flex-wrap items-center justify-center gap-6 w-full">
                {section.link && (
                  <ActionButton
                    buttonKey="descarga-forge"
                    overrideUrl={section.link}
                  />
                )}
                {section.extraLinks && section.extraLinks.map((extra, i) => (
                  extra.label.toLowerCase().includes('java') && (
                    <ActionButton
                      key={i}
                      buttonKey="descarga-java"
                      overrideUrl={extra.url}
                    />
                  )
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Discord CTA */}
      <div className="flex justify-center pt-2 pb-6 mt-auto">
        <a href="https://discord.gg/netherious" target="_blank" rel="noopener noreferrer" className="inline-block">
          <div className="relative bg-gradient-to-br from-[#7289da] to-[#5865F2] border-4 border-black p-4 flex items-center gap-3 shadow-[8px_8px_0_#000] hover:shadow-[4px_4px_0_#000] hover:translate-x-[4px] hover:translate-y-[4px] transition-all cursor-pointer">
            <Image src={installData.outro.icon} alt="Discord" width={56} height={56} style={{ imageRendering: 'pixelated' }} className="drop-shadow-[2px_2px_0_#000]" />
            <p className="text-[11px] text-white font-black uppercase tracking-wider drop-shadow-[2px_2px_0_#000]" style={{ textShadow: '2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000' }}>
              💬 Únete al<br />Discord!
            </p>
            <div className="absolute inset-0 bg-[url('/assets/grid-overlay.png')] opacity-10 pointer-events-none" style={{ backgroundSize: '2px 2px' }}></div>
          </div>
        </a>
      </div>
    </div>
  )
}
