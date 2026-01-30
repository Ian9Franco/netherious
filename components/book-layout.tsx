'use client'

import { ReactNode } from 'react'

interface BookLayoutProps {
  leftPage: ReactNode
  rightPage: ReactNode
  navigation: ReactNode
}

export function BookLayout({ leftPage, rightPage, navigation }: BookLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 overflow-hidden font-[family-name:var(--font-pixel)]" style={{
      background: 'linear-gradient(135deg, #3d5c3d 0%, #4a6b4a 50%, #3d5c3d 100%)'
    }}>
      <div className="relative w-full max-w-[90rem]">
        {/* Navigation - positioned higher and closer */}
        <div className="absolute left-0 top-[40%] -translate-y-1/2 -translate-x-[68%] z-20">
          {navigation}
        </div>

        {/* Book background */}
        <div
          className="relative w-full aspect-[16/10] bg-cover bg-center shadow-2xl"
          style={{
            backgroundImage: 'url(/assets/libro.png)',
            imageRendering: 'pixelated',
          }}
        >
          {/* Two-page layout with larger gap to avoid spine */}
          <div className="absolute inset-[8%] grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {/* Left page */}
            <div className="relative overflow-hidden">
              <div className="h-full overflow-hidden">
                {leftPage}
              </div>
            </div>

            {/* Right page */}
            <div className="relative overflow-hidden">
              <div className="h-full overflow-hidden">
                {rightPage}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
