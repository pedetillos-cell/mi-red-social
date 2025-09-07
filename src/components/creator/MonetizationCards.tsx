'use client';

import { MonetizationMethod } from '@/types/creator';

export default function MonetizationCards() {
  const methods: MonetizationMethod[] = [
    {
      title: 'Suscripciones',
      description: 'Ofrece contenido exclusivo a tus suscriptores con diferentes niveles de membresía y beneficios especiales.',
      value: '$1,240/mes',
      change: 124,
      icon: 'fas fa-star',
      color: 'subscriptions'
    },
    {
      title: 'Donaciones',
      description: 'Permite que tu audiencia te apoye directamente con donaciones voluntarias durante tus transmisiones en vivo.',
      value: '$845/mes',
      change: 67,
      icon: 'fas fa-hand-holding-heart',
      color: 'donations'
    },
    {
      title: 'Anuncios',
      description: 'Monetiza tus videos con anuncios integrados. Controla el tipo, duración y frecuencia de los anuncios.',
      value: '$1,163.50/mes',
      change: 12.45,
      icon: 'fas fa-ad',
      color: 'ads'
    }
  ];
  
  return (
    <div className="monetization-cards">
      {methods.map((method, index) => (
        <div key={index} className={`monetization-card ${method.color}`}>
          <div className="monetization-header">
            <div className="monetization-icon">
              <i className={method.icon}></i>
            </div>
            <h3 className="monetization-title">{method.title}</h3>
          </div>
          <p className="monetization-description">{method.description}</p>
          <div className="monetization-stats">
            <div className="monetization-value">{method.value}</div>
            <div className="stat-change positive">
              <i className="fas fa-arrow-up"></i>
              <span>
                {typeof method.change === 'number' && method.change > 10 
                  ? `${method.change} ${method.title === 'Anuncios' ? 'RPM' : 'suscriptores'}`
                  : `${method.change}% este mes`
                }
              </span>
            </div>
          </div>
          <button className="btn-primary monetization-action">
            <i className="fas fa-cog"></i>
            <span>Gestionar {method.title.toLowerCase()}</span>
          </button>
        </div>
      ))}
    </div>
  );
}