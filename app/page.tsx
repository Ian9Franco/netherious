'use client';
import React, { useState } from 'react';
import {
    IconCopy,
    IconSparkles,
    IconBolt,
    IconDownload,
    IconChevronRight,
    IconTrophy,
    IconWorld,
    IconUsers,
    IconLayoutCards
} from '@tabler/icons-react';
import { useSound } from '@/context/SoundContext';
import { motion } from 'framer-motion';
import { Meteors } from '@/components/Meteors';
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
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
    };

    return (
        <motion.section
            initial={false}
            animate="visible"
            variants={containerVariants}
            className="section"
        >
            <motion.div variants={itemVariants} style={{ textAlign: 'center', padding: '6rem 0', position: 'relative', overflow: 'hidden' }}>
                <Meteors number={20} />
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        padding: '0.4rem 1rem',
                        fontSize: '0.8rem',
                        fontWeight: 800,
                        color: 'var(--accent-primary)',
                        background: 'rgba(99, 102, 241, 0.1)',
                        borderRadius: '100px',
                        border: '1px solid rgba(99, 102, 241, 0.2)',
                        marginBottom: '2rem',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>
                    <IconTrophy size={14} /> El mejor servidor RPG
                </motion.div>

                <h1 className="gradient-text" style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', marginBottom: '1.5rem', lineHeight: 1 }}>
                    <Typewriter text={homeData.hero.title} speed={30} />
                </h1>
                <p style={{ fontSize: '1.3rem', color: 'var(--text-secondary)', marginBottom: '3.5rem', maxWidth: '800px', marginInline: 'auto' }}>
                    <Typewriter text={homeData.hero.subtitle} speed={15} delay={0.5} />
                    {". "}
                    <span style={{ color: 'var(--accent-primary)', fontWeight: 900 }}>
                        <Typewriter text="Mejor que Hypixel como mierda se diga." speed={15} delay={2} />
                    </span>
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn btn-primary"
                        onClick={copyIP}
                        style={{ fontSize: '1.1rem', padding: '1.2rem 2.5rem' }}
                    >
                        <IconCopy size={22} />
                        {copyStatus}
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn btn-outline"
                        onClick={() => navigate('/instalar')}
                        style={{ fontSize: '1.1rem', padding: '1.2rem 2.5rem' }}
                    >
                        Empezar Ahora <IconChevronRight size={20} />
                    </motion.button>
                </div>
            </motion.div>

            <motion.div
                variants={itemVariants}
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '2.5rem',
                    marginTop: '4rem'
                }}
            >
                {homeData.cards.map((card, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -10 }}
                        className="glass premium-card"
                        style={{ padding: '3rem', position: 'relative', overflow: 'hidden' }}
                    >
                        <Meteors number={10} />
                        <div style={{
                            backgroundColor: `${card.color}22`,
                            color: card.color,
                            padding: '1rem',
                            borderRadius: '16px',
                            width: 'fit-content',
                            marginBottom: '2rem',
                            boxShadow: `0 8px 30px ${card.color}11`
                        }}>
                            {card.icon === 'Download' && <IconDownload size={28} />}
                            {card.icon === 'Sparkles' && <IconSparkles size={28} />}
                            {card.icon === 'Zap' && <IconBolt size={28} />}
                        </div>
                        <h3 style={{ marginBottom: '1.2rem', fontSize: '1.5rem' }}>{card.title}</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>{card.text}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* FEATURES SECTION (from home.json) */}
            <motion.div variants={itemVariants} style={{ marginTop: '10rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 className="pixel-text text-3xl md:text-5xl uppercase tracking-wider mb-4">Poder Modded</h2>
                    <div className="h-1 w-20 bg-accent-primary mx-auto"></div>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {homeData.features.map((feature, i) => (
                        <div key={i} className="glass" style={{ padding: '2.5rem', border: '1px solid var(--glass-border)' }}>
                            <div className="flex items-center gap-3 mb-4 text-accent-secondary">
                                <IconLayoutCards size={24} />
                                <h4 style={{ fontSize: '1.2rem', fontWeight: 900 }}>
                                    <Typewriter text={feature.title} speed={20} delay={1 + i * 0.2} />
                                </h4>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                <Typewriter text={feature.description} speed={10} delay={1.5 + i * 0.2} />
                            </p>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* DISCORD CARD */}
            <motion.div
                variants={itemVariants}
                style={{
                    marginTop: '10rem',
                    background: 'linear-gradient(135deg, rgba(88, 101, 242, 0.1), rgba(99, 102, 241, 0.1))',
                    padding: '6rem 4rem',
                    borderRadius: '32px',
                    textAlign: 'center',
                    border: '1px solid rgba(88, 101, 242, 0.3)',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <Meteors number={15} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ marginBottom: '2rem' }}>
                        <IconUsers size={64} style={{ color: '#5865F2', margin: '0 auto' }} className="animate-bounce" />
                    </div>
                    <h2 className="pixel-text" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
                        <Typewriter text="Join the SAS Community" speed={30} />
                    </h2>
                    <p style={{ marginBottom: '3rem', color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '750px', marginInline: 'auto', fontStyle: 'italic' }}>
                        <Typewriter text="Conéctate con el Mati, participa en el SAS y mantente al día con las últimas noticias en nuestro servidor de Discord." speed={15} delay={1} />
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05, translateY: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn"
                        onClick={() => { playSuccess(); window.open('https://discord.gg/z8bXeSvKnt', '_blank'); }}
                        style={{
                            backgroundColor: '#5865F2',
                            color: 'white',
                            padding: '1.2rem 4rem',
                            fontSize: '1.1rem',
                            fontWeight: 900,
                            border: '4px solid #3a44ad',
                            boxShadow: '0 10px 0 #2b3383',
                            borderRadius: '4px'
                        }}
                    >
                        INGRESAR AL DISCORD
                    </motion.button>
                </div>
            </motion.div>

            <motion.div variants={itemVariants} style={{ marginTop: '10rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '4rem' }}>
                    <Typewriter text={homeData.intro.title} speed={30} />
                </h2>
                <div className="glass" style={{
                    padding: '4rem',
                    fontSize: '1.25rem',
                    lineHeight: '1.9',
                    background: 'rgba(255,255,255,0.02)',
                    boxShadow: 'inset 0 0 100px rgba(99, 102, 241, 0.05)'
                }}>
                    <Typewriter text={homeData.intro.paragraph} speed={10} delay={1} />
                </div>
            </motion.div>

            <motion.div
                variants={itemVariants}
                style={{
                    marginTop: '10rem',
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.15))',
                    padding: '6rem 4rem',
                    borderRadius: '32px',
                    textAlign: 'center',
                    border: '1px solid rgba(255,255,255,0.1)',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>
                        <Typewriter text={homeData.cta.title} speed={30} />
                    </h2>
                    <p style={{ marginBottom: '3rem', color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', marginInline: 'auto' }}>
                        <Typewriter text={homeData.cta.description} speed={15} delay={1} />
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(99, 102, 241, 0.4)' }}
                        whileTap={{ scale: 0.95 }}
                        className="btn btn-primary"
                        onClick={() => navigate('/instalar')}
                        style={{ padding: '1.2rem 3rem' }}
                    >
                        {homeData.cta.button}
                    </motion.button>
                </div>

                <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '40%', height: '140%', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)', zIndex: 0 }}></div>
            </motion.div>
        </motion.section>
    );
}
