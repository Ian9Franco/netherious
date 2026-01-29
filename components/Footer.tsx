'use client';

import React from 'react';
import { IconBrandInstagram, IconBrandLinkedin, IconBrandGithub, IconWorld } from '@tabler/icons-react';
import { motion } from 'framer-motion';

const SocialLink = ({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) => {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -2 }}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                background: 'var(--color-dark)',
                border: '2px solid var(--color-mid)',
                color: 'var(--color-light)',
                transition: 'all 0.1s ease',
                textDecoration: 'none',
            }}
            title={label}
        >
            {icon}
        </motion.a>
    );
};

export default function Footer() {
    return (
        <footer style={{
            background: 'var(--color-darkest)',
            borderTop: '4px solid var(--color-dark)',
            padding: '1rem 1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            marginLeft: '120px', // Account for sidebar
        }}>
            {/* Social links */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <SocialLink
                    href="https://www.instagram.com/ian.franco._/"
                    icon={<IconBrandInstagram size={18} />}
                    label="Instagram"
                />
                <SocialLink
                    href="https://www.linkedin.com/in/ian-franco-collada-pontorno/"
                    icon={<IconBrandLinkedin size={18} />}
                    label="LinkedIn"
                />
                <SocialLink
                    href="https://github.com/Ian9Franco"
                    icon={<IconBrandGithub size={18} />}
                    label="GitHub"
                />
                <SocialLink
                    href="https://ian-pontorno-portfolio.vercel.app/"
                    icon={<IconWorld size={18} />}
                    label="Website"
                />
            </div>

            {/* Copyright */}
            <div style={{
                textAlign: 'right',
            }}>
                <div style={{
                    color: 'var(--color-light)',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    letterSpacing: '1px',
                }}>
                    ian9franco@gmail.com
                </div>
                <div style={{
                    color: 'var(--color-mid)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.5px',
                }}>
                    © 2026 Ian Pontorno
                </div>
            </div>
        </footer>
    );
}
