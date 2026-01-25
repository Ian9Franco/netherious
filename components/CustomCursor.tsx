'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const moveMouse = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable = target.closest('button, a, input, select, [role="button"], .interactive');
            setIsHovering(!!isClickable);
        };

        window.addEventListener('mousemove', moveMouse);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveMouse);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [mouseX, mouseY]);

    return (
        <motion.div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                x: cursorX,
                y: cursorY,
                zIndex: 99999,
                pointerEvents: 'none',
                width: '48px',
                height: '48px',
                backgroundImage: 'url(/cursor/lore-cursor.png)',
                backgroundSize: '200% 100%',
                backgroundPosition: isHovering ? '100% 0%' : '0% 0%',
                transform: 'translate(-8px, -8px)', // Adjust hotspot for larger size
                imageRendering: 'pixelated',
            }}
        />
    );
}
