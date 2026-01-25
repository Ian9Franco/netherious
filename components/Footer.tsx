'use client';

import React, { useState } from 'react';
import { IconBrandInstagram, IconBrandLinkedin, IconBrandGithub, IconWorld } from '@tabler/icons-react';

const SocialLink = ({ href, icon, hoverColor }: { href: string, icon: React.ReactNode, hoverColor: string }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            style={{
                width: '46px',
                height: '46px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: isHovered ? hoverColor : '#1a1a1a',
                border: '3px solid #333',
                color: isHovered ? 'white' : '#777',
                borderRadius: '4px',
                transition: 'all 0.15s ease',
                boxShadow: isHovered ? `0 0 20px ${hoverColor}66` : 'none',
                cursor: 'none',
                textDecoration: 'none',
                position: 'relative',
                zIndex: 150
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {icon}
        </a>
    );
};

export default function Footer() {
    return (
        <footer style={{
            backgroundColor: '#050505', // Absolute solid black
            padding: '2.5rem 2rem',
            borderTop: '6px solid #1a1a1a',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '2rem',
            position: 'relative',
            zIndex: 10,
            marginTop: 'auto'
        }}>
            <div style={{ display: 'flex', gap: '1.2rem' }}>
                <SocialLink
                    href="https://www.instagram.com/ian.franco._/"
                    icon={<IconBrandInstagram size={24} />}
                    hoverColor="#E1306C"
                />
                <SocialLink
                    href="https://www.linkedin.com/in/ian-franco-collada-pontorno/"
                    icon={<IconBrandLinkedin size={24} />}
                    hoverColor="#0077B5"
                />
                <SocialLink
                    href="https://github.com/Ian9Franco"
                    icon={<IconBrandGithub size={24} />}
                    hoverColor="#333"
                />
                <SocialLink
                    href="https://ian-pontorno-portfolio.vercel.app/"
                    icon={<IconWorld size={24} />}
                    hoverColor="#6366f1"
                />
            </div>

            <div style={{ textAlign: 'right', color: '#555', fontSize: '0.85rem', fontFamily: 'monospace' }}>
                <div style={{ marginBottom: '0.4rem', color: '#999', fontWeight: 'bold' }}>ian9franco@gmail.com</div>
                <div>© 2026 Ian Pontorno - Todos los derechos reservados.</div>
            </div>
        </footer>
    );
}
