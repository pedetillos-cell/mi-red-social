'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import StatsGrid from './components/StatsGrid';
import QuickActions from './components/QuickActions';
import RecentVideos from './components/RecentVideos';
import ChannelAnalytics from './components/ChannelAnalytics';

// Tipos para los datos del dashboard
interface DashboardStats {
  followers: number;
  totalViews: number;
  revenue: number;
  videos: number;
  followerGrowth: number;
  viewGrowth: number;
  revenueGrowth: number;
}

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  views: number;
  duration: string;
  uploadDate: string;
  likes: number;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentVideos, setRecentVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos del dashboard
    const loadDashboardData = async () => {
      setIsLoading(true);
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Datos de ejemplo
      setStats({
        followers: 1240,
        totalViews: 45678,
        revenue: 245.50,
        videos: 24,
        followerGrowth: 12,
        viewGrowth: 1200,
        revenueGrowth: 45.25
      });

      setRecentVideos([
        {
          id: '1',
          title: 'Cómo crear una app con Next.js',
          thumbnail: '/api/placeholder/300/200',
          views: 12500,
          duration: '15:30',
          uploadDate: '2024-01-15',
          likes: 245
        },
        {
          id: '2',
          title: 'Tutorial de React avanzado',
          thumbnail: '/api/placeholder/300/200',
          views: 8900,
          duration: '22:45',
          uploadDate: '2024-01-10',
          likes: 178
        }
      ]);

      setIsLoading(false);
    };

    if (user) {
      loadDashboardData();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="dashboard-container">
        <div className="auth-required">
          <h2>Acceso requerido</h2>
          <p>Necesitas iniciar sesión para acceder al dashboard</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Header del Dashboard */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">
            Dashboard de <span className="channel-name">{user.channelName}</span>
          </h1>
          <p className="dashboard-subtitle">
            Bienvenido de vuelta, {user.username}. Aquí está el resumen de tu canal.
          </p>
        </div>
        <div className="header-actions">
          <span className="channel-status">✅ Canal verificado</span>
        </div>
      </div>

      {/* Estadísticas principales */}
      {stats && <StatsGrid stats={stats} />}

      {/* Acciones rápidas */}
      <QuickActions />

      {/* Grid de contenido */}
      <div className="dashboard-grid">
        {/* Videos recientes */}
        <div className="dashboard-section">
          <RecentVideos videos={recentVideos} isLoading={isLoading} />
        </div>

        {/* Analytics del canal */}
        <div className="dashboard-section">
          <ChannelAnalytics stats={stats} isLoading={isLoading} />
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="dashboard-loading">
          <div className="loading-spinner-large"></div>
          <p>Cargando datos de tu canal...</p>
        </div>
      )}
    </div>
  );
}