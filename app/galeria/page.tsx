'use client';
import React from 'react';
import { IconPhoto, IconSparkles, IconClock } from '@tabler/icons-react';
import { motion } from 'framer-motion';

export default function GalleryPage() {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="section"
            style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
        >
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{ color: 'var(--accent-secondary)', marginBottom: '3rem' }}
            >
                <IconPhoto size={100} />
            </motion.div>

            <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="gradient-text"
                style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', marginBottom: '1.5rem' }}
            >
                Galería Netherious
            </motion.h1>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="glass"
                style={{ padding: '3rem', maxWidth: '700px', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}
            >
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.3rem', lineHeight: '1.6' }}>
                    Estamos curando las mejores capturas de nuestras mazmorras, máquinas industriales y momentos épicos.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--accent-primary)', fontWeight: 900, fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
                    <IconClock size={24} /> Próximamente disponible
                </div>
                <p style={{ color: 'var(--accent-secondary)', fontWeight: 800 }}>No desesperes, lo bueno se hace esperar.</p>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    {[1, 2, 3].map(i => (
                        <div key={i} style={{ width: '40px', height: '4px', borderRadius: '10px', background: 'var(--glass-border)' }}></div>
                    ))}
                </div>
            </motion.div>
        </motion.section>
    );
}
