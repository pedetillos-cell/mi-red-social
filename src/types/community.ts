export interface Community {
  id: string;
  name: string;
  description: string;
  creatorId: string;
  createdAt: Date;
  updatedAt: Date;
  membersCount: number;
  postsCount: number;
  isPublic: boolean;
  tags: string[];
  rules: string[];
  bannerImage?: string;
  avatarImage?: string;
  category: string;
}

export interface CommunityMember {
  userId: string;
  communityId: string;
  joinedAt: Date;
  role: 'admin' | 'moderator' | 'member';
}

export interface CommunityPost {
  id: string;
  communityId: string;
  authorId: string;
  content: string;
  mediaUrls?: string[];
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  comments: number;
  shares: number;
  isPinned: boolean;
}

export interface CommunityInvite {
  id: string;
  communityId: string;
  inviterId: string;
  inviteeId: string;
  createdAt: Date;
  status: 'pending' | 'accepted' | 'rejected';
}