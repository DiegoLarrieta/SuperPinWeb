import type { Metadata } from 'next';
import ProductPageContent from '@/components/pages/ProductPageContent';

export const metadata: Metadata = {
  title: 'SuperPin 9.5mm — Pin Profesional para Dropset',
  description:
    'SuperPin 9.5mm: diseñado para máquinas con placas grandes y cargas pesadas. Kit de 2 piezas + bolsa cubre polvos. Acero alta resistencia. $799 MXN · Envío GRATIS · 86 reseñas ★★★★★',
  alternates: { canonical: 'https://superpinstore.com/superpin-95mm' },
  openGraph: {
    title: 'SuperPin 9.5mm — Pin Profesional para Dropset Automático',
    description:
      'Para máquinas con placas grandes. Kit de 2 piezas + bolsa. Máxima durabilidad. $799 MXN · Envío GRATIS.',
    url: 'https://superpinstore.com/superpin-95mm',
    type: 'website',
    images: [{ url: '/assets/product-9.5-main.png', width: 800, height: 800, alt: 'SuperPin 9.5mm' }],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'SuperPin 9.5mm',
  description:
    'Pin automático para dropsets de gym. Diámetro 9.5mm para máquinas con placas grandes. Kit de 2 piezas + bolsa cubre polvos. Acero de alta resistencia + polímero técnico.',
  image: [
    'https://superpinstore.com/assets/product-9.5-main.png',
    'https://superpinstore.com/assets/product-9.5-elite.jpg',
    'https://superpinstore.com/assets/product-9.5-box.jpg',
  ],
  brand: { '@type': 'Brand', name: 'SuperPinStore' },
  sku: 'SP-95MM',
  mpn: 'SP-95MM-2PCS',
  color: 'Negro',
  material: 'Acero alta resistencia + polímero técnico',
  offers: {
    '@type': 'Offer',
    price: '799',
    priceCurrency: 'MXN',
    priceValidUntil: '2026-12-31',
    availability: 'https://schema.org/InStock',
    itemCondition: 'https://schema.org/NewCondition',
    url: 'https://superpinstore.com/superpin-95mm',
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
    reviewCount: '86',
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
      <ProductPageContent productId="product-95" />
    </>
  );
}
