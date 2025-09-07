'use client';

import { useState } from 'react';
import { Comment as CommentType } from '@/types/comment';

interface CommentProps {
  comment: CommentType;
  onReply: (content: string, parentId: string) => void;
}

export default function Comment({ comment, onReply }: CommentProps) {
  const [isLiked, setIsLiked] = useState(comment.isLiked || false);
  const [isDisliked, setIsDisliked] = useState(comment.isDisliked || false);
  const [currentLikes, setCurrentLikes] = useState(comment.likes);
  const [currentDislikes, setCurrentDislikes] = useState(comment.dislikes);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const handleLike = () => {
    if (isLiked) {
      setCurrentLikes(prev => prev - 1);
      setIsLiked(false);
    } else {
      setCurrentLikes(prev => prev + 1);
      setIsLiked(true);
      
      if (isDisliked) {
        setCurrentDislikes(prev => prev - 1);
        setIsDisliked(false);
      }
    }
  };

  const handleDislike = () => {
    if (isDisliked) {
      setCurrentDislikes(prev => prev - 1);
      setIsDisliked(false);
    } else {
      setCurrentDislikes(prev => prev + 1);
      setIsDisliked(true);
      
      if (isLiked) {
        setCurrentLikes(prev => prev - 1);
        setIsLiked(false);
      }
    }
  };

  const handleReplySubmit = () => {
    if (replyContent.trim()) {
      onReply(replyContent, comment.id);
      setReplyContent('');
      setShowReplyForm(false);
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Justo ahora';
    if (diffInSeconds < 3600) return `Hace ${Math.floor(diffInSeconds / 60)} minutos`;
    if (diffInSeconds < 86400) return `Hace ${Math.floor(diffInSeconds / 3600)} horas`;
    return `Hace ${Math.floor(diffInSeconds / 86400)} días`;
  };

  return (
    <div className="comment">
      <div className="user-avatar">{comment.avatar}</div>
      
      <div className="comment-content">
        <div className="comment-header">
          <span className="comment-author">{comment.author}</span>
          <span className="comment-time">{formatTime(comment.timestamp)}</span>
        </div>
        
        <p className="comment-text">{comment.content}</p>
        
        <div className="comment-actions">
          <button 
            className={`comment-action ${isLiked ? 'active' : ''}`}
            onClick={handleLike}
          >
            <i className="far fa-thumbs-up"></i>
            <span>{currentLikes}</span>
          </button>
          
          <button 
            className={`comment-action ${isDisliked ? 'active' : ''}`}
            onClick={handleDislike}
          >
            <i className="far fa-thumbs-down"></i>
          </button>
          
          <button 
            className="comment-action reply-btn"
            onClick={() => setShowReplyForm(!showReplyForm)}
          >
            Responder
          </button>
        </div>
        
        {showReplyForm && (
          <div className="reply-form">
            <input 
              type="text" 
              className="reply-input" 
              placeholder="Escribe una respuesta..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
            />
            <button className="btn-reply" onClick={handleReplySubmit}>
              Responder
            </button>
          </div>
        )}
        
        {comment.replies && comment.replies.length > 0 && (
          <div className="replies">
            {comment.replies.map(reply => (
              <Comment 
                key={reply.id} 
                comment={reply} 
                onReply={onReply}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}