'use client';

import { useAuth } from '@/contexts/AuthContext';
import UserMenu from './UserMenu';
import AuthButtons from './AuthButtons';
import Link from 'next/link';

export default function Navbar() {
  const { user, isLoading } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo y Navegación */}
        <div className="navbar-brand">
          <Link href="/" className="navbar-logo">
            <span className="logo-icon">🎬</span>
            <span className="logo-text">VRYNO</span>
          </Link>
          
          <div className="navbar-links">
            <Link href="/discover" className="nav-link">
              Descubrir
            </Link>
            <Link href="/streams" className="nav-link">
              En Vivo
            </Link>
            <Link href="/upload" className="nav-link upload-link">
              <span className="upload-icon">+</span> Crear
            </Link>
          </div>
        </div>

        {/* Estado de Autenticación */}
        <div className="navbar-auth">
          {isLoading ? (
            // Loading state
            <div className="auth-loading">
              <div className="loading-spinner"></div>
            </div>
          ) : user ? (
            // Usuario autenticado
            <UserMenu user={user} />
          ) : (
            // Usuario no autenticado
            <AuthButtons />
          )}
        </div>
      </div>
    </nav>
  );
}