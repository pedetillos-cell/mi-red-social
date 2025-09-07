'use client';

import { useEffect } from 'react';

export default function UploadInterceptor() {
  useEffect(() => {
    console.log('🛠️ UploadInterceptor FINAL activado - Redirecciones garantizadas');

    let originalConsoleLog: any = null;

    // Esperar a que todo esté cargado
    const initInterceptor = () => {
      originalConsoleLog = console.log;
      
      console.log = function(message, ...args) {
        // Capturar cualquier mensaje que contenga la opción
        if (typeof message === 'string') {
          if (message.includes('Opción seleccionada: video') || 
              (message.includes('Opción seleccionada:') && message.includes('video'))) {
            console.log('🚀 Redirigiendo a VIDEO...');
            window.location.href = '/upload';
          }
          else if (message.includes('Opción seleccionada: short') || 
                   (message.includes('Opción seleccionada:') && message.includes('short'))) {
            console.log('🚀 Redirigiendo a SHORT...');
            window.location.href = '/upload?type=short';
          }
          else if (message.includes('Opción seleccionada: live') || 
                   (message.includes('Opción seleccionada:') && message.includes('live'))) {
            console.log('🚀 Redirigiendo a LIVE...');
            window.location.href = '/upload?type=live';
          }
        }
        
        // Mantener funcionalidad original
        if (originalConsoleLog) {
          return originalConsoleLog.apply(console, [message, ...args]);
        }
      };
    };

    // Iniciar inmediatamente y también después de un delay por si acaso
    initInterceptor();
    const timeout = setTimeout(initInterceptor, 1000);

    return () => {
      clearTimeout(timeout);
      if (originalConsoleLog) {
        console.log = originalConsoleLog;
      }
    };
  }, []);

  return null;
}