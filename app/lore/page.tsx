'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    IconSparkles,
    IconWorld,
    IconSword,
    IconSettings,
    IconSkull,
    IconPlus,
    IconMinus,
    IconArrowRight,
    IconBook,
    IconFeather,
} from '@tabler/icons-react';
import topModsData from '@/data/top_mods_data.json';
import { useSound } from '@/context/SoundContext';

export default function LorePage() {
    const { playSwap } = useSound();
    const [isNerdMode, setIsNerdMode] = useState(false);

    const experiences = [
        {
            icon: <IconWorld size={32} />,
            title: "Exploración Irreverente",
            subtitle: "Territorios que no perdonan",
            description: "No es solo caminar. Es sobrevivir a biomas que reaccionan a tu presencia. Ruinas que guardan secretos de eras colapsadas y una atmósfera que te susurra que no perteneces aquí.",
            number: "I",
        },
        {
            icon: <IconSkull size={32} />,
            title: "Enemigos Reales",
            subtitle: "Miedo, no solo mobs",
            description: "Olvida las piñatas de loot. Aquí los encuentros son cinematográficos. Criaturas mutantes con fases de combate que exigen estrategia, reflejos y un poco de suerte para salir vivo.",
            number: "II",
        },
        {
            icon: <IconSettings size={32} />,
            title: "Ingeniería Cruda",
            subtitle: "Energía y metal",
            description: "De engranajes de madera a reactores nucleares. La automatización en Netherious es un arte. Construye fábricas que transforman el mundo, si logras controlar el riesgo de radiación.",
            number: "III",
        },
        {
            icon: <IconSparkles size={32} />,
            title: "Poder Arcano",
            subtitle: "Magia con precio",
            description: "Crea tus propios hechizos. Encuentra reliquias que desafían la física. Pero recuerda: en Netherious, la magia es salvaje y la progresión se paga con sangre y curiosidad.",
            number: "IV",
        }
    ];

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
            {/* CHRONICLE HEADER */}
            <motion.div
                variants={itemVariants}
                style={{
                    textAlign: 'center',
                    padding: '2rem 0 3rem',
                    borderBottom: '2px dashed var(--color-mid)',
                    marginBottom: '3rem',
                }}
            >
                {/* Chapter indicator */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem',
                    marginBottom: '1rem',
                    color: 'var(--accent-gold)',
                }}>
                    <IconBook size={20} />
                    <span style={{
                        fontSize: '0.75rem',
                        letterSpacing: '3px',
                        textTransform: 'uppercase',
                    }}>
                        Crónicas de Netherious
                    </span>
                    <IconFeather size={20} />
                </div>

                <h1 style={{
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                    color: 'var(--ink-black)',
                    marginBottom: '1rem',
                    lineHeight: 1.1,
                }}>
                    ¿Qué se siente<br />
                    <span style={{
                        color: 'var(--accent-gold)',
                        fontStyle: 'italic',
                    }}>
                        entrar?
                    </span>
                </h1>

                <p style={{
                    maxWidth: '500px',
                    margin: '0 auto',
                    color: 'var(--color-dark)',
                    fontSize: '1rem',
                    lineHeight: 1.6,
                    fontStyle: 'italic',
                    borderLeft: '3px solid var(--accent-gold)',
                    paddingLeft: '1rem',
                    textAlign: 'left',
                }}>
                    El Nether colapsó. La frontera entre lo salvaje y lo imposible se fundió.
                    No vendemos historia... vendemos el latido acelerado cuando escuchas algo detrás de ti.
                </p>
            </motion.div>

            {/* EXPERIENCE ENTRIES - Journal style */}
            <div style={{ marginBottom: '4rem' }}>
                {experiences.map((exp, i) => (
                    <motion.div
                        key={i}
                        variants={itemVariants}
                        style={{
                            display: 'flex',
                            gap: '1.5rem',
                            padding: '2rem 0',
                            borderBottom: i < experiences.length - 1 ? '1px dashed var(--color-mid)' : 'none',
                        }}
                    >
                        {/* Roman numeral */}
                        <div style={{
                            fontSize: '2rem',
                            fontWeight: 700,
                            color: 'var(--color-mid)',
                            minWidth: '50px',
                            textAlign: 'center',
                        }}>
                            {exp.number}
                        </div>

                        {/* Content */}
                        <div style={{ flex: 1 }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.8rem',
                                marginBottom: '0.5rem',
                            }}>
                                <span style={{ color: 'var(--accent-gold)' }}>
                                    {exp.icon}
                                </span>
                                <h2 style={{
                                    fontSize: '1.3rem',
                                    color: 'var(--text-main)',
                                    margin: 0,
                                }}>
                                    {exp.title}
                                </h2>
                            </div>
                            <h3 style={{
                                fontSize: '0.85rem',
                                color: 'var(--accent-red)',
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                                marginBottom: '0.8rem',
                            }}>
                                {exp.subtitle}
                            </h3>
                            <p style={{
                                color: 'var(--text-muted)',
                                fontSize: '0.95rem',
                                lineHeight: 1.7,
                            }}>
                                {exp.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* NERD MODE SECTION - Technical Appendix */}
            <motion.div
                variants={itemVariants}
                className="slot"
                style={{
                    margin: '0 -1.5rem',
                    padding: '2rem',
                }}
            >
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: isNerdMode ? '2rem' : 0,
                    flexWrap: 'wrap',
                    gap: '1rem',
                }}>
                    <div>
                        <span style={{
                            fontSize: '0.7rem',
                            color: 'var(--accent-gold)',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                        }}>
                            Apéndice Técnico
                        </span>
                        <h2 style={{
                            fontSize: '1.5rem',
                            color: 'var(--text-main)',
                            margin: 0,
                        }}>
                            Debajo del capó
                        </h2>
                    </div>
                    <button
                        onClick={() => { setIsNerdMode(!isNerdMode); playSwap(); }}
                        className="btn"
                    >
                        {isNerdMode ? 'Ocultar' : 'Modo Nerd'}
                        {isNerdMode ? <IconMinus size={16} /> : <IconPlus size={16} />}
                    </button>
                </div>

                <AnimatePresence>
                    {isNerdMode && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                gap: '2rem',
                            }}
                        >
                            {topModsData.map((cat, i) => (
                                <div key={i}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        marginBottom: '1rem',
                                    }}>
                                        <span style={{
                                            fontSize: '1.5rem',
                                            fontWeight: 900,
                                            color: 'var(--color-mid)',
                                        }}>
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                        <h4 style={{
                                            fontSize: '0.8rem',
                                            color: 'var(--text-main)',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px',
                                            borderBottom: '2px solid var(--accent-gold)',
                                            paddingBottom: '0.2rem',
                                            margin: 0,
                                        }}>
                                            {cat.category}
                                        </h4>
                                    </div>
                                    <ul style={{
                                        listStyle: 'none',
                                        padding: 0,
                                        margin: 0,
                                    }}>
                                        {cat.mods.map((mod, j) => (
                                            <li
                                                key={j}
                                                style={{
                                                    padding: '0.4rem 0',
                                                    borderBottom: '1px dotted var(--color-mid)',
                                                }}
                                            >
                                                <div style={{
                                                    fontSize: '0.85rem',
                                                    fontWeight: 700,
                                                    color: 'var(--text-main)',
                                                }}>
                                                    {mod.name}
                                                    {mod.highlight && (
                                                        <span style={{
                                                            color: 'var(--accent-gold)',
                                                            marginLeft: '0.3rem',
                                                        }}>★</span>
                                                    )}
                                                </div>
                                                <div style={{
                                                    fontSize: '0.7rem',
                                                    color: 'var(--text-muted)',
                                                }}>
                                                    {mod.tagline}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
}
