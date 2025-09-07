// components/Navigation.tsx
"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
}

export default function Navigation() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Obtener usuario actual del localStorage
    const userData = localStorage.getItem('vryno_current_user');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('vryno_current_user');
    setCurrentUser(null);
    setIsMenuOpen(false);
    router.push('/');
  };

  return (
    <nav style={{
      background: 'white',
      padding: '1rem 2rem',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <Link href="/" style={{ 
        fontSize: '1.5rem', 
        fontWeight: 'bold', 
        color: '#ef4444',
        textDecoration: 'none'
      }}>
        VRYNO
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        {currentUser ? (
          <>
            <Link href="/upload" style={{
              padding: '0.5rem 1rem',
              background: '#3b82f6',
              color: 'white',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: '600'
            }}>
              Subir video
            </Link>

            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1.2rem'
                }}>
                  {currentUser.displayName.charAt(0)}
                </div>
              </button>

              {isMenuOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  background: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                  padding: '0.5rem',
                  minWidth: '200px',
                  marginTop: '0.5rem'
                }}>
                  <div style={{ 
                    padding: '1rem',
                    borderBottom: '1px solid #f3f4f6'
                  }}>
                    <p style={{ fontWeight: '600', margin: 0 }}>{currentUser.displayName}</p>
                    <p style={{ color: '#6b7280', margin: '0.25rem 0 0 0' }}>@{currentUser.username}</p>
                  </div>
                  
                  <Link 
                    href={`/profile/${currentUser.username}`} 
                    style={{
                      display: 'block',
                      padding: '0.75rem 1rem',
                      color: '#374151',
                      textDecoration: 'none',
                      borderRadius: '4px',
                      transition: 'background-color 0.2s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = '#f9fafb'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Mi perfil
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '0.75rem 1rem',
                      background: 'none',
                      border: 'none',
                      color: '#ef4444',
                      cursor: 'pointer',
                      borderRadius: '4px',
                      transition: 'background-color 0.2s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = '#fef2f2'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link href="/login" style={{
              padding: '0.5rem 1rem',
              color: '#374151',
              textDecoration: 'none',
              fontWeight: '600'
            }}>
              Iniciar sesión
            </Link>
            <Link href="/register" style={{
              padding: '0.5rem 1rem',
              background: '#3b82f6',
              color: 'white',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: '600'
            }}>
              Crear cuenta
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}