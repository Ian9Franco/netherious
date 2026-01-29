'use client';
import React, { useState } from 'react';
import {
    IconServer,
    IconCpu,
    IconDeviceDesktop,
    IconFingerprint,
    IconCrown,
    IconShield,
    IconCopy,
    IconBolt,
    IconSparkles,
    IconDatabase,
} from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';
import serverData from '@/data/server.json';
import { Typewriter } from '@/components/Typewriter';
import { useSound } from '@/context/SoundContext';

export default function ServerPage() {
    const { playSuccess, playSwap } = useSound();
    const [passphrase, setPassphrase] = useState('');
    const [showFingerprint, setShowFingerprint] = useState(false);

    // Hardcoded fingerprint as it's not in the JSON provided
    const FINGERPRINT = "ED-41-8B-02-C7-8A-9F-12-3D-5E-09-F1";

    const handlePassphrase = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setPassphrase(val);
        if (val.toLowerCase() === 'dale que llueve') {
            if (!showFingerprint) playSuccess();
            setShowFingerprint(true);
        } else {
            setShowFingerprint(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* HEADER */}
            <motion.div
                variants={itemVariants}
                style={{
                    textAlign: 'center',
                    marginBottom: '3rem',
                    paddingBottom: '2rem',
                    borderBottom: '2px dashed var(--color-mid)',
                }}
            >
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.8rem',
                    marginBottom: '1rem',
                    color: 'var(--accent-gold)',
                }}>
                    <IconCrown size={24} />
                    <span style={{
                        fontSize: '0.75rem',
                        letterSpacing: '3px',
                        textTransform: 'uppercase',
                    }}>
                        Estado del Reino
                    </span>
                </div>

                <h1 style={{ marginBottom: '1rem' }}>
                    <Typewriter text={serverData.title} speed={30} />
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
                    <Typewriter text={serverData.subtitle} speed={15} delay={1} />
                </p>
            </motion.div>

            {/* INTRO PANEL */}
            <motion.div variants={itemVariants} className="book-panel" style={{ marginBottom: '3rem', padding: '1.5rem' }}>
                <h2 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--accent-gold)' }}>
                    {serverData.intro.title}
                </h2>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--text-muted)' }}>
                    {serverData.intro.description}
                </p>
            </motion.div>

            {/* SERVER SPECS - Equipment Slot style */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2rem',
                marginBottom: '4rem',
            }}>
                {/* Requirements */}
                <motion.div variants={itemVariants}>
                    <h2 style={{
                        fontSize: '1rem',
                        marginBottom: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                    }}>
                        <IconShield size={18} color="var(--accent-gold)" />
                        REQUISITOS
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {serverData.requirements.map((req, i) => (
                            <div key={i} className="slot" style={{
                                padding: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                            }}>
                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    background: 'var(--color-dark)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: req.color || 'var(--accent-gold)',
                                }}>
                                    {req.icon === 'Server' && <IconServer size={18} />}
                                    {req.icon === 'Cpu' && <IconCpu size={18} />}
                                    {req.icon === 'Coffee' && <IconDatabase size={18} />}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{req.label}: {req.value}</span>
                                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{req.description}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Specs/Recommended */}
                <motion.div variants={itemVariants}>
                    <h2 style={{
                        fontSize: '1rem',
                        marginBottom: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                    }}>
                        <IconShield size={18} color="var(--accent-gold)" />
                        RECOMENDADO
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {serverData.specs.map((spec, i) => (
                            <div key={i} className="slot" style={{
                                padding: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                            }}>
                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    background: 'var(--color-dark)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--accent-gold)',
                                }}>
                                    {spec.icon === 'Zap' && <IconBolt size={18} />}
                                    {spec.icon === 'Sparkles' && <IconSparkles size={18} />}
                                    {spec.icon === 'HardDrive' && <IconDatabase size={18} />}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{spec.label}</span>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)' }}>{spec.value}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* CONNECTION SLOT */}
            <motion.div
                variants={itemVariants}
                className="book-panel"
                style={{
                    padding: '2.5rem',
                    textAlign: 'center',
                }}
            >
                <div className="wax-seal" style={{ marginBottom: '1rem' }}>
                    <IconServer size={24} />
                </div>
                <h2 style={{ marginBottom: '1rem' }}>DIRECCIÓN</h2>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1rem',
                    flexWrap: 'wrap',
                }}>
                    <div className="slot" style={{
                        padding: '0.8rem 1.5rem',
                        fontSize: '1.1rem',
                        color: 'var(--accent-gold)',
                        letterSpacing: '2px',
                    }}>
                        {serverData.ip}
                    </div>
                    <motion.button
                        whileHover={{ y: -2 }}
                        className="btn btn-primary"
                        onClick={() => {
                            navigator.clipboard.writeText(serverData.ip);
                            playSuccess();
                        }}
                    >
                        <IconCopy size={18} />
                        COPIAR
                    </motion.button>
                </div>
            </motion.div>

            {/* HIDDEN FINGERPRINT SECTION */}
            <motion.div
                variants={itemVariants}
                style={{ marginTop: '4rem', textAlign: 'center' }}
            >
                <div style={{
                    maxWidth: '400px',
                    margin: '0 auto',
                }}>
                    <label style={{
                        display: 'block',
                        fontSize: '0.7rem',
                        color: 'var(--color-mid)',
                        marginBottom: '0.5rem',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                    }}>
                        Salvoconducto Requerido
                    </label>
                    <input
                        type="password"
                        placeholder="..."
                        value={passphrase}
                        onChange={handlePassphrase}
                        style={{
                            width: '100%',
                            background: 'var(--color-darkest)',
                            border: '2px solid var(--color-dark)',
                            padding: '0.8rem',
                            color: 'var(--color-lightest)',
                            textAlign: 'center',
                            fontFamily: 'inherit',
                        }}
                    />
                </div>

                <AnimatePresence>
                    {showFingerprint && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 10 }}
                            style={{ marginTop: '2rem' }}
                        >
                            <div className="stamp" style={{ padding: '2rem', display: 'inline-block' }}>
                                <IconFingerprint size={48} color="var(--accent-red)" />
                                <div style={{
                                    marginTop: '1rem',
                                    fontSize: '0.65rem',
                                    color: 'var(--accent-red)',
                                    fontWeight: 700,
                                    letterSpacing: '2px',
                                }}>
                                    {FINGERPRINT}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
}
