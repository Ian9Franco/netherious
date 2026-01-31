'use client'

import { cn } from '@/lib/utils'

interface NavigationProps {
  currentPage: 'inicio' | 'descarga' | 'lore' | 'server'
  onPageChange: (page: 'inicio' | 'descarga' | 'lore' | 'server') => void
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const pages = [
    { id: 'inicio' as const, label: 'Inicio' },
    { id: 'descarga' as const, label: 'Descarga' },
    { id: 'lore' as const, label: 'Lore' },
    { id: 'server' as const, label: 'Server' },
  ]

  return (
    <>
      {/* Mobile Navigation - Horizontal */}
      <nav className="md:hidden flex flex-row justify-center gap-1 px-2 flex-wrap">
        {pages.map((page) => (
          <button
            key={page.id}
            onClick={() => onPageChange(page.id)}
            className={cn(
              'relative h-9 w-20 flex items-center justify-center',
              'transition-all duration-200 ease-out cursor-pointer',
              'font-[family-name:var(--font-pixel)] text-[9px] uppercase',
              currentPage === page.id
                ? 'text-[#f5e6d3] scale-105'
                : 'text-[#d4c4a8] hover:text-[#f5e6d3] opacity-80 hover:opacity-100'
            )}
            style={{
              backgroundImage: 'url(/assets/ribbon-tab.png)',
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              imageRendering: 'pixelated',
            }}
          >
            {page.label}
          </button>
        ))}
      </nav>

      {/* Desktop Navigation - Vertical */}
      <nav className="hidden md:flex flex-col gap-1 items-end pr-8">
        {pages.map((page) => (
          <button
            key={page.id}
            onClick={() => onPageChange(page.id)}
            className={cn(
              'relative h-12 w-40 flex items-center justify-center pl-4',
              'transition-all duration-300 ease-out cursor-pointer',
              'font-[family-name:var(--font-pixel)] text-[12px] uppercase',
              currentPage === page.id
                ? 'text-[#f5e6d3] -translate-x-6'
                : 'text-[#d4c4a8] hover:-translate-x-6 hover:text-[#f5e6d3] translate-x-0'
            )}
            style={{
              backgroundImage: 'url(/assets/ribbon-tab.png)',
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              imageRendering: 'pixelated',
            }}
          >
            {page.label}
          </button>
        ))}
      </nav>
    </>
  )
}
