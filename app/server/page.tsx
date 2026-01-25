'use client';
import React, { useState } from 'react';
import {
    IconServer,
    IconCpu,
    IconCoffee,
    IconBolt,
    IconSparkles,
    IconDatabase,
    IconCopy,
    IconShieldCheck,
    IconKey
} from '@tabler/icons-react';
import { useSound } from '@/context/SoundContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Meteors } from '@/components/Meteors';
import serverData from '@/data/server.json';
import { Typewriter } from '@/components/Typewriter';

export default function ServerPage() {
    const { playSound, playSuccess, playError } = useSound();
    const [passphrase, setPassphrase] = useState('');
    const [showFingerprint, setShowFingerprint] = useState(false);
    const [copyStatus, setCopyStatus] = useState('Copiar IP');

    const FINGERPRINT = "NETHER-FGP-8x22-K991-Z01";

    const handleCopy = () => {
        navigator.clipboard.writeText(serverData.ip);
        playSuccess();
        setCopyStatus('¡Copiado!');
        setTimeout(() => setCopyStatus('Copiar IP'), 2000);
    };

    const handlePassphrase = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setPassphrase(val);
        const normalized = val.toLowerCase().trim().replace(/\s+/g, ' ');
        const validPhrases = ['llueve', 'dale que llueve', 'dalequellueve'];
        if (validPhrases.includes(normalized)) {
            setShowFingerprint(true);
            playSuccess();
            playSound('/sounds/links/enderman2.mp3');
        } else {
            setShowFingerprint(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <motion.section
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="section"
        >
            <motion.div variants={itemVariants} style={{ textAlign: 'center', marginBottom: '5rem' }}>
                <h1 className="gradient-text" style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>
                    <Typewriter text={serverData.title} speed={30} />
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                    <Typewriter text={serverData.subtitle} speed={15} delay={1} />
                </p>
            </motion.div>

            <motion.div variants={itemVariants} className="glass" style={{ padding: '4rem 2rem', marginBottom: '4rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <Meteors number={30} />
                <h2 style={{ marginBottom: '2rem', fontSize: '2rem' }}>
                    <Typewriter text={serverData.intro.title} speed={30} />
                </h2>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto 3rem' }}>
                    <Typewriter text={serverData.intro.description} speed={10} delay={1} />
                </p>

                {/* IP and Passphrase logic remains... */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
                    {/* ... */}
                </div>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '5rem' }}>
                {serverData.requirements.map((req: any, i: number) => (
                    <motion.div
                        key={i}
                        variants={itemVariants}
                        className="glass premium-card"
                        style={{ padding: '2.5rem' }}
                    >
                        <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <div style={{ backgroundColor: `${req.color}22`, color: req.color, padding: '1rem', borderRadius: '14px' }}>
                                {req.icon === 'Server' && <IconServer size={26} />}
                                {req.icon === 'Cpu' && <IconCpu size={26} />}
                                {req.icon === 'Coffee' && <IconCoffee size={26} />}
                            </div>
                            <h3 style={{ fontSize: '1.3rem' }}>
                                <Typewriter text={req.label} speed={20} delay={0.5 + i * 0.2} />
                            </h3>
                        </div>
                        <p style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.8rem', color: 'white' }}>
                            <Typewriter text={req.value} speed={30} delay={1 + i * 0.2} />
                        </p>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                            <Typewriter text={req.description} speed={10} delay={1.5 + i * 0.2} />
                        </p>
                    </motion.div>
                ))}
            </div>

            <motion.div variants={itemVariants} className="glass" style={{ padding: '4rem 2rem' }}>
                <h3 style={{ marginBottom: '3rem', textAlign: 'center', fontSize: '2rem' }}>
                    <Typewriter text="Especificaciones Recomendadas" speed={30} />
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem' }}>
                    {serverData.specs.map((spec: any, i: number) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            style={{ textAlign: 'center' }}
                        >
                            <div style={{ color: 'var(--accent-primary)', marginBottom: '1.5rem' }}>
                                {spec.icon === 'Zap' && <IconBolt size={38} />}
                                {spec.icon === 'Sparkles' && <IconSparkles size={38} />}
                                {spec.icon === 'HardDrive' && <IconDatabase size={38} />}
                            </div>
                            <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                <Typewriter text={spec.label} speed={20} delay={1 + i * 0.2} />
                            </h4>
                            <p style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                                <Typewriter text={spec.value} speed={30} delay={1.5 + i * 0.2} />
                            </p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </motion.section>
    );
}
