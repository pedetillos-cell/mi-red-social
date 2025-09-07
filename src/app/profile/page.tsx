export default function ProfilePage() {
  const user = {
    username: "javierlayos",
    name: "Javier Layos",
    email: "javier@vryno.com",
    subscribers: 1245,
    videos: 23,
    totalViews: 45800,
    joinedDate: "Enero 2024",
    bio: "Creador de contenido sobre desarrollo web, tecnología y gaming. Amante de Next.js y React."
  };

  const userVideos = [
    {
      id: "1",
      title: "Cómo crear una red social con Next.js",
      views: 12500,
      likes: 450,
      createdAt: new Date(2024, 0, 15),
      duration: "15:30"
    },
    {
      id: "2",
      title: "Tutorial de TypeScript para principiantes",
      views: 8900,
      likes: 320,
      createdAt: new Date(2024, 0, 10),
      duration: "22:15"
    },
    {
      id: "3",
      title: "Desarrollo web moderno con Tailwind CSS",
      views: 15600,
      likes: 520,
      createdAt: new Date(2024, 0, 5),
      duration: "18:45"
    },
    {
      id: "4",
      title: "React 18 nuevas características",
      views: 9800,
      likes: 310,
      createdAt: new Date(2023, 11, 28),
      duration: "12:20"
    },
    {
      id: "5",
      title: "Configuración de PostgreSQL con Prisma",
      views: 11200,
      likes: 480,
      createdAt: new Date(2023, 11, 20),
      duration: "25:10"
    },
    {
      id: "6",
      title: "Deploy en Vercel y Netlify",
      views: 8700,
      likes: 290,
      createdAt: new Date(2023, 11, 15),
      duration: "14:35"
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f3f4f6',
      padding: '6rem 2rem 2rem 2rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header del perfil */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '2.5rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          display: 'flex',
          alignItems: 'center',
          gap: '2rem'
        }}>
          {/* Avatar */}
          <div style={{
            width: '120px',
            height: '120px',
            background: 'linear-gradient(45deg, #0ea5e9, #3b82f6)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '2.5rem',
            flexShrink: 0
          }}>
            JL
          </div>

          {/* Información del usuario */}
          <div style={{ flex: 1 }}>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '0.5rem',
              color: '#1f2937'
            }}>
              {user.name}
            </h1>
            <p style={{
              color: '#0ea5e9',
              fontWeight: '600',
              marginBottom: '0.5rem',
              fontSize: '1.2rem'
            }}>
              @{user.username}
            </p>
            <p style={{
              color: '#6b7280',
              marginBottom: '1rem',
              lineHeight: '1.6'
            }}>
              {user.bio}
            </p>
            <p style={{
              color: '#6b7280',
              fontSize: '0.9rem',
              margin: 0
            }}>
              Miembro desde {user.joinedDate}
            </p>
          </div>

          {/* Botón de editar */}
          <button style={{
            background: '#0ea5e9',
            color: 'white',
            padding: '0.8rem 1.5rem',
            borderRadius: '8px',
            border: 'none',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '1rem'
          }}>
            ✏️ Editar Perfil
          </button>
        </div>

        {/* Stats del perfil */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2.5rem'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '1.5rem',
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{
              fontSize: '2.2rem',
              fontWeight: 'bold',
              color: '#0ea5e9',
              marginBottom: '0.5rem'
            }}>
              {user.subscribers.toLocaleString()}
            </div>
            <div style={{
              color: '#6b7280',
              fontWeight: '600'
            }}>
              Suscriptores
            </div>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '1.5rem',
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{
              fontSize: '2.2rem',
              fontWeight: 'bold',
              color: '#10b981',
              marginBottom: '0.5rem'
            }}>
              {user.videos}
            </div>
            <div style={{
              color: '#6b7280',
              fontWeight: '600'
            }}>
              Videos
            </div>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '1.5rem',
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{
              fontSize: '2.2rem',
              fontWeight: 'bold',
              color: '#f59e0b',
              marginBottom: '0.5rem'
            }}>
              {user.totalViews.toLocaleString()}
            </div>
            <div style={{
              color: '#6b7280',
              fontWeight: '600'
            }}>
              Visualizaciones
            </div>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '1.5rem',
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{
              fontSize: '2.2rem',
              fontWeight: 'bold',
              color: '#ec4899',
              marginBottom: '0.5rem'
            }}>
              ${(user.totalViews * 0.01).toLocaleString()}
            </div>
            <div style={{
              color: '#6b7280',
              fontWeight: '600'
            }}>
              Ingresos estimados
            </div>
          </div>
        </div>

        {/* Videos del usuario */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '2.5rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
        }}>
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: 'bold',
            marginBottom: '2rem',
            color: '#1f2937',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            🎬 Mis Videos ({user.videos})
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {userVideos.map(video => (
              <div key={video.id} style={{
                border: '2px solid #f3f4f6',
                borderRadius: '12px',
                overflow: 'hidden',
                transition: 'transform 0.2s ease',
                cursor: 'pointer'
              }}>
                {/* Thumbnail */}
                <div style={{
                  position: 'relative',
                  height: '180px',
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ fontSize: '2.5rem', color: 'white' }}>🎬</span>
                  <div style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    background: 'rgba(0,0,0,0.8)',
                    color: 'white',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}>
                    {video.duration}
                  </div>
                </div>

                {/* Info del video */}
                <div style={{ padding: '1.2rem' }}>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    marginBottom: '0.8rem',
                    color: '#1f2937',
                    lineHeight: '1.4'
                  }}>
                    {video.title}
                  </h3>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      color: '#6b7280',
                      fontSize: '0.9rem'
                    }}>
                      {video.views.toLocaleString()} vistas
                    </span>
                    <span style={{
                      color: '#ef4444',
                      fontWeight: '600',
                      fontSize: '0.9rem'
                    }}>
                      ❤️ {video.likes}
                    </span>
                  </div>

                  <div style={{
                    color: '#6b7280',
                    fontSize: '0.8rem',
                    marginTop: '0.8rem'
                  }}>
                    {video.createdAt.toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Botón para subir más videos */}
          <div style={{
            textAlign: 'center',
            marginTop: '2.5rem',
            paddingTop: '2rem',
            borderTop: '2px solid #f3f4f6'
          }}>
            <button style={{
              background: 'linear-gradient(45deg, #0ea5e9, #3b82f6)',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              cursor: 'pointer'
            }}>
              📹 Subir Nuevo Video
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}