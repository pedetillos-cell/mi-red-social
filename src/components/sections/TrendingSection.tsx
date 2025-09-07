export default function TrendingSection() {
  const trendingVideos = [
    {
      id: 'trend1',
      title: '🔥 TENDENCIA: Lo último en React 18',
      views: 125000,
      likes: 12450,
      channel: 'TechTrends',
      time: 'Hace 2 horas'
    },
    {
      id: 'trend2',
      title: 'Este video está rompiendo Internet',
      views: 89000,
      likes: 9870,
      channel: 'ViralContent',
      time: 'Hace 5 horas'
    },
    {
      id: 'trend3',
      title: 'Así se crea contenido viral en 2024',
      views: 156000,
      likes: 15600,
      channel: 'ContentMaster',
      time: 'Hace 8 horas'
    },
    {
      id: 'trend4',
      title: 'El tutorial que todos estaban esperando',
      views: 78000,
      likes: 8450,
      channel: 'LearnWithMe',
      time: 'Hace 1 día'
    }
  ];

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
        Trending
      </h1>
      <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
        Los videos más populares de VRYNO en este momento
      </p>

      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {trendingVideos.map((video, index) => (
          <div key={video.id} style={{
            background: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>
              #{index + 1}
            </div>
            
            <div style={{ flex: 1 }}>
              <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#1f2937' }}>
                {video.title}
              </h3>
              <p style={{ color: '#6b7280', marginBottom: '0.5rem' }}>{video.channel}</p>
              <div style={{ display: 'flex', gap: '1.5rem', color: '#9ca3af', fontSize: '0.9rem' }}>
                <span>{video.views.toLocaleString()} vistas</span>
                <span>{video.likes.toLocaleString()} likes</span>
                <span>{video.time}</span>
              </div>
            </div>

            <div style={{
              padding: '0.5rem 1rem',
              background: '#ffedd5',
              color: '#9a3412',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: 'bold'
            }}>
              🔥 Trending
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}