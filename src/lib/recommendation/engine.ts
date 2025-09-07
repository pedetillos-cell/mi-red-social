import { UserBehavior, VideoFeatures, Recommendation, UserProfile } from './types';
import { collaborativeFiltering } from './algorithms/collaborative';
import { contentBasedFiltering } from './algorithms/content-based';

class RecommendationEngine {
  private userBehaviors: UserBehavior[] = [];
  private videoFeatures: Map<string, VideoFeatures> = new Map();
  private userProfiles: Map<string, UserProfile> = new Map();

  // Agregar comportamiento de usuario
  trackUserBehavior(behavior: UserBehavior) {
    this.userBehaviors.push(behavior);
    this.updateUserProfile(behavior.userId, behavior);
  }

  // Agregar características de video
  addVideoFeatures(features: VideoFeatures) {
    this.videoFeatures.set(features.id, features);
  }

  // Generar recomendaciones (MÉTODO ACTUALIZADO)
  async getRecommendations(userId: string, limit: number = 10): Promise<Recommendation[]> {
    const userProfile = this.userProfiles.get(userId);
    if (!userProfile) return this.getPopularVideos(limit);

    try {
      // Usar las funciones importadas de los algoritmos
      const collaborativeRecs = await collaborativeFiltering(
        userId,
        this.userBehaviors,
        this.videoFeatures,
        limit
      );

      const contentBasedRecs = await contentBasedFiltering(
        userProfile,
        this.videoFeatures,
        limit
      );

      // Combinar todas las recomendaciones
      const allRecommendations = [...collaborativeRecs, ...contentBasedRecs];
      
      // Eliminar duplicados
      const uniqueRecs = this.removeDuplicates(allRecommendations);
      
      // Ordenar por score
      const sortedRecs = uniqueRecs.sort((a, b) => b.score - a.score);
      
      // Diversificar y limitar
      return this.diversifyRecommendations(sortedRecs, limit);

    } catch (error) {
      console.error('Error generating recommendations:', error);
      return this.getPopularVideos(limit);
    }
  }

  // Recomendaciones populares (fallback)
  private getPopularVideos(limit: number): Recommendation[] {
    const videosArray = Array.from(this.videoFeatures.values());
    
    if (videosArray.length === 0) return [];

    const popularVideos = videosArray
      .sort((a, b) => (b.engagement?.views || 0) - (a.engagement?.views || 0))
      .slice(0, limit);

    return popularVideos.map(video => ({
      videoId: video.id,
      score: 0.8,
      reason: ['Trending en VRYNO']
    }));
  }

  // Actualizar perfil de usuario
  private updateUserProfile(userId: string, behavior: UserBehavior) {
    let profile = this.userProfiles.get(userId);
    
    if (!profile) {
      profile = {
        userId,
        preferredCategories: [],
        watchedVideos: [],
        likedVideos: [],
        averageWatchTime: 0,
        engagementScore: 0
      };
    }

    // Actualizar based on behavior
    if (behavior.action === 'view') {
      if (!profile.watchedVideos.includes(behavior.videoId)) {
        profile.watchedVideos.push(behavior.videoId);
      }
      // Calcular promedio de tiempo de visualización
      const totalWatchTime = profile.averageWatchTime * (profile.watchedVideos.length - 1) + behavior.duration;
      profile.averageWatchTime = totalWatchTime / profile.watchedVideos.length;
    } else if (behavior.action === 'like') {
      if (!profile.likedVideos.includes(behavior.videoId)) {
        profile.likedVideos.push(behavior.videoId);
      }
      profile.engagementScore += 10;
    } else if (behavior.action === 'share') {
      profile.engagementScore += 20;
    }

    // Actualizar categorías preferidas
    const video = this.videoFeatures.get(behavior.videoId);
    if (video && !profile.preferredCategories.includes(video.category)) {
      profile.preferredCategories.push(video.category);
    }

    this.userProfiles.set(userId, profile);
  }

  // Eliminar recomendaciones duplicadas
  private removeDuplicates(recommendations: Recommendation[]): Recommendation[] {
    const seen = new Set<string>();
    return recommendations.filter(rec => {
      if (seen.has(rec.videoId)) {
        return false;
      }
      seen.add(rec.videoId);
      return true;
    });
  }

  // Diversificar recomendaciones
  private diversifyRecommendations(recommendations: Recommendation[], limit: number): Recommendation[] {
    const diversified: Recommendation[] = [];
    const usedCategories = new Set<string>();

    for (const rec of recommendations) {
      const video = this.videoFeatures.get(rec.videoId);
      if (video) {
        if (!usedCategories.has(video.category)) {
          diversified.push(rec);
          usedCategories.add(video.category);
        } else if (diversified.length < limit) {
          // Si ya tenemos una categoría, pero necesitamos llenar el límite
          diversified.push(rec);
        }
      }
      
      if (diversified.length >= limit) break;
    }

    return diversified;
  }
}

export const recommendationEngine = new RecommendationEngine();