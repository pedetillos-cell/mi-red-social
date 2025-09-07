'use client';

import { useState } from 'react';

interface MetadataFormProps {
  onSubmit: (metadata: any) => void;
  onBack: () => void;
}

export default function MetadataForm({ onSubmit, onBack }: MetadataFormProps) {
  const [metadata, setMetadata] = useState({
    title: '',
    description: '',
    tags: '',
    category: 'entretenimiento',
    visibility: 'public'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(metadata);
  };

  const handleChange = (field: string, value: string) => {
    setMetadata(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
        Información del video
      </h3>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
          Título del video *
        </label>
        <input
          type="text"
          value={metadata.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Título atractivo para tu video..."
          required
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '1rem'
          }}
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
          Descripción
        </label>
        <textarea
          value={metadata.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Describe tu video..."
          rows={4}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '1rem',
            resize: 'vertical'
          }}
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
          Etiquetas (separadas por comas)
        </label>
        <input
          type="text"
          value={metadata.tags}
          onChange={(e) => handleChange('tags', e.target.value)}
          placeholder="gaming, tutorial, gameplay..."
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '1rem'
          }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
            Categoría
          </label>
          <select
            value={metadata.category}
            onChange={(e) => handleChange('category', e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '1rem'
            }}
          >
            <option value="entretenimiento">Entretenimiento</option>
            <option value="educacion">Educación</option>
            <option value="gaming">Gaming</option>
            <option value="musica">Música</option>
            <option value="deportes">Deportes</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
            Visibilidad
          </label>
          <select
            value={metadata.visibility}
            onChange={(e) => handleChange('visibility', e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '1rem'
            }}
          >
            <option value="public">Público</option>
            <option value="unlisted">No listado</option>
            <option value="private">Privado</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
        <button
          type="button"
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
          type="submit"
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
          🚀 Subir Video
        </button>
      </div>
    </form>
  );
}