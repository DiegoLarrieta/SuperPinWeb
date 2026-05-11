import type { Metadata } from 'next';
import PrivacyPolicyContent from '@/components/pages/PrivacyPolicyContent';

export const metadata: Metadata = {
  title: 'Política de Privacidad — SuperPinStore',
  description:
    'Conoce cómo SuperPinStore recopila, usa y protege tu información personal. Cumplimiento con la LFPDPPP.',
  alternates: { canonical: 'https://superpinstore.com/privacidad' },
};

export default function Page() {
  return <PrivacyPolicyContent />;
}
