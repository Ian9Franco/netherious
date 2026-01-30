import { PixelContainer } from '@/components/pixel-container'
import Image from 'next/image'
import loreData from '@/data/lore.json'
import { useEffect, useState } from 'react'

// Helper component for Stat Bar
const StatBar = ({ label, value, type }: { label: string, value: number, type: string }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Small delay to trigger animation after mount
    const timer = setTimeout(() => {
      setWidth(value * 10);
    }, 100);
    return () => clearTimeout(timer);
  }, [value]);

  // Determine color based on type
  let barColor = 'bg-[#4a8]'; // Default green
  if (type === 'attack') barColor = 'bg-[#ff5555]';
  if (type === 'magic') barColor = 'bg-[#5555ff]';
  if (type === 'speed') barColor = 'bg-[#ffff55]';

  return (
    <div className="flex items-center gap-6 text-[9px] w-full mb-1">
      <span className="w-14 text-[#8B4513] font-bold text-right leading-none relative top-[1px]">{label}</span>
      {/* Container limited width (shorter) */}
      <div className="w-[150px] h-3.5 bg-[#2a150a] p-[2px] border border-[#8B4513]/80 relative shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]">
        <div
          className={`h-full ${barColor} relative transition-all duration-1000 ease-out`}
          style={{ width: `${width}%` }}
        >
          {/* Shine effect */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/40"></div>
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-black/10"></div>
        </div>
        {/* Pixel grid overlay */}
        <div className="absolute inset-0 bg-[url('/assets/grid-overlay.png')] opacity-20 pointer-events-none" style={{ backgroundSize: '2px 2px' }}></div>
      </div>
      <span className="text-[#3a2010] font-bold w-3 text-center leading-none relative top-[1px]">{value}</span>
    </div>
  );
};

export function LoreLeftPage() {
  const { intro, categories } = loreData;
  // Show first 3 categories on left page
  const leftCategories = categories.slice(0, 3);

  return (
    <div className="space-y-4 font-[family-name:var(--font-pixel)] h-full overflow-y-auto pr-2 custom-scrollbar">
      <div className="flex items-center gap-4 border-b-2 border-[#8B4513]/30 pb-4">
        <div className="relative flex-shrink-0">
          <Image
            src="/assets/bookmagic.gif"
            alt="Magic Book"
            width={80}
            height={80}
            unoptimized
            className="drop-shadow-lg"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
        <div>
          <h1 className="text-[20px] text-[#8B4513] uppercase leading-tight drop-shadow-sm">{intro.title}</h1>
          <p className="text-[11px] text-[#5c3d1a] mt-1 font-bold">Capítulo I</p>
        </div>
      </div>

      <div className="relative pl-12">
        <Image
          src="/assets/mini/1.png"
          alt="Icon"
          width={42}
          height={42}
          className="absolute left-[-10px] top-[-8px]"
          style={{ imageRendering: 'pixelated' }}
        />
        <p className="text-[11px] leading-relaxed text-[#3a2010] italic">
          "{intro.paragraph1}"
        </p>
        <p className="text-[11px] leading-relaxed text-[#3a2010] mt-2">
          {intro.paragraph2}
        </p>
      </div>

      <div className="space-y-6 mt-6">
        {leftCategories.map((cat, index) => (
          <div key={cat.id} className="relative pl-12">
            <Image
              src={`/assets/mini/${(index % 8) + 2}.png`} // Cycle through mini icons
              alt="Icon"
              width={42}
              height={42}
              className="absolute left-[-10px] top-[-8px]"
              style={{ imageRendering: 'pixelated' }}
            />
            <h2 className="text-[14px] text-[#8B4513] uppercase mb-1 font-bold">{cat.title}</h2>
            <p className="text-[10px] text-[#3a2010] mb-2 leading-tight">{cat.description}</p>
            <div className="space-y-1 bg-[#d4c4a8]/30 p-2 border border-[#8B4513]/20">
              {cat.stats.map((stat, i) => (
                <StatBar key={i} label={stat.label} value={stat.value} type={stat.type} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function LoreRightPage() {
  const { categories, outro } = loreData;
  // Show remaining categories
  const rightCategories = categories.slice(3, 6); // Next 3

  return (
    <div className="space-y-4 font-[family-name:var(--font-pixel)] h-full overflow-y-auto pr-2 custom-scrollbar">
      <div className="flex items-center gap-2 mb-2 border-b border-[#8B4513]/30 pb-2">
        <Image
          src="/assets/mini/4.png"
          alt="Icon"
          width={48}
          height={48}
          style={{ imageRendering: 'pixelated' }}
        />
        <h2 className="text-[16px] text-[#8B4513] uppercase font-bold">El Codex</h2>
      </div>

      <div className="space-y-6">
        {rightCategories.map((cat, index) => (
          <div key={cat.id} className="relative pl-12">
            <Image
              src={`/assets/mini/${(index % 8) + 5}.png`}
              alt="Icon"
              width={42}
              height={42}
              className="absolute left-[-10px] top-[-8px]"
              style={{ imageRendering: 'pixelated' }}
            />
            <h2 className="text-[14px] text-[#8B4513] uppercase mb-1 font-bold">{cat.title}</h2>
            <p className="text-[10px] text-[#3a2010] mb-2 leading-tight">{cat.description}</p>
            <div className="space-y-1 bg-[#d4c4a8]/30 p-2 border border-[#8B4513]/20">
              {cat.stats.map((stat, i) => (
                <StatBar key={i} label={stat.label} value={stat.value} type={stat.type} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-5 px-1">
        <div className="bg-[#e8dcc8] relative p-4 border-l-4 border-r-4 border-[#8B4513] shadow-md group">
          {/* Top/Bottom Borders */}
          <div className="absolute top-0 left-0 right-0 h-[4px] bg-[#8B4513]"></div>
          <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#8B4513]"></div>

          {/* Corner Decorations */}
          <div className="absolute top-0 left-0 w-2 h-2 bg-[#e8dcc8] border-r border-b border-[#8B4513]"></div>
          <div className="absolute top-0 right-0 w-2 h-2 bg-[#e8dcc8] border-l border-b border-[#8B4513]"></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 bg-[#e8dcc8] border-r border-t border-[#8B4513]"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#e8dcc8] border-l border-t border-[#8B4513]"></div>

          <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#e8dcc8] p-1 border-2 border-[#8B4513] shadow-sm z-10">
            <Image src="/assets/mini/8.png" alt="Icon" width={32} height={32} style={{ imageRendering: 'pixelated' }} />
          </div>
          <p className="text-[10px] leading-relaxed italic text-[#3a2010] font-medium mt-3 text-center px-2">
            "Únete a Netherious y vive la experiencia definitiva de Minecraft modded."
          </p>
        </div>
      </div>
    </div>
  )
}
