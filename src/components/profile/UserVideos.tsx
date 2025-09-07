// components/profile/UserVideos.tsx
interface Video {
  id: string;
  title: string;
  views: number;
  likes: number;
  thumbnail: string;
  duration: string;
  uploadDate: Date;
}

interface UserVideosProps {
  videos: Video[];
}

export default function UserVideos({ videos }: UserVideosProps) {
  const formatDuration = (duration: string) => {
    // Asumiendo que la duración está en formato "HH:MM:SS" o "MM:SS"
    return duration;
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div>
      <h2 style={{ 
        fontSize: '1.5rem', 
        fontWeight: 'bold', 
        marginBottom: '1.5rem',
        color: '#1f2937'
      }}>
        Videos públicos ({videos.length})
      </h2>

      {videos.length === 0 ? (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '3rem',
          textAlign: 'center',
          color: '#6b7280'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎬</div>
          <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>No hay videos públicos</p>
          <p>Este usuario aún no ha subido ningún video.</p>
        </div>
      ) : (
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
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              position: 'relative'
            }}>
              {/* Miniatura del video */}
              <div style={{
                height: '180px',
                background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '3rem',
                position: 'relative'
              }}>
                ▶️
                <div style={{
                  position: 'absolute',
                  bottom: '0.5rem',
                  right: '0.5rem',
                  background: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.8rem'
                }}>
                  {formatDuration(video.duration)}
                </div>
              </div>
              
              {/* Información del video */}
              <div style={{ padding: '1rem' }}>
                <h3 style={{ 
                  fontWeight: 'bold', 
                  marginBottom: '0.5rem',
                  fontSize: '1rem',
                  lineHeight: '1.4',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {video.title}
                </h3>
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  color: '#6b7280', 
                  fontSize: '0.9rem' 
                }}>
                  <span>{video.views.toLocaleString()} vistas</span>
                  <span>{formatDate(video.uploadDate)}</span>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  marginTop: '0.5rem',
                  color: '#6b7280',
                  fontSize: '0.9rem'
                }}>
                  <span>👍 {video.likes.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}