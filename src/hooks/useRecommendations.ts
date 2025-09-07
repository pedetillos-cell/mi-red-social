'use client';

import { useState, useEffect } from 'react';
import { recommendationEngine } from '@/lib/recommendation/engine';
import { Recommendation } from '@/lib/recommendation/types';

export function useRecommendations(userId: string | null, limit: number = 10) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setRecommendations([]);
      setLoading(false);
      return;
    }

    const loadRecommendations = async () => {
      try {
        setLoading(true);
        const recs = await recommendationEngine.getRecommendations(userId, limit);
        setRecommendations(recs);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading recommendations');
      } finally {
        setLoading(false);
      }
    };

    loadRecommendations();

    // Recargar cada minuto para recomendaciones frescas
    const interval = setInterval(loadRecommendations, 60000);
    return () => clearInterval(interval);
  }, [userId, limit]);

  const refresh = () => {
    if (userId) {
      recommendationEngine.getRecommendations(userId, limit)
        .then(setRecommendations)
        .catch(setError);
    }
  };

  return { recommendations, loading, error, refresh };
}