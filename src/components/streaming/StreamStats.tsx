'use client';

interface StreamStatsProps {
  viewers: number;
}

export default function StreamStats({ viewers }: StreamStatsProps) {
  const stats = {
    totalViewers: 1250,
    peakViewers: 184,
    avgWatchTime: '12:45',
    newSubscribers: 23,
    totalLikes: 156
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="font-semibold mb-4">📊 Estadísticas del Stream</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{viewers}</div>
          <div className="text-sm text-gray-600">Espectadores actuales</div>
        </div>
        
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{stats.peakViewers}</div>
          <div className="text-sm text-gray-600">Pico de espectadores</div>
        </div>
        
        <div className="text-center p-3 bg-yellow-50 rounded-lg">
          <div className="text-2xl font-bold text-yellow-600">{stats.avgWatchTime}</div>
          <div className="text-sm text-gray-600">Tiempo promedio</div>
        </div>
        
        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">+{stats.newSubscribers}</div>
          <div className="text-sm text-gray-600">Nuevos suscriptores</div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Total de vistas</span>
          <span className="font-semibold">{stats.totalViewers.toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-gray-600">Likes totales</span>
          <span className="font-semibold">{stats.totalLikes}</span>
        </div>
      </div>
    </div>
  );
}