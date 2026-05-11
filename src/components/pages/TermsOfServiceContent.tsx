'use client';

import Link from 'next/link';
import { useIsMobile } from '@/hooks/useBreakpoint';

const sections = [
  {
    title: '1. Aceptación de los términos',
    body: 'Al realizar una compra o navegar por superpinstore.com, aceptas estos Términos y Condiciones en su totalidad. Si no estás de acuerdo con alguno de ellos, te pedimos que no realices compras en nuestro sitio.',
  },
  {
    title: '2. Productos y precios',
    body: 'Todos los precios están expresados en pesos mexicanos (MXN) e incluyen IVA. Nos reservamos el derecho de modificar precios en cualquier momento sin previo aviso; sin embargo, el precio válido para tu pedido es el vigente al momento de confirmar la compra. Los productos están sujetos a disponibilidad de inventario.',
  },
  {
    title: '3. Proceso de compra y pago',
    body: 'Las órdenes se consideran confirmadas una vez que recibimos el pago completo. Aceptamos pago con tarjeta de crédito/débito (vía MercadoPago) y transferencia bancaria. En caso de problemas con el pago, te contactaremos vía WhatsApp para resolverlo. SuperPinStore no almacena datos de tarjetas — toda la información es procesada por MercadoPago con encriptación SSL.',
  },
  {
    title: '4. Envíos',
    body: 'Realizamos envíos a toda la República Mexicana. El tiempo de entrega estimado es de 3 a 5 días hábiles desde la confirmación del pago. El envío es completamente gratuito en todos los pedidos. No nos hacemos responsables de retrasos ocasionados por la paquetería una vez que el paquete es entregado al servicio de mensajería.',
  },
  {
    title: '5. Devoluciones y garantía',
    body: 'Si tu producto llega dañado o defectuoso, tienes 7 días naturales desde la recepción para notificarnos por WhatsApp con fotografías del producto. En ese caso, reemplazamos el producto sin costo adicional. No se aceptan devoluciones por arrepentimiento una vez que el producto ha sido utilizado. El SuperPin tiene garantía de 30 días contra defectos de fabricación.',
  },
  {
    title: '6. Uso del producto',
    body: 'El SuperPin está diseñado para uso exclusivo en máquinas selectorizadas de gimnasio. El usuario es responsable de verificar la compatibilidad del producto con su equipo antes de su uso. SuperPinStore no se hace responsable por daños a equipos de gimnasio derivados de un uso incorrecto del producto.',
  },
  {
    title: '7. Propiedad intelectual',
    body: 'Todo el contenido de superpinstore.com — incluyendo textos, imágenes, logotipos, videos y diseño — es propiedad de SuperPinStore y está protegido por las leyes de propiedad intelectual aplicables. Queda prohibida su reproducción total o parcial sin autorización escrita.',
  },
  {
    title: '8. Limitación de responsabilidad',
    body: 'SuperPinStore no será responsable por daños indirectos, incidentales o consecuentes derivados del uso o imposibilidad de uso de nuestros productos. Nuestra responsabilidad máxima en cualquier caso estará limitada al monto pagado por el producto en cuestión.',
  },
  {
    title: '9. Modificaciones',
    body: 'SuperPinStore se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. Los cambios entrarán en vigor al momento de su publicación en este sitio. El uso continuado del sitio después de dichos cambios implica la aceptación de los nuevos términos.',
  },
  {
    title: '10. Jurisdicción',
    body: 'Estos Términos y Condiciones se rigen por las leyes de los Estados Unidos Mexicanos. Para cualquier controversia, las partes se someten a la jurisdicción de los tribunales competentes del Estado de Hidalgo, México, renunciando a cualquier otro fuero que pudiera corresponder.',
  },
];

export default function TermsOfServiceContent() {
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
            TÉRMINOS Y CONDICIONES
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
            Estos Términos y Condiciones regulan el uso del sitio web superpinstore.com y la compra
            de productos ofrecidos por SuperPinStore. Léelos con atención antes de realizar tu
            pedido.
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
