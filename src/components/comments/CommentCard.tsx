'use client';

import { useState } from 'react';
import CommentReplies from './CommentReplies';
import ReactionsBar from './ReactionsBar';

interface User {
  id: string;
  name: string;
  avatar: string;
  isVerified?: boolean;
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

interface CommentCardProps {
  comment: Comment;
  currentUser: User;
  onLike: (commentId: string) => void;
  onReply: (commentId: string, text: string) => void;
}

export default function CommentCard({ comment, currentUser, onLike, onReply }: CommentCardProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'ahora mismo';
    if (minutes < 60) return `hace ${minutes} min`;
    if (hours < 24) return `hace ${hours} h`;
    if (days < 7) return `hace ${days} d`;
    return date.toLocaleDateString();
  };

  const handleReplySubmit = (text: string) => {
    onReply(comment.id, text);
    setIsReplying(false);
    setShowReplies(true);
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1.1rem'
        }}>
          {comment.user.name.charAt(0)}
        </div>
        
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontWeight: '600', color: '#374151' }}>
              {comment.user.name}
            </span>
            {comment.user.isVerified && (
              <span style={{ color: '#3b82f6', fontSize: '0.9rem' }}>✓</span>
            )}
          </div>
          <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>
            {formatTime(comment.timestamp)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ marginBottom: '1rem' }}>
        <p style={{ color: '#374151', lineHeight: '1.6' }}>{comment.text}</p>
      </div>

      {/* Actions */}
      <ReactionsBar
        likes={comment.likes}
        isLiked={comment.isLiked}
        onLike={() => onLike(comment.id)}
        onReply={() => setIsReplying(!isReplying)}
        onShare={() => {}}
      />

      {/* Reply Form */}
      {isReplying && (
        <div style={{ marginTop: '1rem', paddingLeft: '2rem' }}>
          <div style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'flex-start'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              flexShrink: 0
            }}>
              {currentUser.name.charAt(0)}
            </div>
            
            <div style={{ flex: 1 }}>
              <textarea
                placeholder="Escribe tu respuesta..."
                rows={2}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  resize: 'vertical'
                }}
              />
              
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button style={{
                  padding: '0.5rem 1rem',
                  background: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}>
                  Responder
                </button>
                
                <button 
                  onClick={() => setIsReplying(false)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: '#e5e7eb',
                    color: '#374151',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Replies */}
      {comment.replies.length > 0 && (
        <CommentReplies
          replies={comment.replies}
          currentUser={currentUser}
          onLike={onLike}
          onReply={onReply}
          showReplies={showReplies}
          onToggleReplies={() => setShowReplies(!showReplies)}
        />
      )}
    </div>
  );
}