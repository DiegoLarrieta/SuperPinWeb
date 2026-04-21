'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useIsMobile } from '@/hooks/useBreakpoint';

const NAV_ITEMS = [
  { href: '/', label: 'Inicio' },
  { href: '/superpin-95mm', label: 'SuperPin 9.5mm' },
  { href: '/superpin-76mm', label: 'SuperPin 7.6mm' },
  { href: '/como-usar', label: 'Cómo Usar' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount, setCartOpen } = useCart();
  const pathname = usePathname();
  const isMobile = useIsMobile();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: scrolled || menuOpen ? 'rgba(0,0,0,0.97)' : 'transparent',
          backdropFilter: scrolled || menuOpen ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(202,255,0,0.12)' : '1px solid transparent',
          transition: 'background 0.4s, border-color 0.4s',
          padding: isMobile ? '0 20px' : '0 40px',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            textDecoration: 'none',
          }}
          aria-label="SuperPin — Ir al inicio"
        >
          <img
            src="/assets/logo-white.png"
            alt="SuperPin logo"
            style={{ height: isMobile ? 28 : 32, objectFit: 'contain' }}
          />
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: isMobile ? 17 : 20,
              letterSpacing: '0.16em',
              color: '#fff',
              lineHeight: 1,
            }}
          >
            SUPERPIN
          </span>
        </Link>

        {/* Desktop Nav */}
        {!isMobile && (
          <nav aria-label="Navegación principal">
            <ul
              style={{
                display: 'flex',
                gap: 32,
                alignItems: 'center',
                listStyle: 'none',
                margin: 0,
                padding: 0,
              }}
            >
              {NAV_ITEMS.map(item => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: isActive ? '#CAFF00' : 'rgba(255,255,255,0.75)',
                        fontSize: 14,
                        fontWeight: 500,
                        cursor: 'pointer',
                        fontFamily: 'var(--font-body)',
                        padding: '4px 0',
                        borderBottom: isActive ? '1px solid #CAFF00' : '1px solid transparent',
                        transition: 'color 0.2s, border-color 0.2s',
                        letterSpacing: '0.01em',
                        textDecoration: 'none',
                        display: 'inline-block',
                      }}
                      onMouseEnter={e => {
                        if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = '#fff';
                      }}
                      onMouseLeave={e => {
                        if (!isActive)
                          (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.75)';
                      }}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}

        {/* Right: cart + hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={() => setCartOpen(true)}
            aria-label={`Carrito de compras${cartCount > 0 ? ` — ${cartCount} artículo${cartCount !== 1 ? 's' : ''}` : ''}`}
            style={{
              background: '#CAFF00',
              color: '#000',
              border: 'none',
              padding: isMobile ? '9px 12px' : '9px 20px',
              borderRadius: 6,
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {!isMobile && 'Carrito'}
            {cartCount > 0 && (
              <span
                aria-hidden="true"
                style={{
                  background: '#000',
                  color: '#CAFF00',
                  borderRadius: '50%',
                  width: 18,
                  height: 18,
                  fontSize: 11,
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {cartCount}
              </span>
            )}
          </button>

          {/* Hamburger (mobile only) */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
              style={{
                background: 'none',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#fff',
                width: 40,
                height: 40,
                borderRadius: 6,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 5,
                padding: 0,
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  display: 'block',
                  width: 18,
                  height: 2,
                  background: '#fff',
                  transition: 'transform 0.25s',
                  transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
                }}
              />
              <span
                style={{
                  display: 'block',
                  width: 18,
                  height: 2,
                  background: '#fff',
                  opacity: menuOpen ? 0 : 1,
                  transition: 'opacity 0.25s',
                }}
              />
              <span
                style={{
                  display: 'block',
                  width: 18,
                  height: 2,
                  background: '#fff',
                  transition: 'transform 0.25s',
                  transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
                }}
              />
            </button>
          )}
        </div>
      </header>

      {/* Mobile dropdown menu */}
      {isMobile && menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 64,
            left: 0,
            right: 0,
            zIndex: 999,
            background: 'rgba(0,0,0,0.97)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(202,255,0,0.12)',
            padding: '8px 20px 24px',
            animation: 'fadeUp 0.2s ease forwards',
          }}
        >
          <nav aria-label="Navegación principal móvil">
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {NAV_ITEMS.map(item => {
                const isActive = pathname === item.href;
                return (
                  <li
                    key={item.href}
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        display: 'block',
                        color: isActive ? '#CAFF00' : 'rgba(255,255,255,0.85)',
                        fontSize: 18,
                        fontWeight: 600,
                        padding: '16px 0',
                        textDecoration: 'none',
                        fontFamily: 'var(--font-body)',
                      }}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
