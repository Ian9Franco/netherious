'use client';
import React from 'react';
import { IconPhoto, IconSparkles, IconClock, IconNotes } from '@tabler/icons-react';
import { motion } from 'framer-motion';

export default function GalleryPage() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
                minHeight: '50vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '2rem',
            }}
        >
            {/* Header */}
            <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.8rem',
                marginBottom: '2rem',
                color: 'var(--accent-gold)',
            }}>
                <IconNotes size={20} />
                <span style={{
                    fontSize: '0.75rem',
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                }}>
                    Colección Visual
                </span>
            </div>

            {/* Animated icon */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{
                    width: '120px',
                    height: '120px',
                    background: 'var(--color-light)',
                    border: 'var(--px) solid var(--border-main)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-dark)',
                    marginBottom: '2.5rem',
                    boxShadow: 'var(--shadow-pixel)',
                }}
            >
                <IconPhoto size={60} />
            </motion.div>

            {/* Text Panel */}
            <div className="book-panel" style={{
                maxWidth: '500px',
                padding: '2rem',
            }}>
                <h1 style={{
                    fontSize: '1.5rem',
                    marginBottom: '1rem',
                }}>
                    PRÓXIMAMENTE
                </h1>

                <p style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                    marginBottom: '2rem',
                }}>
                    Estamos reuniendo los registros visuales más impactantes de la era actual.
                    El archivo de Netherious estará disponible para su consulta en breve.
                </p>

                {/* Footer notes */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '2rem',
                    color: 'var(--color-mid)',
                    fontSize: '0.7rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <IconSparkles size={14} /> 4K Capture
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <IconClock size={14} /> 1.20.1
                    </div>
                </div>
            </div>

            {/* Stamp decoration */}
            <div
                className="stamp"
                style={{
                    position: 'absolute',
                    bottom: '2rem',
                    right: '2rem',
                    transform: 'rotate(10deg)',
                    padding: '0.5rem 1rem',
                    fontSize: '0.6rem',
                    color: 'var(--accent-red)',
                    fontWeight: 900,
                    opacity: 0.6,
                }}
            >
                RESERVED FOR ARCHIVE
            </div>
        </motion.div>
    );
}
