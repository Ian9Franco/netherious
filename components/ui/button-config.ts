'use client'

import { SoundType } from '@/hooks/use-sound-effects'

// Identificadores únicos para cada botón de la aplicación
export type ButtonKey =
    // Inicio
    | 'inicio-descargar'
    // Descarga
    | 'descarga-modpack'
    | 'descarga-forge'
    | 'descarga-java'
    // Server
    | 'server-copiar-ip'
    | 'server-discord'
    | 'server-wiki'

// Tipos de variantes visuales disponibles
export type ButtonVariant =
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'comic'
    | 'comic-purple'
    | 'comic-orange'
    | 'comic-red'
    | 'image'

// Tipos de acciones que puede realizar un botón
export type ButtonAction =
    | { type: 'navigate'; page: string }
    | { type: 'link'; url: string }
    | { type: 'copy'; text: string }
    | { type: 'custom' }

// Configuración completa de un botón
export interface ButtonConfig {
    /** Variante visual del botón */
    variant: ButtonVariant
    /** Texto del botón */
    label: string
    /** Ruta al icono (opcional) */
    icon?: string
    /** Tamaño del icono en píxeles */
    iconSize?: number
    /** Posición del icono */
    iconPosition?: 'left' | 'right' | 'top' | 'bottom'
    /** Sonido a reproducir al hacer click */
    sound: SoundType
    /** Sonido a reproducir al hacer hover */
    hoverSound?: SoundType
    /** Acción por defecto del botón */
    action: ButtonAction
    /** Clases CSS adicionales */
    className?: string
    /** Texto de estado de éxito (para acciones de copiar) */
    successLabel?: string
    /** Imagen de fondo del botón (si variant es 'image') */
    bgImage?: string
    /** Altura de la imagen de fondo */
    imgHeight?: number
    /** Ancho de la imagen de fondo */
    imgWidth?: number
    /** Mostrar efecto de ruido (NoiseBackground) */
    showNoise?: boolean
}

// Registro de todos los botones de la aplicación
export const BUTTON_REGISTRY: Record<ButtonKey, ButtonConfig> = {
    // ====== INICIO ======
    'inicio-descargar': {
        variant: 'image',
        bgImage: '/assets/botones/instrucciones.png',
        imgHeight: 120, // Aumentado un poco
        label: 'COMENZAR',
        icon: '/assets/mini/general/cofre.png',
        iconSize: 64,
        iconPosition: 'left',
        sound: 'click-default',
        action: { type: 'navigate', page: 'descarga' },
        className: 'hover:scale-105 transition-transform duration-300 gap-6',
    },

    // ====== DESCARGA ======
    'descarga-modpack': {
        variant: 'image',
        bgImage: '/assets/botones/netherious_core.png',
        imgHeight: 80, // Aumentado un poco
        showNoise: false,
        label: 'DESCARGAR PACK',
        icon: '/assets/mini/descarga/descargamodpack.png',
        iconSize: 150,
        iconPosition: 'left',
        sound: 'click-modpack',
        hoverSound: 'modpack-hover', // Nuevo sonido en hover
        action: { type: 'link', url: '' },
        className: 'hover:scale-105 transition-transform duration-300 gap-6',
    },
    'descarga-forge': {
        variant: 'image',
        bgImage: '/assets/botones/forge.png',
        imgHeight: 110, // Aumentado un poco
        label: 'DESCARGAR FORGE',
        icon: '/assets/mini/general/imp.png',
        iconSize: 48,
        iconPosition: 'left',
        sound: 'click-forge',
        action: { type: 'link', url: '' },
        className: 'hover:scale-105 transition-transform duration-300 gap-4 flex-row',
    },
    'descarga-java': {
        variant: 'image',
        bgImage: '/assets/botones/java.png',
        imgHeight: 110, // Aumentado un poco
        label: 'JAVA',
        icon: '/assets/mini/general/java.png',
        iconSize: 48,
        iconPosition: 'left',
        sound: 'success',
        action: { type: 'link', url: '' },
        className: 'hover:scale-105 transition-transform duration-300 gap-4 flex-row',
    },

    // ====== SERVER ======
    'server-copiar-ip': {
        variant: 'primary',
        label: 'COPIAR',
        sound: 'success-orb',
        action: { type: 'copy', text: '' }, // Texto dinámico
        className: 'text-[9px] font-bold py-2 px-3 uppercase tracking-wide whitespace-nowrap',
        successLabel: '✓',
    },
    'server-discord': {
        variant: 'image',
        bgImage: '/assets/botones/discord_big.png',
        imgHeight: 72, // +50% (base nominal era 48)
        label: 'DISCORD',
        // icon: '/assets/botones/discord_small.png', // Quitamos el small del botón aquí
        sound: 'click-default',
        action: { type: 'link', url: 'https://discord.gg/netherious' },
        className: 'hover:scale-105 transition-transform duration-300',
    },
    'server-wiki': {
        variant: 'image',
        bgImage: '/assets/botones/wiki.png',
        imgHeight: 72, // +50%
        label: 'WIKI',
        sound: 'click-default',
        action: { type: 'link', url: '/modlist/modlist.html' },
        className: 'hover:scale-105 transition-transform duration-300',
    },
}

// Helper para obtener la configuración de un botón
export function getButtonConfig(key: ButtonKey): ButtonConfig {
    return BUTTON_REGISTRY[key]
}
