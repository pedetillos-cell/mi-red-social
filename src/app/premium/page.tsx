export default function PremiumPage() {
  const plans = [
    {
      name: "Mensual",
      price: "4.99",
      period: "mes",
      popular: false,
      savings: ""
    },
    {
      name: "Anual", 
      price: "49.99",
      period: "año",
      popular: true,
      savings: "Ahorras 16%"
    }
  ];

  const benefits = [
    { icon: "🚫", text: "Sin anuncios" },
    { icon: "🎨", text: "Avatar personalizado" },
    { icon: "💬", text: "Emojis exclusivos en comentarios" },
    { icon: "📊", text: "Estadísticas avanzadas" },
    { icon: "🎬", text: "Calidad 4K en todos los videos" },
    { icon: "⏬", text: "Descargas offline" },
    { icon: "🎁", text: "Soporte prioritario" }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '6rem 2rem 2rem 2rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '4rem',
          color: 'white'
        }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            ⭐ Vryno Premium
          </h1>
          <p style={{
            fontSize: '1.4rem',
            opacity: 0.9,
            margin: 0
          }}>
            Desbloquea experiencias exclusivas y apoya la plataforma
          </p>
        </div>

        {/* Planes */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {plans.map((plan, index) => (
            <div key={index} style={{
              background: 'white',
              borderRadius: '20px',
              padding: '2.5rem',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              position: 'relative',
              transform: plan.popular ? 'scale(1.05)' : 'scale(1)',
              border: plan.popular ? '3px solid #f59e0b' : '3px solid transparent'
            }}>
              {plan.popular && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#f59e0b',
                  color: 'white',
                  padding: '0.5rem 1.5rem',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}>
                  MÁS POPULAR
                </div>
              )}
              
              <h3 style={{
                fontSize: '1.8rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                color: '#1f2937'
              }}>
                {plan.name}
              </h3>
              
              <div style={{
                marginBottom: '1.5rem'
              }}>
                <span style={{
                  fontSize: '3.5rem',
                  fontWeight: 'bold',
                  color: '#0ea5e9'
                }}>
                  ${plan.price}
                </span>
                <span style={{
                  color: '#6b7280',
                  fontSize: '1.2rem'
                }}>
                  /{plan.period}
                </span>
              </div>

              {plan.savings && (
                <p style={{
                  color: '#059669',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  marginBottom: '2rem'
                }}>
                  {plan.savings}
                </p>
              )}

              <button style={{
                width: '100%',
                background: plan.popular 
                  ? 'linear-gradient(45deg, #f59e0b, #ef4444)' 
                  : 'linear-gradient(45deg, #0ea5e9, #3b82f6)',
                color: 'white',
                padding: '1.2rem',
                borderRadius: '12px',
                border: 'none',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                cursor: 'pointer',
                transition: 'transform 0.2s ease'
              }}>
                Elegir {plan.name}
              </button>
            </div>
          ))}
        </div>

        {/* Beneficios */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '3rem',
          marginBottom: '3rem',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <h2 style={{
            fontSize: '2.2rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '3rem',
            color: 'white'
          }}>
            ¿Qué incluye Vryno Premium?
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {benefits.map((benefit, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <span style={{
                  fontSize: '2rem',
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {benefit.icon}
                </span>
                <span style={{
                  color: 'white',
                  fontSize: '1.1rem',
                  fontWeight: '500'
                }}>
                  {benefit.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Preguntas frecuentes */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '3rem'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '2.5rem',
            color: '#1f2937'
          }}>
            Preguntas Frecuentes
          </h2>
          
          <div style={{
            display: 'grid',
            gap: '1.5rem'
          }}>
            <div>
              <h3 style={{
                fontWeight: 'bold',
                marginBottom: '0.5rem',
                color: '#1f2937',
                fontSize: '1.2rem'
              }}>
                ¿Puedo cancelar en cualquier momento?
              </h3>
              <p style={{
                color: '#6b7280',
                margin: 0,
                lineHeight: '1.6'
              }}>
                Sí, puedes cancelar tu suscripción premium en cualquier momento. 
                No hay contratos a largo plazo ni penalizaciones por cancelación.
              </p>
            </div>
            
            <div>
              <h3 style={{
                fontWeight: 'bold',
                marginBottom: '0.5rem',
                color: '#1f2937',
                fontSize: '1.2rem'
              }}>
                ¿Cómo se realiza el pago?
              </h3>
              <p style={{
                color: '#6b7280',
                margin: 0,
                lineHeight: '1.6'
              }}>
                Aceptamos tarjetas de crédito, PayPal y otros métodos de pago seguros. 
                Tus datos de pago están protegidos con encriptación de grado bancario.
              </p>
            </div>
            
            <div>
              <h3 style={{
                fontWeight: 'bold',
                marginBottom: '0.5rem',
                color: '#1f2937',
                fontSize: '1.2rem'
              }}>
                ¿Hay periodo de prueba gratuito?
              </h3>
              <p style={{
                color: '#6b7280',
                margin: 0,
                lineHeight: '1.6'
              }}>
                ¡Sí! Ofrecemos 7 días de prueba gratuita para que experimentes todos 
                los beneficios de Vryno Premium sin compromiso.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}