'use client'

import { useEffect } from 'react'
import { useSoundEffects } from '@/hooks/use-sound-effects'

/**
 * Escucha eventos globales (focus de ventana) y maneja el loop de sonidos aleatorios.
 * DEBE USARSE SOLO UNA VEZ en toda la aplicación.
 */
export function SoundController() {
    const { playSound } = useSoundEffects()

    // Random Sound Loop - Cada 10 segundos, un sonido random
    useEffect(() => {
        const interval = setInterval(() => {
            if (!document.hidden) {
                playSound('random-loop')
            }
        }, 10000)

        return () => clearInterval(interval)
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

    return null
}
