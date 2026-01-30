"use client"

import { useCallback, useRef, useEffect } from "react"

export function useSoundEffects() {
  const buttonSoundRef = useRef<HTMLAudioElement | null>(null)
  const orbSoundRef = useRef<HTMLAudioElement | null>(null)
  const endermanSoundRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      buttonSoundRef.current = new Audio("/assets/sounds/button/button.mp3")
      orbSoundRef.current = new Audio("/assets/sounds/success/orb.mp3")
      endermanSoundRef.current = new Audio("/assets/sounds/links/enderman.mp3")

      // Precargar
      buttonSoundRef.current.load()
      orbSoundRef.current.load()
      endermanSoundRef.current.load()
    }

    return () => {
      buttonSoundRef.current = null
      orbSoundRef.current = null
      endermanSoundRef.current = null
    }
  }, [])

  const playSound = useCallback((type: "click" | "hover" | "transition" | "copy" | "download" | "redirect" | string) => {
    try {
      let sound: HTMLAudioElement | null = null

      if (type === "download") {
        sound = orbSoundRef.current
        if (sound) sound.volume = 0.5
      } else if (type === "redirect") {
        sound = endermanSoundRef.current
        if (sound) sound.volume = 0.6
      } else {
        sound = buttonSoundRef.current
        if (sound) sound.volume = type === "hover" ? 0.1 : 0.15
      }

      if (sound) {
        sound.currentTime = 0
        sound.play().catch(e => console.log("[Sound] Playback blocked or failed:", e))
      }
    } catch (error) {
      console.log("[Sound] Error playing sound:", error)
    }
  }, [])

  return { playSound }
}
