'use client';
import React, { createContext, useContext, useCallback, useEffect, useRef } from 'react';

type SoundContextType = {
    playSound: (soundPath: string) => void;
    playButton: () => void;
    playSuccess: () => void;
    playError: () => void;
    playSwap: () => void;
};

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider = ({ children }: { children: React.ReactNode }) => {
    const caveIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const lastCavePlayRef = useRef<number>(0);

    // Play specific sound with full path
    const playSound = useCallback((soundPath: string) => {
        if (typeof window === 'undefined') return;

        const audio = new Audio(soundPath);
        audio.volume = 0.4;
        audio.play().catch(() => {
            console.log('Audio playback skipped (user interaction required)');
        });
    }, []);

    // Play random button sound
    const playButton = useCallback(() => {
        const buttons = [
            '/sounds/button/button.mp3',
            '/sounds/button/minecraft-fox-squeak-1.mp3',
            '/sounds/button/minecraft-idle3.mp3'
        ];
        const randomButton = buttons[Math.floor(Math.random() * buttons.length)];
        playSound(randomButton);
    }, [playSound]);

    // Play random success sound
    const playSuccess = useCallback(() => {
        const successSounds = [
            '/sounds/success/minecraft-villager-289282.mp3',
            '/sounds/success/orb.mp3'
        ];
        const randomSuccess = successSounds[Math.floor(Math.random() * successSounds.length)];
        playSound(randomSuccess);
    }, [playSound]);

    // Play random error sound
    const playError = useCallback(() => {
        const errorSounds = [
            '/sounds/no/creeper-36141.mp3',
            '/sounds/no/minecrafthit.mp3'
        ];
        const randomError = errorSounds[Math.floor(Math.random() * errorSounds.length)];
        playSound(randomError);
    }, [playSound]);

    // Play random swap sound
    const playSwap = useCallback(() => {
        const swapSounds = [
            '/sounds/swap/bow_shoot.mp3',
            '/sounds/swap/enderman-noise-4.mp3'
        ];
        const randomSwap = swapSounds[Math.floor(Math.random() * swapSounds.length)];
        playSound(randomSwap);
    }, [playSound]);

    // Ambient cave sounds (random every 15-30s with low probability)
    useEffect(() => {
        const playCaveSound = () => {
            const now = Date.now();
            const timeSinceLastPlay = now - lastCavePlayRef.current;

            // Only play if at least 15 seconds have passed
            if (timeSinceLastPlay < 15000) return;

            // 15% probability to play
            if (Math.random() < 0.15) {
                playSound('/sounds/cave/cave11_0QWMESM.mp3');
                lastCavePlayRef.current = now;
            }
        };

        // Check every 5 seconds
        const interval = setInterval(playCaveSound, 5000);
        caveIntervalRef.current = interval;

        return () => {
            if (caveIntervalRef.current) {
                clearInterval(caveIntervalRef.current);
            }
        };
    }, [playSound]);

    // Page visibility detection (leaving/returning)
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                // User is leaving the page
                playSound('/sounds/links/enderman.mp3');
            } else {
                // User is returning to the page
                playSound('/sounds/links/enderman2.mp3');
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [playSound]);

    return (
        <SoundContext.Provider value={{
            playSound,
            playButton,
            playSuccess,
            playError,
            playSwap
        }}>
            {children}
        </SoundContext.Provider>
    );
};

export const useSound = () => {
    const context = useContext(SoundContext);
    if (!context) {
        throw new Error('useSound must be used within a SoundProvider');
    }
    return context;
};
