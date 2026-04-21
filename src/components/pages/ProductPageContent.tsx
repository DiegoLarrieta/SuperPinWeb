'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { PRODUCT_DATA } from '@/data/products';
import { useIsMobile } from '@/hooks/useBreakpoint';

const WA_LINK =
  'https://wa.me/527712325019?text=Hola!%20Me%20interesa%20el%20SuperPin%20';

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#25d366" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function ProductPageContent({ productId }: { productId: string }) {
  const product = PRODUCT_DATA[productId];
  const [imgIdx, setImgIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart, setCartOpen } = useCart();
  const isMobile = useIsMobile();

  if (!product) return null;

  const otherProductId = productId === 'product-76' ? 'product-95' : 'product-76';
  const otherProduct = PRODUCT_DATA[otherProductId];
  const otherHref = productId === 'product-76' ? '/superpin-95mm' : '/superpin-76mm';

  const handleAdd = () => {
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.images[0], qty });
    setAdded(true);
    setCartOpen(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div style={{ background: '#000', minHeight: '100vh', paddingTop: 64 }}>

      {/* Hero Product Section */}
      <section style={{ padding: isMobile ? '32px 20px 48px' : '60px 40px 80px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? 32 : 80,
          alignItems: 'start',
        }}>

          {/* Image column */}
          <div>
            <div
              style={{
                background: '#0a0a0a',
                border: '1px solid rgba(255,255,255,0.05)',
                position: 'relative',
                height: isMobile ? 280 : 480,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <img
                src={product.images[imgIdx]}
                alt={`${product.name} — imagen ${imgIdx + 1} de ${product.images.length}`}
                style={{
                  maxWidth: '78%',
                  maxHeight: '78%',
                  objectFit: 'contain',
                  transition: 'opacity 0.35s',
                  filter: 'drop-shadow(0 32px 64px rgba(202,255,0,0.12))',
                }}
              />
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setImgIdx(i => (i - 1 + product.images.length) % product.images.length)}
                    aria-label="Imagen anterior"
                    style={{
                      position: 'absolute',
                      left: 12,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(0,0,0,0.6)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#fff',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      cursor: 'pointer',
                      fontSize: 18,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'border-color 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = '#CAFF00')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                  >
                    ←
                  </button>
                  <button
                    onClick={() => setImgIdx(i => (i + 1) % product.images.length)}
                    aria-label="Imagen siguiente"
                    style={{
                      position: 'absolute',
                      right: 12,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(0,0,0,0.6)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#fff',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      cursor: 'pointer',
                      fontSize: 18,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'border-color 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = '#CAFF00')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                  >
                    →
                  </button>
                </>
              )}
            </div>
            {/* Thumbnails */}
            <div
              style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}
              role="list"
              aria-label="Miniaturas de imagen"
            >
              {product.images.map((img, i) => (
                <button
                  key={i}
                  role="listitem"
                  onClick={() => setImgIdx(i)}
                  aria-label={`Ver imagen ${i + 1}`}
                  aria-pressed={i === imgIdx}
                  style={{
                    width: isMobile ? 64 : 80,
                    height: isMobile ? 48 : 60,
                    background: '#0a0a0a',
                    border: `1px solid ${i === imgIdx ? '#CAFF00' : 'rgba(255,255,255,0.06)'}`,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'border-color 0.2s',
                    padding: 0,
                  }}
                >
                  <img
                    src={img}
                    alt={`${product.name} — miniatura ${i + 1}`}
                    style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info column */}
          <div style={{ paddingTop: isMobile ? 0 : 16 }}>
            <span
              style={{
                background: product.badgeColor,
                color: product.badgeTextColor,
                border: product.badgeBorder || 'none',
                fontSize: 10,
                fontWeight: 800,
                padding: '4px 14px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}
            >
              {product.badge}
            </span>

            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: isMobile ? 36 : 56,
                letterSpacing: '0.05em',
                color: '#fff',
                margin: '16px 0 8px',
                lineHeight: 1,
                textTransform: 'uppercase',
              }}
            >
              {product.name}
            </h1>
            <p style={{ fontSize: isMobile ? 15 : 17, color: 'rgba(255,255,255,0.5)', marginBottom: 20, lineHeight: 1.6 }}>
              {product.tagline}
            </p>

            {/* Stars */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <span
                style={{ color: '#CAFF00', fontSize: 16 }}
                aria-label={`${product.stars} de 5 estrellas`}
              >
                {'★'.repeat(product.stars)}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>
                {product.reviews} reseñas verificadas
              </span>
            </div>

            {/* Price */}
            <div
              style={{
                marginBottom: 20,
                paddingBottom: 20,
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <span style={{ fontSize: isMobile ? 36 : 42, fontWeight: 800, color: '#CAFF00' }}>
                ${product.price}
              </span>
              <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', marginLeft: 8 }}>
                MXN
              </span>
              <div style={{ display: 'flex', gap: 16, marginTop: 10, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 13, color: '#CAFF00', display: 'flex', alignItems: 'center', gap: 6 }}>
                  ✓ Envío GRATIS
                </span>
                <span
                  style={{
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  📦 Entrega 3–5 días
                </span>
              </div>
            </div>

            {/* Includes */}
            <div
              style={{
                background: 'rgba(202,255,0,0.04)',
                border: '1px solid rgba(202,255,0,0.12)',
                padding: '16px 20px',
                marginBottom: 24,
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  color: 'rgba(255,255,255,0.35)',
                  textTransform: 'uppercase',
                  marginBottom: 10,
                }}
              >
                Tu compra incluye
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {product.includes.map((item, i) => (
                  <li
                    key={i}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}
                  >
                    <span style={{ color: '#CAFF00', fontSize: 14, fontWeight: 700 }} aria-hidden="true">
                      ✓
                    </span>
                    <span style={{ fontSize: 14, color: '#fff', fontWeight: 500 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Qty + Add */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <div
                style={{ display: 'flex', border: '1px solid rgba(255,255,255,0.12)', alignItems: 'center', flexShrink: 0 }}
                role="group"
                aria-label="Cantidad"
              >
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  aria-label="Reducir cantidad"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#fff',
                    padding: '12px 16px',
                    fontSize: 20,
                    cursor: 'pointer',
                    lineHeight: 1,
                  }}
                >
                  −
                </button>
                <span
                  aria-live="polite"
                  aria-atomic="true"
                  style={{
                    padding: '0 16px',
                    fontSize: 16,
                    fontWeight: 700,
                    color: '#fff',
                    minWidth: 40,
                    textAlign: 'center',
                  }}
                >
                  {qty}
                </span>
                <button
                  onClick={() => setQty(q => q + 1)}
                  aria-label="Aumentar cantidad"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#fff',
                    padding: '12px 16px',
                    fontSize: 20,
                    cursor: 'pointer',
                    lineHeight: 1,
                  }}
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAdd}
                style={{
                  flex: 1,
                  background: '#CAFF00',
                  color: '#000',
                  border: 'none',
                  padding: '14px 16px',
                  fontSize: isMobile ? 13 : 15,
                  fontWeight: 800,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                  letterSpacing: '0.06em',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                {added ? '✓ AGREGADO' : 'AGREGAR AL CARRITO'}
              </button>
            </div>

            <a
              href={`${WA_LINK}${encodeURIComponent(product.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                background: 'rgba(37,211,102,0.08)',
                color: '#25d366',
                border: '1px solid rgba(37,211,102,0.2)',
                padding: '13px',
                fontSize: 14,
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(37,211,102,0.14)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(37,211,102,0.08)')}
            >
              <WhatsAppIcon />
              Preguntar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        style={{ background: '#0a0a0a', padding: isMobile ? '48px 20px' : '80px 40px' }}
        aria-label="Características del producto"
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: isMobile ? 28 : 40,
              letterSpacing: '0.06em',
              color: '#fff',
              marginBottom: 36,
              textAlign: 'center',
            }}
          >
            CARACTERÍSTICAS
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: 2 }}>
            {product.features.map((f, i) => (
              <div
                key={i}
                style={{
                  background: '#0f0f0f',
                  padding: isMobile ? '24px 18px' : '36px 28px',
                  border: '1px solid rgba(255,255,255,0.04)',
                }}
              >
                <p style={{ fontSize: isMobile ? 24 : 32, marginBottom: 12 }} aria-hidden="true">
                  {f.icon}
                </p>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 8 }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specs */}
      <section
        style={{ background: '#000', padding: isMobile ? '48px 20px' : '80px 40px' }}
        aria-label="Especificaciones técnicas"
      >
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: isMobile ? 28 : 40,
              letterSpacing: '0.06em',
              color: '#fff',
              marginBottom: 32,
              textAlign: 'center',
            }}
          >
            ESPECIFICACIONES
          </h2>
          <dl>
            {product.specs.map((s, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '16px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  gap: 16,
                }}
              >
                <dt
                  style={{
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.4)',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  {s.label}
                </dt>
                <dd style={{ fontSize: 14, color: '#fff', fontWeight: 500, textAlign: 'right' }}>{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Also consider */}
      <section style={{ background: '#0a0a0a', padding: isMobile ? '40px 20px' : '60px 40px' }} aria-label="Producto relacionado">
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'flex-start' : 'center',
            gap: 20,
          }}
        >
          <div>
            <p
              style={{
                fontSize: 11,
                color: 'rgba(255,255,255,0.3)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: 8,
              }}
            >
              También podrías considerar
            </p>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: isMobile ? 22 : 28,
                letterSpacing: '0.06em',
                color: '#fff',
              }}
            >
              {otherProduct.name}
            </h3>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', marginTop: 6 }}>
              {otherProduct.tagline}
            </p>
          </div>
          <Link
            href={otherHref}
            style={{
              background: 'none',
              color: '#CAFF00',
              border: '1px solid #CAFF00',
              padding: '14px 32px',
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.06em',
              transition: 'background 0.2s, color 0.2s',
              textDecoration: 'none',
              display: 'inline-block',
              width: isMobile ? '100%' : 'auto',
              textAlign: 'center',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#CAFF00';
              e.currentTarget.style.color = '#000';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'none';
              e.currentTarget.style.color = '#CAFF00';
            }}
          >
            VER {otherProduct.name.toUpperCase()} →
          </Link>
        </div>
      </section>
    </div>
  );
}
