'use client';

import { Recommendation } from '@/lib/recommendation/types';

interface RecommendationCardProps {
  recommendation: Recommendation;
  priority?: boolean;
}

export default function RecommendationCard({ 
  recommendation, 
  priority = false 
}: RecommendationCardProps) {
  const scorePercentage = Math.round(recommendation.score * 100);

  return (
    <div className="recommendation-card">
      <div className="recommendation-thumbnail">
        <i className="fas fa-play-circle"></i>
        <div className="recommendation-badge">
          {scorePercentage}% match
        </div>
      </div>
      
      <div className="recommendation-content">
        <h3 className="recommendation-title">
          Video recomendado #{recommendation.videoId.slice(-4)}
        </h3>
        
        <p className="recommendation-reason">
          {recommendation.reason.join(' • ')}
        </p>
        
        <div className="recommendation-score">
          <span>Relevancia:</span>
          <div className="score-bar">
            <div 
              className="score-fill" 
              style={{ width: `${scorePercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}