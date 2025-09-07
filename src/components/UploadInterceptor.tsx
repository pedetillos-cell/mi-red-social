'use client';

import { useEffect } from 'react';

export default function UploadInterceptor() {
  useEffect(() => {
    console.log('🛠️ UploadInterceptor CLIENT-SIDE activado');

    // Crear un evento global personalizado para que la página pueda comunicarse
    const handleUploadEvent = (event: any) => {
      const option = event.detail?.option || event.detail;
      console.log('🎯 Evento de upload recibido:', option);
      
      if (option === 'video') {
        window.location.href = '/upload';
      } else if (option === 'short') {
        window.location.href = '/upload?type=short';
      } else if (option === 'live') {
        window.location.href = '/upload?type=live';
      }
    };

    // Escuchar eventos personalizados
    window.addEventListener('uploadOptionSelected', handleUploadEvent);

    // También interceptar clicks en elementos con data-attributes
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const uploadOption = target.closest('[data-upload-option]');
      
      if (uploadOption) {
        const option = uploadOption.getAttribute('data-upload-option');
        if (option && ['video', 'short', 'live'].includes(option)) {
          event.preventDefault();
          event.stopPropagation();
          console.log('🎯 Click interceptado en opción:', option);
          window.location.href = `/upload${option === 'video' ? '' : `?type=${option}`}`;
        }
      }
    };

    document.addEventListener('click', handleClick, true);

    return () => {
      window.removeEventListener('uploadOptionSelected', handleUploadEvent);
      document.removeEventListener('click', handleClick, true);
    };
  }, []);

  return null;
}