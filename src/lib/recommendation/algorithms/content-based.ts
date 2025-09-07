import { VideoFeatures, UserProfile, Recommendation } from '../types';

export async function contentBasedFiltering(
  userProfile: UserProfile,
  videoFeatures: Map<string, VideoFeatures>,
  limit: number = 10
): Promise<Recommendation[]> {
  const recommendations: Recommendation[] = [];
  const userLikedVideos = userProfile.likedVideos;

  if (userLikedVideos.length === 0) return [];

  // Analizar preferencias del usuario
  const userPreferences = analyzeUserPreferences(userProfile, videoFeatures);

  // Calcular similitud para cada video
  for (const [videoId, video] of videoFeatures.entries()) {
    if (!userLikedVideos.includes(videoId)) {
      const similarity = calculateContentSimilarity(userPreferences, video);
      
      if (similarity > 0.4) {
        recommendations.push({
          videoId,
          score: similarity,
          reason: ['Similar a contenido que te gusta']
        });
      }
    }
  }

  return recommendations
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

function analyzeUserPreferences(
  userProfile: UserProfile, 
  videoFeatures: Map<string, VideoFeatures>
) {
  const preferences = {
    categories: new Map<string, number>(),
    tags: new Map<string, number>(),
    averageDuration: 0,
    totalWatched: userProfile.watchedVideos.length
  };

  for (const videoId of userProfile.watchedVideos) {
    const video = videoFeatures.get(videoId);
    if (video) {
      // Preferencias de categoría
      preferences.categories.set(
        video.category,
        (preferences.categories.get(video.category) || 0) + 1
      );

      // Preferencias de tags
      for (const tag of video.tags) {
        preferences.tags.set(tag, (preferences.tags.get(tag) || 0) + 1);
      }

      preferences.averageDuration += video.duration;
    }
  }

  if (userProfile.watchedVideos.length > 0) {
    preferences.averageDuration /= userProfile.watchedVideos.length;
  }

  return preferences;
}

function calculateContentSimilarity(preferences: any, video: VideoFeatures): number {
  let similarity = 0;

  // Similitud de categoría
  const categoryScore = preferences.categories.get(video.category) || 0;
  similarity += (preferences.totalWatched > 0 ? categoryScore / preferences.totalWatched : 0) * 0.4;

  // Similitud de tags
  let tagScore = 0;
  for (const tag of video.tags) {
    tagScore += preferences.tags.get(tag) || 0;
  }
  similarity += (preferences.totalWatched > 0 ? tagScore / (video.tags.length * preferences.totalWatched) : 0) * 0.3;

  // Similitud de duración
  if (preferences.averageDuration > 0) {
    const durationDiff = Math.abs(preferences.averageDuration - video.duration);
    similarity += Math.max(0, 1 - durationDiff / 300) * 0.3;
  }

  return similarity;
}