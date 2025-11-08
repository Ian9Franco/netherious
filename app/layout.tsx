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
  title: "Netherious - Minecraft Server Modpack",
  description:
    "Private Minecraft server modpack for Netherious. Download Forge 1.20.1, modpacks, texture packs, and shader recommendations.",
  keywords: ["minecraft", "server", "neoforge", "modpack", "netherious2", "launcher"],
  authors: [{ name: "Netherious Team" }],
  openGraph: {
    title: "Netherious - Minecraft Server Modpack",
    description: "Join the Netherious Minecraft server with custom mods and shaders.",
    type: "website",
  },
icons: {
    icon: [
      {
        url: "/favicon.ico",
      },
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
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
