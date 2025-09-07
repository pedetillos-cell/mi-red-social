export default function HowItWorksSection() {
  const steps = [
    {
      number: '1',
      title: 'Crea tu cuenta',
      description: 'Regístrate en segundos con tu email o redes sociales. Es completamente gratuito y solo te llevará unos minutos.',
      icon: '📝',
      color: '#3b82f6'
    },
    {
      number: '2',
      title: 'Personaliza tu perfil',
      description: 'Añade una foto de perfil, descripción y tus intereses. Cuanto más completes tu perfil, mejor podremos recomendarte contenido.',
      icon: '🎨',
      color: '#8b5cf6'
    },
    {
      number: '3',
      title: 'Descubre contenido',
      description: 'Explora videos basados en tus intereses. Sigue a creadores que te gusten y guarda tus videos favoritos.',
      icon: '🔍',
      color: '#ec4899'
    },
    {
      number: '4',
      title: 'Sube tu contenido',
      description: 'Comparte tus videos, imágenes y experiencias con la comunidad. Puedes subir desde tu dispositivo o transmitir en vivo.',
      icon: '📤',
      color: '#f59e0b'
    },
    {
      number: '5',
      title: 'Interactúa con la comunidad',
      description: 'Comenta, comparte y da me gusta al contenido de otros creadores. Construye tu propia comunidad de seguidores.',
      icon: '💬',
      color: '#10b981'
    },
    {
      number: '6',
      title: 'Monetiza tu contenido',
      description: 'Una vez que tengas seguidores, puedes unirte a nuestro programa de partners y empezar a generar ingresos.',
      icon: '💰',
      color: '#ef4444'
    }
  ];

  const features = [
    {
      icon: '⚡',
      title: 'Rápido y Ligero',
      description: 'Carga instantánea y experiencia fluida incluso con conexiones lentas'
    },
    {
      icon: '🎯',
      title: 'Recomendaciones Inteligentes',
      description: 'Algoritmos avanzados que aprenden de tus preferencias para mostrarte contenido relevante'
    },
    {
      icon: '🔒',
      title: 'Privacidad First',
      description: 'Control total sobre tu privacidad y datos personales'
    },
    {
      icon: '📱',
      title: 'Multiplataforma',
      description: 'Funciona perfectamente en desktop, tablet y móvil'
    }
  ];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
        Cómo Funciona VRYNO
      </h1>
      
      <p style={{ color: '#6b7280', marginBottom: '2rem', lineHeight: '1.6', fontSize: '1.1rem' }}>
        VRYNO es una plataforma diseñada para creadores y amantes del contenido. Sigue estos simples pasos 
        para comenzar tu journey en la plataforma y aprovechar al máximo todas sus características.
      </p>

      {/* Pasos principales */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {steps.map((step, index) => (
            <div key={index} style={{
              background: 'white',
              borderRadius: '12px',
              padding: '2rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              borderTop: `4px solid ${step.color}`,
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-20px',
                left: '2rem',
                width: '40px',
                height: '40px',
                background: step.color,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1.2rem'
              }}>
                {step.number}
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '2rem' }}>{step.icon}</span>
                <h2 style={{ fontWeight: 'bold', color: '#374151' }}>{step.title}</h2>
              </div>
              
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Características */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontWeight: 'bold', marginBottom: '1.5rem', color: '#374151', textAlign: 'center' }}>
          ¿Por qué elegir VRYNO?
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem'
        }}>
          {features.map((feature, index) => (
            <div key={index} style={{
              background: 'white',
              borderRadius: '12px',
              padding: '1.5rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{feature.icon}</div>
              <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#374151' }}>
                {feature.title}
              </h3>
              <p style={{ color: '#6b7280', lineHeight: '1.5' }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Llamada a la acción */}
      <div style={{
        background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
        borderRadius: '12px',
        padding: '3rem',
        textAlign: 'center',
        color: 'white',
        marginBottom: '2rem'
      }}>
        <h2 style={{ fontWeight: 'bold', marginBottom: '1rem', fontSize: '1.8rem' }}>
          ¿Listo para comenzar?
        </h2>
        <p style={{ marginBottom: '2rem', opacity: 0.9, fontSize: '1.1rem' }}>
          Únete a miles de creadores que ya están compartiendo su contenido y construyendo su comunidad en VRYNO
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button style={{
            padding: '1rem 2rem',
            background: 'white',
            color: '#3b82f6',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1rem'
          }}>
            Crear Cuenta Gratis
          </button>
          <button style={{
            padding: '1rem 2rem',
            background: 'transparent',
            color: 'white',
            border: '2px solid white',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1rem'
          }}>
            Ver Demo
          </button>
        </div>
      </div>

      {/* FAQ rápida */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '2rem',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
      }}>
        <h2 style={{ fontWeight: 'bold', marginBottom: '1.5rem', color: '#374151', textAlign: 'center' }}>
          Preguntas Frecuentes
        </h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div>
            <h3 style={{ fontWeight: 'bold', color: '#374151' }}>¿Es gratuito?</h3>
            <p style={{ color: '#6b7280' }}>Sí, VRYNO es completamente gratuito para los usuarios. Los creadores pueden unirse a nuestro programa de partners para monetizar su contenido.</p>
          </div>
          <div>
            <h3 style={{ fontWeight: 'bold', color: '#374151' }}>¿Qué tipo de contenido puedo subir?</h3>
            <p style={{ color: '#6b7280' }}>Puedes subir cualquier contenido original que crees, siempre que cumpla con nuestras directrices comunitarias y términos de servicio.</p>
          </div>
          <div>
            <h3 style={{ fontWeight: 'bold', color: '#374151' }}>¿Cómo gano dinero?</h3>
            <p style={{ color: '#6b7280' }}>A través de nuestro programa de partners, puedes monetizar con anuncios, suscripciones de canal, donaciones y más.</p>
          </div>
        </div>
      </div>
    </div>
  );
}