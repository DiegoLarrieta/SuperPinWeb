import type { Metadata } from 'next';
import HowToPageContent from '@/components/pages/HowToPageContent';

export const metadata: Metadata = {
  title: 'Cómo Usar el SuperPin — Guía de Dropsets Automáticos',
  description:
    'Aprende a usar el SuperPin en 4 pasos. Configura dropsets de 3 niveles automáticos en tus máquinas de gym en menos de 10 segundos. Preguntas frecuentes incluidas.',
  alternates: { canonical: 'https://superpinstore.com/como-usar' },
  openGraph: {
    title: 'Cómo Usar el SuperPin — Guía de Dropsets Automáticos',
    description:
      'Cuatro pasos, menos de 10 segundos en aprender. Resultados inmediatos en cada entrenamiento.',
    url: 'https://superpinstore.com/como-usar',
    images: [{ url: '/assets/product-7.6-main.png' }],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Cómo usar el SuperPin para hacer Dropsets Automáticos',
  description:
    'Cuatro pasos para configurar el SuperPin y realizar dropsets automáticos de 3 niveles en cualquier máquina de gym.',
  totalTime: 'PT10S',
  supply: [
    { '@type': 'HowToSupply', name: 'SuperPin 7.6mm o 9.5mm (kit de 2 piezas)' },
    { '@type': 'HowToSupply', name: 'Máquina de gimnasio con pin selectorizador' },
  ],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Primer SuperPin — peso máximo',
      text: 'Acopla el primer SuperPin en el mayor peso con el que iniciarás tu serie. El mecanismo encaja al instante — escucharás un click que confirma que la placa está bloqueada.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Segundo SuperPin — peso intermedio',
      text: 'Coloca el segundo SuperPin en el peso intermedio. Ambos pines trabajan juntos para que el cambio de peso suceda de forma instantánea entre niveles.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Pin de la máquina — peso liviano',
      text: 'Coloca el pin original de la máquina en el peso más liviano. Tienes un dropset de 3 niveles configurado. Cero interrupciones durante el entrenamiento.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Entrena — el peso cambia solo',
      text: 'Realiza tus series sin parar. El SuperPin reduce el peso automáticamente en cada nivel: de pesado a intermedio a liviano sin soltar la barra.',
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
      <HowToPageContent />
    </>
  );
}
