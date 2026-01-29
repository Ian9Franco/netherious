'use client';
import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface PageTransitionProps {
    children: ReactNode;
}

// Page turn animation - simulates flipping a book page
const pageVariants = {
    initial: {
        opacity: 0,
        x: 30,
        rotateY: -8,
        scale: 0.97,
        transformOrigin: 'left center',
    },
    enter: {
        opacity: 1,
        x: 0,
        rotateY: 0,
        scale: 1,
        transformOrigin: 'left center',
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number], // easeOutQuint
        },
    },
    exit: {
        opacity: 0,
        x: -30,
        rotateY: 8,
        scale: 0.97,
        transformOrigin: 'left center',
        transition: {
            duration: 0.35,
            ease: [0.55, 0, 1, 0.45] as [number, number, number, number], // easeInQuint
        },
    },
};

export default function PageTransition({ children }: PageTransitionProps) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial="initial"
                animate="enter"
                exit="exit"
                variants={pageVariants}
                style={{
                    width: '100%',
                    minHeight: '100%',
                    perspective: '1200px',
                    transformStyle: 'preserve-3d',
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
