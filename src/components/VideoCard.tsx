import Link from 'next/link'

interface VideoCardProps {
  video: {
    id: string
    title: string
    views: number
    likes: number
    createdAt: Date
    author: {
      username: string
    }
  }
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <div style={cardStyle}>
      {/* Thumbnail */}
      <div style={thumbnailStyle}>
        <span style={playIconStyle}>🎬</span>
      </div>

      {/* Información del video */}
      <div style={infoStyle}>
        <h3 style={titleStyle}>{video.title}</h3>
        
        <div style={metaStyle}>
          <Link href={`/channel/${video.author.username}`} style={authorStyle}>
            @{video.author.username}
          </Link>
          <span style={statsStyle}>{video.views} vistas</span>
        </div>

        <div style={engagementStyle}>
          <span style={likesStyle}>❤️ {video.likes}</span>
          <span style={dateStyle}>
            {video.createdAt.toLocaleDateString('es-ES')}
          </span>
        </div>
      </div>
    </div>
  )
}

const cardStyle = {
  background: 'white',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s'
}

const thumbnailStyle = {
  width: '100%',
  height: '200px',
  background: '#e5e7eb',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

const playIconStyle = {
  fontSize: '3rem'
}

const infoStyle = {
  padding: '1rem'
}

const titleStyle = {
  fontSize: '1.1rem',
  fontWeight: 'bold',
  marginBottom: '0.5rem',
  color: '#1f2937'
}

const metaStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '0.5rem'
}

const authorStyle = {
  color: '#3b82f6',
  textDecoration: 'none',
  fontWeight: '600'
}

const statsStyle = {
  color: '#6b7280',
  fontSize: '0.9rem'
}

const engagementStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}

const likesStyle = {
  color: '#ef4444',
  fontWeight: '600'
}

const dateStyle = {
  color: '#6b7280',
  fontSize: '0.9rem'
}