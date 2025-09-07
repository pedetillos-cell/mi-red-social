export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  uploadDate: Date;
  views: number;
  likes: number;
  comments: number;
  revenue: number;
}

export interface StatCard {
  title: string;
  value: string | number;
  change: number;
  icon: string;
  color: string;
}

export interface MonetizationMethod {
  title: string;
  description: string;
  value: string;
  change: number;
  icon: string;
  color: string;
}