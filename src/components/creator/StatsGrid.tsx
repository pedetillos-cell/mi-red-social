'use client';

import { StatCard } from '@/types/creator';

export default function StatsGrid() {
  const stats: StatCard[] = [
    {
      title: 'Visualizaciones',
      value: '245.8K',
      change: 12.5,
      icon: 'fas fa-eye',
      color: 'views'
    },
    {
      title: 'Ingresos',
      value: '$3,248.50',
      change: 8.2,
      icon: 'fas fa-dollar-sign',
      color: 'earnings'
    },
    {
      title: 'Suscriptores',
      value: '12,459',
      change: 5.7,
      icon: 'fas fa-users',
      color: 'subscribers'
    },
    {
      title: 'Tasa de Engagement',
      value: '14.2%',
      change: -2.1,
      icon: 'fas fa-heart',
      color: 'engagement'
    }
  ];
  
  return (
    <div className="stats-grid">
      {stats.map((stat, index) => (
        <div key={index} className={`stat-card ${stat.color}`}>
          <div className="stat-header">
            <div className="stat-title">{stat.title}</div>
            <div className="stat-icon">
              <i className={stat.icon}></i>
            </div>
          </div>
          <div className="stat-value">{stat.value}</div>
          <div className={`stat-change ${stat.change >= 0 ? 'positive' : 'negative'}`}>
            <i className={`fas fa-arrow-${stat.change >= 0 ? 'up' : 'down'}`}></i>
            <span>{Math.abs(stat.change)}% este mes</span>
          </div>
        </div>
      ))}
    </div>
  );
}