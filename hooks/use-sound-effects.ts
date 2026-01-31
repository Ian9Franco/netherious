'use client'

import { useEffect, useCallback } from 'react'

export type SoundType =
  | 'click-default'
  | 'click-forge'
  | 'click-modpack'
  | 'success'
  | 'success-villager'
  | 'failure'
  | 'nav-forward'
  | 'nav-backward'
  | 'focus-lost'
  | 'focus-gained'
  | 'ambient-cave'
  | 'success-orb'

const SOUND_PATHS = {
  // Buttons
  'click-default': [
    '/assets/sounds/button/minecraft-fox-squeak-1.mp3',
    '/assets/sounds/button/minecraft-idle3.mp3'
  ],
  'click-forge': '/assets/sounds/no/creeper-36141.mp3',
  'click-modpack': '/assets/sounds/no/minecrafthit.mp3',

  // Success/Failure
  'success': [
    '/assets/sounds/success/orb.mp3',
    '/assets/sounds/success/minecraft-villager-289282.mp3'
  ],
  'success-villager': '/assets/sounds/success/minecraft-villager-289282.mp3',
  'failure': '/assets/sounds/no/minecrafthit.mp3',

  // Navigation
  'nav-forward': '/assets/sounds/swap/bow_shoot.mp3',
  'nav-backward': '/assets/sounds/swap/enderman-noise-4.mp3',

  // Window Focus
  'focus-lost': '/assets/sounds/links/enderman.mp3',
  'focus-gained': '/assets/sounds/links/enderman2.mp3',

  // Ambient
  'ambient-cave': '/assets/sounds/cave/cave11_0QWMESM.mp3',
  'success-orb': '/assets/sounds/success/orb.mp3',
}

export function useSoundEffects() {
  const playSound = useCallback((type: SoundType) => {
    try {
      const pathOrArray = SOUND_PATHS[type]
      let path: string

      if (Array.isArray(pathOrArray)) {
        const randomIndex = Math.floor(Math.random() * pathOrArray.length)
        path = pathOrArray[randomIndex]
      } else {
        path = pathOrArray
      }

      const audio = new Audio(path)

      // Fine-tune volume based on sound type
      if (type === 'nav-forward' || type === 'nav-backward') {
        audio.volume = 0.12 // Increased back to a comfortable level
      } else if (type === 'focus-lost' || type === 'focus-gained') {
        audio.volume = 0.05 // Significantly lowered (Enderman focus sounds)
      } else if (type === 'ambient-cave') {
        audio.volume = 0.15 // Keep cave ambient subtle
      } else {
        audio.volume = 0.30 // Standard for buttons, etc
      }

      audio.play().catch(err => console.warn('Audio playback failed:', err))
    } catch (error) {
      console.error('Error playing sound:', error)
    }
  }, [])

  // Ambient Cave Sounds Loop
  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const scheduleNextSound = () => {
      // Random delay between 10s (10000ms) and 20s (20000ms)
      const delay = Math.floor(Math.random() * 10000) + 10000

      timeoutId = setTimeout(() => {
        // Only play if document is visible and with a very low probability (5%)
        if (!document.hidden && Math.random() < 0.05) {
          playSound('ambient-cave')
        }
        scheduleNextSound()
      }, delay)
    }

    scheduleNextSound()

    return () => clearTimeout(timeoutId)
  }, [playSound])

  // Global Event Listeners for Window Focus
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        playSound('focus-lost')
      } else {
        playSound('focus-gained')
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [playSound])

  return { playSound }
}
