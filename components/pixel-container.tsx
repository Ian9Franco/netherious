import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface PixelContainerProps {
  children: ReactNode
  className?: string
}

export function PixelContainer({ children, className }: PixelContainerProps) {
  return (
    <div
      className={cn(
        'p-2 md:p-3 relative',
        'bg-[#e8dcc8] border-2 border-[#8B4513]',
        'shadow-[inset_0_0_10px_rgba(139,69,19,0.2)]',
        className
      )}
      style={{
        imageRendering: 'pixelated',
      }}
    >
      {children}
    </div>
  )
}
