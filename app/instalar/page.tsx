'use client';
import React from 'react';
import {
    IconDownload,
    IconPackage,
    IconSparkles,
    IconSettings,
    IconCircleCheck,
    IconArrowDown
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import installData from '@/data/install.json';
import { Typewriter } from '@/components/Typewriter';

export default function InstallPage() {
    // ... Variants remain the same
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { x: -20, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.5 } }
    };

    return (
        <motion.section
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="section"
        >
            <motion.div variants={itemVariants} style={{ marginBottom: '6rem', textAlign: 'center' }}>
                <h1 className="gradient-text" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '1.5rem' }}>
                    <Typewriter text={installData.title} speed={30} />
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
                    <Typewriter text={installData.subtitle} speed={15} delay={1} />
                </p>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ marginTop: '3rem', color: 'var(--accent-primary)', opacity: 0.5 }}
                >
                    <IconArrowDown size={32} style={{ marginInline: 'auto' }} />
                </motion.div>
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
                {installData.sections.map((section: any) => (
                    <motion.div
                        key={section.id}
                        variants={itemVariants}
                        id={section.id}
                        className="glass"
                        style={{
                            padding: 'clamp(2rem, 5vw, 4rem)',
                            borderLeft: section.critical ? '6px solid #ef4444' : '1px solid var(--glass-border)',
                            position: 'relative',
                            boxShadow: section.critical ? '0 0 40px rgba(239, 68, 68, 0.05)' : 'none'
                        }}
                    >
                        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: '3rem' }}>
                            <div style={{
                                backgroundColor: `${section.color}22`,
                                color: section.color,
                                padding: '1.2rem',
                                borderRadius: '20px',
                                boxShadow: `0 8px 25px ${section.color}22`
                            }}>
                                {section.icon === 'Download' && <IconDownload size={32} />}
                                {section.icon === 'Package' && <IconPackage size={32} />}
                                {section.icon === 'Sparkles' && <IconSparkles size={32} />}
                                {section.icon === 'Settings' && <IconSettings size={32} />}
                            </div>
                            <div style={{ flex: 1, minWidth: '300px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.8rem' }}>
                                    <h2 style={{ fontSize: '2.2rem' }}>
                                        <Typewriter text={section.title} speed={30} />
                                    </h2>
                                    {section.critical && (
                                        <span style={{ backgroundColor: '#ef444422', color: '#ef4444', padding: '0.2rem 0.8rem', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 800, border: '1px solid #ef444444' }}>
                                            OBLIGATORIO
                                        </span>
                                    )}
                                </div>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                                    <Typewriter text={section.description} speed={10} delay={0.5} />
                                </p>
                            </div>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: section.optionalModsList ? '1fr' : 'repeat(auto-fit, minmax(320px, 1fr))',
                            gap: '4rem'
                        }}>
                            <div>
                                <h4 style={{ marginBottom: '2rem', color: 'var(--accent-primary)', textTransform: 'uppercase', fontSize: '0.9rem', fontWeight: 900, letterSpacing: '2px' }}>
                                    <Typewriter text="GUÍA PASO A PASO" speed={20} delay={1} />
                                </h4>
                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    {(section.instructions || section.checkpoints || []).map((inst: string, i: number) => (
                                        <motion.li
                                            key={i}
                                            whileHover={{ x: 5 }}
                                            style={{ display: 'flex', gap: '1.2rem', alignItems: 'flex-start', color: 'var(--text-secondary)', fontSize: '1.05rem' }}
                                        >
                                            <IconCircleCheck size={22} style={{ color: 'var(--accent-success)', marginTop: '0.2rem', flexShrink: 0 }} />
                                            <span>
                                                <Typewriter text={inst} speed={10} delay={1.5 + i * 0.1} />
                                            </span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                {section.action && (
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="btn btn-primary"
                                        onClick={() => window.open(section.link || section.downloadUrl)}
                                        style={{ padding: '1.2rem', justifyContent: 'center', width: '100%', fontSize: '1.1rem' }}
                                    >
                                        <IconDownload size={24} />
                                        {section.action}
                                    </motion.button>
                                )}

                                {section.extraLinks && section.extraLinks.map((ex: any, i: number) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ borderColor: 'var(--accent-primary)' }}
                                        className="glass"
                                        style={{ padding: '1.5rem', border: '1px dashed var(--glass-border)', background: 'rgba(0,0,0,0.1)' }}
                                    >
                                        <p style={{ fontSize: '0.95rem', marginBottom: '0.8rem', color: 'var(--text-secondary)' }}>{ex.description}</p>
                                        <a href={ex.url} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-primary)', fontSize: '1rem', fontWeight: 800, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            {ex.label} <IconSparkles size={16} />
                                        </a>
                                    </motion.div>
                                ))}

                                {section.optionalModsList && (
                                    <div className="glass" style={{ padding: '2rem', backgroundColor: 'rgba(0,0,0,0.3)', width: '100%', overflow: 'hidden' }}>
                                        <h4 style={{ marginBottom: '1.5rem', fontSize: '1rem', fontWeight: 800 }}>
                                            LISTADO DE MODS ({section.optionalModsList.length})
                                        </h4>
                                        <div className="mods-grid" style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                                            gap: '0.6rem',
                                            maxHeight: '300px',
                                            overflowY: 'auto',
                                            paddingRight: '0.5rem'
                                        }}>
                                            {section.optionalModsList.map((mod: string, i: number) => (
                                                <motion.span
                                                    key={i}
                                                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                                                    style={{
                                                        padding: '0.5rem 0.8rem',
                                                        border: '1px solid var(--glass-border)',
                                                        borderRadius: '8px',
                                                        fontSize: '0.8rem',
                                                        color: 'var(--text-secondary)',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis'
                                                    }}
                                                    title={mod}
                                                >
                                                    {mod}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}
