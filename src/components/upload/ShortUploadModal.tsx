'use client';

import { useState } from 'react';
import UploadProgress from './UploadProgress';

interface ShortUploadModalProps {
  onClose: () => void;
}

export default function ShortUploadModal({ onClose }: ShortUploadModalProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const simulateUpload = () => {
    setIsUploading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          alert('¡Short creado con éxito!');
          onClose();
          return 100;
        }
        return newProgress;
      });
    }, 200);
  };

  return (
    <div className="modal active">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Crear Short</h2>
          <button className="close-modal" onClick={onClose}>&times;</button>
        </div>
        
        <div className="upload-zone" onClick={simulateUpload}>
          <i className="fas fa-video"></i>
          <p>Arrastra y suelta tu video corto aquí</p>
          <p>o</p>
          <button className="btn-select">Seleccionar archivo</button>
        </div>
        
        <div className="form-group">
          <label className="form-label">Título del short</label>
          <input type="text" className="form-input" placeholder="Ingresa un título atractivo" />
        </div>
        
        <div className="form-group">
          <label className="form-label">Seleccionar música</label>
          <select className="form-input">
            <option>Trending song 1</option>
            <option>Trending song 2</option>
            <option>Trending song 3</option>
          </select>
        </div>
        
        <UploadProgress isUploading={isUploading} progress={progress} />
        
        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>Cancelar</button>
          <button className="btn-submit" onClick={simulateUpload}>Publicar Short</button>
        </div>
      </div>
    </div>
  );
}