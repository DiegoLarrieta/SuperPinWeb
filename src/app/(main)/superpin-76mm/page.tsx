import type { Metadata } from 'next';
import ProductPageContent from '@/components/pages/ProductPageContent';

export const metadata: Metadata = {
  title: 'SuperPin 7.6mm — Kit de 2 Piezas para Dropset',
  description:
    'SuperPin 7.6mm: compatible con el 95% de las máquinas selectorizadas. Kit de 2 piezas + bolsa cubre polvos. 73g · 15cm · Acero premium. $799 MXN · Envío GRATIS · 142 reseñas ★★★★★',
  alternates: { canonical: 'https://superpinstore.com/superpin-76mm' },
  openGraph: {
    title: 'SuperPin 7.6mm — Kit de 2 Piezas para Dropset Automático',
    description:
      'Compatible con el 95% de las máquinas de gym. Kit de 2 piezas + bolsa. $799 MXN · Envío GRATIS.',
    url: 'https://superpinstore.com/superpin-76mm',
    type: 'website',
    images: [{ url: '/assets/product-7.6-main.png', width: 800, height: 800, alt: 'SuperPin 7.6mm' }],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'SuperPin 7.6mm',
  description:
    'Pin automático para dropsets de gym. Diámetro 7.6mm, compatible con el 95% de las máquinas selectorizadas. Kit de 2 piezas + bolsa cubre polvos. 73g · 15cm.',
  image: [
    'https://superpinstore.com/assets/product-7.6-main.png',
    'https://superpinstore.com/assets/product-7.6-action.jpg',
    'https://superpinstore.com/assets/product-7.6-pack.jpg',
  ],
  brand: { '@type': 'Brand', name: 'SuperPinStore' },
  sku: 'SP-76MM',
  mpn: 'SP-76MM-2PCS',
  color: 'Negro',
  material: 'Acero + polímero técnico',
  offers: {
    '@type': 'Offer',
    price: '799',
    priceCurrency: 'MXN',
    priceValidUntil: '2026-12-31',
    availability: 'https://schema.org/InStock',
    itemCondition: 'https://schema.org/NewCondition',
    url: 'https://superpinstore.com/superpin-76mm',
    seller: { '@type': 'Organization', name: 'SuperPinStore' },
    shippingDetails: {
      '@type': 'OfferShippingDetails',
      shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'MXN' },
      shippingDestination: {
        '@type': 'DefinedRegion',
        addressCountry: 'MX',
      },
      deliveryTime: {
        '@type': 'ShippingDeliveryTime',
        transitTime: { '@type': 'QuantitativeValue', minValue: 3, maxValue: 5, unitCode: 'DAY' },
      },
    },
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: '142',
    bestRating: '5',
    worstRating: '1',
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductPageContent productId="product-76" />
    </>
  );
}
