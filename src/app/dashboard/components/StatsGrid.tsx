'use client';

interface StatsGridProps {
  stats: {
    followers: number;
    totalViews: number;
    revenue: number;
    videos: number;
    followerGrowth: number;
    viewGrowth: number;
    revenueGrowth: number;
  };
}

export default function StatsGrid({ stats }: StatsGridProps) {
  const statCards = [
    {
      title: 'Seguidores',
      value: stats.followers.toLocaleString(),
      growth: stats.followerGrowth,
      icon: '👥',
      color: 'blue'
    },
    {
      title: 'Vistas Totales',
      value: stats.totalViews.toLocaleString(),
      growth: stats.viewGrowth,
      icon: '👀',
      color: 'green'
    },
    {
      title: 'Ingresos',
      value: `$${stats.revenue.toFixed(2)}`,
      growth: stats.revenueGrowth,
      icon: '💰',
      color: 'purple'
    },
    {
      title: 'Videos',
      value: stats.videos.toString(),
      growth: null,
      icon: '🎬',
      color: 'orange'
    }
  ];

  return (
    <div className="stats-grid">
      {statCards.map((stat, index) => (
        <div key={index} className={`stat-card stat-card-${stat.color}`}>
          <div className="stat-header">
            <div className="stat-icon">{stat.icon}</div>
            <span className="stat-title">{stat.title}</span>
          </div>
          <div className="stat-value">{stat.value}</div>
          {stat.growth !== null && (
            <div className="stat-growth">
              <span className={`growth-indicator ${stat.growth >= 0 ? 'positive' : 'negative'}`}>
                {stat.growth >= 0 ? '↗' : '↘'} {Math.abs(stat.growth).toLocaleString()}
              </span>
              <span className="growth-label">desde ayer</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}