import type { Metadata } from 'next';
import TermsOfServiceContent from '@/components/pages/TermsOfServiceContent';

export const metadata: Metadata = {
  title: 'Términos y Condiciones — SuperPinStore',
  description:
    'Lee los Términos y Condiciones de compra, envío, devoluciones y uso del sitio superpinstore.com.',
  alternates: { canonical: 'https://superpinstore.com/terminos' },
};

export default function Page() {
  return <TermsOfServiceContent />;
}
