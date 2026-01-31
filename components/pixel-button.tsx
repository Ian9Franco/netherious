'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { useSoundEffects } from '@/hooks/use-sound-effects'

interface PixelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'comic' | 'comic-purple' | 'comic-orange' | 'comic-red' | 'image'
  as?: 'button' | 'div'
  silent?: boolean
}

export const PixelButton = forwardRef<HTMLButtonElement | HTMLDivElement, PixelButtonProps>(
  ({ className, variant = 'primary', children, as = 'button', silent = false, ...props }, ref) => {
    const Component = as as any;
    const variantStyles = {
      primary: 'bg-[#8B4513] text-[#f5e6d3] shadow-[inset_-2px_-2px_0_0_rgba(0,0,0,0.3),inset_2px_2px_0_0_rgba(255,255,255,0.2)] hover:bg-[#a05a2c] min-w-[70px] border-2 border-[#1a0f05] px-3 py-1.5',
      secondary: 'bg-[#e8dcc8] text-[#3a2010] shadow-[inset_-2px_-2px_0_0_rgba(0,0,0,0.2),inset_2px_2px_0_0_rgba(255,255,255,0.6)] hover:bg-[#f0e6d6] min-w-[70px] border-2 border-[#1a0f05] px-3 py-1.5',
      accent: 'bg-[#ff5555] text-[#fff] shadow-[inset_-2px_-2px_0_0_rgba(0,0,0,0.3),inset_2px_2px_0_0_rgba(255,255,255,0.3)] hover:bg-[#ff7777] min-w-[70px] border-2 border-[#1a0f05] px-3 py-1.5',
      comic: 'bg-[#ffcc00] text-black border-[3px] border-black shadow-[6px_6px_0_0_#000] hover:shadow-[3px_3px_0_0_#000] hover:translate-y-[3px] hover:translate-x-[3px] active:translate-y-[6px] active:translate-x-[6px] active:shadow-none transition-all font-black min-w-[70px] px-3 py-1.5',
      // Nether Portal: Mystical radial gradient
      'comic-purple': 'bg-[radial-gradient(circle_at_center,_#e0aaff_0%,_#9d4edd_50%,_#5a189a_100%)] text-white border-[3px] border-black shadow-[6px_6px_0_0_#000] hover:shadow-[3px_3px_0_0_#000] hover:translate-y-[3px] hover:translate-x-[3px] active:translate-y-[6px] active:translate-x-[6px] active:shadow-none transition-all font-black min-w-[70px] px-3 py-1.5',
      // Industrial Hazard: Repeating diagonal stripes
      'comic-orange': 'bg-[repeating-linear-gradient(45deg,#fb8500,#fb8500_10px,#ffb703_10px,#ffb703_20px)] text-black border-[3px] border-black shadow-[6px_6px_0_0_#000] hover:shadow-[3px_3px_0_0_#000] hover:translate-y-[3px] hover:translate-x-[3px] active:translate-y-[6px] active:translate-x-[6px] active:shadow-none transition-all font-black min-w-[70px] px-3 py-1.5',
      // Magma/Velvet: Deep radial gradient
      'comic-red': 'bg-[radial-gradient(circle_at_top,_#ff4d6d_0%,_#d90429_100%)] text-white border-[3px] border-black shadow-[6px_6px_0_0_#000] hover:shadow-[3px_3px_0_0_#000] hover:translate-y-[3px] hover:translate-x-[3px] active:translate-y-[6px] active:translate-x-[6px] active:shadow-none transition-all font-black min-w-[70px] px-3 py-1.5',
      // Image variant: Minimal container for custom images
      image: 'bg-transparent border-none shadow-none p-0 min-w-0 font-[family-name:var(--font-pixel)] flex items-center justify-center',
    }

    const { playSound } = useSoundEffects()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!silent) playSound('click-default')
      props.onClick?.(e)
    }

    const isImage = variant === 'image'

    return (
      <Component
        ref={ref}
        onClick={handleClick}
        className={cn(
          'relative font-bold',
          !isImage && 'px-3 py-1.5 font-[family-name:var(--font-pixel)] text-[6px] md:text-[8px] uppercase',
          'transition-all duration-100 active:translate-y-[2px]',
          variant !== 'comic' && variant !== 'comic-purple' && variant !== 'comic-orange' && variant !== 'comic-red' && !isImage && 'active:shadow-none',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variantStyles[variant],
          className
        )}
        style={{
          imageRendering: 'pixelated',
        }}
        {...props}
      >
        {!isImage && (
          <>
            {/* Corner pixels for rounded effect */}
            <div className="absolute top-[-2px] left-[-2px] w-[2px] h-[2px] bg-transparent shadow-[2px_2px_0_0_#1a0f05]" />
            <div className="absolute top-[-2px] right-[-2px] w-[2px] h-[2px] bg-transparent shadow-[-2px_2px_0_0_#1a0f05]" />
            <div className="absolute bottom-[-2px] left-[-2px] w-[2px] h-[2px] bg-transparent shadow-[2px_-2px_0_0_#1a0f05]" />
            <div className="absolute bottom-[-2px] right-[-2px] w-[2px] h-[2px] bg-transparent shadow-[-2px_-2px_0_0_#1a0f05]" />
          </>
        )}

        {/* Para variante image, renderizar children directamente para que flex-row funcione */}
        {isImage ? (
          children
        ) : (
          <span className="relative z-10 inline-block">{children}</span>
        )}
      </Component>
    )
  }
)

PixelButton.displayName = 'PixelButton'
