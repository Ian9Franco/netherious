"use client"

import { AnimatePresence } from "framer-motion"
import { useAppStore } from "@/lib/store"
import { LoadingScreen } from "@/components/loading-screen"
import { BackgroundScene } from "@/components/background-scene"
import { FloatingNav } from "@/components/floating-nav"
import { MobileNav } from "@/components/mobile-nav"
import { HomeSection } from "@/components/sections/home-section"
import { InstallSection } from "@/components/sections/install-section"
import { ServerSection } from "@/components/sections/server-section"
import { LoreSection } from "@/components/sections/lore-section"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  const { currentSection, isLoading } = useAppStore()

  return (
    <main className="relative min-h-screen overflow-hidden flex flex-col">
      <LoadingScreen />

      {!isLoading && (
        <>
          <BackgroundScene />
          <div className="hidden md:block">
            <FloatingNav />
          </div>
          <MobileNav />

          <div className="flex-1">
            <AnimatePresence mode="wait">
              {currentSection === "home" && <HomeSection key="home" />}
              {currentSection === "install" && <InstallSection key="install" />}
              {currentSection === "server" && <ServerSection key="server" />}
              {currentSection === "lore" && <LoreSection key="lore" />}
            </AnimatePresence>
          </div>

          <Footer />

          <Toaster />
        </>
      )}
    </main>
  )
}
