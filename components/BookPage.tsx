"use client";
import React, { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
    IconSword,
    IconHammer,
    IconShieldLock,
    IconBook,
    IconPhoto,
    IconFlask,
} from "@tabler/icons-react";
import { useSound } from "@/context/SoundContext";
import "./BookPage.css";
import "./BookPages.css";

export interface BookPageProps {
    title?: string;
    showStamp?: boolean;
    stampIcon?: ReactNode;
    children: ReactNode;
}

const NAV_ITEMS = [
    { title: "Inicio", icon: IconSword, href: "/" },
    { title: "Forjar", icon: IconHammer, href: "/instalar" },
    { title: "Reino", icon: IconShieldLock, href: "/server" },
    { title: "Lore", icon: IconBook, href: "/lore" },
    { title: "Galeria", icon: IconPhoto, href: "/galeria" },
];

export default function BookPage({
    title,
    showStamp = true,
    stampIcon,
    children,
}: BookPageProps) {
    const { playSwap } = useSound();
    const pathname = usePathname();

    return (
        <div className="book-spread">
            {/* LEFT PAGE */}
            <div className="book-page book-page-left">
                {/* Ribbon tabs */}
                <nav className="book-ribbon-nav">
                    {NAV_ITEMS.map((item, index) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.title}
                                href={item.href}
                                onClick={() => playSwap()}
                                style={{ textDecoration: 'none' }}
                            >
                                <motion.div
                                    className={`book-ribbon-tab ${isActive ? 'active' : ''}`}
                                    initial={{ x: -100, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: index * 0.1, duration: 0.4 }}
                                    whileHover={{ x: isActive ? 0 : 10 }}
                                >
                                    <Icon size={14} className="book-ribbon-icon" />
                                    <span className="book-ribbon-text">{item.title}</span>
                                </motion.div>
                            </Link>
                        );
                    })}
                </nav>

                {/* Title Banner */}
                {title && (
                    <div className="book-title-banner">
                        <span className="book-title-text">{title}</span>
                    </div>
                )}

                {/* Left page content */}
                <div className="book-page-content">
                    {children}
                </div>

                {/* Corner Fold */}
                <div className="book-corner-fold" />
            </div>

            {/* RIGHT PAGE */}
            <div className="book-page book-page-right">
                <div className="book-page-binding" />
                
                {/* Right page is empty - for future overflow */}
                <div className="book-page-content book-page-content-right">
                    {/* Empty */}
                </div>

                {showStamp && (
                    <div className="book-stamp">
                        <span className="book-stamp-icon">
                            {stampIcon || <IconFlask size={20} />}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
