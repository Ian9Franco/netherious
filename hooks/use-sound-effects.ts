"use client"

import { useCallback, useEffect, useRef } from "react"

export type SoundType = "hover" | "click" | "copy" | "transition"

interface UseSoundEffectsReturn {
  playSound: (type: SoundType) => void
  isMuted: boolean
  toggleMute: () => void
}

export function useSoundEffects(): UseSoundEffectsReturn {
  const soundsRef = useRef<Record<SoundType, HTMLAudioElement | null>>({
    hover: null,
    click: null,
    copy: null,
    transition: null,
  })
  const isMutedRef = useRef(false)

  useEffect(() => {
    // Load mute preference from localStorage
    const savedMute = localStorage.getItem("soundMuted")
    isMutedRef.current = savedMute === "true"

    // Preload all sound effects
    soundsRef.current = {
      hover: new Audio("/sounds/ui_hover.wav"),
      click: new Audio("/sounds/ui_click.wav"),
      copy: new Audio("/sounds/ui_copy.wav"),
      transition: new Audio("/sounds/ui_transition.wav"),
    }

    // Set volume for each sound
    Object.values(soundsRef.current).forEach((audio) => {
      if (audio) {
        audio.volume = 0.3
        audio.preload = "auto"
      }
    })

    return () => {
      // Cleanup
      Object.values(soundsRef.current).forEach((audio) => {
        if (audio) {
          audio.pause()
          audio.src = ""
        }
      })
    }
  }, [])

  const playSound = useCallback((type: SoundType) => {
    if (isMutedRef.current) return

    const audio = soundsRef.current[type]
    if (audio) {
      audio.currentTime = 0
      audio.play().catch(() => {
        // Ignore errors (e.g., user hasn't interacted with page yet)
      })
    }
  }, [])

  const toggleMute = useCallback(() => {
    isMutedRef.current = !isMutedRef.current
    localStorage.setItem("soundMuted", String(isMutedRef.current))
    window.dispatchEvent(new CustomEvent("soundMuteToggle", { detail: isMutedRef.current }))
  }, [])

  return {
    playSound,
    isMuted: isMutedRef.current,
    toggleMute,
  }
}
