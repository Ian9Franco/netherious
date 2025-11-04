import type React from "react"
import type { Metadata } from "next"
import { Press_Start_2P, VT323 } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
  display: "swap",
})

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Netherious2 - Minecraft Server Launcher",
  description:
    "Private Minecraft server launcher for Netherious2. Download NeoForge 1.21.1, modpacks, texture packs, and shader recommendations.",
  keywords: ["minecraft", "server", "neoforge", "modpack", "netherious2", "launcher"],
  authors: [{ name: "Netherious2 Team" }],
  openGraph: {
    title: "Netherious2 - Minecraft Server Launcher",
    description: "Join the Netherious2 Minecraft server with custom mods and shaders.",
    type: "website",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${pressStart2P.variable} ${vt323.variable} dark`} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
