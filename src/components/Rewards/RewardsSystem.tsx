'use client';

import { useState } from 'react';
import RewardCard from './RewardCard';
import AchievementsPanel from './AchievementsPanel';
import Leaderboard from './Leaderboard';
import PointsCounter from './PointsCounter';
import { useRewards } from '@/hooks/useRewards';

interface Reward {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
  icon: string;
  type: 'badge' | 'discount' | 'feature' | 'physical';
  claimed: boolean;
}

export default function RewardsSystem() {
  const [activeTab, setActiveTab] = useState<'rewards' | 'achievements' | 'leaderboard'>('rewards');
  const { userPoints, rewards, achievements, leaderboard, claimReward } = useRewards();

  // ¡FALTABA EL RETURN!
  return (
    <div className="rewards-system">
      {/* Header con puntos del usuario */}
      <div className="rewards-header">
        <PointsCounter points={userPoints} />
        <h2>Sistema de Recompensas</h2>
        <p>Gana puntos y desbloquea recompensas exclusivas</p>
      </div>

      {/* Navegación por pestañas */}
      <div className="rewards-tabs">
        <button 
          className={activeTab === 'rewards' ? 'active' : ''}
          onClick={() => setActiveTab('rewards')}
        >
          🎁 Recompensas
        </button>
        <button 
          className={activeTab === 'achievements' ? 'active' : ''}
          onClick={() => setActiveTab('achievements')}
        >
          🏆 Logros
        </button>
        <button 
          className={activeTab === 'leaderboard' ? 'active' : ''}
          onClick={() => setActiveTab('leaderboard')}
        >
          🏆 Leaderboard
        </button>
      </div>

      {/* Contenido dinámico */}
      <div className="rewards-content">
        {activeTab === 'rewards' && (
          <div className="rewards-grid">
            {rewards.map((reward: Reward) => (
              <RewardCard
                key={reward.id}
                reward={reward}
                userPoints={userPoints}
                onClaim={claimReward}
              />
            ))}
          </div>
        )}

        {activeTab === 'achievements' && (
          <AchievementsPanel achievements={achievements} />
        )}

        {activeTab === 'leaderboard' && (
          <Leaderboard data={leaderboard} />
        )}
      </div>
    </div>
  );
}