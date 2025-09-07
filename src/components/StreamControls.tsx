'use client';

interface StreamControlsProps {
  isLive: boolean;
  onGoLive: () => void;
  onEndStream: () => void;
  viewers: number;
  streamTitle: string;
  setStreamTitle: (title: string) => void;
  streamDescription: string;
  setStreamDescription: (description: string) => void;
}

export default function StreamControls({ 
  isLive, 
  onGoLive, 
  onEndStream, 
  viewers,
  streamTitle,
  setStreamTitle,
  streamDescription,
  setStreamDescription
}: StreamControlsProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">🎮 Controles del Stream</h3>
      
      <div className="space-y-4">
        {!isLive ? (
          <button
            onClick={onGoLive}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <span>🎥</span> Iniciar Transmisión
          </button>
        ) : (
          <button
            onClick={onEndStream}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <span>⏹️</span> Finalizar Stream
          </button>
        )}
        
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título del Stream</label>
            <input
              type="text"
              value={streamTitle}
              onChange={(e) => setStreamTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Título del stream"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea
              value={streamDescription}
              onChange={(e) => setStreamDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Descripción del stream"
              rows={3}
            />
          </div>
        </div>
        
        <div className="bg-blue-50 p-3 rounded-md text-center">
          <span className="text-sm font-medium text-blue-700">👥 Espectadores: {viewers}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
            <span>📊</span> Stats
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
            <span>⚙️</span> Settings
          </button>
        </div>
      </div>
    </div>
  );
}