'use client';

import Link from 'next/link';

export default function QuickActions() {
  const actions = [
    {
      title: 'Transmitir en Vivo',
      description: 'Inicia una transmisión en vivo',
      icon: '🔴',
      href: '/upload?type=live',
      color: 'red'
    },
    {
      title: 'Subir Video',
      description: 'Sube un nuevo video',
      icon: '📹',
      href: '/upload?type=video',
      color: 'blue'
    },
    {
      title: 'Gestionar Canal',
      description: 'Configura tu canal',
      icon: '⚙️',
      href: '/profile',
      color: 'gray'
    },
    {
      title: 'Ver Analytics',
      description: 'Métricas detalladas',
      icon: '📊',
      href: '/analytics',
      color: 'purple'
    }
  ];

  return (
    <div className="quick-actions">
      <h3 className="section-title">Acciones Rápidas</h3>
      <div className="actions-grid">
        {actions.map((action, index) => (
          <Link key={index} href={action.href} className={`action-card action-${action.color}`}>
            <div className="action-icon">{action.icon}</div>
            <div className="action-content">
              <h4 className="action-title">{action.title}</h4>
              <p className="action-description">{action.description}</p>
            </div>
            <div className="action-arrow">→</div>
          </Link>
        ))}
      </div>
    </div>
  );
}