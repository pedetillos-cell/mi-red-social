export interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: Date;
  likes: number;
  dislikes: number;
  isLiked?: boolean;
  isDisliked?: boolean;
  replies: Comment[];
}

export interface VideoData {
  id: string;
  title: string;
  views: number;
  uploadDate: Date;
  likes: number;
  dislikes: number;
  isLiked?: boolean;
  isDisliked?: boolean;
}