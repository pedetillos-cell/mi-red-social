'use client';

import { useState, useEffect } from 'react';
import LiveChat from './LiveChat';          // ← Cambiado
import StreamControls from './StreamControls'; // ← Cambiado
import StreamStats from './StreamStats';       // ← Cambiado
import DonationAlert from './DonationAlert';
import { useWebRTC } from '../hooks/useWebRTC';
import { useDonations } from '../hooks/useDonations';

interface LiveStreamPlayerProps {
  streamKey: string;
  channelName: string;
  isOwner?: boolean;
}


export default function LiveStreamPlayer({ streamKey, channelName, isOwner = false }: LiveStreamPlayerProps) {
  const [isLive, setIsLive] = useState(false);
  const [viewers, setViewers] = useState(0);
  const [streamTitle, setStreamTitle] = useState('');
  const [streamDescription, setStreamDescription] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [streamTime, setStreamTime] = useState('00:00:00');

  // Hook para WebRTC
  const { videoRef, startStream, stopStream, isLoading: streamLoading, error: streamError } = useWebRTC({
    onStreamStart: () => {
      setIsLive(true);
      setStreamTitle(prevTitle => prevTitle || 'Stream en vivo de ' + channelName);
      setViewers(42); // Viewers iniciales
    },
    onStreamEnd: () => {
      setIsLive(false);
      setViewers(0);
    }
  });

  // Hook para donaciones
  const { donations, currentAlert, addDonation, completeAlert } = useDonations();

  // Simular datos del stream
  useEffect(() => {
    let viewerInterval: any = null;
    let timeInterval: any = null;
    
    if (isLive) {
      // Iniciar temporizador
      const startTime = new Date();
      timeInterval = setInterval(() => {
        const elapsed = new Date().getTime() - startTime.getTime();
        const hours = Math.floor(elapsed / 3600000);
        const minutes = Math.floor((elapsed % 3600000) / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);
        setStreamTime(
          `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        );
      }, 1000);

      // Simular aumento gradual de viewers
      viewerInterval = setInterval(() => {
        setViewers(prev => {
          const newViewers = prev + Math.floor(Math.random() * 3);
          return Math.min(newViewers, 1000);
        });
      }, 3000);
    } else {
      setViewers(0);
      setStreamTime('00:00:00');
    }

    // Función de limpieza
    return () => {
      if (viewerInterval) clearInterval(viewerInterval);
      if (timeInterval) clearInterval(timeInterval);
    };
  }, [isLive]);

  const handleGoLive = () => {
    startStream();
  };

  const handleEndStream = () => {
    stopStream();
  };

  const handleTestDonation = () => {
    addDonation({
      username: 'Viewer_' + Math.floor(Math.random() * 1000),
      amount: Math.floor(Math.random() * 100) + 1,
      message: '¡Excelente stream! 🚀',
      currency: 'USD'
    });
  };

  const formatViewers = (count: number) => {
    if (count >= 1000) return (count / 1000).toFixed(1) + 'K';
    return count.toString();
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      {/* Alertas de donación */}
      {currentAlert && (
        <DonationAlert 
          donation={currentAlert} 
          onComplete={completeAlert} 
        />
      )}

      {/* Mostrar errores de stream */}
      {streamError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{streamError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Stream Content - 3/4 width */}
        <div className="lg:col-span-3 space-y-4">
          {/* Stream Player */}
          <div className="bg-black rounded-xl overflow-hidden shadow-lg">
            {!isLive ? (
              <div className="aspect-video bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <div className="text-6xl mb-4">🔴</div>
                  <h2 className="text-2xl font-bold mb-2">Stream Offline</h2>
                  <p className="text-gray-300 mb-6">
                    {channelName} no está transmitiendo en este momento
                  </p>
                  {isOwner && (
                    <button
                      onClick={handleGoLive}
                      disabled={streamLoading}
                      className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
                    >
                      {streamLoading ? '🔄 Iniciando...' : '🎥 Iniciar Transmisión'}
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="relative aspect-video">
                {/* Video Player REAL con WebRTC */}
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                />

                {/* Live Badge */}
                <div className="absolute top-4 left-4">
                  <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    EN VIVO
                  </div>
                </div>

                {/* Viewers Count */}
                <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 rounded-lg text-sm">
                  👥 {formatViewers(viewers)} espectadores
                </div>

                {/* Stream Title */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h1 className="text-white text-xl font-bold">
                      {streamTitle}
                    </h1>
                    <p className="text-gray-300 text-sm">
                      {streamDescription || 'Transmitiendo en vivo'}
                    </p>
                  </div>
                </div>

                {/* Controls for Owner */}
                {isOwner && (
                  <div className="absolute bottom-4 right-4">
                    <button
                      onClick={handleEndStream}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                    >
                      ⏹️ Finalizar
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Stream Info */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {channelName.charAt(0)}
                </span>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-lg font-semibold">{channelName}</h2>
                  <span className="text-blue-500 text-sm">✓</span>
                </div>
                <p className="text-gray-600 text-sm">
                  {isLive ? 'Transmitiendo en vivo' : 'Canal de streaming'}
                </p>
                
                {isLive && (
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>▶️ {formatViewers(viewers)} espectadores</span>
                    <span>⏱️ {streamTime}</span>
                    <span>🎯 125 compartidos</span>
                  </div>
                )}
              </div>

              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold transition-colors">
                ✅ Suscrito
              </button>
            </div>
          </div>

          {/* Stream Controls (for owner) */}
          {isOwner && (
            <StreamControls 
              isLive={isLive}
              onGoLive={handleGoLive}
              onEndStream={handleEndStream}
              viewers={viewers}
              streamTitle={streamTitle}
              setStreamTitle={setStreamTitle}
              streamDescription={streamDescription}
              setStreamDescription={setStreamDescription}
            />
          )}

          {/* Stream Stats (for owner) */}
          {isOwner && isLive && <StreamStats viewers={viewers} />}
        </div>

        {/* Live Chat Sidebar - 1/4 width */}
        <div className="lg:col-span-1">
          <LiveChat
            isLive={isLive}
            viewers={viewers}
            channelName={channelName}
            isOpen={isChatOpen}
            onToggle={() => setIsChatOpen(!isChatOpen)}
          />
        </div>
      </div>

      {/* Donation Button */}
      {isLive && (
        <div className="fixed bottom-6 right-6">
          <button 
            onClick={handleTestDonation}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all font-semibold"
          >
            💰 Donar (Test)
          </button>
        </div>
      )}
    </div>
  );
}