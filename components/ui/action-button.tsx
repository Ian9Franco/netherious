'use client'

import { forwardRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useSoundEffects } from '@/hooks/use-sound-effects'
import { PixelButton } from '@/components/pixel-button'
import {
    ButtonKey,
    ButtonConfig,
    ButtonAction,
    getButtonConfig
} from './button-config'

import { NoiseBackground } from './noise-background'

export interface ActionButtonProps {
    /** Identificador único del botón en el registro */
    buttonKey: ButtonKey
    /** Override del label por defecto */
    overrideLabel?: string
    /** Override de la URL (para acciones de tipo 'link') */
    overrideUrl?: string
    /** Override del texto a copiar (para acciones de tipo 'copy') */
    overrideCopyText?: string
    /** Callback para navegación interna */
    onNavigate?: (page: string) => void
    /** Callback cuando la acción se completa exitosamente */
    onSuccess?: () => void
    /** Callback para acciones personalizadas */
    onCustomAction?: () => void
    /** Clases CSS adicionales */
    className?: string
    /** Deshabilitar el botón */
    disabled?: boolean
    /** Children adicionales (se agregan después del contenido por defecto) */
    children?: React.ReactNode
}

export const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
    (
        {
            buttonKey,
            overrideLabel,
            overrideUrl,
            overrideCopyText,
            onNavigate,
            onSuccess,
            onCustomAction,
            className,
            disabled,
            children,
        },
        ref
    ) => {
        const config = getButtonConfig(buttonKey)
        const { playSound } = useSoundEffects()
        const [showSuccess, setShowSuccess] = useState(false)

        const handleClick = useCallback(async () => {
            // Reproducir sonido
            playSound(config.sound)

            // Ejecutar acción según el tipo
            switch (config.action.type) {
                case 'link': {
                    const url = overrideUrl || config.action.url
                    if (url) {
                        window.open(url, '_blank', 'noopener,noreferrer')
                    }
                    onSuccess?.()
                    break
                }
                case 'copy': {
                    const textToCopy = overrideCopyText || config.action.text
                    if (textToCopy) {
                        try {
                            await navigator.clipboard.writeText(textToCopy)
                            setShowSuccess(true)
                            onSuccess?.()
                            setTimeout(() => setShowSuccess(false), 2000)
                        } catch (err) {
                            console.error('Error al copiar:', err)
                        }
                    }
                    break
                }
                case 'navigate': {
                    onNavigate?.(config.action.page)
                    onSuccess?.()
                    break
                }
                case 'custom': {
                    onCustomAction?.()
                    onSuccess?.()
                    break
                }
            }
        }, [config, overrideUrl, overrideCopyText, onNavigate, onSuccess, onCustomAction, playSound])

        // Determinar el label a mostrar
        const displayLabel = showSuccess && config.successLabel
            ? config.successLabel
            : (overrideLabel || config.label)

        const isImageVariant = config.variant === 'image'

        // Renderizar contenido del botón
        const renderContent = () => {
            if (isImageVariant && config.bgImage) {
                const buttonImage = (
                    <Image
                        src={config.bgImage}
                        alt={displayLabel}
                        width={config.imgWidth || 320}
                        height={config.imgHeight || 80}
                        className={cn(
                            "w-auto drop-shadow-[4px_4px_0_rgba(0,0,0,0.4)] transition-all duration-300 group-hover/btn:brightness-110",
                            !config.imgHeight && "h-auto min-h-[32px] max-h-[48px]"
                        )}
                        style={{
                            imageRendering: 'pixelated',
                            height: config.imgHeight ? `${config.imgHeight}px` : undefined
                        }}
                    />
                )

                if (!config.icon) return (
                    <>
                        {buttonImage}
                        <span className="sr-only">{displayLabel}</span>
                    </>
                )

                return (
                    <>
                        {/* Icono "mini" posicionado ANTES (a la izquierda en flex-row) con animación flotante */}
                        {config.iconPosition !== 'right' && (
                            <div className="z-20 transition-transform duration-300 group-hover/btn:scale-110 shrink-0 animate-float">
                                <Image
                                    src={config.icon}
                                    alt=""
                                    width={config.iconSize || 32}
                                    height={config.iconSize || 32}
                                    style={{ imageRendering: 'pixelated' }}
                                    className="drop-shadow-[3px_3px_0_rgba(0,0,0,0.5)]"
                                />
                            </div>
                        )}

                        {/* El botón de imagen principal */}
                        {buttonImage}

                        {/* Icono "mini" posicionado DESPUÉS (a la derecha si iconPosition es 'right') con animación flotante */}
                        {config.iconPosition === 'right' && (
                            <div className="z-20 transition-transform duration-300 group-hover/btn:scale-110 shrink-0 animate-float">
                                <Image
                                    src={config.icon}
                                    alt=""
                                    width={config.iconSize || 32}
                                    height={config.iconSize || 32}
                                    style={{ imageRendering: 'pixelated' }}
                                    className="drop-shadow-[3px_3px_0_rgba(0,0,0,0.5)]"
                                />
                            </div>
                        )}

                        {/* Texto opcional si la imagen no lo tiene (o para SEO/A11y) */}
                        <span className="sr-only">{displayLabel}</span>
                    </>
                )
            }

            const iconElement = config.icon && (
                <Image
                    src={config.icon}
                    alt=""
                    width={config.iconSize || 24}
                    height={config.iconSize || 24}
                    style={{ imageRendering: 'pixelated' }}
                    className="drop-shadow-[3px_3px_0_rgba(0,0,0,0.3)]"
                />
            )

            const labelElement = <span className="px-2">{displayLabel}</span>

            return (
                <>
                    {iconElement}
                    {labelElement}
                    {children}
                </>
            )
        }

        const isLinkAction = config.action.type === 'link'

        const buttonElement = (
            <PixelButton
                ref={ref}
                as={isLinkAction ? 'div' : 'button'}
                silent={isLinkAction}
                variant={config.variant}
                className={cn(
                    config.className,
                    className,
                    isImageVariant && "overflow-visible",
                    // Forzar siempre flex-row o flex-row-reverse para variantes de imagen con icono
                    isImageVariant && config.icon && (
                        config.iconPosition === 'right' ? "flex-row-reverse" : "flex-row"
                    ),
                    !isImageVariant && (
                        config.iconPosition === 'top' || config.iconPosition === 'bottom'
                            ? "flex-col"
                            : "flex-row"
                    )
                )}
                disabled={disabled}
                onMouseEnter={() => {
                    if (config.hoverSound) {
                        playSound(config.hoverSound)
                    }
                }}
                onClick={(e: any) => {
                    // Si es un link, NO ejecutamos handleClick aquí para evitar duplicación
                    // El <a> padre se encargará de todo
                    if (!isLinkAction) {
                        handleClick()
                    }
                }}
            >
                {renderContent()}
            </PixelButton>
        )

        const finalContent = config.showNoise ? (
            <NoiseBackground>
                {buttonElement}
            </NoiseBackground>
        ) : buttonElement

        // Para acciones de tipo 'link', envolver en un <a>
        if (config.action.type === 'link') {
            const url = overrideUrl || config.action.url
            return (
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                        // NO preventDefault - dejamos que el navegador abra el link
                        // Solo ejecutamos handleClick para el sonido
                        if (!disabled) {
                            playSound(config.sound)
                        }
                    }}
                    className="inline-block"
                >
                    {finalContent}
                </a>
            )
        }

        return finalContent
    }
)

ActionButton.displayName = 'ActionButton'
