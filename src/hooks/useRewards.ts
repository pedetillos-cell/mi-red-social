'use client';

import { useState, useEffect } from 'react';

interface Reward {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
  icon: string;
  type: 'badge' | 'discount' | 'feature' | 'physical';
  claimed: boolean;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  completed: boolean;
  rewardPoints: number;
}

interface User {
  id: string;
  username: string;
  points: number;
  avatar: string;
}

export const useRewards = () => {
  const [userPoints, setUserPoints] = useState(1250);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [leaderboard, setLeaderboard] = useState<User[]>([]);

  useEffect(() => {
    loadRewardsData();
  }, []);

  const loadRewardsData = () => {
    const rewardsData: Reward[] = [
      {
        id: '1',
        title: 'Badge "Streamer Novato"',
        description: 'Desbloquea tu primer badge oficial',
        pointsRequired: 100,
        icon: '🟢',
        type: 'badge',
        claimed: false
      },
      {
        id: '2',
        title: '15% de Descuento',
        description: 'Descuento en suscripción premium',
        pointsRequired: 500,
        icon: '💸',
        type: 'discount',
        claimed: true
      },
      {
        id: '3',
        title: 'Emojis Personalizados',
        description: 'Pack exclusivo de emojis para chat',
        pointsRequired: 1000,
        icon: '😊',
        type: 'feature',
        claimed: false
      }
    ];

    const achievementsData: Achievement[] = [
      {
        id: '1',
        title: 'Primer Stream',
        description: 'Completa tu primera transmisión',
        progress: 1,
        target: 1,
        completed: true,
        rewardPoints: 100
      },
      {
        id: '2',
        title: '100 Seguidores',
        description: 'Alcanza 100 seguidores',
        progress: 75,
        target: 100,
        completed: false,
        rewardPoints: 250
      }
    ];

    const leaderboardData: User[] = [
      { id: '1', username: 'ProGamer99', points: 5000, avatar: '/avatars/1.jpg' },
      { id: '2', username: 'DevMaster', points: 4200, avatar: '/avatars/2.jpg' },
      { id: '3', username: 'MusicLover', points: 3800, avatar: '/avatars/3.jpg' }
    ];

    setRewards(rewardsData);
    setAchievements(achievementsData);
    setLeaderboard(leaderboardData);
  };

  const claimReward = (rewardId: string) => {
    const rewardToClaim = rewards.find(r => r.id === rewardId);
    if (!rewardToClaim) return;

    if (userPoints >= rewardToClaim.pointsRequired && !rewardToClaim.claimed) {
      setRewards(prev => prev.map(reward =>
        reward.id === rewardId ? { ...reward, claimed: true } : reward
      ));
      setUserPoints(prev => prev - rewardToClaim.pointsRequired);
    }
  };

  return {
    userPoints,
    rewards,
    achievements,
    leaderboard,
    claimReward
  };
};