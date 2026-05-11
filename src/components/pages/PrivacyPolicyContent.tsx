'use client';

import Link from 'next/link';
import { useIsMobile } from '@/hooks/useBreakpoint';

const sections = [
  {
    title: '1. Información que recopilamos',
    body: 'Cuando realizas una compra o te comunicas con nosotros, podemos recopilar información como: nombre completo, dirección de entrega, correo electrónico, número de teléfono y datos de pago (procesados de forma segura por terceros — nunca almacenamos datos bancarios directamente). También recopilamos datos de navegación anónimos para mejorar la experiencia del sitio.',
  },
  {
    title: '2. Uso de tu información',
    body: 'Usamos tu información exclusivamente para: procesar y enviar tu pedido, comunicarnos contigo sobre el estado de tu compra, resolver dudas o reclamaciones por WhatsApp o correo, y mejorar nuestros productos y servicios. No vendemos ni compartimos tus datos personales con terceros con fines publicitarios.',
  },
  {
    title: '3. Protección de datos',
    body: 'SuperPinStore implementa medidas de seguridad razonables para proteger tu información contra acceso no autorizado, alteración, divulgación o destrucción. Las transacciones con tarjeta de crédito/débito son procesadas mediante plataformas certificadas (MercadoPago) que cumplen con los estándares PCI-DSS.',
  },
  {
    title: '4. Cookies',
    body: 'Este sitio puede utilizar cookies técnicas para el correcto funcionamiento del carrito de compras y la sesión. No utilizamos cookies de rastreo de terceros con fines publicitarios sin tu consentimiento explícito.',
  },
  {
    title: '5. Tus derechos (ARCO)',
    body: 'De conformidad con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP), tienes derecho a Acceder, Rectificar, Cancelar u Oponerte al tratamiento de tus datos personales. Para ejercer estos derechos, contáctanos por WhatsApp al +52 771 232 5019 o al correo superpinstore@gmail.com.',
  },
  {
    title: '6. Cambios a esta política',
    body: 'Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento. Los cambios serán publicados en esta página con la fecha de última actualización. Te recomendamos revisarla periódicamente.',
  },
  {
    title: '7. Contacto',
    body: 'Para cualquier duda relacionada con el manejo de tu información personal, puedes contactarnos por WhatsApp al +52 771 232 5019 o mediante Instagram, TikTok o Facebook como @superpinstore.',
  },
];

export default function PrivacyPolicyContent() {
  const isMobile = useIsMobile();

  return (
    <div style={{ background: '#000', minHeight: '100vh', paddingTop: 64 }}>
      <section
        style={{
          background: '#0a0a0a',
          padding: isMobile ? '48px 20px' : '80px 40px',
          borderBottom: '1px solid rgba(202,255,0,0.08)',
        }}
      >
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
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
            Legal
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 5vw, 56px)',
              letterSpacing: '0.06em',
              color: '#fff',
              lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            POLÍTICA DE PRIVACIDAD
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>
            Última actualización: mayo 2025 · SuperPinStore (superpinstore.com)
          </p>
        </div>
      </section>

      <section style={{ padding: isMobile ? '48px 20px' : '80px 40px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <p
            style={{
              fontSize: isMobile ? 15 : 16,
              color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.8,
              marginBottom: 48,
              borderLeft: '3px solid rgba(202,255,0,0.4)',
              paddingLeft: 20,
            }}
          >
            En SuperPinStore nos tomamos en serio la privacidad de nuestros clientes. Esta política
            explica qué información recopilamos, cómo la usamos y cómo la protegemos.
          </p>

          {sections.map((s, i) => (
            <div
              key={i}
              style={{
                marginBottom: 40,
                paddingBottom: 40,
                borderBottom:
                  i < sections.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: isMobile ? 18 : 22,
                  letterSpacing: '0.04em',
                  color: '#fff',
                  marginBottom: 14,
                  textTransform: 'uppercase',
                }}
              >
                {s.title}
              </h2>
              <p
                style={{
                  fontSize: isMobile ? 14 : 15,
                  color: 'rgba(255,255,255,0.5)',
                  lineHeight: 1.8,
                  margin: 0,
                }}
              >
                {s.body}
              </p>
            </div>
          ))}

          <div style={{ marginTop: 56, textAlign: 'center' }}>
            <Link
              href="/"
              style={{
                display: 'inline-block',
                color: '#CAFF00',
                fontSize: 14,
                fontWeight: 600,
                textDecoration: 'none',
                borderBottom: '1px solid rgba(202,255,0,0.3)',
                paddingBottom: 2,
              }}
            >
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
