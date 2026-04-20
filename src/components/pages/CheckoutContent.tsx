'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

const PAYMENT_METHODS = [
  { id: 'card', label: 'Tarjeta de crédito / débito', icon: '💳', sub: 'Visa, Mastercard, American Express' },
  { id: 'mercadopago', label: 'MercadoPago', icon: '🔵', sub: 'Meses sin intereses disponibles' },
  {
    id: 'whatsapp',
    label: 'Pagar por WhatsApp',
    icon: '💬',
    sub: 'Te enviamos el link de cobro al instante',
  },
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
}

interface CardFormState {
  number: string;
  expiry: string;
  cvv: string;
  name: string;
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: '#111',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#fff',
  padding: '14px 16px',
  fontSize: 15,
  fontFamily: 'var(--font-body)',
  outline: 'none',
  transition: 'border-color 0.2s',
};

const labelStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 700,
  color: 'rgba(255,255,255,0.4)',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  display: 'block',
  marginBottom: 8,
};

function OrderConfirm() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();

  const handleContinue = () => {
    clearCart();
    router.push('/');
  };

  return (
    <div
      style={{
        background: '#000',
        minHeight: '100vh',
        paddingTop: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ maxWidth: 560, textAlign: 'center', padding: '60px 40px' }}>
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'rgba(202,255,0,0.1)',
            border: '2px solid #CAFF00',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 32px',
            fontSize: 32,
          }}
          aria-hidden="true"
        >
          ✓
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 48,
            letterSpacing: '0.06em',
            color: '#CAFF00',
            marginBottom: 16,
          }}
        >
          ¡LISTO!
        </h1>
        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 32 }}>
          Tu pedido ha sido recibido. Recibirás una confirmación por correo electrónico en breve.
        </p>
        <div
          style={{
            background: '#0a0a0a',
            border: '1px solid rgba(255,255,255,0.06)',
            padding: '24px',
            marginBottom: 36,
          }}
        >
          {cart.map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '8px 0',
                borderBottom: i < cart.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              }}
            >
              <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>
                {item.qty}x {item.name}
              </span>
              <span style={{ fontSize: 14, color: '#fff', fontWeight: 600 }}>
                ${item.price * item.qty} MXN
              </span>
            </div>
          ))}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingTop: 14,
              marginTop: 8,
              borderTop: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <span style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Total pagado</span>
            <span style={{ fontSize: 18, fontWeight: 800, color: '#CAFF00' }}>
              ${cartTotal} MXN
            </span>
          </div>
        </div>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)', marginBottom: 28 }}>
          Entrega estimada: 3–5 días hábiles · Envío GRATIS
        </p>
        <button
          onClick={handleContinue}
          style={{
            background: '#CAFF00',
            color: '#000',
            border: 'none',
            padding: '16px 40px',
            fontSize: 14,
            fontWeight: 800,
            cursor: 'pointer',
            fontFamily: 'var(--font-body)',
            letterSpacing: '0.08em',
          }}
        >
          SEGUIR COMPRANDO
        </button>
      </div>
    </div>
  );
}

export default function CheckoutContent() {
  const { cart, cartTotal } = useCart();
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [payMethod, setPayMethod] = useState('card');
  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '', address: '', city: '', zip: '' });
  const [cardForm, setCardForm] = useState<CardFormState>({ number: '', expiry: '', cvv: '', name: '' });
  const [loading, setLoading] = useState(false);

  const handleFormChange = (k: keyof FormState, v: string) =>
    setForm(f => ({ ...f, [k]: v }));

  const handleCardChange = (k: keyof CardFormState, v: string) =>
    setCardForm(f => ({ ...f, [k]: v }));

  const handlePay = () => {
    if (payMethod === 'whatsapp') {
      const msg = encodeURIComponent(
        `Hola! Quiero comprar:\n${cart.map(i => `${i.qty}x ${i.name} — $${i.price * i.qty} MXN`).join('\n')}\nTotal: $${cartTotal} MXN\n\nNombre: ${form.name}\nDirección: ${form.address}, ${form.city} CP ${form.zip}`
      );
      window.open(`https://wa.me/527712325019?text=${msg}`, '_blank');
      setStep(3);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 2200);
  };

  const isStep1Valid = !!form.name && !!form.email && !!form.address;

  if (step === 3) return <OrderConfirm />;

  return (
    <div style={{ background: '#000', minHeight: '100vh', paddingTop: 64 }}>
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '48px 40px',
          display: 'grid',
          gridTemplateColumns: '1fr 380px',
          gap: 48,
          alignItems: 'start',
        }}
      >
        {/* Left — Form */}
        <div>
          <Link
            href="/"
            style={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: 14,
              marginBottom: 32,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              textDecoration: 'none',
            }}
          >
            ← Volver al inicio
          </Link>

          {/* Step indicator */}
          <nav aria-label="Pasos del checkout" style={{ display: 'flex', gap: 4, marginBottom: 40, alignItems: 'center' }}>
            {(['Información', 'Pago'] as const).map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, flex: i < 1 ? 'auto' : 'none' }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color:
                      step === i + 1
                        ? '#CAFF00'
                        : step > i + 1
                        ? 'rgba(255,255,255,0.4)'
                        : 'rgba(255,255,255,0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <span
                    aria-current={step === i + 1 ? 'step' : undefined}
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background:
                        step === i + 1 ? '#CAFF00' : step > i + 1 ? 'rgba(255,255,255,0.1)' : 'transparent',
                      border: step <= i + 1 ? '1px solid rgba(255,255,255,0.15)' : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 12,
                      color: step === i + 1 ? '#000' : '#fff',
                      fontWeight: 700,
                    }}
                  >
                    {step > i + 1 ? '✓' : i + 1}
                  </span>
                  {s}
                </div>
                {i < 1 && (
                  <div
                    style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)', margin: '0 8px' }}
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </nav>

          {step === 1 && (
            <form
              onSubmit={e => { e.preventDefault(); if (isStep1Valid) setStep(2); }}
              noValidate
            >
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 28,
                  letterSpacing: '0.06em',
                  color: '#fff',
                  marginBottom: 32,
                }}
              >
                INFORMACIÓN DE CONTACTO
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
                {(
                  [
                    { k: 'name', label: 'Nombre completo', placeholder: 'Juan García', full: true, type: 'text', autoComplete: 'name', required: true },
                    { k: 'email', label: 'Correo electrónico', placeholder: 'juan@email.com', type: 'email', autoComplete: 'email', required: true },
                    { k: 'phone', label: 'Teléfono', placeholder: '+52 55 1234 5678', type: 'tel', autoComplete: 'tel' },
                    { k: 'address', label: 'Dirección', placeholder: 'Calle y número', full: true, type: 'text', autoComplete: 'street-address', required: true },
                    { k: 'city', label: 'Ciudad', placeholder: 'Ciudad de México', type: 'text', autoComplete: 'address-level2' },
                    { k: 'zip', label: 'Código postal', placeholder: '06600', type: 'text', autoComplete: 'postal-code' },
                  ] as Array<{ k: keyof FormState; label: string; placeholder: string; full?: boolean; type: string; autoComplete?: string; required?: boolean }>
                ).map(field => (
                  <div key={field.k} style={{ gridColumn: field.full ? '1 / -1' : 'auto' }}>
                    <label htmlFor={`field-${field.k}`} style={labelStyle}>
                      {field.label}
                      {field.required && <span aria-hidden="true"> *</span>}
                    </label>
                    <input
                      id={`field-${field.k}`}
                      type={field.type}
                      value={form[field.k]}
                      onChange={e => handleFormChange(field.k, e.target.value)}
                      placeholder={field.placeholder}
                      autoComplete={field.autoComplete}
                      required={field.required}
                      style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = '#CAFF00')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                    />
                  </div>
                ))}
              </div>
              <button
                type="submit"
                disabled={!isStep1Valid}
                style={{
                  background: '#CAFF00',
                  color: '#000',
                  border: 'none',
                  padding: '16px 40px',
                  fontSize: 15,
                  fontWeight: 800,
                  cursor: isStep1Valid ? 'pointer' : 'not-allowed',
                  fontFamily: 'var(--font-body)',
                  letterSpacing: '0.06em',
                  opacity: isStep1Valid ? 1 : 0.4,
                  transition: 'opacity 0.2s',
                }}
              >
                CONTINUAR AL PAGO →
              </button>
            </form>
          )}

          {step === 2 && (
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 28,
                  letterSpacing: '0.06em',
                  color: '#fff',
                  marginBottom: 32,
                }}
              >
                MÉTODO DE PAGO
              </h2>

              <fieldset style={{ border: 'none', padding: 0, marginBottom: 32 }}>
                <legend style={{ ...labelStyle, marginBottom: 16 }}>Selecciona un método</legend>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {PAYMENT_METHODS.map(pm => (
                    <label
                      key={pm.id}
                      style={{
                        background: payMethod === pm.id ? 'rgba(202,255,0,0.06)' : '#0a0a0a',
                        border: `1px solid ${payMethod === pm.id ? '#CAFF00' : 'rgba(255,255,255,0.08)'}`,
                        padding: '18px 20px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 16,
                        transition: 'all 0.2s',
                      }}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={pm.id}
                        checked={payMethod === pm.id}
                        onChange={() => setPayMethod(pm.id)}
                        style={{ accentColor: '#CAFF00' }}
                      />
                      <span style={{ fontSize: 18 }} aria-hidden="true">{pm.icon}</span>
                      <div>
                        <p style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>{pm.label}</p>
                        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>
                          {pm.sub}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </fieldset>

              {payMethod === 'card' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label htmlFor="cc-number" style={labelStyle}>Número de tarjeta</label>
                    <input
                      id="cc-number"
                      type="text"
                      inputMode="numeric"
                      autoComplete="cc-number"
                      value={cardForm.number}
                      onChange={e => handleCardChange('number', e.target.value)}
                      placeholder="1234 5678 9012 3456"
                      style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = '#CAFF00')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                    />
                  </div>
                  <div>
                    <label htmlFor="cc-expiry" style={labelStyle}>Vencimiento</label>
                    <input
                      id="cc-expiry"
                      type="text"
                      autoComplete="cc-exp"
                      value={cardForm.expiry}
                      onChange={e => handleCardChange('expiry', e.target.value)}
                      placeholder="MM / AA"
                      style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = '#CAFF00')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                    />
                  </div>
                  <div>
                    <label htmlFor="cc-cvv" style={labelStyle}>CVV</label>
                    <input
                      id="cc-cvv"
                      type="text"
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      value={cardForm.cvv}
                      onChange={e => handleCardChange('cvv', e.target.value)}
                      placeholder="123"
                      style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = '#CAFF00')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                    />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label htmlFor="cc-name" style={labelStyle}>Nombre en la tarjeta</label>
                    <input
                      id="cc-name"
                      type="text"
                      autoComplete="cc-name"
                      value={cardForm.name}
                      onChange={e => handleCardChange('name', e.target.value)}
                      placeholder="JUAN GARCIA"
                      style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = '#CAFF00')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                    />
                  </div>
                </div>
              )}

              {payMethod === 'mercadopago' && (
                <div
                  style={{
                    background: 'rgba(0,110,255,0.06)',
                    border: '1px solid rgba(0,110,255,0.15)',
                    padding: '24px',
                    marginBottom: 28,
                    textAlign: 'center',
                  }}
                >
                  <p style={{ fontSize: 32, marginBottom: 12 }} aria-hidden="true">🔵</p>
                  <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', margin: 0 }}>
                    Al confirmar, serás redirigido a MercadoPago para completar tu pago de forma segura.
                  </p>
                </div>
              )}

              {payMethod === 'whatsapp' && (
                <div
                  style={{
                    background: 'rgba(37,211,102,0.06)',
                    border: '1px solid rgba(37,211,102,0.15)',
                    padding: '24px',
                    marginBottom: 28,
                    textAlign: 'center',
                  }}
                >
                  <p style={{ fontSize: 32, marginBottom: 12 }} aria-hidden="true">💬</p>
                  <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', margin: 0 }}>
                    Te enviaremos un link de cobro por WhatsApp. Un asesor confirmará tu pedido en minutos.
                  </p>
                </div>
              )}

              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  onClick={() => setStep(1)}
                  style={{
                    background: 'none',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.5)',
                    padding: '16px 24px',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  ← ATRÁS
                </button>
                <button
                  onClick={handlePay}
                  disabled={loading}
                  style={{
                    flex: 1,
                    background: '#CAFF00',
                    color: '#000',
                    border: 'none',
                    padding: '16px',
                    fontSize: 15,
                    fontWeight: 800,
                    cursor: loading ? 'wait' : 'pointer',
                    fontFamily: 'var(--font-body)',
                    letterSpacing: '0.06em',
                    opacity: loading ? 0.7 : 1,
                    transition: 'opacity 0.2s',
                  }}
                >
                  {loading
                    ? 'PROCESANDO...'
                    : payMethod === 'whatsapp'
                    ? `CONFIRMAR POR WHATSAPP $${cartTotal} →`
                    : `PAGAR $${cartTotal} MXN →`}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right — Order Summary */}
        <aside
          aria-label="Resumen del pedido"
          style={{
            background: '#0a0a0a',
            border: '1px solid rgba(255,255,255,0.06)',
            padding: '28px',
            position: 'sticky',
            top: 80,
          }}
        >
          <p
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: 'rgba(255,255,255,0.4)',
              textTransform: 'uppercase',
              marginBottom: 20,
            }}
          >
            Resumen del Pedido
          </p>
          {cart.length === 0 ? (
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>
              Tu carrito está vacío.{' '}
              <Link href="/" style={{ color: '#CAFF00' }}>
                Ver productos
              </Link>
            </p>
          ) : (
            <>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {cart.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'flex',
                      gap: 14,
                      marginBottom: 16,
                      paddingBottom: 16,
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                    }}
                  >
                    <div
                      style={{
                        background: '#1a1a1a',
                        width: 60,
                        height: 60,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        position: 'relative',
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }}
                      />
                      <span
                        aria-label={`Cantidad: ${item.qty}`}
                        style={{
                          position: 'absolute',
                          top: -6,
                          right: -6,
                          background: '#CAFF00',
                          color: '#000',
                          borderRadius: '50%',
                          width: 18,
                          height: 18,
                          fontSize: 10,
                          fontWeight: 800,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {item.qty}
                      </span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{item.name}</p>
                      <p style={{ fontSize: 15, fontWeight: 700, color: '#CAFF00', marginTop: 4 }}>
                        ${item.price * item.qty} MXN
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <div style={{ paddingTop: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>Subtotal</span>
                  <span style={{ fontSize: 13, color: '#fff' }}>${cartTotal} MXN</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>Envío</span>
                  <span style={{ fontSize: 13, color: '#CAFF00', fontWeight: 700 }}>GRATIS</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: 16,
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <span style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>Total</span>
                  <span style={{ fontSize: 22, fontWeight: 800, color: '#CAFF00' }}>
                    ${cartTotal} MXN
                  </span>
                </div>
              </div>
            </>
          )}
          <div
            style={{
              marginTop: 20,
              padding: '14px',
              background: 'rgba(202,255,0,0.04)',
              border: '1px solid rgba(202,255,0,0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <span style={{ color: '#CAFF00', fontSize: 16 }} aria-hidden="true">🔒</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', lineHeight: 1.5 }}>
              Pago seguro y cifrado. Tus datos están protegidos.
            </span>
          </div>
        </aside>
      </div>
    </div>
  );
}
