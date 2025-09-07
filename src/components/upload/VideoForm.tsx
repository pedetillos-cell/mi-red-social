'use client';

import { useState } from 'react';

export default function VideoForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    visibility: 'Público'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="upload-right">
      <div className="form-group">
        <label className="form-label">Título del video</label>
        <input 
          type="text" 
          className="form-input" 
          placeholder="Título atractivo para tu video"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">Descripción</label>
        <textarea 
          className="form-textarea" 
          placeholder="Describe el contenido de tu video..."
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        ></textarea>
      </div>
      
      <div className="form-group">
        <label className="form-label">Miniatura</label>
        <input type="file" className="form-input" accept="image/*" />
        <div className="thumbnail-preview">
          Vista previa de miniatura
        </div>
      </div>
      
      <div className="form-group">
        <label className="form-label">Visibilidad</label>
        <select 
          className="form-input"
          name="visibility"
          value={formData.visibility}
          onChange={handleInputChange}
        >
          <option value="Público">Público</option>
          <option value="No listado">No listado</option>
          <option value="Privado">Privado</option>
        </select>
      </div>
      
      <button 
        className="btn-primary" 
        style={{ width: '100%', padding: '1rem' }}
        onClick={() => console.log('Datos del formulario:', formData)}
      >
        Publicar video
      </button>
    </div>
  );
}