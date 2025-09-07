'use client';

import { User } from '@/types/rewards';

interface LeaderboardProps {
  data: User[];
}

export default function Leaderboard({ data }: LeaderboardProps) {
  const sortedData = [...data].sort((a, b) => b.points - a.points);

  return (
    <div className="leaderboard">
      <h3>🏆 Tabla de Líderes</h3>
      <div className="leaderboard-list">
        {sortedData.map((user, index) => (
          <div key={user.id} className="leaderboard-item">
            <div className="leaderboard-rank">
              {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
            </div>
            
            <div className="leaderboard-user">
              <img 
                src={user.avatar} 
                alt={user.username}
                className="user-avatar"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/default-avatar.jpg';
                }}
              />
              <span className="username">@{user.username}</span>
            </div>
            
            <div className="leaderboard-points">
              {user.points.toLocaleString()} pts
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}