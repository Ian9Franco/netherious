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
import { ScrollIndicator } from "@/components/scroll-indicator"
import { SectionContainer } from "@/components/section-container"
import {GallerySection} from "@/components/sections/gallery-section"

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

          <ScrollIndicator />

          <div className="flex-1">
            <AnimatePresence mode="wait">
            {currentSection === "home" && (
              <SectionContainer id="home-section" key="home">
                <HomeSection />
              </SectionContainer>
            )}
            {currentSection === "install" && (
              <SectionContainer id="install-section" key="install">
                <InstallSection />
              </SectionContainer>
            )}
            {currentSection === "server" && (
              <SectionContainer id="server-section" key="server">
                <ServerSection />
              </SectionContainer>
            )}
            {currentSection === "lore" && (
              <SectionContainer id="lore-section" key="lore">
                <LoreSection />
              </SectionContainer>
            )}
            {currentSection === "gallery" && (
              <SectionContainer id="gallery-section" key="gallery">
                <GallerySection />
              </SectionContainer>
            )}
          </AnimatePresence>

          </div>

          <Footer />

          <Toaster />
        </>
      )}
    </main>
  )
}
