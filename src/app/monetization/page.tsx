export default function MonetizationPage() {
  const userStats = {
    videos: 23,
    totalHoursWatched: 2850,
    subscribers: 1245,
    eligibility: {
      videos: 5,
      hours: 4000,
      subscribers: 1000
    }
  };

  const isEligible = userStats.videos >= userStats.eligibility.videos && 
                    userStats.totalHoursWatched >= userStats.eligibility.hours && 
                    userStats.subscribers >= userStats.eligibility.subscribers;

  const stats = {
    earnings: isEligible ? 1250.50 : 0,
    subscribers: userStats.subscribers,
    viewsThisMonth: 45800,
    estimatedEarnings: isEligible ? 325.75 : 0
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f3f4f6',
      padding: '6rem 2rem 2rem 2rem'
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
        }}>
          <h1 style={{
            fontSize: '2.2rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            background: 'linear-gradient(45deg, #059669, #10b981)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            💰 Centro de Monetización
          </h1>
          <p style={{
            color: '#6b7280',
            fontSize: '1.1rem',
            margin: 0
          }}>
            {isEligible ? '¡Felicidades! Cumples con los requisitos para monetizar.' : 'Completa los requisitos para empezar a ganar dinero'}
          </p>
        </div>

        {/* Estado de elegibilidad */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            color: '#1f2937'
          }}>
            Requisitos de Elegibilidad
          </h2>

          {isEligible ? (
            <div style={{
              background: '#d1fae5',
              border: '2px solid #10b981',
              borderRadius: '12px',
              padding: '1.5rem',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '2rem',
                marginBottom: '1rem'
              }}>
                ✅
              </div>
              <h3 style={{
                fontWeight: 'bold',
                color: '#065f46',
                marginBottom: '0.5rem'
              }}>
                ¡Felicidades!
              </h3>
              <p style={{
                color: '#065f46',
                margin: 0
              }}>
                Cumples con todos los requisitos para monetizar tu contenido.
              </p>
            </div>
          ) : (
            <div style={{
              background: '#fffbeb',
              border: '2px solid #f59e0b',
              borderRadius: '12px',
              padding: '1.5rem',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '2rem',
                marginBottom: '1rem'
              }}>
                ⏳
              </div>
              <h3 style={{
                fontWeight: 'bold',
                color: '#92400e',
                marginBottom: '0.5rem'
              }}>
                En camino a la monetización
              </h3>
              <p style={{
                color: '#92400e',
                margin: 0
              }}>
                Completa los siguientes requisitos para desbloquear la monetización.
              </p>
            </div>
          )}

          {/* Progreso de requisitos */}
          <div style={{
            marginTop: '2rem',
            display: 'grid',
            gap: '1.5rem'
          }}>
            {/* Requisito 1: Videos */}
            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem'
              }}>
                <span style={{
                  fontWeight: 'bold',
                  color: '#1f2937'
                }}>
                  📹 Mínimo {userStats.eligibility.videos} videos publicados
                </span>
                <span style={{
                  color: userStats.videos >= userStats.eligibility.videos ? '#059669' : '#dc2626',
                  fontWeight: 'bold'
                }}>
                  {userStats.videos}/{userStats.eligibility.videos} • 
                  {userStats.videos >= userStats.eligibility.videos ? ' ✅' : ' ❌'}
                </span>
              </div>
              <div style={{
                width: '100%',
                height: '8px',
                background: '#e5e7eb',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${Math.min((userStats.videos / userStats.eligibility.videos) * 100, 100)}%`,
                  height: '100%',
                  background: userStats.videos >= userStats.eligibility.videos ? '#10b981' : '#3b82f6',
                  borderRadius: '4px'
                }} />
              </div>
            </div>

            {/* Requisito 2: Horas de visualización */}
            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem'
              }}>
                <span style={{
                  fontWeight: 'bold',
                  color: '#1f2937'
                }}>
                  🕒 {userStats.eligibility.hours.toLocaleString()} horas de visualización
                </span>
                <span style={{
                  color: userStats.totalHoursWatched >= userStats.eligibility.hours ? '#059669' : '#dc2626',
                  fontWeight: 'bold'
                }}>
                  {userStats.totalHoursWatched.toLocaleString()}/{userStats.eligibility.hours.toLocaleString()} • 
                  {userStats.totalHoursWatched >= userStats.eligibility.hours ? ' ✅' : ' ❌'}
                </span>
              </div>
              <div style={{
                width: '100%',
                height: '8px',
                background: '#e5e7eb',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${Math.min((userStats.totalHoursWatched / userStats.eligibility.hours) * 100, 100)}%`,
                  height: '100%',
                  background: userStats.totalHoursWatched >= userStats.eligibility.hours ? '#10b981' : '#3b82f6',
                  borderRadius: '4px'
                }} />
              </div>
            </div>

            {/* Requisito 3: Suscriptores */}
            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem'
              }}>
                <span style={{
                  fontWeight: 'bold',
                  color: '#1f2937'
                }}>
                  👥 {userStats.eligibility.subscribers.toLocaleString()} suscriptores
                </span>
                <span style={{
                  color: userStats.subscribers >= userStats.eligibility.subscribers ? '#059669' : '#dc2626',
                  fontWeight: 'bold'
                }}>
                  {userStats.subscribers.toLocaleString()}/{userStats.eligibility.subscribers.toLocaleString()} • 
                  {userStats.subscribers >= userStats.eligibility.subscribers ? ' ✅' : ' ❌'}
                </span>
              </div>
              <div style={{
                width: '100%',
                height: '8px',
                background: '#e5e7eb',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${Math.min((userStats.subscribers / userStats.eligibility.subscribers) * 100, 100)}%`,
                  height: '100%',
                  background: userStats.subscribers >= userStats.eligibility.subscribers ? '#10b981' : '#3b82f6',
                  borderRadius: '4px'
                }} />
              </div>
            </div>
          </div>
        </div>

        {/* Solo mostrar stats si es elegible */}
        {isEligible && (
          <>
            {/* Stats rápidas */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                background: 'white',
                borderRadius: '12px',
                padding: '1.5rem',
                textAlign: 'center',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
              }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: '#059669',
                  marginBottom: '0.5rem'
                }}>
                  ${stats.earnings}
                </div>
                <div style={{
                  color: '#6b7280',
                  fontSize: '0.9rem'
                }}>
                  Ganancias totales
                </div>
              </div>

              <div style={{
                background: 'white',
                borderRadius: '12px',
                padding: '1.5rem',
                textAlign: 'center',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
              }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: '#0ea5e9',
                  marginBottom: '0.5rem'
                }}>
                  {stats.subscribers.toLocaleString()}
                </div>
                <div style={{
                  color: '#6b7280',
                  fontSize: '0.9rem'
                }}>
                  Suscriptores
                </div>
              </div>

              <div style={{
                background: 'white',
                borderRadius: '12px',
                padding: '1.5rem',
                textAlign: 'center',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
              }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: '#8b5cf6',
                  marginBottom: '0.5rem'
                }}>
                  {stats.viewsThisMonth.toLocaleString()}
                </div>
                <div style={{
                  color: '#6b7280',
                  fontSize: '0.9rem'
                }}>
                  Visitas este mes
                </div>
              </div>

              <div style={{
                background: 'white',
                borderRadius: '12px',
                padding: '1.5rem',
                textAlign: 'center',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
              }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: '#ec4899',
                  marginBottom: '0.5rem'
                }}>
                  ${stats.estimatedEarnings}
                </div>
                <div style={{
                  color: '#6b7280',
                  fontSize: '0.9rem'
                }}>
                  Estimado este mes
                </div>
              </div>
            </div>

            {/* Resto del contenido de monetización... */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '1.5rem',
                color: '#1f2937'
              }}>
                Métodos de Monetización Disponibles
              </h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem'
              }}>
                {/* Anuncios */}
                <div style={{
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📺</div>
                  <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#1f2937' }}>
                    Anuncios
                  </h3>
                  <p style={{ color: '#6b7280', marginBottom: '1rem', fontSize: '0.9rem' }}>
                    Gana dinero con anuncios en tus videos
                  </p>
                  <button style={{
                    background: '#0ea5e9',
                    color: 'white',
                    padding: '0.7rem 1.5rem',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}>
                    Activar
                  </button>
                </div>

                {/* Miembros */}
                <div style={{
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⭐</div>
                  <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#1f2937' }}>
                    Miembros
                  </h3>
                  <p style={{ color: '#6b7280', marginBottom: '1rem', fontSize: '0.9rem' }}>
                    Ofrece contenido exclusivo a suscriptores
                  </p>
                  <button style={{
                    background: '#f59e0b',
                    color: 'white',
                    padding: '0.7rem 1.5rem',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}>
                    Configurar
                  </button>
                </div>

                {/* Donaciones */}
                <div style={{
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>💝</div>
                  <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#1f2937' }}>
                    Donaciones
                  </h3>
                  <p style={{ color: '#6b7280', marginBottom: '1rem', fontSize: '0.9rem' }}>
                    Recibe apoyo directo de tu audiencia
                  </p>
                  <button style={{
                    background: '#ec4899',
                    color: 'white',
                    padding: '0.7rem 1.5rem',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}>
                    Gestionar
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Consejos si no es elegible */}
        {!isEligible && (
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              color: '#1f2937'
            }}>
              💡 Consejos para Alcanzar los Requisitos
            </h2>

            <div style={{
              display: 'grid',
              gap: '1rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                background: '#f9fafb',
                borderRadius: '8px'
              }}>
                <span style={{ fontSize: '1.5rem' }}>🎬</span>
                <div>
                  <h4 style={{ fontWeight: 'bold', margin: '0 0 0.3rem 0', color: '#1f2937' }}>
                    Crea contenido regularmente
                  </h4>
                  <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>
                    Sube al menos 1 video por semana para mantener a tu audiencia engagada
                  </p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                background: '#f9fafb',
                borderRadius: '8px'
              }}>
                <span style={{ fontSize: '1.5rem' }}>⏱️</span>
                <div>
                  <h4 style={{ fontWeight: 'bold', margin: '0 0 0.3rem 0', color: '#1f2937' }}>
                    Mejora la retención
                  </h4>
                  <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>
                    Crea contenido de calidad que mantenga a los viewers viendo por más tiempo
                  </p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                background: '#f9fafb',
                borderRadius: '8px'
              }}>
                <span style={{ fontSize: '1.5rem' }}>👥</span>
                <div>
                  <h4 style={{ fontWeight: 'bold', margin: '0 0 0.3rem 0', color: '#1f2937' }}>
                    Interactúa con tu comunidad
                  </h4>
                  <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>
                    Responde comentarios y crea contenido que invite a la suscripción
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}