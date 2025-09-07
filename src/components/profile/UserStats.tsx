// components/profile/UserStats.tsx
interface UserStatsProps {
  user: {
    joinDate: Date;
    subscribers: number;
    videos: number;
    totalViews: number;
  };
}

export default function UserStats({ user }: UserStatsProps) {
  const stats = [
    {
      label: 'Se unió',
      value: new Date(user.joinDate).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long'
      }),
      icon: '📅'
    },
    {
      label: 'Suscriptores',
      value: user.subscribers.toLocaleString(),
      icon: '👥'
    },
    {
      label: 'Videos',
      value: user.videos,
      icon: '🎬'
    },
    {
      label: 'Visualizaciones',
      value: user.totalViews.toLocaleString(),
      icon: '👀'
    }
  ];

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
    }}>
      <h3 style={{ 
        fontWeight: 'bold', 
        marginBottom: '1.5rem',
        color: '#1f2937'
      }}>
        Estadísticas
      </h3>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {stats.map((stat, index) => (
          <div key={index} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '0.75rem',
            background: '#f9fafb',
            borderRadius: '8px'
          }}>
            <span style={{ fontSize: '1.2rem' }}>{stat.icon}</span>
            <div>
              <div style={{ fontWeight: '600', color: '#374151' }}>{stat.value}</div>
              <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}