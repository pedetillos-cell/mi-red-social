'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function UploadInterceptor() {
  const router = useRouter();

  useEffect(() => {
    console.log('🛠️ UploadInterceptor Simple activado');

    // Monkey patch directo al console.log
    const originalConsoleLog = console.log;
    
    console.log = function(message, ...args) {
      // Interceptar específicamente el mensaje que buscas
      if (typeof message === 'string' && message.includes('Opción seleccionada:')) {
        const option = message.split(':')[1]?.trim();
        console.log('🔍 Interceptando opción:', option);
        
        // Redirigir inmediatamente
        if (option === 'video') {
          setTimeout(() => {
            console.log('🎥 Redirigiendo a upload...');
            router.push('/upload');
          }, 50);
        } else if (option === 'short') {
          setTimeout(() => {
            console.log('⚡ Redirigiendo a short...');
            router.push('/upload?type=short');
          }, 50);
        } else if (option === 'live') {
          setTimeout(() => {
            console.log('🔴 Redirigiendo a live...');
            router.push('/upload?type=live');
          }, 50);
        }
      }
      
      // Llamar al console.log original
      return originalConsoleLog.apply(console, [message, ...args]);
    };

    return () => {
      console.log = originalConsoleLog;
    };
  }, [router]);

  return null;
}