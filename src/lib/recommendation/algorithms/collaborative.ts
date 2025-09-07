import { UserBehavior, VideoFeatures, Recommendation } from '../types';

export async function collaborativeFiltering(
  userId: string,
  allUserBehaviors: UserBehavior[],
  videoFeatures: Map<string, VideoFeatures>,
  limit: number = 10
): Promise<Recommendation[]> {
  // Filtrar comportamientos del usuario actual
  const currentUserBehaviors = allUserBehaviors.filter(b => b.userId === userId);
  const userLikedVideos = currentUserBehaviors
    .filter(b => b.action === 'like')
    .map(b => b.videoId);

  if (userLikedVideos.length === 0) return [];

  // Encontrar usuarios similares
  const similarUsers = findSimilarUsers(userId, allUserBehaviors);
  
  // Recomendar videos que les gustaron a usuarios similares
  const recommendations: Recommendation[] = [];

  for (const similarUser of similarUsers) {
    const similarUserLikes = allUserBehaviors
      .filter(b => b.userId === similarUser && b.action === 'like')
      .map(b => b.videoId);

    for (const videoId of similarUserLikes) {
      if (!userLikedVideos.includes(videoId)) {
        const video = videoFeatures.get(videoId);
        if (video) {
          recommendations.push({
            videoId,
            score: 0.7,
            reason: ['Similar a usuarios como tú']
          });
        }
      }
    }
  }

  return recommendations.slice(0, limit);
}

function findSimilarUsers(userId: string, allBehaviors: UserBehavior[]): string[] {
  const userLikes = allBehaviors
    .filter(b => b.userId === userId && b.action === 'like')
    .map(b => b.videoId);

  if (userLikes.length === 0) return [];

  const otherUsers = new Set(allBehaviors.map(b => b.userId));
  otherUsers.delete(userId);

  const similarUsers: { userId: string; similarity: number }[] = [];

  for (const otherUser of otherUsers) {
    const otherUserLikes = allBehaviors
      .filter(b => b.userId === otherUser && b.action === 'like')
      .map(b => b.videoId);

    if (otherUserLikes.length === 0) continue;

    const commonLikes = userLikes.filter(videoId => 
      otherUserLikes.includes(videoId)
    ).length;

    const similarity = commonLikes / Math.sqrt(userLikes.length * otherUserLikes.length);
    
    if (similarity > 0.3) {
      similarUsers.push({ userId: otherUser, similarity });
    }
  }

  return similarUsers
    .sort((a, b) => b.similarity - a.similarity)
    .map(u => u.userId)
    .slice(0, 5);
}