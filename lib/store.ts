import { create } from "zustand"

type Section = "home" | "install" | "server" | "lore"

interface AppState {
  currentSection: Section
  setCurrentSection: (section: Section) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  currentSection: "home",
  setCurrentSection: (section) => set({ currentSection: section }),
  isLoading: true,
  setIsLoading: (loading) => set({ isLoading: loading }),
}))
