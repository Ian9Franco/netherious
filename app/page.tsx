'use client'

import { useState } from 'react'
import { BookLayout } from '@/components/book-layout'
import { Navigation } from '@/components/navigation'
import { InicioLeftPage, InicioRightPage } from '@/components/pages/inicio'
import { DescargaLeftPage, DescargaRightPage } from '@/components/pages/descarga'
import { LoreLeftPage, LoreRightPage } from '@/components/pages/lore'
import { ServerLeftPage, ServerRightPage } from '@/components/pages/server'

type PageType = 'inicio' | 'descarga' | 'lore' | 'server'

export default function Home() {
  const [currentPage, setCurrentPage] = useState<PageType>('inicio')

  const renderPages = () => {
    switch (currentPage) {
      case 'inicio':
        return { left: <InicioLeftPage />, right: <InicioRightPage /> }
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
      navigation={<Navigation currentPage={currentPage} onPageChange={setCurrentPage} />}
    />
  )
}
