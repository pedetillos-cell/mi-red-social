'use client';

interface ReactionsBarProps {
  likes: number;
  isLiked: boolean;
  onLike: () => void;
  onReply: () => void;
  onShare: () => void;
}

export default function ReactionsBar({ likes, isLiked, onLike, onReply, onShare }: ReactionsBarProps) {
  return (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
      <button
        onClick={onLike}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          color: isLiked ? '#3b82f6' : '#6b7280',
          fontWeight: isLiked ? '600' : 'normal'
        }}
      >
        <span style={{ fontSize: '1.2rem' }}>{isLiked ? '❤️' : '🤍'}</span>
        <span>{likes}</span>
      </button>

      <button
        onClick={onReply}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          color: '#6b7280'
        }}
      >
        <span style={{ fontSize: '1.2rem' }}>💬</span>
        <span>Responder</span>
      </button>

      <button
        onClick={onShare}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          color: '#6b7280'
        }}
      >
        <span style={{ fontSize: '1.2rem' }}>↗️</span>
        <span>Compartir</span>
      </button>
    </div>
  );
}