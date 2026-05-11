'use client';

import Link from 'next/link';
import { useIsMobile } from '@/hooks/useBreakpoint';

const SOCIAL_LINKS = [
  { label: 'TikTok', abbr: 'TK', href: 'https://www.tiktok.com/@superpinstore' },
  { label: 'Instagram', abbr: 'IG', href: 'https://www.instagram.com/superpinstore/' },
  { label: 'Facebook', abbr: 'FB', href: 'https://www.facebook.com/Sup.PinStore' },
];

const PRODUCT_LINKS = [
  { label: 'SuperPin 9.5mm', href: '/superpin-95mm' },
  { label: 'SuperPin 7.6mm', href: '/superpin-76mm' },
  { label: 'Cómo Usar', href: '/como-usar' },
];

const SUPPORT_ITEMS = ['Envíos', 'Devoluciones', 'Preguntas Frecuentes'];

const LEGAL_LINKS = [
  { label: 'Política de Privacidad', href: '/privacidad' },
  { label: 'Términos y Condiciones', href: '/terminos' },
];

export default function Footer() {
  const isMobile = useIsMobile();

  return (
    <footer
      style={{
        background: '#0a0a0a',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: isMobile ? '40px 20px 24px' : '56px 40px 32px',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr 1fr 1fr',
            gap: isMobile ? 32 : 48,
            marginBottom: 40,
          }}
        >
          {/* Brand */}
          <div>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: isMobile ? 24 : 32,
                  letterSpacing: '0.15em',
                  color: '#fff',
                  marginBottom: 16,
                }}
              >
                SUPERPIN
              </p>
            </Link>
            <p
              style={{
                fontSize: 14,
                color: 'rgba(255,255,255,0.45)',
                lineHeight: 1.75,
                maxWidth: 320,
                marginBottom: 24,
              }}
            >
              Cambia el peso de tus máquinas en menos de 2 segundos. Hecho para atletas que van en
              serio.
            </p>
            <nav aria-label="Redes sociales">
              <ul style={{ display: 'flex', gap: 12, listStyle: 'none', padding: 0, margin: 0 }}>
                {SOCIAL_LINKS.map(s => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`SuperPin en ${s.label}`}
                      style={{
                        width: 36,
                        height: 36,
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: 6,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'rgba(255,255,255,0.5)',
                        fontSize: 11,
                        fontWeight: 700,
                        textDecoration: 'none',
                        transition: 'border-color 0.2s, color 0.2s',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = '#CAFF00';
                        e.currentTarget.style.color = '#CAFF00';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                        e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                      }}
                    >
                      {s.abbr}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Products */}
          <nav aria-label="Productos">
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: 'rgba(255,255,255,0.3)',
                textTransform: 'uppercase',
                marginBottom: 16,
              }}
            >
              Producto
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {PRODUCT_LINKS.map(item => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    style={{
                      display: 'block',
                      color: 'rgba(255,255,255,0.5)',
                      fontSize: 14,
                      padding: '5px 0',
                      transition: 'color 0.2s',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#CAFF00')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Support */}
          <div>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: 'rgba(255,255,255,0.3)',
                textTransform: 'uppercase',
                marginBottom: 16,
              }}
            >
              Soporte
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {SUPPORT_ITEMS.map(item => (
                <li key={item}>
                  <a
                    href="https://wa.me/527712325019"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'block',
                      color: 'rgba(255,255,255,0.5)',
                      fontSize: 14,
                      padding: '5px 0',
                      transition: 'color 0.2s',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#CAFF00')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <nav aria-label="Legal">
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: 'rgba(255,255,255,0.3)',
                textTransform: 'uppercase',
                marginBottom: 16,
              }}
            >
              Legal
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {LEGAL_LINKS.map(item => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    style={{
                      display: 'block',
                      color: 'rgba(255,255,255,0.5)',
                      fontSize: 14,
                      padding: '5px 0',
                      transition: 'color 0.2s',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#CAFF00')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: 24,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', margin: 0 }}>
            © {new Date().getFullYear()} SuperPinStore. Todos los derechos reservados.
          </p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', margin: 0 }}>
            Hecho con 💪 para atletas serios
          </p>
        </div>
      </div>
    </footer>
  );
}
