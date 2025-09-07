'use client';

interface PointsCounterProps {
  points: number;
}

export default function PointsCounter({ points }: PointsCounterProps) {
  return (
    <div className="points-counter">
      <div className="points-icon">🪙</div>
      <div className="points-content">
        <span className="points-label">Tus Puntos</span>
        <span className="points-value">{points.toLocaleString()}</span>
      </div>
    </div>
  );
}