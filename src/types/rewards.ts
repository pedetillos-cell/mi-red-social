export interface Reward {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
  icon: string;
  type: 'badge' | 'discount' | 'feature' | 'physical';
  claimed: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  completed: boolean;
  rewardPoints: number;
}

export interface User {
  id: string;
  username: string;
  points: number;
  avatar: string;
}