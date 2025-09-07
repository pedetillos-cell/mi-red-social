'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function UploadInterceptor() {
  const router = useRouter();

  useEffect(() => {
    console.log('🛠️ UploadInterceptor V3 activado - Override de función');

    // Guardar la función original que maneja las selecciones
    const originalHandleSelection = (window as any).handleMenuSelection;
    
    // Override de la función que maneja las selecciones
    (window as any).handleMenuSelection = function(option: string) {
      console.log('🎯 Función interceptada - Opción:', option);
      
      // Redirigir basado en la opción
      if (option === 'video') {
        router.push('/upload');
      } else if (option === 'short') {
        router.push('/upload?type=short');
      } else if (option === 'live') {
        router.push('/upload?type=live');
      }
      
      // También llamar a la función original si existe
      if (originalHandleSelection) {
        return originalHandleSelection(option);
      }
    };

    // También interceptar console.log como backup
    const originalConsoleLog = console.log;
    console.log = function(message, ...args) {
      if (typeof message === 'string' && message.includes('Opción seleccionada:')) {
        const option = message.split(':')[1]?.trim();
        if (option && ['video', 'short', 'live'].includes(option)) {
          setTimeout(() => {
            router.push(`/upload${option === 'video' ? '' : `?type=${option}`}`);
          }, 50);
        }
      }
      return originalConsoleLog.apply(console, [message, ...args]);
    };

    return () => {
      // Restaurar función original
      if (originalHandleSelection) {
        (window as any).handleMenuSelection = originalHandleSelection;
      }
      console.log = originalConsoleLog;
    };
  }, [router]);

  return null;
}