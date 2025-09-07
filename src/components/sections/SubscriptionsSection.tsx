export default function SubscriptionsSection() {
  const subscriptions = [
    {
      id: '1',
      channel: 'TechMaster',
      subscribers: '2.4M',
      videos: '456',
      isLive: true,
      newVideos: 3
    },
    {
      id: '2',
      channel: 'DesignPro',
      subscribers: '1.8M',
      videos: '289',
      isLive: false,
      newVideos: 1
    },
    {
      id: '3',
      channel: 'CodeWithMe',
      subscribers: '3.1M',
      videos: '512',
      isLive: true,
      newVideos: 0
    },
    {
      id: '4',
      channel: 'CreativeMind',
      subscribers: '950K',
      videos: '167',
      isLive: false,
      newVideos: 5
    }
  ];

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', color: '#1f2937' }}>
        Tus Suscripciones
      </h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem'
      }}>
        {subscriptions.map(channel => (
          <div key={channel.id} style={{
            background: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1.2rem'
              }}>
                {channel.channel.charAt(0)}
              </div>
              <div>
                <h3 style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>{channel.channel}</h3>
                <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>{channel.subscribers} suscriptores</p>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>{channel.videos} videos</span>
              
              {channel.isLive && (
                <div style={{
                  padding: '0.25rem 0.75rem',
                  background: '#dc2626',
                  color: 'white',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}>
                  🔴 EN VIVO
                </div>
              )}
            </div>

            {channel.newVideos > 0 && (
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: '#3b82f6',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.7rem',
                fontWeight: 'bold'
              }}>
                {channel.newVideos}
              </div>
            )}

            <button style={{
              width: '100%',
              padding: '0.75rem',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              marginTop: '1rem'
            }}>
              Ver Canal
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}