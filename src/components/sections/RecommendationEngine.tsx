// src/components/RecommendationEngine.tsx
import { type Video, type UserProfile } from '@/lib/algorithm/vrynoX';

interface RecommendationEngineProps {
  userProfile: UserProfile;
  videos: Video[];
}

export default function RecommendationEngine({ userProfile, videos }: RecommendationEngineProps) {
  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
      gap: '1.5rem' 
    }}>
      {videos.map(video => (
        <div key={video.id} style={{
          background: 'white',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          cursor: 'pointer'
        }} 
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 8px 15px rgba(0,0,0,0.1)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
        }}>
          <div style={{
            height: '180px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '3rem',
            position: 'relative'
          }}>
            ▶️
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
              {video.duration ? `${Math.floor(video.duration / 60)}:${(video.duration % 60).toString().padStart(2, '0')}` : '10:00'}
            </span>
          </div>
          <div style={{ padding: '1rem' }}>
            <h3 style={{ 
              fontWeight: 'bold', 
              marginBottom: '0.5rem',
              fontSize: '1rem',
              lineHeight: '1.4',
              color: '#1f2937'
            }}>
              {video.title}
            </h3>
            <p style={{ 
              color: '#6b7280', 
              marginBottom: '0.5rem',
              fontSize: '0.9rem'
            }}>
              {video.author.username}
            </p>
            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              color: '#6b7280', 
              fontSize: '0.8rem' 
            }}>
              <span>{video.views.toLocaleString()} vistas</span>
              <span>{video.likes.toLocaleString()} likes</span>
            </div>
            {video.engagementRate && (
              <div style={{
                marginTop: '0.5rem',
                background: '#f3f4f6',
                borderRadius: '4px',
                padding: '0.25rem 0.5rem',
                display: 'inline-block'
              }}>
                <span style={{
                  color: '#059669',
                  fontSize: '0.75rem',
                  fontWeight: '500'
                }}>
                  ▲ {video.engagementRate}% engagement
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}