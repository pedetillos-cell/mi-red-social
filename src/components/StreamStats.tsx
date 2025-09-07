'use client';

interface StreamStatsProps {
  viewers: number;
}

export default function StreamStats({ viewers }: StreamStatsProps) {
  const formatViewers = (count: number) => {
    if (count >= 1000) return (count / 1000).toFixed(1) + 'K';
    return count.toString();
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">📊 Estadísticas del Stream</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">{formatViewers(viewers)}</div>
          <div className="text-sm text-blue-800">Espectadores</div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">1.2K</div>
          <div className="text-sm text-green-800">Impresiones</div>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-600">125</div>
          <div className="text-sm text-purple-800">Compartidos</div>
        </div>
        
        <div className="bg-orange-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-orange-600">98%</div>
          <div className="text-sm text-orange-800">Satisfacción</div>
        </div>
      </div>
    </div>
  );
}