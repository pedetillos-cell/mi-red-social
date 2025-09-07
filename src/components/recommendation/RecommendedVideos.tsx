'use client';

import { useRecommendations } from '@/hooks/useRecommendations';
import RecommendationCard from './RecommendationCard';

interface RecommendedVideosProps {
  userId: string | null;
  title?: string;
  limit?: number;
}

export default function RecommendedVideos({ 
  userId, 
  title = "Para ti", 
  limit = 6 
}: RecommendedVideosProps) {
  const { recommendations, loading, error } = useRecommendations(userId, limit);

  if (loading) {
    return (
      <div className="recommended-section">
        <h2 className="section-title">{title}</h2>
        <div className="recommended-grid">
          {Array.from({ length: limit }).map((_, i) => (
            <div key={i} className="recommendation-skeleton">
              <div className="skeleton-thumbnail"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-text short"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="recommended-section">
        <h2 className="section-title">{title}</h2>
        <div className="error-message">
          Error cargando recomendaciones: {error}
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div className="recommended-section">
        <h2 className="section-title">{title}</h2>
        <div className="no-recommendations">
          <p>¡Interactúa con videos para obtener recomendaciones personalizadas!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="recommended-section">
      <h2 className="section-title">{title}</h2>
      <div className="recommended-grid">
        {recommendations.map((recommendation, index) => (
          <RecommendationCard
            key={recommendation.videoId}
            recommendation={recommendation}
            priority={index < 2}
          />
        ))}
      </div>
    </div>
  );
}