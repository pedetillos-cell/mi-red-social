'use client';

import { useCallback, useState } from 'react';

interface DragDropZoneProps {
  onFileSelect: (file: File) => void;
}

export default function DragDropZone({ onFileSelect }: DragDropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('video/')) {
      onFileSelect(files[0]);
    }
  }, [onFileSelect]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0 && files[0].type.startsWith('video/')) {
      onFileSelect(files[0]);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        border: `2px dashed ${isDragging ? '#3b82f6' : '#d1d5db'}`,
        borderRadius: '12px',
        padding: '3rem',
        textAlign: 'center',
        background: isDragging ? '#eff6ff' : '#f9fafb',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
      }}
      onClick={() => document.getElementById('file-input')?.click()}
    >
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎬</div>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
        Arrastra tu video aquí
      </h3>
      <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
        o haz clic para seleccionar un archivo
      </p>
      <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>
        Formatos soportados: MP4, WebM, MOV • Máx. 2GB
      </p>
      
      <input
        id="file-input"
        type="file"
        accept="video/*"
        onChange={handleFileInput}
        style={{ display: 'none' }}
      />
    </div>
  );
}