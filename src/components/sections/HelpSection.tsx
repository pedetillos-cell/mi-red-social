export default function HelpSection() {
  const faqs = [
    {
      question: '¿Cómo cambio mi contraseña?',
      answer: 'Ve a Configuración → Seguridad → Cambiar contraseña. Introduce tu contraseña actual y la nueva contraseña que deseas usar.'
    },
    {
      question: '¿Cómo subo un video?',
      answer: 'Haz clic en el botón "Subir" en la parte superior derecha y selecciona "Subir Video". Puedes arrastrar y soltar el archivo o buscarlo en tu dispositivo.'
    },
    {
      question: '¿Cómo elimino mi cuenta?',
      answer: 'Ve a Configuración → Zona Peligrosa → Eliminar Cuenta. Sigue las instrucciones y confirma que deseas eliminar permanentemente tu cuenta.'
    },
    {
      question: '¿Cómo reporto contenido inapropiado?',
      answer: 'Haz clic en los tres puntos (⋯) junto al contenido y selecciona "Reportar". Elige la categoría adecuada y proporciona detalles adicionales si es necesario.'
    },
    {
      question: '¿Cómo monetizo mi contenido?',
      answer: 'Debes unirte al Programa de Partners de VRYNO. Necesitas cumplir con ciertos requisitos como tener al menos 1000 suscriptores y 4000 horas de visualización en los últimos 12 meses.'
    },
    {
      question: '¿Cómo cambio la calidad de video?',
      answer: 'Durante la reproducción, haz clic en el icono de configuración (⚙️) y selecciona la calidad deseada en el menú "Calidad".'
    }
  ];

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email de Soporte',
      description: 'Responde en 24 horas',
      contact: 'soporte@vryno.com',
      action: 'Enviar Email'
    },
    {
      icon: '💬',
      title: 'Chat en Vivo',
      description: 'Disponible 24/7',
      contact: 'Iniciar chat ahora',
      action: 'Iniciar Chat'
    },
    {
      icon: '📞',
      title: 'Teléfono',
      description: 'Lunes a Viernes 9AM-6PM',
      contact: '+1 (555) 123-VRYNO',
      action: 'Llamar Ahora'
    },
    {
      icon: '🐦',
      title: 'Twitter',
      description: 'Respuesta rápida',
      contact: '@VRYNO_Support',
      action: 'Enviar Tweet'
    }
  ];

  const popularArticles = [
    {
      title: 'Guía para creadores principiantes',
      category: 'Creadores',
      reads: '12K'
    },
    {
      title: 'Cómo optimizar tus videos para SEO',
      category: 'Optimización',
      reads: '8.5K'
    },
    {
      title: 'Políticas de contenido permitido',
      category: 'Normas',
      reads: '15K'
    },
    {
      title: 'Solución de problemas de subida',
      category: 'Técnico',
      reads: '6.2K'
    },
    {
      title: 'Guía de monetización completa',
      category: 'Monetización',
      reads: '23K'
    },
    {
      title: 'Privacidad y configuración de cuenta',
      category: 'Privacidad',
      reads: '9.8K'
    }
  ];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
        Centro de Ayuda
      </h1>
      
      <p style={{ color: '#6b7280', marginBottom: '2rem', lineHeight: '1.6' }}>
        Encuentra respuestas a tus preguntas, contacta con nuestro equipo de soporte y descubre recursos para aprovechar al máximo VRYNO.
      </p>

      {/* Buscador */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
          <input
            type="text"
            placeholder="Buscar en la base de conocimiento..."
            style={{
              width: '100%',
              padding: '1.2rem 1.2rem 1.2rem 3.5rem',
              borderRadius: '12px',
              border: '2px solid #e5e7eb',
              fontSize: '1.1rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          />
          <span style={{
            position: 'absolute',
            left: '1.2rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#6b7280',
            fontSize: '1.5rem'
          }}>🔍</span>
        </div>
      </div>

      {/* FAQs */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontWeight: 'bold', marginBottom: '1.5rem', color: '#374151' }}>
          Preguntas Frecuentes
        </h2>
        
        <div style={{ display: 'grid', gap: '1rem' }}>
          {faqs.map((faq, index) => (
            <div key={index} style={{
              background: 'white',
              borderRadius: '12px',
              padding: '1.5rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              cursor: 'pointer',
              transition: 'transform 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <h3 style={{ 
                fontWeight: 'bold', 
                marginBottom: '1rem',
                color: '#374151',
                fontSize: '1.1rem'
              }}>
                {faq.question}
              </h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Artículos populares */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontWeight: 'bold', marginBottom: '1.5rem', color: '#374151' }}>
          Artículos Populares
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {popularArticles.map((article, index) => (
            <div key={index} style={{
              background: 'white',
              borderRadius: '12px',
              padding: '1.5rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              cursor: 'pointer',
              transition: 'transform 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ 
                background: '#f3f4f6', 
                padding: '0.5rem 1rem', 
                borderRadius: '20px', 
                display: 'inline-block',
                marginBottom: '1rem'
              }}>
                <span style={{ 
                  color: '#374151', 
                  fontSize: '0.8rem', 
                  fontWeight: '600' 
                }}>
                  {article.category}
                </span>
              </div>
              <h3 style={{ 
                fontWeight: 'bold', 
                marginBottom: '0.5rem',
                color: '#374151'
              }}>
                {article.title}
              </h3>
              <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                {article.reads} lecturas
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Contacto */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontWeight: 'bold', marginBottom: '1.5rem', color: '#374151' }}>
          Contacta con Soporte
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem'
        }}>
          {contactMethods.map((method, index) => (
            <div key={index} style={{
              background: 'white',
              borderRadius: '12px',
              padding: '2rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{method.icon}</div>
              <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#374151' }}>
                {method.title}
              </h3>
              <p style={{ color: '#6b7280', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                {method.description}
              </p>
              <p style={{ 
                color: '#3b82f6', 
                fontWeight: '600', 
                marginBottom: '1.5rem',
                fontSize: '1.1rem'
              }}>
                {method.contact}
              </p>
              <button style={{
                padding: '0.75rem 1.5rem',
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600'
              }}>
                {method.action}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Estado del sistema */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '2rem',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
      }}>
        <h2 style={{ fontWeight: 'bold', marginBottom: '1.5rem', color: '#374151' }}>
          Estado del Sistema
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              width: '20px', 
              height: '20px', 
              background: '#10b981', 
              borderRadius: '50%',
              margin: '0 auto 0.5rem'
            }}></div>
            <h3 style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>Plataforma</h3>
            <p style={{ color: '#10b981', fontWeight: '600' }}>Operativa</p>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              width: '20px', 
              height: '20px', 
              background: '#10b981', 
              borderRadius: '50%',
              margin: '0 auto 0.5rem'
            }}></div>
            <h3 style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>Subidas</h3>
            <p style={{ color: '#10b981', fontWeight: '600' }}>Operativas</p>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              width: '20px', 
              height: '20px', 
              background: '#10b981', 
              borderRadius: '50%',
              margin: '0 auto 0.5rem'
            }}></div>
            <h3 style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>Reproducción</h3>
            <p style={{ color: '#10b981', fontWeight: '600' }}>Operativa</p>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              width: '20px', 
              height: '20px', 
              background: '#f59e0b', 
              borderRadius: '50%',
              margin: '0 auto 0.5rem'
            }}></div>
            <h3 style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>API</h3>
            <p style={{ color: '#f59e0b', fontWeight: '600' }}>Mantenimiento</p>
          </div>
        </div>
        
        <div style={{ 
          background: '#f0f9ff', 
          padding: '1rem', 
          borderRadius: '8px', 
          marginTop: '1.5rem',
          border: '1px solid #bae6fd'
        }}>
          <p style={{ color: '#6b7280', margin: 0, fontSize: '0.9rem' }}>
            ✅ Todos los sistemas funcionan correctamente. El mantenimiento de la API está programado y no afectará al servicio principal.
          </p>
        </div>
      </div>
    </div>
  );
}