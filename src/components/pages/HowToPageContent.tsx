'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useIsMobile } from '@/hooks/useBreakpoint';

const steps = [
  {
    num: '01',
    title: 'Primer SuperPin — peso máximo',
    desc: 'Acopla el primer SuperPin en el mayor peso con el que iniciarás tu serie. Este será tu punto de partida.',
    detail:
      'El mecanismo encaja al instante — escucharás un click que confirma que la placa está bloqueada.',
  },
  {
    num: '02',
    title: 'Segundo SuperPin — peso intermedio',
    desc: 'Coloca el segundo SuperPin en el peso intermedio. No muevas nada más — el sistema ya está listo para la reducción automática.',
    detail:
      'Ambos pines trabajan juntos para que el cambio de peso suceda de forma instantánea entre niveles.',
  },
  {
    num: '03',
    title: 'Pin de la máquina — peso liviano',
    desc: 'Coloca el pin original de la máquina en el peso más liviano con el que finalizarás. Ahora tienes un dropset de 3 niveles configurado.',
    detail: 'Todo listo antes de empezar. Cero interrupciones durante el entrenamiento.',
  },
  {
    num: '04',
    title: 'Entrena — el peso cambia solo',
    desc: 'Realiza tus series sin parar. El SuperPin reduce el peso automáticamente en cada nivel. Dropset completado en máxima intensidad.',
    detail:
      'De pesado a intermedio a liviano — sin soltar la barra, sin perder el ritmo. Lleva tus entrenamientos al siguiente nivel.',
  },
];

const faqs = [
  {
    q: '¿Qué incluye el pack?',
    a: 'Cada compra incluye 2 SuperPins + 1 bolsa cubre polvos. El kit de 2 piezas es esencial para el sistema de dropset de 3 niveles que hace tan efectivo al SuperPin.',
  },
  {
    q: '¿Es compatible con mi máquina?',
    a: 'El modelo 7.6mm es compatible con el 95% de las máquinas selectorizadas del mercado. El 9.5mm está diseñado para máquinas con placas más grandes. Si tienes dudas, contáctanos por WhatsApp.',
  },
  {
    q: '¿Por qué vienen 2 piezas?',
    a: 'Con 2 SuperPins puedes configurar un dropset de 3 niveles: primer pin en el peso máximo, segundo pin en el peso intermedio, y el pin de la máquina en el peso mínimo. Así cambias de peso automáticamente sin parar entre series.',
  },
  {
    q: '¿Qué diferencia hay entre los dos modelos?',
    a: 'El 7.6mm es más universal y ligero, ideal para la mayoría de los usuarios. El 9.5mm es más robusto y está pensado para cargas pesadas y máquinas con orificios más grandes. Ambos vienen a $799 MXN el pack de 2 piezas.',
  },
  {
    q: '¿Es seguro usar el SuperPin?',
    a: 'Sí. El SuperPin está fabricado con acero de alta resistencia y polímero técnico, diseñado para soportar las cargas y vibraciones de un entrenamiento intenso.',
  },
  {
    q: '¿Cuánto tiempo dura el envío?',
    a: 'El envío es completamente GRATIS y tarda entre 3 y 5 días hábiles dentro de la República Mexicana.',
  },
];

function FAQItem({ faq, isLast }: { faq: { q: string; a: string }; isLast: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.05)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          color: '#fff',
          padding: '20px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          fontFamily: 'var(--font-body)',
          textAlign: 'left',
        }}
      >
        <span
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: open ? '#CAFF00' : '#fff',
            transition: 'color 0.2s',
            paddingRight: 20,
          }}
        >
          {faq.q}
        </span>
        <span
          aria-hidden="true"
          style={{
            color: '#CAFF00',
            fontSize: 20,
            lineHeight: 1,
            flexShrink: 0,
            transition: 'transform 0.3s',
            transform: open ? 'rotate(45deg)' : 'none',
          }}
        >
          +
        </span>
      </button>
      {open && (
        <div style={{ paddingBottom: 20, paddingRight: 32 }}>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, margin: 0 }}>
            {faq.a}
          </p>
        </div>
      )}
    </div>
  );
}

export default function HowToPageContent() {
  const isMobile = useIsMobile();

  return (
    <div style={{ background: '#000', minHeight: '100vh', paddingTop: 64 }}>

      {/* Hero */}
      <section
        style={{
          background: '#0a0a0a',
          padding: isMobile ? '48px 20px' : '80px 40px',
          borderBottom: '1px solid rgba(202,255,0,0.08)',
        }}
        aria-label="Encabezado"
      >
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.16em',
              color: '#CAFF00',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            Guía de uso
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 6vw, 72px)',
              letterSpacing: '0.06em',
              color: '#fff',
              lineHeight: 1,
              marginBottom: 20,
            }}
          >
            CÓMO USAR EL SUPERPIN
          </h1>
          <p style={{ fontSize: isMobile ? 16 : 18, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
            Cuatro pasos. Menos de 10 segundos en aprender. Resultados inmediatos.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section style={{ padding: isMobile ? '48px 20px' : '96px 40px' }} aria-label="Pasos de uso">
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {steps.map((step, i) => (
              <li
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '120px 1fr',
                  gap: isMobile ? 12 : 48,
                  marginBottom: isMobile ? 40 : 64,
                  paddingBottom: isMobile ? 40 : 64,
                  borderBottom:
                    i < steps.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  alignItems: 'start',
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: isMobile ? 48 : 80,
                    letterSpacing: '-0.02em',
                    color: 'rgba(202,255,0,0.15)',
                    lineHeight: 1,
                    textAlign: isMobile ? 'left' : 'right',
                  }}
                >
                  {step.num}
                </div>
                <div>
                  <h2
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: isMobile ? 22 : 36,
                      letterSpacing: '0.04em',
                      color: '#fff',
                      marginBottom: 14,
                      textTransform: 'uppercase',
                    }}
                  >
                    {step.title}
                  </h2>
                  <p
                    style={{
                      fontSize: isMobile ? 15 : 17,
                      color: 'rgba(255,255,255,0.65)',
                      lineHeight: 1.7,
                      marginBottom: 12,
                    }}
                  >
                    {step.desc}
                  </p>
                  <p
                    style={{
                      fontSize: 13,
                      color: 'rgba(255,255,255,0.35)',
                      lineHeight: 1.65,
                      borderLeft: '2px solid rgba(202,255,0,0.3)',
                      paddingLeft: 14,
                    }}
                  >
                    {step.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Model selector */}
      <section
        style={{
          background: '#0a0a0a',
          padding: isMobile ? '48px 20px' : '80px 40px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}
        aria-label="Elige tu modelo"
      >
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: isMobile ? 24 : 32,
              letterSpacing: '0.06em',
              color: '#fff',
              marginBottom: 28,
              textAlign: 'center',
            }}
          >
            ELIGE TU MODELO
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 2 }}>
            {[
              {
                href: '/superpin-76mm',
                name: '7.6mm',
                sub: 'Para la mayoría de máquinas',
                color: '#CAFF00',
                img: '/assets/product-7.6-main.png',
              },
              {
                href: '/superpin-95mm',
                name: '9.5mm',
                sub: 'Para cargas pesadas',
                color: 'rgba(255,255,255,0.7)',
                img: '/assets/product-9.5-main.png',
              },
            ].map(p => (
              <Link
                key={p.href}
                href={p.href}
                style={{
                  background: '#111',
                  padding: isMobile ? '24px 20px' : '40px 32px',
                  cursor: 'pointer',
                  border: '1px solid rgba(255,255,255,0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                  transition: 'background 0.3s',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#161616')}
                onMouseLeave={e => (e.currentTarget.style.background = '#111')}
              >
                <img
                  src={p.img}
                  alt={`SuperPin ${p.name}`}
                  style={{
                    width: isMobile ? 60 : 80,
                    height: isMobile ? 60 : 80,
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 8px 16px rgba(202,255,0,0.1))',
                    flexShrink: 0,
                  }}
                />
                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: isMobile ? 22 : 28,
                      letterSpacing: '0.06em',
                      color: p.color,
                      marginBottom: 4,
                    }}
                  >
                    SuperPin {p.name}
                  </p>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{p.sub}</p>
                  <p style={{ fontSize: 13, color: '#CAFF00', marginTop: 8, fontWeight: 600 }}>
                    Ver producto →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: '#000', padding: isMobile ? '48px 20px' : '80px 40px' }} aria-label="Preguntas frecuentes">
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: isMobile ? 28 : 40,
              letterSpacing: '0.06em',
              color: '#fff',
              marginBottom: 40,
              textAlign: 'center',
            }}
          >
            PREGUNTAS FRECUENTES
          </h2>
          <dl>
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} isLast={i === faqs.length - 1} />
            ))}
          </dl>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section
        style={{
          background: '#0a0a0a',
          padding: isMobile ? '40px 20px' : '60px 40px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', marginBottom: 20 }}>
            ¿Tienes más dudas? Estamos aquí.
          </p>
          <a
            href="https://wa.me/527712325019?text=Hola!%20Tengo%20una%20pregunta%20sobre%20el%20SuperPin"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: '#25d366',
              color: '#fff',
              padding: '16px 36px',
              fontSize: 15,
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Contactar por WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
