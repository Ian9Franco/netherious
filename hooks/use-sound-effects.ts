"use client"

import { useCallback, useRef, useEffect } from "react"

export function useSoundEffects() {
  const audioContextRef = useRef<AudioContext | null>(null)
  const buttonSoundRef = useRef<HTMLAudioElement | null>(null)
  const orbSoundRef = useRef<HTMLAudioElement | null>(null)
  const endermanSoundRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Inicializar AudioContext solo en el cliente
    if (typeof window !== "undefined") {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      buttonSoundRef.current = new Audio("/sounds/button.mp3")
      orbSoundRef.current = new Audio("/sounds/orb.mp3")
      endermanSoundRef.current = new Audio("/sounds/enderman.mp3")

      // Precargar los sonidos
      buttonSoundRef.current.load()
      orbSoundRef.current.load()
      endermanSoundRef.current.load()
    }

    return () => {
      // Cleanup
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
      if (buttonSoundRef.current) {
        buttonSoundRef.current.pause()
        buttonSoundRef.current = null
      }
      if (orbSoundRef.current) {
        orbSoundRef.current.pause()
        orbSoundRef.current = null
      }
      if (endermanSoundRef.current) {
        endermanSoundRef.current.pause()
        endermanSoundRef.current = null
      }
    }
  }, [])

  const playSound = useCallback((type: "click" | "hover" | "transition" | "copy" | "download" | "redirect") => {
    if (!audioContextRef.current) return

    try {
      if (type === "download") {
        if (orbSoundRef.current) {
          orbSoundRef.current.currentTime = 0
          orbSoundRef.current.volume = 0.5
          orbSoundRef.current.play()
        }
      } else if (type === "redirect") {
        if (endermanSoundRef.current) {
          endermanSoundRef.current.currentTime = 0
          endermanSoundRef.current.volume = 0.6
          endermanSoundRef.current.play()
        }
      } else {
        if (buttonSoundRef.current) {
          buttonSoundRef.current.currentTime = 0
          buttonSoundRef.current.volume = type === "hover" ? 0.3 : 0.5
          buttonSoundRef.current.play()
        }
      }
    } catch (error) {
      console.log("[Sound] Error playing sound:", error)
    }
  }, [])

  return { playSound }
}
