'use client';

import { useState, useRef } from 'react';
import { VideoStorage } from '@/lib/storage';
import { useAuth } from '@/contexts/AuthContext';

interface VideoUploaderProps {
  onUploadComplete: (videoUrl: string) => void;
  onUploadError: (error: string) => void;
}

export default function VideoUploader({ onUploadComplete, onUploadError }: VideoUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Validaciones
    if (file.size > 500 * 1024 * 1024) { // 500MB max
      onUploadError('El video no puede ser mayor a 500MB');
      return;
    }

    if (!file.type.startsWith('video/')) {
      onUploadError('Por favor selecciona un archivo de video');
      return;
    }

    setIsUploading(true);
    setProgress(0);

    try {
      // Simular progreso de subida (en producción usarías upload progress events)
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 300);

      // Subir video
      const videoUrl = await VideoStorage.uploadVideo(file, user.id);
      
      clearInterval(progressInterval);
      setProgress(100);
      
      setTimeout(() => {
        onUploadComplete(videoUrl);
        setIsUploading(false);
      }, 500);

    } catch (error) {
      onUploadError(error instanceof Error ? error.message : 'Error al subir el video');
      setIsUploading(false);
    }
  };

  return (
    <div className="video-uploader">
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={isUploading}
      />

      <div
        className={`upload-zone ${isUploading ? 'uploading' : ''}`}
        onClick={() => !isUploading && fileInputRef.current?.click()}
      >
        {isUploading ? (
          <div className="upload-progress">
            <div className="progress-circle">
              <svg viewBox="0 0 36 36" className="circular-chart">
                <path
                  className="circle-bg"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="circle"
                  strokeDasharray={`${progress}, 100`}
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="progress-text">{progress}%</span>
            </div>
            <p>Subiendo video...</p>
          </div>
        ) : (
          <>
            <div className="upload-icon">
              <i className="fas fa-cloud-upload-alt"></i>
            </div>
            <h3>Seleccionar Video</h3>
            <p>Arrastra o haz clic para subir un video</p>
            <div className="upload-requirements">
              <span>MP4, MOV, AVI • Máx. 500MB</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}