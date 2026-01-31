'use client'

import { useState } from 'react'
import { BookLayout } from '@/components/book-layout'
import { Navigation } from '@/components/navigation'
import { InicioLeftPage, InicioRightPage } from '@/components/pages/inicio'
import { DescargaLeftPage, DescargaRightPage } from '@/components/pages/descarga'
import { LoreLeftPage, LoreRightPage } from '@/components/pages/lore'
import { ServerLeftPage, ServerRightPage } from '@/components/pages/server'

import { useSoundEffects } from '@/hooks/use-sound-effects'


type PageType = 'inicio' | 'descarga' | 'lore' | 'server'

export default function Home() {
  const [currentPage, setCurrentPage] = useState<PageType>('inicio')
  const { playSound } = useSoundEffects()

  const handlePageChange = (page: PageType) => {
    playSound('nav-forward')
    setCurrentPage(page)
  }

  const renderPages = () => {
    switch (currentPage) {
      case 'inicio':
        return {
          left: <InicioLeftPage onPageChange={(page) => setCurrentPage(page as PageType)} />,
          right: <InicioRightPage onPageChange={(page) => setCurrentPage(page as PageType)} />
        }
      case 'descarga':
        return { left: <DescargaLeftPage />, right: <DescargaRightPage /> }
      case 'lore':
        return { left: <LoreLeftPage />, right: <LoreRightPage /> }
      case 'server':
        return { left: <ServerLeftPage />, right: <ServerRightPage /> }
      default:
        return { left: <InicioLeftPage />, right: <InicioRightPage /> }
    }
  }

  const pages = renderPages()

  return (
    <BookLayout
      leftPage={pages.left}
      rightPage={pages.right}
      navigation={<Navigation currentPage={currentPage} onPageChange={handlePageChange} />}
    />
  )
}
