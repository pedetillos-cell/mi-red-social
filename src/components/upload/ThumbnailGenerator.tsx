'use client';

import { useState } from 'react';

interface ThumbnailGeneratorProps {
  file: File;
  onThumbnailSelect: (thumbnail: string) => void;
  onBack: () => void;
}

export default function ThumbnailGenerator({ file, onThumbnailSelect, onBack }: ThumbnailGeneratorProps) {
  const [selectedThumbnail, setSelectedThumbnail] = useState('default');

  const thumbnails = [
    { id: 'default', label: 'Miniatura por defecto', emoji: '🎬' },
    { id: 'custom1', label: 'Miniatura 1', emoji: '🔥' },
    { id: 'custom2', label: 'Miniatura 2', emoji: '🚀' },
    { id: 'custom3', label: 'Miniatura 3', emoji: '💎' }
  ];

  const handleThumbnailSelect = (thumbId: string) => {
    setSelectedThumbnail(thumbId);
    onThumbnailSelect(thumbId);
  };

  return (
    <div>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Selecciona una miniatura
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {thumbnails.map(thumb => (
          <div
            key={thumb.id}
            onClick={() => handleThumbnailSelect(thumb.id)}
            style={{
              border: `2px solid ${selectedThumbnail === thumb.id ? '#3b82f6' : '#e5e7eb'}`,
              borderRadius: '8px',
              padding: '1.5rem',
              textAlign: 'center',
              cursor: 'pointer',
              background: selectedThumbnail === thumb.id ? '#eff6ff' : 'white',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{thumb.emoji}</div>
            <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>{thumb.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
        <button
          onClick={onBack}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#e5e7eb',
            color: '#374151',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          ← Atrás
        </button>
        
        <button
          onClick={() => onThumbnailSelect(selectedThumbnail)}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          Continuar →
        </button>
      </div>
    </div>
  );
}