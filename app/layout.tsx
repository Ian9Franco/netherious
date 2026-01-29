import { Silkscreen } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import BackgroundManager from '@/components/BackgroundManager';
import { SoundProvider } from '@/context/SoundContext';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import BookPage from '@/components/BookPage';
import PageTransition from '@/components/PageTransition';

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
                        {/* Main content area - two-page book spread */}
                        <main style={{
                            marginTop: '48px',      // Header height
                            marginLeft: '110px',    // Space for ribbon tabs
                            marginRight: '110px',   // Symmetric margin on right
                            padding: '1rem',
                            minHeight: 'calc(100vh - 48px)',
                        }}>
                            {/* Book page container with pixel art styling */}
                            <BookPage 
                                title="Netherious"
                                showStamp={true}
                            >
                                <PageTransition>
                                    {children}
                                </PageTransition>
                            </BookPage>
                        </main>
                        <Footer />
                    </div>
                </SoundProvider>
            </body>
        </html>
    );
}

