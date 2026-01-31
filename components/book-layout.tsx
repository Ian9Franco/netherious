'use client'

import { ReactNode } from 'react'
import { DynamicBackground } from './dynamic-background'

interface BookLayoutProps {
  leftPage: ReactNode
  rightPage: ReactNode
  navigation: ReactNode
}

export function BookLayout({ leftPage, rightPage, navigation }: BookLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 pb-14 md:p-8 md:pb-12 overflow-hidden font-[family-name:var(--font-pixel)] relative">
      {/* Dynamic Background */}
      <DynamicBackground />

      {/* Mobile Navigation - Top positioned, only visible on mobile */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-gradient-to-b from-[#2a1810]/95 to-transparent pb-4 pt-2">
        {navigation}
      </div>

      <div className="relative w-full max-w-[90rem]">
        {/* Desktop Navigation - positioned higher and closer, hidden on mobile */}
        <div className="hidden md:block absolute left-0 top-[40%] -translate-y-1/2 -translate-x-[68%] z-20">
          {navigation}
        </div>

        {/* Desktop: Book background with aspect ratio */}
        <div
          className="hidden md:block relative w-full aspect-[16/10] bg-cover bg-center shadow-2xl"
          style={{
            backgroundImage: 'url(/assets/libro.png)',
            imageRendering: 'pixelated',
          }}
        >
          {/* Two-page layout with optimized spacing */}
          <div className="absolute inset-[9%] grid grid-cols-2 gap-20">
            {/* Left page */}
            <div className="relative overflow-hidden">
              <div className="h-full overflow-hidden px-2">
                {leftPage}
              </div>
            </div>

            {/* Right page */}
            <div className="relative overflow-hidden">
              <div className="h-full overflow-hidden px-2">
                {rightPage}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Scrollable single column layout with parchment background */}
        <div className="md:hidden mt-16 pb-14">
          <div
            className="relative bg-[#e8dcc8] border-4 border-[#8B4513] shadow-[8px_8px_0_rgba(0,0,0,0.3)]"
            style={{
              backgroundImage: 'linear-gradient(to bottom, #f5ebe0, #e8dcc8, #ddd0b8)',
            }}
          >
            {/* Decorative corners */}
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-[#8B4513] rotate-45"></div>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#8B4513] rotate-45"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-[#8B4513] rotate-45"></div>
            <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-[#8B4513] rotate-45"></div>

            {/* Content container with padding */}
            <div className="p-4 space-y-6 max-h-[calc(100vh-12rem)] overflow-y-auto custom-scrollbar">
              {/* Left page content */}
              <div className="relative">
                {leftPage}
              </div>

              {/* Divider */}
              <div className="codex-divider"></div>

              {/* Right page content */}
              <div className="relative">
                {rightPage}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
