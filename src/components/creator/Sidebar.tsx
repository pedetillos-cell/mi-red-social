'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  
  const navItems = [
    { href: '/creator', icon: 'fas fa-chart-line', label: 'Analytics' },
    { href: '/creator/content', icon: 'fas fa-film', label: 'Gestión de Contenido' },
    { href: '/creator/monetization', icon: 'fas fa-dollar-sign', label: 'Monetización' },
    { href: '/creator/audience', icon: 'fas fa-users', label: 'Audiencia' },
    { href: '/settings', icon: 'fas fa-cog', label: 'Configuración' },
    { href: '/mobile', icon: 'fas fa-mobile-alt', label: 'App Móvil' },
  ];
  
  return (
    <div className="sidebar">
      <Link href="/" className="logo">
        <span>🎬</span> VRYNO
      </Link>
      
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-item ${isActive ? 'active' : ''}`}
          >
            <i className={item.icon}></i>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}