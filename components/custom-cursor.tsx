'use client'

import { useEffect, useState } from 'react'

export function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const updatePosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY })
            setIsVisible(true)
        }

        const updateHoverState = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            // Check if target or any parent is clickable
            const isClickable =
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') ||
                target.closest('a') ||
                target.getAttribute('role') === 'button' ||
                window.getComputedStyle(target).cursor === 'pointer'

            setIsHovering(!!isClickable)
        }

        const handleMouseLeave = () => setIsVisible(false)
        const handleMouseEnter = () => setIsVisible(true)

        window.addEventListener('mousemove', updatePosition)
        window.addEventListener('mouseover', updateHoverState)
        document.addEventListener('mouseleave', handleMouseLeave)
        document.addEventListener('mouseenter', handleMouseEnter)

        return () => {
            window.removeEventListener('mousemove', updatePosition)
            window.removeEventListener('mouseover', updateHoverState)
            document.removeEventListener('mouseleave', handleMouseLeave)
            document.removeEventListener('mouseenter', handleMouseEnter)
        }
    }, [])

    if (!isVisible) return null

    return (
        <div
            className="fixed pointer-events-none z-[9999]"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                transform: 'translate(-0%, -0%)', // Adjust if cursor tip isn't top-left
            }}
        >
            <img
                src={isHovering ? '/assets/cursor/cursor-pointer.png' : '/assets/cursor/cursor-default.png'}
                alt="cursor"
                width={32}
                height={32}
                className="block image-pixelated" // Ensure pixelation class exists or use inline style
                style={{
                    imageRendering: 'pixelated',
                    transform: 'scale(2)',
                    transformOrigin: 'top left',
                    filter: 'drop-shadow(2px 2px 0 rgba(0,0,0,0.2))'
                }}
            />
        </div>
    )
}
