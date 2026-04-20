'use client';

import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, removeFromCart, cartTotal } = useCart();
  const router = useRouter();

  if (!cartOpen) return null;

  const handleCheckout = () => {
    setCartOpen(false);
    router.push('/checkout');
  };

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 2000 }}
      role="dialog"
      aria-modal="true"
      aria-label="Carrito de compras"
    >
      {/* Backdrop */}
      <div
        onClick={() => setCartOpen(false)}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(4px)',
        }}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: 400,
          background: '#0f0f0f',
          borderLeft: '1px solid rgba(202,255,0,0.12)',
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideInRight 0.3s ease',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px 28px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <p style={{ fontSize: 18, fontWeight: 700, color: '#fff', margin: 0 }}>Tu Carrito</p>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>
              {cart.length} producto{cart.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            aria-label="Cerrar carrito"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: 'none',
              color: '#fff',
              borderRadius: 6,
              width: 32,
              height: 32,
              cursor: 'pointer',
              fontSize: 18,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ×
          </button>
        </div>

        {/* Free shipping notice */}
        <div
          style={{
            background: 'rgba(202,255,0,0.08)',
            borderBottom: '1px solid rgba(202,255,0,0.12)',
            padding: '10px 28px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ color: '#CAFF00', fontSize: 14 }} aria-hidden="true">
            ✓
          </span>
          <span style={{ fontSize: 13, color: '#CAFF00', fontWeight: 600 }}>
            Envío GRATIS incluido
          </span>
        </div>

        {/* Items */}
        <div
          style={{ flex: 1, overflowY: 'auto', padding: '20px 28px' }}
          role="list"
          aria-label="Artículos en el carrito"
        >
          {cart.length === 0 ? (
            <div
              style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(255,255,255,0.25)' }}
            >
              <p style={{ fontSize: 48, marginBottom: 16 }} aria-hidden="true">🛒</p>
              <p style={{ fontSize: 16, fontWeight: 600 }}>Tu carrito está vacío</p>
              <p style={{ fontSize: 13, marginTop: 8 }}>Agrega un SuperPin para comenzar</p>
            </div>
          ) : (
            cart.map((item, i) => (
              <div
                key={`${item.id}-${i}`}
                role="listitem"
                style={{
                  display: 'flex',
                  gap: 16,
                  marginBottom: 20,
                  paddingBottom: 20,
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div
                  style={{
                    background: '#1a1a1a',
                    width: 80,
                    height: 80,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    borderRadius: 4,
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 6 }}>
                    {item.name}
                  </p>
                  <p style={{ fontSize: 20, fontWeight: 700, color: '#CAFF00' }}>
                    ${item.price}{' '}
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}>
                      MXN
                    </span>
                  </p>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
                    Cantidad: {item.qty}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(i)}
                  aria-label={`Eliminar ${item.name} del carrito`}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255,255,255,0.2)',
                    cursor: 'pointer',
                    fontSize: 18,
                    alignSelf: 'flex-start',
                    padding: '2px 6px',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#ff4444')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.2)')}
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div
            style={{ padding: '20px 28px', borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Subtotal</span>
              <span style={{ fontSize: 13, color: '#fff', fontWeight: 600 }}>
                ${cartTotal} MXN
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Envío</span>
              <span style={{ fontSize: 13, color: '#CAFF00', fontWeight: 600 }}>GRATIS</span>
            </div>
            <button
              onClick={handleCheckout}
              style={{
                width: '100%',
                background: '#CAFF00',
                color: '#000',
                border: 'none',
                padding: '16px',
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Pagar ${cartTotal} MXN →
            </button>
            <button
              onClick={() => setCartOpen(false)}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                color: 'rgba(255,255,255,0.4)',
                fontSize: 13,
                marginTop: 12,
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                padding: '8px',
              }}
            >
              Seguir comprando
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
