'use client';

interface UploadProgressProps {
  progress: number;
  total: number;
  uploaded: number;
  speed: number;
  timeRemaining: number;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  fileType: 'video' | 'thumbnail' | 'short';
}

export default function UploadProgress({
  progress,
  total,
  uploaded,
  speed,
  timeRemaining,
  status,
  fileType
}: UploadProgressProps) {
  // Formatear bytes a formato legible
  const formatBytes = (bytes: number, decimals = 2): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  // Formatear tiempo restante
  const formatTimeRemaining = (seconds: number): string => {
    if (seconds === Infinity || seconds === 0) return '-';
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    
    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${remainingSeconds}s`;
  };

  // Obtener icono según el tipo de archuario
  const getFileTypeIcon = () => {
    switch (fileType) {
      case 'video':
        return '🎬';
      case 'thumbnail':
        return '🖼️';
      case 'short':
        return '⏱️';
      default:
        return '📁';
    }
  };

  // Obtener color según el estado
  const getStatusColor = () => {
    switch (status) {
      case 'uploading':
        return 'text-blue-600';
      case 'processing':
        return 'text-yellow-600';
      case 'completed':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  // Obtener texto del estado
  const getStatusText = () => {
    switch (status) {
      case 'uploading':
        return 'Subiendo...';
      case 'processing':
        return 'Procesando...';
      case 'completed':
        return 'Completado';
      case 'error':
        return 'Error';
      default:
        return 'En cola';
    }
  };

  return (
    <div className="upload-progress-container">
      {/* Header con icono y estado */}
      <div className="progress-header">
        <div className="progress-icon">
          <span className="text-2xl">{getFileTypeIcon()}</span>
        </div>
        <div className="progress-status">
          <span className={`status-text ${getStatusColor()}`}>
            {getStatusText()}
          </span>
          <span className="file-type">
            {fileType === 'video' && 'Video'}
            {fileType === 'thumbnail' && 'Miniatura'} 
            {fileType === 'short' && 'Short'}
          </span>
        </div>
        <div className="progress-percentage">
          {Math.round(progress)}%
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="progress-bar-container">
        <div 
          className="progress-bar"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Estadísticas detalladas */}
      <div className="progress-stats">
        <div className="stat-item">
          <span className="stat-label">Subido:</span>
          <span className="stat-value">{formatBytes(uploaded)}</span>
        </div>
        
        <div className="stat-item">
          <span className="stat-label">Total:</span>
          <span className="stat-value">{formatBytes(total)}</span>
        </div>
        
        <div className="stat-item">
          <span className="stat-label">Velocidad:</span>
          <span className="stat-value">{formatBytes(speed)}/s</span>
        </div>
        
        <div className="stat-item">
          <span className="stat-label">Tiempo restante:</span>
          <span className="stat-value">{formatTimeRemaining(timeRemaining)}</span>
        </div>
      </div>

      {/* Mensaje de estado adicional */}
      {status === 'processing' && (
        <div className="processing-message">
          <div className="processing-spinner"></div>
          <span>Procesando archivo, por favor espere...</span>
        </div>
      )}

      {status === 'error' && (
        <div className="error-message">
          <span>⚠️ Error en la subida. Por favor, inténtalo de nuevo.</span>
        </div>
      )}

      {status === 'completed' && (
        <div className="success-message">
          <span>✅ Subida completada con éxito</span>
        </div>
      )}

      <style jsx>{`
        .upload-progress-container {
          width: 100%;
          padding: 16px;
          background-color: #f9fafb;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
        }
        
        .progress-header {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
          gap: 12px;
        }
        
        .progress-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }
        
        .progress-status {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        
        .status-text {
          font-weight: 600;
          font-size: 14px;
        }
        
        .file-type {
          font-size: 12px;
          color: #6b7280;
        }
        
        .progress-percentage {
          font-weight: 700;
          font-size: 18px;
          color: #3b82f6;
        }
        
        .progress-bar-container {
          height: 6px;
          background-color: #e5e7eb;
          border-radius: 3px;
          overflow: hidden;
          margin-bottom: 16px;
        }
        
        .progress-bar {
          height: 100%;
          background-color: #3b82f6;
          border-radius: 3px;
          transition: width 0.3s ease;
        }
        
        .progress-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-bottom: 16px;
        }
        
        .stat-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          background-color: white;
          border-radius: 6px;
          border: 1px solid #f3f4f6;
        }
        
        .stat-label {
          font-size: 12px;
          color: #6b7280;
        }
        
        .stat-value {
          font-size: 12px;
          font-weight: 600;
          color: #374151;
        }
        
        .processing-message, .error-message, .success-message {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 500;
        }
        
        .processing-message {
          background-color: #fffbeb;
          color: #92400e;
        }
        
        .error-message {
          background-color: #fef2f2;
          color: #b91c1c;
        }
        
        .success-message {
          background-color: #f0fdf4;
          color: #166534;
        }
        
        .processing-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid transparent;
          border-top: 2px solid #92400e;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .text-blue-600 { color: #2563eb; }
        .text-yellow-600 { color: #d97706; }
        .text-green-600 { color: #059669; }
        .text-red-600 { color: #dc2626; }
        .text-gray-600 { color: #4b5563; }
      `}</style>
    </div>
  );
}