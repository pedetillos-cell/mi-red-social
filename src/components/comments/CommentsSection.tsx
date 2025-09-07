'use client';

import { useState, useEffect } from 'react';
import CommentCard from './CommentCard';
import CommentForm from './CommentForm';

interface Comment {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
    isVerified?: boolean;
  };
  text: string;
  timestamp: Date;
  likes: number;
  isLiked: boolean;
  replies: Comment[];
}

interface CommentsSectionProps {
  videoId: string;
  currentUser: {
    id: string;
    name: string;
    avatar: string;
  };
}

export default function CommentsSection({ videoId, currentUser }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simular carga de comentarios
  useEffect(() => {
    const loadComments = async () => {
      setIsLoading(true);
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setComments([
        {
          id: '1',
          user: {
            id: 'user1',
            name: 'María García',
            avatar: '',
            isVerified: true
          },
          text: '¡Increíble video! Me encantó la parte del tutorial. 👏',
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          likes: 24,
          isLiked: false,
          replies: [
            {
              id: '1-1',
              user: currentUser,
              text: '¡Gracias María! Me alegra que te gustara. ¿Qué parte te pareció más útil?',
              timestamp: new Date(Date.now() - 1000 * 60 * 15),
              likes: 5,
              isLiked: false,
              replies: []
            }
          ]
        },
        {
          id: '2',
          user: {
            id: 'user2',
            name: 'Carlos Rodríguez',
            avatar: '',
            isVerified: false
          },
          text: '¿Planeas hacer un stream en vivo pronto? ¡Estaría genial! 🚀',
          timestamp: new Date(Date.now() - 1000 * 60 * 120),
          likes: 12,
          isLiked: true,
          replies: []
        }
      ]);
      setIsLoading(false);
    };

    loadComments();
  }, [videoId, currentUser]);

  const handleNewComment = (text: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      user: currentUser,
      text,
      timestamp: new Date(),
      likes: 0,
      isLiked: false,
      replies: []
    };
    setComments(prev => [newComment, ...prev]);
  };

  const handleLike = (commentId: string) => {
    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          isLiked: !comment.isLiked
        };
      }
      return comment;
    }));
  };

  const handleReply = (commentId: string, text: string) => {
    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [
            ...comment.replies,
            {
              id: `${commentId}-${Date.now()}`,
              user: currentUser,
              text,
              timestamp: new Date(),
              likes: 0,
              isLiked: false,
              replies: []
            }
          ]
        };
      }
      return comment;
    }));
  };

  if (isLoading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
        Cargando comentarios...
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
          💬 Comentarios ({comments.length})
        </h3>
        <CommentForm onSubmit={handleNewComment} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {comments.map(comment => (
          <CommentCard
            key={comment.id}
            comment={comment}
            currentUser={currentUser}
            onLike={handleLike}
            onReply={handleReply}
          />
        ))}
        
        {comments.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💬</div>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              Sé el primero en comentar
            </h4>
            <p>Comparte tus thoughts sobre este video</p>
          </div>
        )}
      </div>
    </div>
  );
}