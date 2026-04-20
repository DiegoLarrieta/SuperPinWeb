'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { PRODUCT_DATA } from '@/data/products';

// ── Scroll animation frames (21 frames from product video) ───────────────────
const VIDEO_FRAMES: string[] = Array.from({ length: 21 }, (_, i) =>
  `/assets/frames/f${String(i).padStart(2, '0')}.jpg`
);

interface Chapter {
  progress: [number, number];
  headline: string;
  sub: string;
  tag?: string;
  cta?: string;
  transform: string;
  imgOpacity: number;
}

const CHAPTERS: Chapter[] = [
  {
    progress: [0, 0.25],
    headline: 'Dropsets.\nSin parar.',
    sub: 'SuperPin cambia el peso de tus máquinas automáticamente — en menos de 2 segundos.',
    transform: 'scale(1) rotateY(0deg)',
    imgOpacity: 1,
  },
  {
    progress: [0.25, 0.5],
    headline: 'Kit de\n2 piezas.',
    sub: 'Cada pack incluye 2 SuperPins — para dropsets de 3 niveles sin interrupciones desde el día uno.',
    tag: '✓ Incluye 2 piezas + bolsa',
    transform: 'scale(1.06) rotateY(-5deg)',
    imgOpacity: 1,
  },
  {
    progress: [0.5, 0.75],
    headline: 'Elige tu\nmodelo.',
    sub: 'SuperPin 7.6mm para la mayoría de máquinas. SuperPin 9.5mm para cargas pesadas.',
    tag: '★★★★★  228 reseñas verificadas',
    transform: 'scale(1.06) rotateY(5deg)',
    imgOpacity: 1,
  },
  {
    progress: [0.75, 1],
    headline: '$799 MXN.\nEnvío gratis.',
    sub: 'Entrega en 3–5 días hábiles. Paga con tarjeta, MercadoPago o WhatsApp.',
    cta: 'VER MODELOS',
    transform: 'scale(0.98) rotateY(0deg)',
    imgOpacity: 0.95,
  },
];

// ── ScrollHero ───────────────────────────────────────────────────────────────
function ScrollHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [chapter, setChapter] = useState(0);
  const [imgSrc, setImgSrc] = useState(VIDEO_FRAMES[0]);
  const router = useRouter();

  useEffect(() => {
    VIDEO_FRAMES.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const totalHeight = sectionRef.current.offsetHeight - window.innerHeight;
        const scrolled = -rect.top;
        const progress = Math.max(0, Math.min(1, scrolled / totalHeight));

        let cIdx = 0;
        for (let i = 0; i < CHAPTERS.length; i++) {
          if (progress >= CHAPTERS[i].progress[0]) cIdx = i;
        }
        const c = CHAPTERS[cIdx];
        const cStart = c.progress[0];
        const cEnd = c.progress[1];
        const cp = Math.max(0, Math.min(1, (progress - cStart) / (cEnd - cStart)));

        setChapter(cIdx);

        const fi = Math.min(VIDEO_FRAMES.length - 1, Math.floor(cp * VIDEO_FRAMES.length));
        setImgSrc(VIDEO_FRAMES[fi]);

        if (imgRef.current) {
          imgRef.current.style.transform = `perspective(800px) ${c.transform}`;
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const c = CHAPTERS[chapter];
  const lines = c.headline.split('\n');

  return (
    <section ref={sectionRef} style={{ height: '350vh', position: 'relative' }} aria-label="Hero animado">
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          background: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              chapter === 1
                ? 'radial-gradient(ellipse 60% 60% at 30% 60%, rgba(202,255,0,0.06) 0%, transparent 70%)'
                : chapter === 2
                ? 'radial-gradient(ellipse 60% 60% at 70% 60%, rgba(202,255,0,0.06) 0%, transparent 70%)'
                : 'radial-gradient(ellipse 60% 60% at 50% 60%, rgba(202,255,0,0.04) 0%, transparent 70%)',
            transition: 'background 1s ease',
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        />

        {/* Grid lines */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.03,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        />

        {/* Two-column layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 80,
            maxWidth: 1100,
            width: '100%',
            padding: '0 60px',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Text side */}
          <div key={chapter} style={{ animation: 'fadeUp 0.5s ease forwards' }}>
            {c.tag && (
              <p
                style={{
                  fontSize: 13,
                  color: '#CAFF00',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  marginBottom: 20,
                  opacity: 0.9,
                }}
              >
                {c.tag}
              </p>
            )}
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(52px, 7vw, 88px)',
                letterSpacing: '0.04em',
                lineHeight: 1.0,
                color: '#fff',
                margin: '0 0 24px',
                textTransform: 'uppercase',
              }}
            >
              {lines.map((l, i) => (
                <span key={i} style={{ display: 'block' }}>
                  {l}
                </span>
              ))}
            </h1>
            <p
              style={{
                fontSize: 18,
                color: 'rgba(255,255,255,0.58)',
                lineHeight: 1.65,
                maxWidth: 380,
                marginBottom: 36,
              }}
            >
              {c.sub}
            </p>

            {c.cta && (
              <button
                onClick={() => {
                  const el = document.getElementById('products');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else router.push('/#products');
                }}
                style={{
                  background: '#CAFF00',
                  color: '#000',
                  border: 'none',
                  padding: '16px 36px',
                  fontSize: 14,
                  fontWeight: 800,
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                  letterSpacing: '0.08em',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                {c.cta}
              </button>
            )}

            {/* Chapter dots */}
            <div
              style={{ display: 'flex', gap: 8, marginTop: 40 }}
              role="tablist"
              aria-label="Sección actual"
            >
              {CHAPTERS.map((_, i) => (
                <div
                  key={i}
                  role="tab"
                  aria-selected={i === chapter}
                  aria-label={`Sección ${i + 1}`}
                  style={{
                    width: i === chapter ? 24 : 6,
                    height: 6,
                    borderRadius: 3,
                    background: i === chapter ? '#CAFF00' : 'rgba(255,255,255,0.15)',
                    transition: 'all 0.4s',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Product image */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 480,
              background: '#f5f4f2',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <img
              ref={imgRef}
              src={imgSrc}
              alt={`SuperPin — ${c.headline.replace('\n', ' ')}`}
              style={{
                maxWidth: '88%',
                maxHeight: '88%',
                objectFit: 'contain',
                transition: 'opacity 0.1s ease',
                opacity: c.imgOpacity,
                willChange: 'transform, opacity',
                position: 'relative',
                zIndex: 1,
              }}
            />
          </div>
        </div>

        {/* Scroll hint */}
        {chapter === 0 && (
          <div
            style={{
              position: 'absolute',
              bottom: 36,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              opacity: 0.4,
              animation: 'bounce 2s ease-in-out infinite',
            }}
            aria-hidden="true"
          >
            <span
              style={{ fontSize: 11, letterSpacing: '0.12em', color: '#fff', textTransform: 'uppercase' }}
            >
              Scroll
            </span>
            <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.3)' }} />
          </div>
        )}
      </div>
    </section>
  );
}

// ── SocialProofStrip ─────────────────────────────────────────────────────────
function SocialProofStrip() {
  const stats = [
    { val: '228+', label: 'Reseñas verificadas' },
    { val: '★ 5.0', label: 'Calificación promedio' },
    { val: '< 2 seg', label: 'Cambio de peso' },
    { val: '95%', label: 'Compatibilidad' },
    { val: 'GRATIS', label: 'Envío incluido' },
  ];

  return (
    <section
      aria-label="Estadísticas de confianza"
      style={{
        background: '#0f0f0f',
        borderTop: '1px solid rgba(202,255,0,0.1)',
        borderBottom: '1px solid rgba(202,255,0,0.1)',
        padding: '28px 40px',
      }}
    >
      <dl
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 24,
        }}
      >
        {stats.map((s, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <dt
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: '#CAFF00',
                fontFamily: 'var(--font-display)',
                letterSpacing: '0.05em',
              }}
            >
              {s.val}
            </dt>
            <dd
              style={{
                fontSize: 11,
                color: 'rgba(255,255,255,0.4)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginTop: 4,
              }}
            >
              {s.label}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

// ── ProductGridCard ──────────────────────────────────────────────────────────
interface GridProduct {
  id: string;
  name: string;
  price: number;
  stars: number;
  reviews: number;
  badge: string;
  badgeColor: string;
  badgeTextColor: string;
  tagline: string;
  image: string;
}

function ProductGridCard({ product }: { product: GridProduct }) {
  const [hovered, setHovered] = useState(false);
  const { addToCart, setCartOpen } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, qty: 1 });
    setCartOpen(true);
  };

  const href = product.id === 'product-76' ? '/superpin-76mm' : '/superpin-95mm';

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#111' : '#0a0a0a',
        transition: 'background 0.3s',
        padding: '48px 40px',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      {/* Badge */}
      <div style={{ marginBottom: 24 }}>
        <span
          style={{
            background: product.badgeColor,
            color: product.badgeTextColor,
            fontSize: 10,
            fontWeight: 800,
            padding: '4px 12px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          {product.badge}
        </span>
      </div>

      {/* Image */}
      <div
        style={{
          height: 260,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 32,
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            maxWidth: '80%',
            maxHeight: '100%',
            objectFit: 'contain',
            transition: 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)',
            transform: hovered ? 'scale(1.06) translateY(-6px)' : 'scale(1)',
            filter: 'drop-shadow(0 24px 48px rgba(202,255,0,0.1))',
          }}
        />
      </div>

      <p
        style={{ fontSize: 11, color: '#CAFF00', fontWeight: 600, letterSpacing: '0.06em', marginBottom: 6 }}
        aria-label={`${product.stars} estrellas, ${product.reviews} reseñas`}
      >
        {'★'.repeat(product.stars)}&nbsp;&nbsp;{product.reviews} reseñas
      </p>
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 36,
          letterSpacing: '0.05em',
          color: '#fff',
          marginBottom: 10,
          lineHeight: 1,
        }}
      >
        {product.name}
      </h3>
      <p
        style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, marginBottom: 28, flex: 1 }}
      >
        {product.tagline}
      </p>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ fontSize: 28, fontWeight: 800, color: '#CAFF00', margin: 0 }}>
            ${product.price}
          </p>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>
            MXN · Envío GRATIS
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={handleAdd}
            style={{
              background: '#CAFF00',
              color: '#000',
              border: 'none',
              padding: '12px 20px',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.04em',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            AGREGAR
          </button>
          <Link
            href={href}
            style={{
              background: 'none',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '12px 20px',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              transition: 'border-color 0.2s',
              textDecoration: 'none',
              display: 'inline-block',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = '#CAFF00')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)')}
          >
            VER MÁS
          </Link>
        </div>
      </div>
    </article>
  );
}

// ── ProductGrid ──────────────────────────────────────────────────────────────
function ProductGrid() {
  const gridProducts: GridProduct[] = [
    {
      id: 'product-76',
      name: PRODUCT_DATA['product-76'].name,
      price: PRODUCT_DATA['product-76'].price,
      stars: PRODUCT_DATA['product-76'].stars,
      reviews: PRODUCT_DATA['product-76'].reviews,
      badge: PRODUCT_DATA['product-76'].badge,
      badgeColor: PRODUCT_DATA['product-76'].badgeColor,
      badgeTextColor: PRODUCT_DATA['product-76'].badgeTextColor,
      tagline: PRODUCT_DATA['product-76'].tagline,
      image: PRODUCT_DATA['product-76'].images[0],
    },
    {
      id: 'product-95',
      name: PRODUCT_DATA['product-95'].name,
      price: PRODUCT_DATA['product-95'].price,
      stars: PRODUCT_DATA['product-95'].stars,
      reviews: PRODUCT_DATA['product-95'].reviews,
      badge: PRODUCT_DATA['product-95'].badge,
      badgeColor: PRODUCT_DATA['product-95'].badgeColor,
      badgeTextColor: PRODUCT_DATA['product-95'].badgeTextColor,
      tagline: PRODUCT_DATA['product-95'].tagline,
      image: PRODUCT_DATA['product-95'].images[0],
    },
  ];

  return (
    <section id="products" style={{ background: '#000', padding: '96px 40px' }} aria-label="Productos">
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div
          style={{
            marginBottom: 56,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <div>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.14em',
                color: '#CAFF00',
                textTransform: 'uppercase',
                marginBottom: 12,
              }}
            >
              Colección
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(36px, 5vw, 56px)',
                letterSpacing: '0.05em',
                color: '#fff',
                lineHeight: 1,
              }}
            >
              DOS MODELOS.
              <br />
              UN OBJETIVO.
            </h2>
          </div>
          <p
            style={{
              fontSize: 16,
              color: 'rgba(255,255,255,0.45)',
              maxWidth: 280,
              textAlign: 'right',
              lineHeight: 1.65,
            }}
          >
            Ambos incluyen envío gratis y tecnología de cambio automático de peso.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          {gridProducts.map(p => (
            <ProductGridCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── ComparisonTable ──────────────────────────────────────────────────────────
function ComparisonTable() {
  const rows = [
    { label: 'Diámetro', v76: '7.6 mm', v95: '9.5 mm' },
    { label: 'Largo', v76: '15 cm', v95: '15 cm' },
    { label: 'Incluye', v76: '2 piezas + bolsa', v95: '2 piezas + bolsa' },
    { label: 'Peso', v76: '73 g c/u', v95: '—' },
    { label: 'Compatibilidad', v76: '95% de las máquinas', v95: 'Máquinas con placas grandes' },
    { label: 'Ideal para', v76: 'Todos los niveles', v95: 'Entrenamiento avanzado' },
    { label: 'Reseñas', v76: '142 reseñas ★★★★★', v95: '86 reseñas ★★★★★' },
    { label: 'Precio', v76: '$799 MXN', v95: '$799 MXN' },
    { label: 'Envío', v76: 'GRATIS', v95: 'GRATIS' },
  ];

  return (
    <section style={{ background: '#0a0a0a', padding: '96px 40px' }} aria-label="Comparación de modelos">
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.14em',
              color: '#CAFF00',
              textTransform: 'uppercase',
              marginBottom: 12,
            }}
          >
            Comparación
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 4vw, 48px)',
              letterSpacing: '0.05em',
              color: '#fff',
            }}
          >
            ¿CUÁL ES EL CORRECTO?
          </h2>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(202,255,0,0.2)' }}>
              <th style={{ padding: '0 0 16px', textAlign: 'left', width: '33%' }} />
              <th
                style={{
                  padding: '0 0 16px',
                  textAlign: 'center',
                  fontFamily: 'var(--font-display)',
                  fontSize: 20,
                  letterSpacing: '0.08em',
                  color: '#CAFF00',
                  fontWeight: 400,
                }}
              >
                7.6mm
              </th>
              <th
                style={{
                  padding: '0 0 16px',
                  textAlign: 'center',
                  fontFamily: 'var(--font-display)',
                  fontSize: 20,
                  letterSpacing: '0.08em',
                  color: '#fff',
                  fontWeight: 400,
                }}
              >
                9.5mm
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                style={{
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
                }}
              >
                <td
                  style={{
                    padding: '16px 0',
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.4)',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {row.label}
                </td>
                <td
                  style={{ textAlign: 'center', fontSize: 14, color: '#CAFF00', fontWeight: 500, padding: '16px 0' }}
                >
                  {row.v76}
                </td>
                <td
                  style={{
                    textAlign: 'center',
                    fontSize: 14,
                    color: 'rgba(255,255,255,0.75)',
                    fontWeight: 500,
                    padding: '16px 0',
                  }}
                >
                  {row.v95}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            marginTop: 32,
            gap: 12,
            paddingLeft: '33.33%',
          }}
        >
          <Link
            href="/superpin-76mm"
            style={{
              background: '#CAFF00',
              color: '#000',
              border: 'none',
              padding: '14px',
              fontSize: 13,
              fontWeight: 800,
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.06em',
              textDecoration: 'none',
              textAlign: 'center',
              display: 'block',
            }}
          >
            ELEGIR 7.6mm
          </Link>
          <Link
            href="/superpin-95mm"
            style={{
              background: 'rgba(255,255,255,0.06)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.15)',
              padding: '14px',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.06em',
              textDecoration: 'none',
              textAlign: 'center',
              display: 'block',
            }}
          >
            ELEGIR 9.5mm
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── ReviewsStrip ─────────────────────────────────────────────────────────────
function ReviewsStrip() {
  const reviews = [
    {
      name: 'Carlos M.',
      text: 'Mis dropsets ahora son el doble de efectivos. Lo uso en cada sesión de piernas.',
      product: '7.6mm',
    },
    {
      name: 'Ana G.',
      text: 'Increíble calidad. Encaja perfecto en todas las máquinas del gym.',
      product: '7.6mm',
    },
    {
      name: 'Roberto S.',
      text: 'El 9.5mm es una bestia. Perfecto para las máquinas de placas grandes.',
      product: '9.5mm',
    },
    {
      name: 'María L.',
      text: 'Lo regalé y me pidieron otro. Simple, útil y bien hecho.',
      product: '7.6mm',
    },
  ];

  return (
    <section style={{ background: '#000', padding: '80px 40px' }} aria-label="Reseñas de clientes">
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 40,
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 36,
              letterSpacing: '0.06em',
              color: '#fff',
            }}
          >
            LO QUE DICEN
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ color: '#CAFF00', fontSize: 20 }} aria-label="5 estrellas">
              ★★★★★
            </span>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>5.0 · 228 reseñas</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
          {reviews.map((r, i) => (
            <article
              key={i}
              style={{
                background: '#0f0f0f',
                padding: '28px 24px',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <p
                style={{ color: '#CAFF00', fontSize: 13, marginBottom: 14 }}
                aria-label="5 estrellas"
              >
                ★★★★★
              </p>
              <blockquote
                style={{
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.65)',
                  lineHeight: 1.7,
                  marginBottom: 20,
                  fontStyle: 'normal',
                }}
              >
                &ldquo;{r.text}&rdquo;
              </blockquote>
              <cite style={{ fontStyle: 'normal' }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{r.name}</p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 3 }}>
                  SuperPin {r.product} · Compra verificada
                </p>
              </cite>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTABanner ────────────────────────────────────────────────────────────────
function CTABanner() {
  return (
    <section
      style={{ background: '#CAFF00', padding: '80px 40px', textAlign: 'center' }}
      aria-label="Llamada a la acción"
    >
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(40px, 6vw, 72px)',
            letterSpacing: '0.05em',
            color: '#000',
            lineHeight: 1,
            marginBottom: 20,
          }}
        >
          EMPIEZA HOY.
        </p>
        <p style={{ fontSize: 18, color: 'rgba(0,0,0,0.6)', marginBottom: 36, lineHeight: 1.6 }}>
          $799 MXN · Envío GRATIS · Entrega 3–5 días
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
          <Link
            href="/superpin-76mm"
            style={{
              background: '#000',
              color: '#CAFF00',
              border: 'none',
              padding: '16px 40px',
              fontSize: 15,
              fontWeight: 800,
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.08em',
              textDecoration: 'none',
              transition: 'opacity 0.2s',
              display: 'inline-block',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            VER 7.6mm
          </Link>
          <Link
            href="/superpin-95mm"
            style={{
              background: 'transparent',
              color: '#000',
              border: '2px solid rgba(0,0,0,0.3)',
              padding: '16px 40px',
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.08em',
              textDecoration: 'none',
              transition: 'border-color 0.2s',
              display: 'inline-block',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = '#000')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(0,0,0,0.3)')}
          >
            VER 9.5mm
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── HomePage ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div style={{ background: '#000' }}>
      <ScrollHero />
      <SocialProofStrip />
      <ProductGrid />
      <ComparisonTable />
      <ReviewsStrip />
      <CTABanner />
    </div>
  );
}
