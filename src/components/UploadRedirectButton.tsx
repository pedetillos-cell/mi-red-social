'use client';

import { useRouter } from 'next/navigation';

export default function UploadRedirectButton() {
  const router = useRouter();

  const handleUploadClick = () => {
    // Redirigir directamente a la página de upload
    router.push('/upload');
  };

  return (
    <button 
      onClick={handleUploadClick}
      className="upload-redirect-button"
      style={{
        background: 'none',
        border: 'none',
        color: 'inherit',
        cursor: 'pointer',
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontWeight: '600'
      }}
    >
      <i className="fas fa-plus"></i>
      <span>Subir</span>
    </button>
  );
}