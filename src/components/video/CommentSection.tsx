'use client';

import { useState, useEffect } from 'react';
import { Comment as CommentType } from '@/types/comment';
import Comment from './Comment';
import CommentForm from './CommentForm';

interface CommentSectionProps {
  videoId: string;
  initialComments: CommentType[];
}

export default function CommentSection({ videoId, initialComments }: CommentSectionProps) {
  const [comments, setComments] = useState<CommentType[]>(initialComments);
  const [isLive, setIsLive] = useState(true);

  // Simular comentarios en tiempo real
  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(() => {
      // Solo agregar comentarios si la sección es visible
      const shouldAddComment = Math.random() > 0.7;
      
      if (shouldAddComment) {
        const newComment: CommentType = {
          id: `live-${Date.now()}`,
          author: 'Usuario Nuevo',
          avatar: 'U',
          content: '¡Acabo de ver este video y es increíble! Gracias por la información.',
          timestamp: new Date(),
          likes: 0,
          dislikes: 0,
          replies: [],
        };
        
        setComments(prev => [newComment, ...prev]);
      }
    }, 10000); // Cada 10 segundos

    return () => clearInterval(interval);
  }, [isLive]);

  const handleNewComment = (content: string) => {
    const newComment: CommentType = {
      id: `comment-${Date.now()}`,
      author: 'Tú',
      avatar: 'T',
      content,
      timestamp: new Date(),
      likes: 0,
      dislikes: 0,
      replies: [],
    };
    
    setComments(prev => [newComment, ...prev]);
  };

  return (
    <div className="comments-section">
      <h3 className="comments-title">
        <i className="far fa-comments"></i>
        {comments.length} comentarios
      </h3>
      
      {isLive && (
        <div className="live-indicator">
          <div className="live-dot"></div>
          <span>Comentarios en tiempo real</span>
        </div>
      )}
      
      <CommentForm onSubmit={handleNewComment} />
      
      <div className="comments-list">
        {comments.map(comment => (
          <Comment 
            key={comment.id} 
            comment={comment} 
            onReply={(content, parentId) => {
              // Lógica para manejar respuestas
              console.log('Respondiendo:', content, 'a comentario:', parentId);
            }}
          />
        ))}
      </div>
    </div>
  );
}