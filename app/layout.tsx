import React from "react"
import type { Metadata } from 'next'
import { Press_Start_2P, VT323 } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { CustomCursor } from '@/components/custom-cursor'
import { Footer } from '@/components/footer'
import { Toaster } from '@/components/ui/toaster'
import { SoundController } from '@/components/sound-controller'

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pixel'
});

const vt323 = VT323({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-vt323'
});

export const metadata: Metadata = {
  title: 'Netherious • Servidor Minecraft',
  description: 'Servidor Minecraft con modpack único. Explora el Nether como nunca antes.',
  generator: 'NOTORIOUS',
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${pressStart2P.variable} ${vt323.variable} antialiased`}>
        <SoundController />
        <CustomCursor />
        {children}
        <Footer />
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
