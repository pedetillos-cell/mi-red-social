export default function TermsSection() {
  const terms = [
    {
      title: "1. Aceptación de los Términos",
      content: "Al acceder y utilizar VRYNO, aceptas cumplir con estos Términos de Servicio y todas las leyes y regulaciones aplicables. Si no estás de acuerdo con alguno de estos términos, queda prohibido el uso o acceso a este sitio."
    },
    {
      title: "2. Uso del Servicio",
      content: "Debes ser mayor de 13 años para utilizar nuestro servicio. Eres responsable de mantener la confidencialidad de tu cuenta y contraseña, y aceptas notificarnos inmediatamente cualquier acceso no autorizado a tu cuenta."
    },
    {
      title: "3. Contenido del Usuario",
      content: "Eres responsable del contenido que publiques en VRYNO. No publiques contenido que infrinja derechos de autor, sea ilegal, difamatorio, obsceno o que viole los derechos de terceros. Nos reservamos el derecho de eliminar cualquier contenido que consideremos inapropiado."
    },
    {
      title: "4. Propiedad Intelectual",
      content: "Todo el contenido de VRYNO, excepto el contenido subido por usuarios, es propiedad de VRYNO y está protegido por leyes de propiedad intelectual. No puedes copiar, distribuir o crear obras derivadas sin nuestro permiso explícito."
    },
    {
      title: "5. Limitación de Responsabilidad",
      content: "VRYNO no se hace responsable del contenido publicado por los usuarios ni de cualquier daño derivado del uso del servicio. El uso del servicio es bajo tu propio riesgo."
    },
    {
      title: "6. Modificaciones",
      content: "Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en el sitio. Es tu responsabilidad revisar periódicamente estos términos."
    }
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
        Términos de Servicio
      </h1>
      
      <p style={{ color: '#6b7280', marginBottom: '2rem', lineHeight: '1.6' }}>
        Última actualización: 20 de Agosto, 2024
      </p>

      <div style={{ background: 'white', borderRadius: '12px', padding: '2rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        {terms.map((term, index) => (
          <div key={index} style={{ marginBottom: '2rem' }}>
            <h2 style={{ 
              fontWeight: 'bold', 
              marginBottom: '1rem', 
              color: '#374151',
              fontSize: '1.2rem'
            }}>
              {term.title}
            </h2>
            <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
              {term.content}
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
            📞 Contacto
          </h3>
          <p style={{ color: '##6b7280', lineHeight: '1.6' }}>
            Si tienes alguna pregunta sobre estos Términos de Servicio, por favor contáctanos en:
            <br />
            <strong>Email:</strong> legal@vryno.com
            <br />
            <strong>Dirección:</strong> Av. Principal 123, Ciudad, País
          </p>
        </div>
      </div>
    </div>
  );
}