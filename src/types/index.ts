// src/types/index.ts
export interface UserProfile {
  id: string;
  username: string;
  name: string;
  avatar: string;
  banner: string;
  bio: string;
  location: string;
  website: string;
  socialLinks: {
    twitter?: string;
    instagram?: string;
    tiktok?: string;
    youtube?: string;
  };
  stats: {
    followers: number;
    following: number;
    videos: number;
    likes: number;
    views: number;
  };
  joinDate: Date;
  isVerified: boolean;
  isPremium: boolean;
  isSubscribed?: boolean;
  isOwnProfile?: boolean;
}

// También agrega estos tipos para props
export interface ProfileStatsProps {
  stats: {
    followers: number;
    videos: number;
    views: number;
    likes: number;
  };
}

export interface SocialLinksProps {
  socialLinks: {
    twitter?: string;
    instagram?: string;
    tiktok?: string;
    youtube?: string;
  };
}