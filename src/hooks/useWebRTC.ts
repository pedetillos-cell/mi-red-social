// src/hooks/useWebRTC.ts
'use client';

import { useState, useRef, useCallback } from 'react';

interface UseWebRTCProps {
  onStreamStart?: () => void;
  onStreamEnd?: () => void;
}

export const useWebRTC = ({ onStreamStart, onStreamEnd }: UseWebRTCProps = {}) => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startStream = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30 }
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(console.error);
      }

      setLocalStream(stream);
      onStreamStart?.();
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al acceder a cámara/micrófono');
      console.error('Error starting stream:', err);
    } finally {
      setIsLoading(false);
    }
  }, [onStreamStart]);

  const stopStream = useCallback(() => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      setLocalStream(null);
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    onStreamEnd?.();
  }, [localStream, onStreamEnd]);

  return {
    localStream,
    isLoading,
    error,
    videoRef,
    startStream,
    stopStream
  };
};