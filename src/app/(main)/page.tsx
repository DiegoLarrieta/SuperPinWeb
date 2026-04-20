import type { Metadata } from 'next';
import HomePage from '@/components/pages/HomePage';

export const metadata: Metadata = {
  title: 'SuperPin — Pin para Dropset Automático | SuperPinStore',
  description:
    'SuperPin cambia el peso de tus máquinas de gym automáticamente. Kit de 2 piezas para dropsets de 3 niveles. $799 MXN · Envío GRATIS · ★★★★★ 228 reseñas verificadas.',
  alternates: { canonical: 'https://superpinstore.com/' },
  openGraph: {
    title: 'SuperPin — Pin para Dropset Automático',
    description:
      'Kit de 2 piezas para dropsets de 3 niveles en tus máquinas de gym. Cambio automático de peso en menos de 2 segundos.',
    url: 'https://superpinstore.com/',
    images: [{ url: '/assets/product-7.6-main.png' }],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: 'SuperPinStore',
      url: 'https://superpinstore.com',
      description: 'Tienda oficial de SuperPin — accesorios para dropsets automáticos en el gym',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://superpinstore.com/?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Organization',
      name: 'SuperPinStore',
      url: 'https://superpinstore.com',
      logo: 'https://superpinstore.com/assets/logo-white.png',
      sameAs: [
        'https://www.tiktok.com/@superpinstore',
        'https://www.instagram.com/superpinstore/',
        'https://www.facebook.com/Sup.PinStore',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+52-771-232-5019',
        contactType: 'customer service',
        availableLanguage: 'Spanish',
        contactOption: 'TollFree',
      },
    },
    {
      '@type': 'ItemList',
      name: 'Productos SuperPin',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'SuperPin 7.6mm',
          url: 'https://superpinstore.com/superpin-76mm',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'SuperPin 9.5mm',
          url: 'https://superpinstore.com/superpin-95mm',
        },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePage />
    </>
  );
}
