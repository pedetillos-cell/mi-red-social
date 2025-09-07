'use client';

interface UploadProgressProps {
  isUploading: boolean;
  progress: number;
}

export default function UploadProgress({ isUploading, progress }: UploadProgressProps) {
  if (!isUploading) return null;

  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="progress-text">Subiendo: {Math.round(progress)}%</p>
    </div>
  );
}