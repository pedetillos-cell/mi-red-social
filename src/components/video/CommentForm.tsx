'use client';

import { useState } from 'react';

interface CommentFormProps {
  onSubmit: (content: string) => void;
}

export default function CommentForm({ onSubmit }: CommentFormProps) {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content);
      setContent('');
    }
  };

  return (
    <div className="comment-form">
      <div className="user-avatar">T</div>
      <input 
        type="text" 
        className="comment-input" 
        placeholder="Añade un comentario público..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSubmit();
          }
        }}
      />
      <button className="btn-comment" onClick={handleSubmit}>
        Comentar
      </button>
    </div>
  );
}