'use client';

import { useState } from 'react';
import LiveStreamPlayer from '@/components/LiveStreamPlayer';
import StreamChat from '@/components/streaming/StreamChat';
import GoLiveModal from '@/components/streaming/GoLiveModal';

// Interface para el stream
interface Stream {
  id: string;
  title: string;
  streamer: string;
  viewers: number;
  thumbnail: string;
  category: string;
  tags: string[];
  isLive: boolean;
  duration: string;
  quality: string;
}

// Datos de ejemplo de streams en vivo
const liveStreams: Stream[] = [
  {
    id: '1',
    title: '🎮 Fortnite Tournament Finals - LIVE',
    streamer: 'ProGamer99',
    viewers: 12500,
    thumbnail: '/placeholder-stream.jpg', // Ruta más genérica
    category: 'Gaming',
    tags: ['fortnite', 'tournament', 'esports'],
    isLive: true,
    duration: '3:45:12',
    quality: '4K'
  },
  {
    id: '2',
    title: '🚀 Desarrollo en Directo: Nuevo Feature VRYNO',
    streamer: 'DevMaster',
    viewers: 8900,
    thumbnail: '/placeholder-stream.jpg',
    category: 'Tecnología',
    tags: ['programming', 'development', 'web'],
    isLive: true,
    duration: '2:15:33',
    quality: '1080p'
  },
  {
    id: '3', 
    title: '🎵 Producción Musical en Vivo',
    streamer: 'MusicProducer',
    viewers: 5600,
    thumbnail: '/placeholder-stream.jpg',
    category: 'Música',
    tags: ['music', 'production', 'live'],
    isLive: true,
    duration: '1:45:22',
    quality: '4K'
  }
];

export default function LivePage() {
  const [selectedStream, setSelectedStream] = useState<Stream>(liveStreams[0]);
  const [isGoLiveModalOpen, setIsGoLiveModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Gaming', 'Tecnología', 'Música', 'Deportes', 'Educación', 'Entretenimiento'];

  const filteredStreams = liveStreams.filter(stream => {
    const matchesSearch = stream.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         stream.streamer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || stream.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="live-page">
      {/* Header */}
      <div className="live-header">
        <div className="header-content">
          <h1 className="page-title">
            <span className="live-badge">LIVE</span>
            Streaming en VRYNO
          </h1>
          <p className="page-subtitle">Mira los mejores streams en 4K y únete a la comunidad</p>
          
          <div className="header-actions">
            <button 
              className="btn btn-live"
              onClick={() => setIsGoLiveModalOpen(true)}
            >
              <i className="fas fa-broadcast-tower"></i>
              Empezar Stream
            </button>
          </div>
        </div>
      </div>

      <div className="live-container">
        {/* Stream principal */}
        <div className="main-stream">
    <LiveStreamPlayer 
  streamKey="default_stream_123"
  channelName="TuCanal"
  isOwner={true}
/>    
/
          
          {/* Información del stream */}
          <div className="stream-info">
            <h2 className="stream-title">{selectedStream.title}</h2>
            <div className="stream-meta">
              <span className="streamer">@{selectedStream.streamer}</span>
              <span className="viewers">
                <i className="fas fa-eye"></i>
                {selectedStream.viewers.toLocaleString()} espectadores
              </span>
              <span className="category">{selectedStream.category}</span>
            </div>
            
            <div className="stream-tags">
              {selectedStream.tags.map(tag => (
                <span key={tag} className="tag">#{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Chat en vivo */}
        <div className="live-chat">
          <StreamChat streamId={selectedStream.id} />
        </div>
      </div>

      {/* Lista de streams en vivo */}
      <div className="streams-section">
        <div className="section-header">
          <h2>Streams en Vivo</h2>
          
          {/* Filtros */}
          <div className="stream-filters">
            <div className="search-box">
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Buscar streams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="category-filters">
              {categories.map(category => (
                <button
                  key={category}
                  className={`btn category-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category === 'all' ? 'Todos' : category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="streams-grid">
          {filteredStreams.map(stream => (
            <div
              key={stream.id}
              className={`stream-card ${selectedStream.id === stream.id ? 'active' : ''}`}
              onClick={() => setSelectedStream(stream)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedStream(stream);
                }
              }}
            >
              <div className="card-thumbnail">
                <img 
                  src={stream.thumbnail} 
                  alt={stream.title}
                  onError={(e) => {
                    // Fallback para imágenes que no cargan
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-stream.jpg';
                  }}
                />
                <div className="live-indicator">
                  <span className="live-dot"></span>
                  LIVE
                </div>
                <div className="viewer-count">
                  <i className="fas fa-eye"></i>
                  {stream.viewers.toLocaleString()}
                </div>
                <div className="quality-badge">{stream.quality}</div>
              </div>
              
              <div className="card-content">
                <h4 className="stream-title">{stream.title}</h4>
                <p className="streamer-name">@{stream.streamer}</p>
                <p className="stream-category">{stream.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal para empezar stream */}
      {isGoLiveModalOpen && (
        <GoLiveModal onClose={() => setIsGoLiveModalOpen(false)} />
      )}
    </div>
  );
}