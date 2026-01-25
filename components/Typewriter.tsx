'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypewriterProps {
    text: string;
    speed?: number;
    delay?: number;
    className?: string;
    style?: React.CSSProperties;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

export const Typewriter: React.FC<TypewriterProps> = ({
    text,
    speed = 15,
    delay = 0,
    className,
    style,
    as: Component = 'span'
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const startTimeout = setTimeout(() => {
            setStarted(true);
        }, delay * 1000);

        return () => clearTimeout(startTimeout);
    }, [delay]);

    useEffect(() => {
        if (!started) return;

        if (displayedText.length < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(text.slice(0, displayedText.length + 1));
            }, speed);
            return () => clearTimeout(timeout);
        }
    }, [displayedText, text, speed, started]);

    return (
        <Component className={className} style={style}>
            {displayedText}
            {started && displayedText.length < text.length && (
                <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    style={{
                        display: 'inline-block',
                        width: '0.6em',
                        height: '1.1em',
                        backgroundColor: 'var(--accent-primary)',
                        marginLeft: '4px',
                        verticalAlign: 'text-bottom',
                        boxShadow: '0 0 10px var(--accent-primary)'
                    }}
                />
            )}
        </Component>
    );
};
