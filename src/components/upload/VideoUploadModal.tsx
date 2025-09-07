'use client';

import { useState } from 'react';
import UploadProgress from './UploadProgress';

interface VideoUploadModalProps {
  onClose: () => void;
}

export default function VideoUploadModal({ onClose }: VideoUploadModalProps) {
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
          alert('¡Video subido con éxito!');
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
          <h2 className="modal-title">Subir Video</h2>
          <button className="close-modal" onClick={onClose}>&times;</button>
        </div>
        
        <div className="upload-zone" onClick={simulateUpload}>
          <i className="fas fa-cloud-upload-alt"></i>
          <p>Arrastra y suelta tu video aquí</p>
          <p>o</p>
          <button className="btn-select">Seleccionar archivo</button>
        </div>
        
        <div className="form-group">
          <label className="form-label">Título del video</label>
          <input type="text" className="form-input" placeholder="Ingresa un título atractivo" />
        </div>
        
        <div className="form-group">
          <label className="form-label">Descripción</label>
          <textarea className="form-input" rows={3} placeholder="Describe tu video"></textarea>
        </div>
        
        <UploadProgress isUploading={isUploading} progress={progress} />
        
        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>Cancelar</button>
          <button className="btn-submit" onClick={simulateUpload}>Publicar</button>
        </div>
      </div>
    </div>
  );
}