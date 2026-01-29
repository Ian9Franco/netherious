'use client';
import React, { useState } from 'react';
import {
    IconCopy,
    IconSparkles,
    IconBolt,
    IconDownload,
    IconChevronRight,
    IconStar,
    IconUsers,
} from '@tabler/icons-react';
import { useSound } from '@/context/SoundContext';
import { motion } from 'framer-motion';
import homeData from '@/data/home.json';
import { useRouter } from 'next/navigation';
import { Typewriter } from '@/components/Typewriter';

export default function HomePage() {
    const router = useRouter();
    const { playSuccess, playSwap } = useSound();
    const [copyStatus, setCopyStatus] = useState('Copiar IP');

    const copyIP = () => {
        navigator.clipboard.writeText('179.41.11.247:25591');
        setCopyStatus('¡Copiado!');
        playSuccess();
        setTimeout(() => setCopyStatus('Copiar IP'), 2000);
    };

    const navigate = (path: string) => {
        playSwap();
        router.push(path);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 10, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.3 } }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* HERO */}
            <motion.div
                variants={itemVariants}
                style={{
                    textAlign: 'center',
                    padding: '2rem 0 3rem',
                    borderBottom: '2px dashed var(--color-mid)',
                    marginBottom: '2rem',
                }}
            >
                {/* Badge */}
                <div className="badge badge-gold" style={{ marginBottom: '1rem' }}>
                    <IconStar size={10} />
                    El mejor servidor
                </div>

                {/* Title */}
                <h1 style={{ marginBottom: '0.8rem' }}>
                    <Typewriter text={homeData.hero.title} speed={30} />
                </h1>

                {/* Subtitle */}
                <p style={{
                    color: 'var(--text-muted)',
                    marginBottom: '2rem',
                    maxWidth: '500px',
                    marginInline: 'auto',
                }}>
                    <Typewriter text={homeData.hero.subtitle} speed={15} delay={0.5} />
                </p>

                {/* CTA Buttons */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', flexWrap: 'wrap' }}>
                    <motion.button
                        whileHover={{ y: -2 }}
                        whileTap={{ y: 2 }}
                        className="btn btn-primary"
                        onClick={copyIP}
                    >
                        <IconCopy size={16} />
                        {copyStatus}
                    </motion.button>

                    <motion.button
                        whileHover={{ y: -2 }}
                        whileTap={{ y: 2 }}
                        className="btn btn-outline"
                        onClick={() => navigate('/instalar')}
                    >
                        Empezar <IconChevronRight size={14} />
                    </motion.button>
                </div>
            </motion.div>

            {/* FEATURE CARDS - Slot grid style */}
            <motion.div
                variants={itemVariants}
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '1rem',
                    marginBottom: '2.5rem',
                }}
            >
                {homeData.cards.map((card, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -4 }}
                        className="slot slot-glow"
                        style={{ padding: '1.2rem' }}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            marginBottom: '0.6rem',
                        }}>
                            <div style={{
                                width: '28px',
                                height: '28px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'var(--color-mid)',
                                border: '2px solid var(--color-dark)',
                                color: 'var(--color-lightest)',
                            }}>
                                {card.icon === 'Download' && <IconDownload size={14} />}
                                {card.icon === 'Sparkles' && <IconSparkles size={14} />}
                                {card.icon === 'Zap' && <IconBolt size={14} />}
                            </div>
                            <h3 style={{ fontSize: '0.85rem', margin: 0 }}>
                                {card.title}
                            </h3>
                        </div>
                        <p style={{
                            color: 'var(--text-muted)',
                            fontSize: '0.8rem',
                            lineHeight: 1.5,
                        }}>
                            {card.text}
                        </p>
                    </motion.div>
                ))}
            </motion.div>

            {/* DIVIDER */}
            <div className="book-divider">
                <span>◆ Features ◆</span>
            </div>

            {/* FEATURES LIST */}
            <motion.div variants={itemVariants} style={{ marginBottom: '2.5rem' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem',
                }}>
                    {homeData.features.map((feature, i) => (
                        <div
                            key={i}
                            style={{
                                padding: '1rem',
                                borderLeft: '3px solid var(--accent-gold)',
                                background: 'rgba(0,0,0,0.03)',
                            }}
                        >
                            <h4 style={{
                                fontSize: '0.8rem',
                                marginBottom: '0.3rem',
                            }}>
                                {feature.title}
                            </h4>
                            <p style={{
                                color: 'var(--text-muted)',
                                fontSize: '0.75rem',
                            }}>
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* DISCORD CTA */}
            <motion.div
                variants={itemVariants}
                className="book-panel"
                style={{
                    textAlign: 'center',
                    padding: '2rem',
                    marginBottom: '2.5rem',
                }}
            >
                <div className="wax-seal" style={{ marginBottom: '1rem' }}>
                    <IconUsers size={20} />
                </div>
                <h2 style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}>
                    Discord
                </h2>
                <p style={{
                    marginBottom: '1.5rem',
                    color: 'var(--text-muted)',
                    fontSize: '0.85rem',
                    maxWidth: '400px',
                    marginInline: 'auto',
                }}>
                    Conéctate con la comunidad SAS
                </p>
                <motion.button
                    whileHover={{ y: -2 }}
                    className="btn"
                    onClick={() => { playSuccess(); window.open('https://discord.gg/z8bXeSvKnt', '_blank'); }}
                    style={{ background: 'var(--accent-blue)', color: 'var(--color-lightest)' }}
                >
                    Unirse
                </motion.button>
            </motion.div>

            {/* INTRO */}
            <motion.div variants={itemVariants} style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ marginBottom: '1rem', textAlign: 'center', fontSize: '1.1rem' }}>
                    {homeData.intro.title}
                </h2>
                <div className="book-panel" style={{
                    padding: '1.5rem',
                    fontSize: '0.85rem',
                    lineHeight: 1.7,
                    color: 'var(--text-muted)',
                }}>
                    {homeData.intro.paragraph}
                </div>
            </motion.div>

            {/* FINAL CTA */}
            <motion.div
                variants={itemVariants}
                className="stamp"
                style={{
                    textAlign: 'center',
                    padding: '2rem',
                }}
            >
                <h2 style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}>
                    {homeData.cta.title}
                </h2>
                <p style={{
                    marginBottom: '1.5rem',
                    color: 'var(--text-muted)',
                    fontSize: '0.8rem',
                }}>
                    {homeData.cta.description}
                </p>
                <motion.button
                    whileHover={{ y: -2 }}
                    className="btn btn-primary"
                    onClick={() => navigate('/instalar')}
                >
                    {homeData.cta.button}
                </motion.button>
            </motion.div>
        </motion.div>
    );
}
