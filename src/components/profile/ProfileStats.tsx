'use client';

interface ProfileStatsProps {
  stats: {
    followers: number;
    videos: number;
    views: number;
    likes: number;
  };
}

export default function ProfileStats({ stats }: ProfileStatsProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div style={{
      display: 'flex',
      gap: '2rem',
      marginTop: '1rem',
      flexWrap: 'wrap'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{formatNumber(stats.followers)}</div>
        <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Seguidores</div>
      </div>
      
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{formatNumber(stats.videos)}</div>
        <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Videos</div>
      </div>
      
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{formatNumber(stats.views)}</div>
        <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Visualizaciones</div>
      </div>
      
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{formatNumber(stats.likes)}</div>
        <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Likes</div>
      </div>
    </div>
  );
}