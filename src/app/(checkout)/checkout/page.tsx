import type { Metadata } from 'next';
import CheckoutContent from '@/components/pages/CheckoutContent';

export const metadata: Metadata = {
  title: 'Checkout — SuperPinStore',
  description: 'Completa tu pedido de SuperPin. Pago seguro con tarjeta, MercadoPago o WhatsApp.',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <CheckoutContent />;
}
