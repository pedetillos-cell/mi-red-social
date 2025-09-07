'use client';

import { useState, useEffect } from 'react';

export default function Stats() {
  const [counts, setCounts] = useState({
    users: 0,
    videos: 0,
    hours: 0,
    creators: 0
  });

  useEffect(() => {
    const targetCounts = {
      users: 1000000,
      videos: 500000,
      hours: 25000,
      creators: 50000
    };

    const duration = 3000; // 3 seconds
    const interval = 50;
    const steps = duration / interval;

    const counters = Object.keys(targetCounts).reduce((acc, key) => {
      acc[key] = 0;
      return acc;
    }, {} as any);

    const timer = setInterval(() => {
      Object.keys(targetCounts).forEach(key => {
        const target = targetCounts[key as keyof typeof targetCounts];
        const step = target / steps;
        counters[key] = Math.min(counters[key] + step, target);
        
        setCounts(prev => ({
          ...prev,
          [key]: Math.floor(counters[key])
        }));
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">{counts.users.toLocaleString()}+</div>
            <div className="stat-label">Usuarios Activos</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{counts.videos.toLocaleString()}+</div>
            <div className="stat-label">Videos Subidos</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{counts.hours.toLocaleString()}+</div>
            <div className="stat-label">Horas de Contenido</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{counts.creators.toLocaleString()}+</div>
            <div className="stat-label">Creadores</div>
          </div>
        </div>
      </div>
    </section>
  );
}