export default function SecuritySection() {
  const securityFeatures = [
    {
      icon: '🔒',
      title: 'Encriptación de Datos',
      description: 'Todos los datos se encriptan en tránsito y en reposo usando estándares industry-grade (TLS 1.3, AES-256).'
    },
    {
      icon: '🛡️',
      title: 'Autenticación de Dos Factores',
      description: 'Protege tu cuenta con 2FA mediante aplicaciones autenticadoras, SMS o correo electrónico.'
    },
    {
      icon: '👁️',
      title: 'Control de Privacidad',
      description: 'Controla quién puede ver tu contenido, tus suscripciones y tu actividad en la plataforma.'
    },
    {
      icon: '📧',
      title: 'Notificaciones de Seguridad',
      description: 'Recibe alertas instantáneas sobre actividad sospechosa o inicios de sesión desde nuevos dispositivos.'
    },
    {
      icon: '🔍',
      title: 'Monitoreo Continuo',
      description: 'Sistemas de detección de intrusiones y monitoreo 24/7 para proteger tu información.'
    },
    {
      icon: '📋',
      title: 'Auditorías Regulares',
      description: 'Realizamos auditorías de seguridad periódicas y pruebas de penetración para mantener los más altos estándares.'
    }
  ];

  const securitySteps = [
    {
      step: '1',
      title: 'Habilita la verificación en dos pasos',
      action: 'Activar 2FA'
    },
    {
      step: '2',
      title: 'Revisa los dispositivos conectados',
      action: 'Ver dispositivos'
    },
    {
      step: '3',
      title: 'Actualiza tu contraseña regularmente',
      action: 'Cambiar contraseña'
    },
    {
      step: '4',
      title: 'Revisa los permisos de aplicaciones',
      action: 'Gestionar apps'
    }
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
        Seguridad y Protección
      </h1>
      
      <p style={{ color: '#6b7280', marginBottom: '2rem', lineHeight: '1.6' }}>
        Tu seguridad es nuestra prioridad. Aquí encontrarás todas las herramientas y configuraciones para proteger tu cuenta.
      </p>

      {/* Características de seguridad */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontWeight: 'bold', marginBottom: '1.5rem', color: '#374151' }}>
          Medidas de Seguridad
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {securityFeatures.map((feature, index) => (
            <div key={index} style={{
              background: 'white',
              borderRadius: '12px',
              padding: '1.5rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{feature.icon}</div>
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

      {/* Pasos de seguridad */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontWeight: 'bold', marginBottom: '1.5rem', color: '#374151' }}>
          Protege tu Cuenta
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem'
        }}>
          {securitySteps.map((step, index) => (
            <div key={index} style={{
              background: 'white',
              borderRadius: '12px',
              padding: '1.5rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{
                width: '30px',
                height: '30px',
                background: '#3b82f6',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                marginBottom: '1rem'
              }}>
                {step.step}
              </div>
              <h3 style={{ fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>
                {step.title}
              </h3>
              <button style={{
                marginTop: 'auto',
                padding: '0.5rem 1rem',
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600'
              }}>
                {step.action}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Estado de seguridad */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '2rem',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
      }}>
        <h2 style={{ fontWeight: 'bold', marginBottom: '1.5rem', color: '#374151' }}>
          Estado de tu Seguridad
        </h2>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: '#10b981'
          }}></div>
          <span style={{ color: '#10b981', fontWeight: 'bold' }}>Protección activa</span>
        </div>
        
        <div style={{
          background: '#f0f9ff',
          padding: '1rem',
          borderRadius: '8px',
          border: '1px solid #bae6fd'
        }}>
          <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#0369a1' }}>
            ✅ Todo está protegido
          </h3>
          <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
            Tu cuenta está protegida con las medidas de seguridad estándar. Te recomendamos habilitar la verificación en dos pasos para una protección adicional.
          </p>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <h3 style={{ fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>
            Actividad Reciente
          </h3>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#6b7280' }}>Inicio de sesión exitoso</span>
              <span style={{ color: '#9ca3af', fontSize: '0.9rem' }}>Hace 2 horas</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#6b7280' }}>Dispositivo reconocido</span>
              <span style={{ color: '#9ca3af', fontSize: '0.9rem' }}>Chrome en Windows</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#6b7280' }}>Ubicación</span>
              <span style={{ color: '#9ca3af', fontSize: '0.9rem' }}>España</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}