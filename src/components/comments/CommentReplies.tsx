'use client';

import CommentCard from './CommentCard';

interface User {
  id: string;
  name: string;
  avatar: string;
}

interface Comment {
  id: string;
  user: User;
  text: string;
  timestamp: Date;
  likes: number;
  isLiked: boolean;
  replies: Comment[];
}

interface CommentRepliesProps {
  replies: Comment[];
  currentUser: User;
  onLike: (commentId: string) => void;
  onReply: (commentId: string, text: string) => void;
  showReplies: boolean;
  onToggleReplies: () => void;
}

export default function CommentReplies({
  replies,
  currentUser,
  onLike,
  onReply,
  showReplies,
  onToggleReplies
}: CommentRepliesProps) {
  return (
    <div style={{ marginTop: '1rem', paddingLeft: '2rem', borderLeft: '2px solid #e5e7eb' }}>
      <button
        onClick={onToggleReplies}
        style={{
          background: 'none',
          border: 'none',
          color: '#3b82f6',
          cursor: 'pointer',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: showReplies ? '1rem' : '0'
        }}
      >
        {showReplies ? '↥ Ocultar respuestas' : `↧ Ver ${replies.length} respuesta${replies.length !== 1 ? 's' : ''}`}
      </button>

      {showReplies && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {replies.map(reply => (
            <CommentCard
              key={reply.id}
              comment={reply}
              currentUser={currentUser}
              onLike={onLike}
              onReply={onReply}
            />
          ))}
        </div>
      )}
    </div>
  );
}