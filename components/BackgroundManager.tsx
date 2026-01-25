'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const backgrounds = [
    '/images/bg-cave.jpg',
    '/images/bg-cozy.jpg',
    '/images/bg-dunge.jpg',
    '/images/bg-end.jpg',
    '/images/bg-forest.jpg',
    '/images/bg-mystic.jpg',
    '/images/bg-nether.jpg',
    '/images/bg-ocean.jpg',
    '/images/bg-over.jpg'
];

export default function BackgroundManager() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % backgrounds.length);
        }, 10000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="fixed inset-0 z-[-2] overflow-hidden pointer-events-none">
            <AnimatePresence mode="wait">
                <motion.div
                    key={backgrounds[index]}
                    initial={{ opacity: 0, scale: 1.1, y: '5%' }}
                    animate={{
                        opacity: 0.45,
                        scale: 1.2,
                        y: ['5%', '-5%', '5%'],
                        transition: {
                            opacity: { duration: 2 },
                            scale: { duration: 2 },
                            y: { duration: 20, repeat: Infinity, ease: "easeInOut" }
                        }
                    }}
                    exit={{ opacity: 0, scale: 1.1, y: '5%', transition: { duration: 2 } }}
                    style={{
                        position: 'absolute',
                        top: '-10%',
                        left: '-10%',
                        width: '120%',
                        height: '120%',
                        backgroundImage: `url(${backgrounds[index]})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(3px) brightness(0.8)',
                    }}
                />
            </AnimatePresence>
            <div
                className="absolute inset-0 z-[-1]"
                style={{
                    background: 'radial-gradient(circle at center, transparent 0%, var(--bg-primary) 100%)',
                    opacity: 0.5
                }}
            />
        </div>
    );
}
