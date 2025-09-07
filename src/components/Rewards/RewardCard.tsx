'use client';

import { Reward } from '@/types/rewards';

interface RewardCardProps {
  reward: Reward;
  userPoints: number;
  onClaim: (rewardId: string) => void;
}

export default function RewardCard({ reward, userPoints, onClaim }: RewardCardProps) {
  const canClaim = userPoints >= reward.pointsRequired && !reward.claimed;

  return (
    <div className={`reward-card ${reward.claimed ? 'claimed' : ''}`}>
      <div className="reward-icon">{reward.icon}</div>
      <h3>{reward.title}</h3>
      <p>{reward.description}</p>
      <div className="reward-points">{reward.pointsRequired} puntos</div>
      
      {reward.claimed ? (
        <button className="btn-claimed" disabled>
          ✅ Reclamado
        </button>
      ) : (
        <button 
          className={canClaim ? 'btn-claim' : 'btn-disabled'} 
          onClick={() => onClaim(reward.id)}
          disabled={!canClaim}
        >
          {canClaim ? '🎁 Reclamar' : 'Puntos insuficientes'}
        </button>
      )}
    </div>
  );
}