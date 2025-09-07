export interface UserBehavior {
  userId: string;
  videoId: string;
  action: 'view' | 'like' | 'share' | 'comment' | 'complete' | 'skip';
  duration: number; // Tiempo de visualización en segundos
  timestamp: Date;
}

export interface VideoFeatures {
  id: string;
  title: string;
  tags: string[];
  category: string;
  duration: number;
  creatorId: string;
  uploadDate: Date;
  engagement: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
  };
}

export interface Recommendation {
  videoId: string;
  score: number;
  reason: string[];
}

export interface UserProfile {
  userId: string;
  preferredCategories: string[];
  watchedVideos: string[];
  likedVideos: string[];
  averageWatchTime: number;
  engagementScore: number;
}