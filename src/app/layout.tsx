import type { Metadata } from 'next';
import { Inter, Iceland } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import CartDrawer from '@/components/CartDrawer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const iceland = Iceland({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://superpinstore.com'),
  title: {
    template: '%s | SuperPinStore',
    default: 'SuperPin — Pin para Dropset Automático | SuperPinStore',
  },
  description:
    'SuperPin cambia el peso de tus máquinas de gym automáticamente. Kit de 2 piezas para dropsets de 3 niveles sin interrupciones. $799 MXN · Envío GRATIS · ★★★★★ 228 reseñas.',
  keywords: [
    'superpin',
    'pin para gym',
    'dropset automático',
    'accesorio gym',
    'cambio de peso automático',
    'pin selectorizador',
    'entrenamiento gym mexico',
  ],
  openGraph: {
    siteName: 'SuperPinStore',
    locale: 'es_MX',
    type: 'website',
    images: [{ url: '/assets/product-7.6-main.png', width: 800, height: 800 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@superpinstore',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://superpinstore.com',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${iceland.variable}`}>
      <body>
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
