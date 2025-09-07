'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import Image from 'next/image';

interface UserMenuProps {
  user: {
    id: string;
    username: string;
    email: string;
    channelName: string;
    avatar?: string;
    subscribers?: number;
  };
}

export default function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuth();

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  return (
    <div className="user-menu" ref={menuRef}>
      <button
        className="user-menu-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className="user-avatar">
          {user.avatar ? (
            <Image
              src={user.avatar}
              alt={user.username}
              width={32}
              height={32}
              className="avatar-image"
            />
          ) : (
            <div className="avatar-placeholder">
              {user.username.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <span className="user-name">{user.username}</span>
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className="user-menu-dropdown">
          <div className="user-info">
            <div className="user-avatar-large">
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.username}
                  width={48}
                  height={48}
                  className="avatar-image"
                />
              ) : (
                <div className="avatar-placeholder large">
                  {user.username.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="user-details">
              <div className="user-display-name">{user.channelName}</div>
              <div className="user-username">@{user.username}</div>
              {user.subscribers && (
                <div className="user-stats">
                  {user.subscribers.toLocaleString()} seguidores
                </div>
              )}
            </div>
          </div>

          <div className="menu-divider"></div>

          <Link href={`/channel/${user.username}`} className="menu-item">
            <span className="menu-icon">🎬</span>
            Mi Canal
          </Link>

          <Link href="/dashboard" className="menu-item">
            <span className="menu-icon">📊</span>
            Dashboard
          </Link>

          <Link href="/profile" className="menu-item">
            <span className="menu-icon">⚙️</span>
            Configuración
          </Link>

          <Link href="/upload" className="menu-item">
            <span className="menu-icon">🎥</span>
            Subir Video
          </Link>

          <div className="menu-divider"></div>

          <button onClick={handleLogout} className="menu-item logout">
            <span className="menu-icon">🚪</span>
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
}