'use client';

import React, { useRef } from "react";
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    MotionValue,
} from "framer-motion";
import Link from "next/link";
import {
    IconSword,
    IconHammer,
    IconShieldLock,
    IconScript,
    IconSparkles,
} from "@tabler/icons-react";
import { useSound } from "@/context/SoundContext";

const Navbar = () => {
    const { playSwap } = useSound(); // Removed playButton

    const items = [
        {
            title: "Comenzar",
            icon: <IconSword className="h-full w-full" />,
            href: "/",
            onClick: () => { playSwap(); }, // Only swap sound
        },
        {
            title: "Forjar",
            icon: <IconHammer className="h-full w-full" />,
            href: "/instalar",
            onClick: () => { playSwap(); },
        },
        {
            title: "Reino",
            icon: <IconShieldLock className="h-full w-full" />,
            href: "/server",
            onClick: () => { playSwap(); },
        },
        {
            title: "Crónicas",
            icon: <IconScript className="h-full w-full" />,
            href: "/lore",
            onClick: () => { playSwap(); },
        },
        {
            title: "Hallazgos",
            icon: <IconSparkles className="h-full w-full" />,
            href: "/galeria",
            onClick: () => { playSwap(); },
        },
    ];

    return (
        <header>
            {/* Logo Image - Fixed at Top-Left, explicitly small */}
            <div
                className="fixed z-[120] pointer-events-none"
                style={{ top: '1.5rem', left: '1.5rem' }}
            >
                <img
                    src="/logo/logo.png"
                    alt="Netherious Logo"
                    style={{
                        height: '70px',
                        width: 'auto',
                        display: 'block',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 0 10px rgba(99, 102, 241, 0.4))'
                    }}
                />
            </div>

            {/* Navbar + Centered Title Container */}
            <div
                className="fixed z-[100] flex flex-col items-center pointer-events-none"
                style={{ top: '1.5rem', left: '50%', transform: 'translateX(-50%)' }}
            >
                {/* Navbar Dock Container */}
                <div className="pointer-events-auto">
                    <FloatingDock items={items} />
                </div>

                {/* NETHERIOUS Title - Centered below Dock where the logo used to be */}
                <div className="mt-5 flex flex-col items-center opacity-90">
                    <span
                        className="text-2xl md:text-4xl font-black tracking-[0.5em] text-white pixel-text uppercase"
                        style={{ textShadow: '0 0 20px rgba(99, 102, 241, 1)' }}
                    >
                        NETHERIOUS
                    </span>
                    <div className="h-1 w-24 bg-accent-primary mt-2 shadow-[0_0_15px_var(--accent-primary)]"></div>
                </div>
            </div>
        </header>
    );
};

const FloatingDock = ({
    items,
}: {
    items: { title: string; icon: React.ReactNode; href: string; onClick?: () => void }[];
}) => {
    let mouseX = useMotionValue(Infinity);

    return (
        <motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className="flex h-16 md:h-20 gap-3 md:gap-5 items-center rounded-2xl px-4 md:px-6"
            style={{
                border: '1px solid var(--glass-border)',
                background: 'var(--glass)',
                backdropFilter: 'blur(16px)',
            }}
        >
            {items.map((item) => (
                <IconContainer mouseX={mouseX} key={item.title} {...item} />
            ))}
        </motion.div>
    );
};

function IconContainer({
    mouseX,
    icon,
    href,
    onClick
}: {
    mouseX: MotionValue;
    title: string;
    icon: React.ReactNode;
    href: string;
    onClick?: () => void;
}) {
    let ref = useRef<HTMLDivElement>(null);

    let distance = useTransform(mouseX, (val: number) => {
        let bounds = ref.current?.getBoundingClientRect() || { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    // Responsive transforms - INCREASED SIZES
    // Base size: 70px, Max magnification: 120px
    let widthTransform = useTransform(distance, [-150, 0, 150], [70, 120, 70]);
    let heightTransform = useTransform(distance, [-150, 0, 150], [70, 120, 70]);

    let widthIconTransform = useTransform(distance, [-150, 0, 150], [42, 70, 42]);
    let heightIconTransform = useTransform(distance, [-150, 0, 150], [42, 70, 42]);

    let width = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 });
    let height = useSpring(heightTransform, { mass: 0.1, stiffness: 150, damping: 12 });

    let widthIcon = useSpring(widthIconTransform, { mass: 0.1, stiffness: 150, damping: 12 });
    let heightIcon = useSpring(heightIconTransform, { mass: 0.1, stiffness: 150, damping: 12 });

    return (
        <Link href={href} onClick={onClick}>
            <motion.div
                ref={ref}
                style={{ width, height }}
                className="rounded-full flex items-center justify-center relative hover:bg-white/5 transition-colors aspect-square"
            >
                <motion.div
                    style={{ width: widthIcon, height: heightIcon }}
                    className="flex items-center justify-center text-neutral-300"
                >
                    {icon}
                </motion.div>
            </motion.div>
        </Link>
    );
}

export default Navbar;
