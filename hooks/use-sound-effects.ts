'use client'

import { useCallback } from 'react'

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
  | 'modpack-hover'

const SOUND_PATHS: Record<string, string | string[]> = {
  // Buttons
  'click-default': [
    '/assets/sounds/button/minecraft-fox-squeak-1.mp3',
    '/assets/sounds/button/minecraft-idle3.mp3'
  ],
  'click-forge': '/assets/sounds/no/creeper-36141.mp3',
  'click-modpack': '/assets/sounds/no/minecrafthit.mp3',

  // Hover
  'modpack-hover': '/assets/sounds/success/minecraft-villager-289282.mp3',

  // Success/Failure
  'success': [
    '/assets/sounds/success/orb.mp3',
    '/assets/sounds/success/minecraft-villager-289282.mp3'
  ],
  'success-villager': '/assets/sounds/random/minecraft-villager-what-the-hell-ai-cover.mp3',
  'failure': '/assets/sounds/no/minecrafthit.mp3',

  // Navigation
  'nav-forward': '/assets/sounds/swap/bow_shoot.mp3',
  'nav-backward': '/assets/sounds/swap/enderman-noise-4.mp3',

  // Window Focus
  'focus-lost': '/assets/sounds/links/enderman.mp3',
  'focus-gained': '/assets/sounds/links/enderman2.mp3',

  // Ambient/Random
  'ambient-cave': '/assets/sounds/cave/cave11_0QWMESM.mp3',
  'success-orb': '/assets/sounds/success/orb.mp3',
}

export function useSoundEffects() {
  const playSound = useCallback((type: SoundType) => {
    try {
      let path: string | undefined

      const pathOrArray = SOUND_PATHS[type]
      if (Array.isArray(pathOrArray)) {
        const randomIndex = Math.floor(Math.random() * pathOrArray.length)
        path = pathOrArray[randomIndex]
      } else {
        path = pathOrArray
      }

      if (!path) return

      const audio = new Audio(path)

      // Fine-tune volume based on sound type
      if (type === 'nav-forward' || type === 'nav-backward') {
        audio.volume = 0.12
      } else if (type === 'focus-lost' || type === 'focus-gained') {
        audio.volume = 0.05
      } else if (type === 'ambient-cave') {
        audio.volume = 0.15
      } else {
        audio.volume = 0.30
      }

      audio.play().catch(err => console.warn('Audio playback failed:', err))
    } catch (error) {
      console.error('Error playing sound:', error)
    }
  }, [])

  return { playSound }
}
