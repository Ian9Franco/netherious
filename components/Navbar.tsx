'use client';

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    IconSword,
    IconHammer,
    IconShieldLock,
    IconBook,
    IconPhoto,
} from "@tabler/icons-react";
import { useSound } from "@/context/SoundContext";

const Navbar = () => {
    const { playSwap } = useSound();
    const pathname = usePathname();

    const items = [
        { title: "Inicio", icon: <IconSword size={16} />, href: "/" },
        { title: "Forjar", icon: <IconHammer size={16} />, href: "/instalar" },
        { title: "Reino", icon: <IconShieldLock size={16} />, href: "/server" },
        { title: "Lore", icon: <IconBook size={16} />, href: "/lore" },
        { title: "Galeria", icon: <IconPhoto size={16} />, href: "/galeria" },
    ];

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
                    background: 'var(--color-darkest)',
                    borderBottom: '4px solid var(--color-dark)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 1rem',
                    zIndex: 100,
                }}
            >
                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
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
                        color: 'var(--color-lightest)',
                        fontSize: '1rem',
                        fontWeight: 700,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                    }}>
                        Netherious
                    </span>
                </div>

                {/* Decorative text */}
                <span style={{
                    color: 'var(--color-mid)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                }}>
                    v1.20.1 • Compendium
                </span>
            </div>

            {/* Side Tabs - Like book index tabs */}
            <nav
                style={{
                    position: 'fixed',
                    left: 0,
                    top: '48px',
                    bottom: 0,
                    width: '120px',
                    background: 'var(--color-darkest)',
                    borderRight: '4px solid var(--color-dark)',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '1rem 0',
                    gap: '2px',
                    zIndex: 99,
                }}
            >
                {items.map((item, index) => {
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.title}
                            href={item.href}
                            onClick={() => playSwap()}
                            style={{ textDecoration: 'none' }}
                        >
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ x: 4 }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.7rem 0.8rem',
                                    marginRight: isActive ? '-4px' : '0',
                                    background: isActive
                                        ? 'var(--color-lightest)'
                                        : 'transparent',
                                    borderRight: isActive
                                        ? '4px solid var(--color-lightest)'
                                        : 'none',
                                    color: isActive
                                        ? 'var(--text-main)'
                                        : 'var(--color-light)',
                                    transition: 'all 0.1s ease',
                                    position: 'relative',
                                }}
                            >
                                {/* Tab number */}
                                <span style={{
                                    fontSize: '0.6rem',
                                    opacity: 0.5,
                                    width: '12px',
                                }}>
                                    {String(index + 1).padStart(2, '0')}
                                </span>

                                {/* Icon */}
                                <span style={{ display: 'flex' }}>
                                    {item.icon}
                                </span>

                                {/* Title */}
                                <span style={{
                                    fontSize: '0.7rem',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                }}>
                                    {item.title}
                                </span>
                            </motion.div>
                        </Link>
                    );
                })}

                {/* Bottom decoration */}
                <div style={{
                    marginTop: 'auto',
                    padding: '1rem 0.8rem',
                    borderTop: '2px dashed var(--color-dark)',
                    color: 'var(--color-mid)',
                    fontSize: '0.55rem',
                    textAlign: 'center',
                    letterSpacing: '0.1em',
                }}>
                    ◆ SAS ◆
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
