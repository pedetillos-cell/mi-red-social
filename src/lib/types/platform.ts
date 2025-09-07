export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  banner?: string;
  subscriberCount: number;
  createdAt: Date;
  isVerified: boolean;
  isPartner: boolean;
  isPremium: boolean;
  biography?: string;
  website?: string;
  socialLinks?: {
    twitter?: string;
    instagram?: string;
    youtube?: string;
    twitch?: string;
  };
}

export interface Video {
  id: string;
  title: string;
  description: string;
  views: number;
  likes: number;
  dislikes: number;
  comments: number;
  duration: number;
  category: string;
  tags: string[];
  thumbnail: string;
  videoUrl: string;
  author: User;
  createdAt: Date;
  isLive: boolean;
  isPremiere: boolean;
  isExclusive: boolean;
  is4K: boolean;
  isHDR: boolean;
  isSpatialAudio: boolean;
  fileSize: number;
  resolution: string;
  fps: number;
}

export interface LiveStream {
  id: string;
  title: string;
  viewerCount: number;
  likeCount: number;
  isLive: boolean;
  scheduledStart?: Date;
  thumbnail: string;
  streamUrl: string;
  author: User;
  latency: 'low' | 'normal' | 'ultra-low';
  maxQuality: '1080p' | '1440p' | '4K';
  isChatEnabled: boolean;
  isDonationsEnabled: boolean;
  isSubscribersOnly: boolean;
}

export interface PlatformStats {
  totalUsers: number;
  totalVideos: number;
  totalLiveStreams: number;
  totalWatchHours: number;
  dailyActiveUsers: number;
  monthlyActiveUsers: number;
  averageWatchTime: number;
  retentionRate: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  videoCount: number;
  isPopular: boolean;
}