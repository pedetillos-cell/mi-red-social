'use client';
import { Achievement } from '@/types/rewards';
interface AchievementsPanelProps {
  achievements: Achievement[];
}

export default function AchievementsPanel({ achievements }: AchievementsPanelProps) {
  return (
    <div className="achievements-panel">
      <h3>Tus Logros</h3>
      {achievements.map(achievement => (
        <div key={achievement.id} className="achievement-item">
          <div className="achievement-info">
            <h4>{achievement.title}</h4>
            <p>{achievement.description}</p>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
              />
            </div>
            <span>{achievement.progress}/{achievement.target}</span>
          </div>
          <div className="achievement-reward">
            +{achievement.rewardPoints} puntos
          </div>
        </div>
      ))}
    </div>
  );
}