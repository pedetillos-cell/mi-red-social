'use client';

import { useState } from 'react';

interface CommentFormProps {
  onSubmit: (text: string) => void;
  placeholder?: string;
}

export default function CommentForm({ onSubmit, placeholder = "Añade un comentario público..." }: CommentFormProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex',
      gap: '1rem',
      alignItems: 'flex-start'
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '1.1rem',
        flexShrink: 0
      }}>
        Y
      </div>
      
      <div style={{ flex: 1 }}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          rows={3}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            fontSize: '1rem',
            resize: 'vertical',
            fontFamily: 'inherit'
          }}
        />
        
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
          <button
            type="submit"
            disabled={!text.trim()}
            style={{
              padding: '0.75rem 1.5rem',
              background: text.trim() ? '#3b82f6' : '#e5e7eb',
              color: text.trim() ? 'white' : '#9ca3af',
              border: 'none',
              borderRadius: '6px',
              cursor: text.trim() ? 'pointer' : 'not-allowed',
              fontWeight: '600',
              transition: 'all 0.2s ease'
            }}
          >
            Comentar
          </button>
        </div>
      </div>
    </form>
  );
}