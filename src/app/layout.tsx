import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import UploadInterceptor from '@/components/UploadInterceptor';
import { AuthProvider } from '@/contexts/AuthContext';
import Navbar from '@/components/Navigation/Navbar'; // ← Nueva importación
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'VRYNO - Plataforma de Videos',
  description: 'La mejor plataforma para compartir y descubrir videos',
  keywords: 'videos, streaming, contenido, compartir, descubrir',
  authors: [{ name: 'Equipo VRYNO' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" 
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer" 
        />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          {/* ↓ Navbar añadido aquí ↓ */}
          <Navbar />
          <main>
            {children}
          </main>
          {/* ↑ Fin del navbar ↑ */}
        </AuthProvider>
        <UploadInterceptor />
      </body>
    </html>
  );
}