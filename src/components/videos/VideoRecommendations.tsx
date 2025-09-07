'use client';

import { useState, useEffect } from 'react';

interface Video {
  id: string;
  title: string;
  channel: {
    id: string;
    name: string;
    avatar: string;
    isVerified?: boolean;
  };
  views: number;
  duration: string;
  uploadDate: string;
  thumbnail: string;
}

interface VideoRecommendationsProps {
  currentVideoId: string;
}

export default function VideoRecommendations({ currentVideoId }: VideoRecommendationsProps) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRecommendations = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setVideos([
        {
          id: 'rec-1',
          title: 'Next.js 14 Tutorial Completo - Nuevas Features 2024',
          channel: {
            id: 'webdev-master',
            name: 'WebDev Master',
            avatar: '',
            isVerified: true
          },
          views: 124500,
          duration: '24:18',
          uploadDate: 'hace 2 días',
          thumbnail: ''
        },
        {
          id: 'rec-2',
          title: 'React 18 Performance Optimization - Guía Completa',
          channel: {
            id: 'react-pro',
            name: 'React Pro',
            avatar: '',
            isVerified: true
          },
          views: 89200,
          duration: '18:32',
          uploadDate: 'hace 3 días',
          thumbnail: ''
        },
        {
          id: 'rec-3',
          title: 'TypeScript Pro Tips - Mejores Prácticas 2024',
          channel: {
            id: 'typescript-master',
            name: 'TypeScript Master',
            avatar: '',
            isVerified: true
          },
          views: 156800,
          duration: '32:45',
          uploadDate: 'hace 1 semana',
          thumbnail: ''
        },
        {
          id: 'rec-4',
          title: 'Tailwind CSS Tutorial Desde Cero hasta Avanzado',
          channel: {
            id: 'css-wizard',
            name: 'CSS Wizard',
            avatar: '',
            isVerified: true
          },
          views: 78300,
          duration: '42:15',
          uploadDate: 'hace 4 días',
          thumbnail: ''
        },
        {
          id: 'rec-5',
          title: 'Node.js 20 - Nuevas Características y Performance',
          channel: {
            id: 'backend-pro',
            name: 'Backend Pro',
            avatar: '',
            isVerified: true
          },
          views: 95600,
          duration: '28:10',
          uploadDate: 'hace 5 días',
          thumbnail: ''
        },
        {
          id: 'rec-6',
          title: 'MongoDB con Next.js - Base de Datos Completa',
          channel: {
            id: 'database-master',
            name: 'Database Master',
            avatar: '',
            isVerified: false
          },
          views: 67200,
          duration: '36:22',
          uploadDate: 'hace 1 semana',
          thumbnail: ''
        },
        {
          id: 'rec-7',
          title: 'GraphQL vs REST - Comparativa 2024',
          channel: {
            id: 'api-guru',
            name: 'API Guru',
            avatar: '',
            isVerified: true
          },
          views: 45800,
          duration: '22:30',
          uploadDate: 'hace 3 días',
          thumbnail: ''
        },
        {
          id: 'rec-8',
          title: 'Docker para Desarrolladores Frontend',
          channel: {
            id: 'devops-pro',
            name: 'DevOps Pro',
            avatar: '',
            isVerified: true
          },
          views: 38900,
          duration: '19:45',
          uploadDate: 'hace 2 días',
          thumbnail: ''
        }
      ]);
      setIsLoading(false);
    };

    loadRecommendations();
  }, [currentVideoId]);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + ' M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + ' K';
    }
    return num.toString();
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold mb-4">Recomendados</h2>
        {[...Array(8)].map((_, index) => (
          <div key={index} className="flex gap-3 animate-pulse">
            <div className="w-40 h-24 bg-gray-300 rounded-lg flex-shrink-0"></div>
            <div className="flex-1 min-w-0 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-4/5"></div>
              <div className="h-3 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold mb-4">Recomendados</h2>
      
      {videos.map((video) => (
        <div
          key={video.id}
          className="flex gap-3 cursor-pointer group"
          onClick={() => window.location.href = `/watch/${video.id}`}
        >
          {/* Thumbnail */}
          <div className="relative flex-shrink-0">
            <div className="w-40 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg overflow-hidden flex items-center justify-center">
              <span className="text-gray-600 text-2xl">🎬</span>
              <div className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                {video.duration}
              </div>
            </div>
          </div>

          {/* Video Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 text-sm leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors mb-1">
              {video.title}
            </h3>
            
            <p className="text-xs text-gray-600 mb-1">
              {video.channel.name}
              {video.channel.isVerified && (
                <span className="text-blue-500 ml-1">✓</span>
              )}
            </p>
            
            <p className="text-xs text-gray-600">
              {formatNumber(video.views)} vistas • {video.uploadDate}
            </p>
          </div>
        </div>
      ))}

      {/* Show More Button */}
      <button className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors mt-2">
        Mostrar más
      </button>
    </div>
  );
}