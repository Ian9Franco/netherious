'use client';

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSound } from "@/context/SoundContext";

const Navbar = () => {
    const { playSwap } = useSound();

    return (
        <header>
            {/* Book Title - Top bar style */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '48px',
                    background: '#352318',
                    borderBottom: '4px solid #4a3228',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 1rem',
                    zIndex: 100,
                }}
            >
                {/* Logo */}
                <Link href="/" onClick={() => playSwap()} style={{ textDecoration: 'none' }}>
                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}
                    >
                        <img
                            src="/logo/logo.png"
                            alt="Logo"
                            style={{
                                height: '32px',
                                width: 'auto',
                                imageRendering: 'pixelated',
                            }}
                        />
                        <span style={{
                            color: '#d4c4a0',
                            fontSize: '1rem',
                            fontWeight: 700,
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                        }}>
                            Netherious
                        </span>
                    </motion.div>
                </Link>

                {/* Decorative text */}
                <span style={{
                    color: '#8b7355',
                    fontSize: '0.65rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                }}>
                    v1.20.1 • Compendium
                </span>
            </div>
        </header>
    );
};

export default Navbar;
