'use client';
import React, { useState } from 'react';
import loreData from '@/data/lore.json';
import { motion, AnimatePresence } from 'framer-motion';
import { Typewriter } from '@/components/Typewriter';
import { IconSparkles, IconWorld, IconMap, IconSword, IconBuildingFortress, IconPlanet, IconHeart, IconTrendingUp, IconBug, IconSkull, IconTools, IconSettings } from '@tabler/icons-react';

const categoryIcons: Record<string, React.ReactNode> = {
    world_structures: <IconBuildingFortress size={18} />,
    bosses_and_combat: <IconSword size={18} />,
    worlds_and_dimensions: <IconPlanet size={18} />,
    vanilla_plus: <IconHeart size={18} />,
    rpg_progression: <IconTrendingUp size={18} />,
    wildlife_and_creatures: <IconBug size={18} />,
    hostile_mobs: <IconSkull size={18} />,
    herramientas: <IconTools size={18} />,
    tecnologia: <IconSettings size={18} />,
};

export default function LorePage() {
    const [activeCategory, setActiveCategory] = useState(loreData.categories[0].id);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const currentCategory = loreData.categories.find(c => c.id === activeCategory);

    if (!currentCategory) return null;

    return (
        <motion.section
            initial={false}
            animate={{ opacity: 1 }}
            className="section"
        >
            {/* Lightbox remains same... */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 1000,
                            backgroundColor: 'rgba(0,0,0,0.9)',
                            backdropFilter: 'blur(10px)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '2rem',
                            cursor: 'pointer'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="glass"
                            style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh', padding: '10px' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={`/lore${selectedImage}`}
                                alt="Lore Detail"
                                style={{ maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: '4px' }}
                                onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${selectedImage}/1280/720`; }}
                            />
                            <div
                                style={{ position: 'absolute', top: '20px', right: '20px', color: 'white', fontWeight: 900, fontSize: '1.5rem' }}
                                onClick={() => setSelectedImage(null)}
                            >✕</div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Intro remains same... */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                style={{ textAlign: 'center', marginBottom: '6rem' }}
            >
                <h1 className="gradient-text" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', marginBottom: '2rem' }}>
                    <Typewriter text={loreData.intro.title} speed={25} />
                </h1>
                <div className="glass" style={{ padding: '3rem', maxWidth: '1000px', margin: '0 auto', background: 'rgba(255,255,255,0.01)' }}>
                    <p style={{ marginBottom: '1.5rem', lineHeight: '2', fontSize: '1.2rem' }}>
                        <Typewriter text={loreData.intro.paragraph1} speed={10} delay={0.5} />
                    </p>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.1rem' }}>
                        <Typewriter text={loreData.intro.paragraph2} speed={10} delay={1.5} />
                    </p>
                </div>
            </motion.div>

            <div className="lore-layout" style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(280px, 1fr) 3fr',
                gap: '2.5rem',
                alignItems: 'start'
            }}>
                <aside style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', position: 'sticky', top: '10rem' }}>
                    <h4 style={{ paddingLeft: '1rem', marginBottom: '0.5rem', fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px' }}>
                        Explorar Mundo
                    </h4>
                    {loreData.categories.map((cat: any) => (
                        <motion.button
                            key={cat.id}
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setActiveCategory(cat.id)}
                            className="glass"
                            style={{
                                textAlign: 'left',
                                padding: '1.2rem 1.5rem',
                                border: activeCategory === cat.id ? '1px solid var(--accent-primary)' : '1px solid var(--glass-border)',
                                backgroundColor: activeCategory === cat.id ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                                color: activeCategory === cat.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                                fontSize: '0.95rem',
                                fontWeight: 700,
                                transition: 'all 0.3s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                width: '100%'
                            }}
                        >
                            <div style={{ padding: '0.4rem', borderRadius: '8px', background: activeCategory === cat.id ? 'var(--accent-primary)' : 'var(--glass-border)', color: activeCategory === cat.id ? 'white' : 'inherit' }}>
                                {categoryIcons[cat.id] || <IconMap size={18} />}
                            </div>
                            <Typewriter text={cat.title} speed={20} />
                        </motion.button>
                    ))}
                </aside>

                <AnimatePresence mode="wait" initial={false}>
                    <motion.main
                        key={activeCategory}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4 }}
                        className="glass"
                        style={{ padding: 'clamp(2rem, 5vw, 4rem)', minHeight: '600px' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem', gap: '2rem', flexWrap: 'wrap' }}>
                            <div style={{ flex: 1, minWidth: '300px' }}>
                                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                                    <Typewriter key={`title-${activeCategory}`} text={currentCategory.title} speed={30} />
                                </h2>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                                    <Typewriter key={`desc-${activeCategory}`} text={currentCategory.description} speed={10} delay={0.5} />
                                </p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-secondary)', fontWeight: 800 }}>
                                <IconWorld size={20} /> <span style={{ fontSize: '0.9rem' }}>DESCUBRIMIENTO</span>
                            </div>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                            gap: '1.2rem',
                            marginBottom: '4rem'
                        }}>
                            {currentCategory.images.map((img: string, i: number) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.05, rotate: 1 }}
                                    onClick={() => setSelectedImage(img)}
                                    className="glass"
                                    style={{ height: '160px', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }}
                                >
                                    <img
                                        src={`/lore${img}`}
                                        alt="Preview"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                                        onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${img}/400/300`; }}
                                    />
                                </motion.div>
                            ))}
                        </div>

                        <div style={{ padding: '3rem', background: 'rgba(0,0,0,0.2)', borderRadius: '24px', border: '1px solid var(--glass-border)' }}>
                            <h4 style={{ marginBottom: '2rem', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '1.1rem', fontWeight: 900 }}>
                                <IconSparkles size={20} /> MODS QUE TRANSFORMAN EL JUEGO
                            </h4>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                                {currentCategory.details.map((detail: string, i: number) => (
                                    <motion.div
                                        key={`${activeCategory}-detail-${i}`}
                                        whileHover={{ x: 5, color: 'white' }}
                                        style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', gap: '0.8rem', alignItems: 'flex-start', padding: '0.4rem' }}
                                    >
                                        <span style={{ color: 'var(--accent-primary)', fontSize: '1.2rem', lineHeight: 1 }}>•</span>
                                        <Typewriter text={detail} speed={10} delay={0.5 + i * 0.1} />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.main>
                </AnimatePresence>
            </div>

            <style jsx>{`
        @media (max-width: 1100px) {
          .lore-layout {
            grid-template-columns: 1fr !important;
          }
          aside {
            position: relative !important;
            top: 0 !important;
            margin-bottom: 3rem;
          }
        }
      `}</style>
        </motion.section>
    );
}
