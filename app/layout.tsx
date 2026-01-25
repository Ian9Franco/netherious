import { Silkscreen } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import BackgroundManager from '@/components/BackgroundManager';
import { SoundProvider } from '@/context/SoundContext';
import Footer from '@/components/Footer';

const silkscreen = Silkscreen({
    weight: ['400', '700'],
    subsets: ['latin'],
    display: 'swap',
});

export const metadata = {
    title: 'Netherious | RPG Expansion Minecraft Server',
    description: 'Netherious es el mejor servidor de Minecraft RPG con mods. Mejor que Hypixel, mejor que todo. Entra si tenés lo que hay que tener.',
};

import CustomCursor from '@/components/CustomCursor';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es" style={{ cursor: 'none' }}>
            <body className={silkscreen.className} style={{ cursor: 'none' }}>
                <CustomCursor />
                <div className="scroll-mask" />
                <SoundProvider>
                    <BackgroundManager />
                    <Navbar />
                    <div className="main-wrapper">
                        <main style={{ paddingTop: '18rem', paddingBottom: '4rem' }}>
                            {children}
                        </main>
                        <Footer />
                    </div>
                </SoundProvider>
            </body>
        </html>
    );
}
