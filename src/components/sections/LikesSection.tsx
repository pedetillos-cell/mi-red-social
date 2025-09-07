export default function LikesSection() {
  const likedVideos = [
    {
      id: 'like1',
      title: 'React Hooks Tutorial Completo - Desde Cero a Experto',
      channel: 'TechMaster',
      views: '45K',
      time: 'Hace 1 semana',
      duration: '15:30',
      likes: '2.4K',
      thumbnail: '⚛️'
    },
    {
      id: 'like2',
      title: 'Diseño Responsive con CSS Grid y Flexbox',
      channel: 'DesignPro',
      views: '32K',
      time: 'Hace 3 días',
      duration: '22:15',
      likes: '1.8K',
      thumbnail: '🎨'
    },
    {
      id: 'like3',
      title: 'Cómo optimizar tu código JavaScript para producción',
      channel: 'CodeWithMe',
      views: '28K',
      time: 'Hace 2 semanas',
      duration: '18:45',
      likes: '2.1K',
      thumbnail: '💻'
    },
    {
      id: 'like4',
      title: 'Creando tu marca personal como creador de contenido',
      channel: 'CreativeMind',
      views: '51K',
      time: 'Hace 5 días',
      duration: '25:20',
      likes: '3.2K',
      thumbnail: '🌟'
    },
    {
      id: 'like5',
      title: 'Monetización en redes sociales 2024 - Estrategias comprobadas',
      channel: 'BusinessCreator',
      views: '37K',
      time: 'Hace 1 semana',
      duration: '20:10',
      likes: '2.9K',
      thumbnail: '💰'
    }
  ];

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', color: '#1f2937' }}>
        Videos que Me Gustan
      </h1>

      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {likedVideos.map(video => (
          <div key={video.id} style={{
            background: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            display: 'flex',
            gap: '1.5rem',
            alignItems: 'center',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            cursor: 'pointer',
            transition: 'transform 0.2s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{
              width: '200px',
              height: '120px',
              background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '2.5rem',
              position: 'relative',
              flexShrink: 0
            }}>
              {video.thumbnail}
              <span style={{
                position: 'absolute',
                bottom: '8px',
                right: '8px',
                background: 'rgba(0,0,0,0.7)',
                color: 'white',
                padding: '2px 6px',
                borderRadius: '4px',
                fontSize: '0.8rem'
              }}>
                {video.duration}
              </span>
            </div>
            
            <div style={{ flex: 1 }}>
              <h3 style={{ 
                fontWeight: 'bold', 
                marginBottom: '0.5rem',
                color: '#1f2937',
                lineHeight: '1.4'
              }}>
                {video.title}
              </h3>
              <p style={{ color: '#6b7280', marginBottom: '0.5rem' }}>{video.channel}</p>
              <div style={{ display: 'flex', gap: '1.5rem', color: '#9ca3af', fontSize: '0.9rem' }}>
                <span>{video.views} vistas</span>
                <span>❤️ {video.likes}</span>
                <span>{video.time}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
              <button style={{
                padding: '0.75rem',
                background: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '1.1rem'
              }}
              title="Quitar me gusta">
                ❤️
              </button>
              <button style={{
                padding: '0.75rem',
                background: 'transparent',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                cursor: 'pointer',
                color: '#6b7280'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = '#f3f4f6'}
              onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                ⋮
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '2rem',
        textAlign: 'center',
        color: '#6b7280'
      }}>
        <p>{likedVideos.length} videos guardados en tus me gusta</p>
      </div>
    </div>
  );
}