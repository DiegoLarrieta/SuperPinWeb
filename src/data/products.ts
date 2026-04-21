import type { Product } from '@/types';

export const PRODUCT_DATA: Record<string, Product> = {
  'product-76': {
    id: 'product-76',
    name: 'SuperPin 7.6mm',
    tagline: 'El más vendido. Compatible con el 95% de las máquinas.',
    price: 799,
    stars: 5,
    reviews: 142,
    badge: 'MÁS VENDIDO',
    badgeColor: '#CAFF00',
    badgeTextColor: '#000',
    images: [
      '/assets/product-7.6-main.png',
      '/assets/product-7.6-action.jpg',
      '/assets/product-7.6-pack.jpg',
    ],
    includes: ['2 SuperPins 7.6mm', '1 bolsa cubre polvos'],
    shortDesc:
      'Con un diámetro universal de 7.6 mm, el favorito de los usuarios. Viene en par (2 piezas) para hacer dropsets de 3 niveles sin interrupciones.',
    description:
      'El SuperPin 7.6mm es un artefacto que de manera automática cambia el peso de las máquinas, ayudando a realizar Dropsets de manera mucho más eficaz. Cada kit incluye 2 piezas para ejecutar dropsets de 3 niveles: primer pin en el peso mayor, segundo pin en el peso intermedio, y el pin de la máquina en el peso más liviano. Realiza tus series sin interrupciones — el SuperPin automáticamente reducirá el peso.',
    features: [
      {
        icon: '×2',
        title: 'Kit de 2 piezas',
        desc: 'Incluye 2 SuperPins + bolsa cubre polvos. Listo para dropsets de 3 niveles desde el primer día.',
      },
      {
        icon: '⚡',
        title: 'Compatible con 95% de máquinas',
        desc: 'Diámetro universal de 7.6mm — encaja en prácticamente todas las máquinas selectorizadas.',
      },
      {
        icon: '🔄',
        title: 'Dropsets automáticos',
        desc: 'Cambia el peso de forma instantánea sin parar tu set ni perder intensidad.',
      },
      {
        icon: '🔩',
        title: 'Construcción premium',
        desc: 'Acero de alta resistencia + polímero técnico. 73g — ligero y duradero.',
      },
    ],
    specs: [
      { label: 'Diámetro', value: '7.6 mm' },
      { label: 'Largo', value: '15 cm' },
      { label: 'Peso', value: '73 g por pieza' },
      { label: 'Piezas incluidas', value: '2 SuperPins + bolsa' },
      { label: 'Material', value: 'Acero + polímero técnico' },
      { label: 'Compatibilidad', value: 'Universal — 95% de máquinas' },
      { label: 'Marca', value: 'SuperPinStore' },
      { label: 'Color', value: 'Negro' },
    ],
  },
  'product-95': {
    id: 'product-95',
    name: 'SuperPin 9.5mm',
    tagline: 'Potencia y resistencia para entrenamientos avanzados.',
    price: 799,
    stars: 5,
    reviews: 86,
    badge: 'PRO',
    badgeColor: 'transparent',
    badgeTextColor: '#CAFF00',
    badgeBorder: '1px solid #CAFF00',
    images: [
      '/assets/product-9.5-pack.jpg',
      '/assets/product-9.5-elite.jpg',
      '/assets/product-9.5-box.jpg',
    ],
    includes: ['2 SuperPins 9.5mm', '1 bolsa cubre polvos'],
    shortDesc:
      'Diseñado para máquinas con placas grandes y cargas pesadas. Kit de 2 piezas para dropsets de 3 niveles de alta intensidad.',
    description:
      'El SuperPin 9.5mm es un artefacto que de manera automática cambia el peso de las máquinas con placas grandes, ayudando a realizar Dropsets avanzados de manera mucho más eficaz. Viene con 2 piezas para ejecutar dropsets de 3 niveles: primer pin en el peso mayor, segundo pin en el peso intermedio, y el pin de la máquina en el peso más liviano. Su construcción con acero de alta resistencia y polímero técnico garantiza durabilidad bajo las condiciones de entrenamiento más intensas.',
    features: [
      {
        icon: '×2',
        title: 'Kit de 2 piezas',
        desc: 'Incluye 2 SuperPins 9.5mm + bolsa cubre polvos. Dropsets de 3 niveles desde el primer día.',
      },
      {
        icon: '💪',
        title: 'Para cargas pesadas',
        desc: 'Mayor diámetro diseñado para máquinas con placas de gran tamaño.',
      },
      {
        icon: '🔩',
        title: 'Máxima durabilidad',
        desc: 'Acero de alta resistencia + polímero técnico. Construido para entrenamientos intensos.',
      },
      {
        icon: '🎯',
        title: 'Estabilidad superior',
        desc: '9.5mm de agarre — más seguridad y estabilidad en cada repetición.',
      },
    ],
    specs: [
      { label: 'Diámetro', value: '9.5 mm' },
      { label: 'Largo', value: '15 cm' },
      { label: 'Peso', value: '94 g por pieza' },
      { label: 'Piezas incluidas', value: '2 SuperPins + bolsa' },
      { label: 'Material', value: 'Acero alta resistencia + polímero técnico' },
      { label: 'Compatibilidad', value: 'Máquinas con placas grandes' },
      { label: 'Marca', value: 'SuperPinStore' },
      { label: 'Color', value: 'Negro' },
    ],
  },
};
