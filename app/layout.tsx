import { Silkscreen } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import BackgroundManager from '@/components/BackgroundManager';
import { SoundProvider } from '@/context/SoundContext';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';

const silkscreen = Silkscreen({
    weight: ['400', '700'],
    subsets: ['latin'],
    display: 'swap',
});

export const metadata = {
    title: 'Netherious | RPG Expansion Minecraft Server',
    description: 'Netherious es el mejor servidor de Minecraft RPG con mods. Mejor que Hypixel, mejor que todo. Entra si tenés lo que hay que tener.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es" style={{ cursor: 'none' }}>
            <body className={silkscreen.className} style={{ cursor: 'none' }}>
                <CustomCursor />
                <SoundProvider>
                    <BackgroundManager />
                    <Navbar />
                    <div className="main-wrapper">
                        {/* Main content area - offset for header and sidebar */}
                        <main style={{
                            marginTop: '48px',      // Header height
                            marginLeft: '120px',    // Sidebar width
                            padding: '1.5rem',
                            minHeight: 'calc(100vh - 48px)',
                        }}>
                            {/* Book page container */}
                            <div className="book-page" style={{
                                minHeight: 'calc(100vh - 48px - 6rem)',
                                padding: 'clamp(1rem, 3vw, 2rem)',
                            }}>
                                {children}
                            </div>
                        </main>
                        <Footer />
                    </div>
                </SoundProvider>
            </body>
        </html>
    );
}
