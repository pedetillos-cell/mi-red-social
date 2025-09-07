'use client';

import { useEffect } from 'react';

export default function UploadInterceptor() {
  useEffect(() => {
    console.log('🛠️ UploadInterceptor con Mutation Observer activado');

    // Observar cambios en el DOM para encontrar los botones del menú
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              // Buscar botones de upload en cualquier elemento añadido
              const uploadButtons = node.querySelectorAll?.(`
                [data-upload-option],
                [id*="upload"],
                [class*="upload"],
                button:contains("Subir video"),
                button:contains("Crear short"), 
                button:contains("Transmitir en vivo")
              `);
              
              uploadButtons?.forEach((button: any) => {
                const text = button.textContent?.toLowerCase() || '';
                if (text.includes('subir video')) {
                  button.setAttribute('data-upload-option', 'video');
                  button.onclick = (e: Event) => {
                    e.preventDefault();
                    window.location.href = '/upload';
                  };
                } else if (text.includes('crear short')) {
                  button.setAttribute('data-upload-option', 'short');
                  button.onclick = (e: Event) => {
                    e.preventDefault();
                    window.location.href = '/upload?type=short';
                  };
                } else if (text.includes('transmitir en vivo')) {
                  button.setAttribute('data-upload-option', 'live');
                  button.onclick = (e: Event) => {
                    e.preventDefault();
                    window.location.href = '/upload?type=live';
                  };
                }
              });
            }
          });
        }
      });
    });

    // Empezar a observar el documento
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}