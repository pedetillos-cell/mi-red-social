export default function PrivacySection() {
  const privacyPoints = [
    {
      title: "1. Información que Recopilamos",
      content: "Recopilamos información que nos proporcionas al registrarte, como nombre, email, fecha de nacimiento y datos de perfil. También recopilamos automáticamente datos de uso, cookies, direcciones IP, tipo de dispositivo y información de navegación."
    },
    {
      title: "2. Uso de la Información",
      content: "Utilizamos tu información para personalizar tu experiencia, mejorar nuestros servicios, mostrar contenido relevante, comunicarnos contigo sobre actualizaciones, y prevenir fraudes. Nunca vendemos tus datos personales a terceros."
    },
    {
      title: "3. Cookies y Tecnologías Similares",
      content: "Utilizamos cookies para recordar tus preferencias, analizar el tráfico, personalizar anuncios y mejorar el rendimiento del sitio. Puedes gestionar tus preferencias de cookies en la configuración de tu navegador en cualquier momento."
    },
    {
      title: "4. Compartir Información",
      content: "Compartimos información con proveedores de servicios que nos ayudan a operar nuestra plataforma (alojamiento, análisis, procesamiento de pagos). Estos proveedores están obligados a proteger tu información y solo pueden usarla para los servicios que nos proporcionan."
    },
    {
      title: "5. Seguridad de Datos",
      content: "Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal contra accesos no autorizados, alteración, divulgación o destrucción. Utilizamos encriptación SSL/TLS para proteger los datos en tránsito."
    },
    {
      title: "6. Tus Derechos",
      content: "Tienes derecho a acceder, corregir, eliminar o portar tu información personal. Puedes oponerte al procesamiento de tus datos, retirar tu consentimiento en cualquier momento, y presentar una queja ante la autoridad de protección de datos competente."
    },
    {
      title: "7. Retención de Datos",
      content: "Conservamos tu información personal durante el tiempo necesario para cumplir con los fines descritos en esta política, a menos que la ley requiera o permita un período de retención más largo."
    }
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
        Política de Privacidad
      </h1>
      
      <p style={{ color: '#6b7280', marginBottom: '2rem', lineHeight: '1.6' }}>
        Última actualización: 20 de Agosto, 2024
      </p>

      <div style={{ background: 'white', borderRadius: '12px', padding: '2rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
            En VRYNO, valoramos tu privacidad y estamos comprometidos a proteger tu información personal. 
            Esta política explica cómo recopilamos, usamos y compartimos tu información cuando utilizas nuestros servicios.
          </p>
        </div>

        {privacyPoints.map((point, index) => (
          <div key={index} style={{ marginBottom: '2rem' }}>
            <h2 style={{ 
              fontWeight: 'bold', 
              marginBottom: '1rem', 
              color: '#374151',
              fontSize: '1.2rem'
            }}>
              {point.title}
            </h2>
            <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
              {point.content}
            </p>
          </div>
        ))}

        <div style={{ 
          background: '#f3f4f6', 
          padding: '1.5rem', 
          borderRadius: '8px',
          marginTop: '2rem'
        }}>
          <h3 style={{ fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>
            📧 Contacto sobre Privacidad
          </h3>
          <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
            Si tienes preguntas sobre esta política de privacidad o sobre tus datos personales, contáctanos en:
            <br />
            <strong>Email:</strong> privacy@vryno.com
            <br />
            <strong>Oficial de Privacidad:</strong> dpo@vryno.com
          </p>
        </div>
      </div>
    </div>
  );
}