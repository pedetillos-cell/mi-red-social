export default function HistorySection() {
  const historyItems = [
    {
      title: 'Cómo aprender React en 2024 - Guía completa',
      channel: 'TechMaster',
      views: '45K',
      time: 'Hace 2 horas',
      duration: '15:30',
      thumbnail: '🎬'
    },
    {
      title: 'Diseño UI/UX para principiantes',
      channel: 'DesignPro',
      views: '32K',
      time: 'Hace 5 horas',
      duration: '22:15',
      thumbnail: '🎨'
    },
    {
      title: 'Next.js 14 Tutorial Completo desde Cero',
      channel: 'CodeWithMe',
      views: '28K',
      time: 'Ayer',
      duration: '18:45',
      thumbnail: '💻'
    },
    {
      title: 'Tips para crear contenido viral en redes',
      channel: 'CreativeMind',
      views: '51K',
      time: 'Hace 2 días',
      duration: '25:20',
      thumbnail: '🔥'
    },
    {
      title: 'Cómo monetizar tu contenido en 2024',
      channel: 'BusinessCreator',
      views: '37K',
      time: 'Hace 3 días',
      duration: '20:10',
      thumbnail: '💰'
    }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' }}>
          Historial de Visualización
        </h1>
        <button style={{
          padding: '0.75rem 1.5rem',
          background: '#ef4444',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: '600'
        }}>
          🗑️ Limpiar historial
        </button>
      </div>

      <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        {historyItems.map((item, index) => (
          <div key={index} style={{
            padding: '1.5rem',
            borderBottom: index < historyItems.length - 1 ? '1px solid #e5e7eb' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            cursor: 'pointer',
            transition: 'background 0.2s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = '#f9fafb'}
          onMouseOut={(e) => e.currentTarget.style.background = 'white'}>
            <div style={{
              width: '160px',
              height: '90px',
              background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '2rem',
              position: 'relative',
              flexShrink: 0
            }}>
              {item.thumbnail}
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
                {item.duration}
              </span>
            </div>
            
            <div style={{ flex: 1 }}>
              <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#1f2937' }}>
                {item.title}
              </h3>
              <p style={{ color: '#6b7280', marginBottom: '0.5rem' }}>{item.channel}</p>
              <div style={{ display: 'flex', gap: '1.5rem', color: '#9ca3af', fontSize: '0.9rem' }}>
                <span>{item.views} vistas</span>
                <span>{item.time}</span>
              </div>
            </div>
            
            <button style={{
              padding: '0.5rem',
              background: 'transparent',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              color: '#6b7280',
              fontSize: '1.2rem'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = '#f3f4f6'}
            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
              ⋮
            </button>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '2rem',
        textAlign: 'center',
        color: '#6b7280'
      }}>
        <p>Mostrando {historyItems.length} videos de tu historial</p>
      </div>
    </div>
  );
}