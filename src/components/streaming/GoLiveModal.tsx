'use client';

import { useState } from 'react';

interface GoLiveModalProps {
  onClose: () => void;
}

export default function GoLiveModal({ onClose }: GoLiveModalProps) {
  const [streamData, setStreamData] = useState({
    title: '',
    category: '',
    tags: '',
    quality: '1080p',
    isPublic: true
  });

  const categories = [
    'Gaming',
    'Tecnología',
    'Música',
    'Deportes',
    'Educación',
    'Entretenimiento',
    'Arte',
    'Noticias'
  ];

  const qualities = [
    { label: '720p HD', value: '720p' },
    { label: '1080p Full HD', value: '1080p' },
    { label: '1440p 2K', value: '1440p' },
    { label: '4K Ultra HD', value: '4k' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para iniciar el stream
    console.log('Iniciando stream con:', streamData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setStreamData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Iniciar Transmisión en Vivo</h2>
          <button onClick={onClose} className="modal-close">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="go-live-form">
          <div className="form-group">
            <label htmlFor="title">Título del Stream *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={streamData.title}
              onChange={handleChange}
              placeholder="Ej: 🎮 Jugando Fortnite - Día 1"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Categoría *</label>
            <select
              id="category"
              name="category"
              value={streamData.category}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar categoría</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="tags">Etiquetas</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={streamData.tags}
              onChange={handleChange}
              placeholder="gaming, fortnite, esports (separadas por comas)"
            />
            <small>Separa las etiquetas con comas</small>
          </div>

          <div className="form-group">
            <label htmlFor="quality">Calidad de Transmisión</label>
            <select
              id="quality"
              name="quality"
              value={streamData.quality}
              onChange={handleChange}
            >
              {qualities.map(quality => (
                <option key={quality.value} value={quality.value}>
                  {quality.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="isPublic"
                checked={streamData.isPublic}
                onChange={(e) => setStreamData(prev => ({ ...prev, isPublic: e.target.checked }))}
              />
              Stream Público
            </label>
            <small>Si está desactivado, solo usuarios con enlace podrán verlo</small>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              <i className="fas fa-broadcast-tower"></i>
              Iniciar Transmisión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}