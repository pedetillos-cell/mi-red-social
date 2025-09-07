'use client';

import { useState } from 'react';
import ProgressBar from './ProgressBar';
import VideoForm from './VideoForm';
import DragDropZone from './DragDropZone';
import ThumbnailGenerator from './ThumbnailGenerator';
import MetadataForm from './MetadataForm';

export default function VideoUpload() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<string>('');

  const steps = [
    'Seleccionar video',
    'Generar thumbnail', 
    'Información',
    'Subiendo'
  ];

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setCurrentStep(2);
  };

  const handleThumbnailSelect = (thumb: string) => {
    setThumbnail(thumb);
    setCurrentStep(3);
  };

  const handleMetadataSubmit = (metadata: any) => {
    setCurrentStep(4);
    setIsUploading(true);
    simulateUpload(metadata);
  };

  const simulateUpload = (metadata: any) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
          // Aquí tu lógica de upload completo
          console.log('Upload completo:', { file: selectedFile, thumbnail, metadata });
        }, 500);
      }
    }, 100);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="upload-content">
      {/* Progress Steps */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginBottom: '2rem',
        padding: '0 1rem'
      }}>
        {steps.map((step, index) => (
          <div key={step} style={{ textAlign: 'center', flex: 1 }}>
            <div style={{
              width: '35px',
              height: '35px',
              borderRadius: '50%',
              background: currentStep > index + 1 ? '#10b981' : currentStep === index + 1 ? '#3b82f6' : '#e5e7eb',
              color: currentStep > index + 1 ? 'white' : currentStep === index + 1 ? 'white' : '#9ca3af',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              fontWeight: 'bold',
              fontSize: '0.9rem'
            }}>
              {currentStep > index + 1 ? '✓' : index + 1}
            </div>
            <div style={{ 
              fontSize: '0.75rem', 
              marginTop: '0.5rem', 
              color: currentStep === index + 1 ? '#3b82f6' : '#6b7280',
              fontWeight: currentStep === index + 1 ? '600' : 'normal'
            }}>
              {step}
            </div>
          </div>
        ))}
      </div>

      <div className="upload-left">
        {currentStep === 1 && (
          <DragDropZone onFileSelect={handleFileSelect} />
        )}

        {currentStep === 2 && selectedFile && (
          <ThumbnailGenerator 
            file={selectedFile}
            onThumbnailSelect={handleThumbnailSelect}
            onBack={handleBack}
          />
        )}

        {currentStep === 3 && selectedFile && (
          <MetadataForm 
            onSubmit={handleMetadataSubmit}
            onBack={handleBack}
          />
        )}

        {currentStep === 4 && isUploading && (
          <div style={{ textAlign: 'center', width: '100%' }}>
            <ProgressBar progress={uploadProgress} />
            <p style={{ marginTop: '1rem', color: '#6b7280' }}>
              Subiendo video... {uploadProgress}%
            </p>
          </div>
        )}
      </div>

      <div className="upload-right">
        <VideoForm />
      </div>

      {/* Botones de navegación */}
      {(currentStep === 2 || currentStep === 3) && (
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          justifyContent: 'center', 
          marginTop: '2rem',
          width: '100%'
        }}>
          <button
            onClick={handleBack}
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
        </div>
      )}
    </div>
  );
}