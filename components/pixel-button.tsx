'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { useSoundEffects } from '@/hooks/use-sound-effects'

interface PixelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'comic' | 'comic-purple' | 'comic-orange' | 'comic-red'
}

export const PixelButton = forwardRef<HTMLButtonElement, PixelButtonProps>(
  ({ className, variant = 'primary', children, ...props }, ref) => {
    const variantStyles = {
      primary: 'bg-[#8B4513] text-[#f5e6d3] shadow-[inset_-2px_-2px_0_0_rgba(0,0,0,0.3),inset_2px_2px_0_0_rgba(255,255,255,0.2)] hover:bg-[#a05a2c]',
      secondary: 'bg-[#e8dcc8] text-[#3a2010] shadow-[inset_-2px_-2px_0_0_rgba(0,0,0,0.2),inset_2px_2px_0_0_rgba(255,255,255,0.6)] hover:bg-[#f0e6d6]',
      accent: 'bg-[#ff5555] text-[#fff] shadow-[inset_-2px_-2px_0_0_rgba(0,0,0,0.3),inset_2px_2px_0_0_rgba(255,255,255,0.3)] hover:bg-[#ff7777]',
      comic: 'bg-[#ffcc00] text-black border-[3px] border-black shadow-[6px_6px_0_0_#000] hover:shadow-[3px_3px_0_0_#000] hover:translate-y-[3px] hover:translate-x-[3px] active:translate-y-[6px] active:translate-x-[6px] active:shadow-none transition-all font-black',
      // Nether Portal: Mystical radial gradient
      'comic-purple': 'bg-[radial-gradient(circle_at_center,_#e0aaff_0%,_#9d4edd_50%,_#5a189a_100%)] text-white border-[3px] border-black shadow-[6px_6px_0_0_#000] hover:shadow-[3px_3px_0_0_#000] hover:translate-y-[3px] hover:translate-x-[3px] active:translate-y-[6px] active:translate-x-[6px] active:shadow-none transition-all font-black',
      // Industrial Hazard: Repeating diagonal stripes
      'comic-orange': 'bg-[repeating-linear-gradient(45deg,#fb8500,#fb8500_10px,#ffb703_10px,#ffb703_20px)] text-black border-[3px] border-black shadow-[6px_6px_0_0_#000] hover:shadow-[3px_3px_0_0_#000] hover:translate-y-[3px] hover:translate-x-[3px] active:translate-y-[6px] active:translate-x-[6px] active:shadow-none transition-all font-black',
      // Magma/Velvet: Deep radial gradient
      'comic-red': 'bg-[radial-gradient(circle_at_top,_#ff4d6d_0%,_#d90429_100%)] text-white border-[3px] border-black shadow-[6px_6px_0_0_#000] hover:shadow-[3px_3px_0_0_#000] hover:translate-y-[3px] hover:translate-x-[3px] active:translate-y-[6px] active:translate-x-[6px] active:shadow-none transition-all font-black',
    }

    const { playSound } = useSoundEffects()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // Choose sound based on variant if needed, but 'click-default' works for general
      playSound('click-default')
      props.onClick?.(e)
    }

    return (
      <button
        ref={ref}
        onClick={handleClick}
        className={cn(
          'relative px-3 py-1.5 font-[family-name:var(--font-pixel)] text-[6px] md:text-[8px] uppercase font-bold',
          'transition-all duration-100 active:translate-y-[2px] active:shadow-none',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'min-w-[70px] border-2 border-[#1a0f05]', // Dark border for outline
          variantStyles[variant],
          className
        )}
        style={{
          imageRendering: 'pixelated',
        }}
        {...props}
      >
        {/* Corner pixels for rounded effect */}
        <div className="absolute top-[-2px] left-[-2px] w-[2px] h-[2px] bg-transparent shadow-[2px_2px_0_0_#1a0f05]" />
        <div className="absolute top-[-2px] right-[-2px] w-[2px] h-[2px] bg-transparent shadow-[-2px_2px_0_0_#1a0f05]" />
        <div className="absolute bottom-[-2px] left-[-2px] w-[2px] h-[2px] bg-transparent shadow-[2px_-2px_0_0_#1a0f05]" />
        <div className="absolute bottom-[-2px] right-[-2px] w-[2px] h-[2px] bg-transparent shadow-[-2px_-2px_0_0_#1a0f05]" />

        <span className="relative z-10">{children}</span>
      </button>
    )
  }
)

PixelButton.displayName = 'PixelButton'
