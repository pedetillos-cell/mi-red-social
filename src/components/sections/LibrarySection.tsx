export default function LibrarySection() {
  const libraryItems = [
    {
      title: 'Historial',
      count: 128,
      icon: '🕒',
      color: '#3b82f6',
      description: 'Videos que has visto'
    },
    {
      title: 'Tus videos',
      count: 24,
      icon: '🎬',
      color: '#ef4444',
      description: 'Tus creaciones'
    },
    {
      title: 'Ver más tarde',
      count: 18,
      icon: '⏱️',
      color: '#10b981',
      description: 'Videos guardados'
    },
    {
      title: 'Descargas',
      count: 7,
      icon: '📥',
      color: '#8b5cf6',
      description: 'Contenido offline'
    },
    {
      title: 'Playlists',
      count: 5,
      icon: '🎵',
      color: '#f59e0b',
      description: 'Tus listas'
    },
    {
      title: 'Me gusta',
      count: 47,
      icon: '👍',
      color: '#ec4899',
      description: 'Videos que te gustan'
    }
  ];

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', color: '#1f2937' }}>
        Tu Biblioteca
      </h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem'
      }}>
        {libraryItems.map((item, index) => (
          <div key={index} style={{
            background: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            borderLeft: `4px solid ${item.color}`,
            cursor: 'pointer',
            transition: 'transform 0.2s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2rem' }}>{item.icon}</span>
              <div>
                <h3 style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>{item.title}</h3>
                <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>{item.description}</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ 
                color: item.color, 
                fontWeight: 'bold',
                fontSize: '1.2rem'
              }}>
                {item.count}
              </span>
              <button style={{
                padding: '0.5rem 1rem',
                background: item.color,
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}>
                Ver todo
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}