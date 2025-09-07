// app/profile/[username]/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProfileHeader from '@/components/profile/ProfileHeader';
import UserVideos from '@/components/profile/UserVideos';
import UserStats from '@/components/profile/UserStats';

interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  banner: string;
  bio: string;
  joinDate: Date;
  subscribers: number;
  videos: number;
  totalViews: number;
  isVerified: boolean;
  isSubscribed: boolean;
  isOwnProfile: boolean;
}

interface Video {
  id: string;
  title: string;
  views: number;
  likes: number;
  thumbnail: string;
  duration: string;
  uploadDate: Date;
}

export default function ProfilePage() {
  const params = useParams();
  const username = params.username as string;
  
  const [userData, setUserData] = useState<User | null>(null);
  const [userVideos, setUserVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos (en una app real, harías fetch a tu API)
    const loadUserData = () => {
      setIsLoading(true);
      
      // Obtener usuario actual del localStorage
      let currentUser = null;
      if (typeof window !== 'undefined') {
        const userData = localStorage.getItem('vryno_current_user');
        if (userData) {
          currentUser = JSON.parse(userData);
        }
      }

      // Verificar si es el perfil propio
      const isOwnProfile = currentUser && currentUser.username === username;

      // Datos de ejemplo (en una app real, estos vendrían de tu API)
      const userDataFromAPI: User = {
        id: '1',
        username: username,
        displayName: 'Javier Layos',
        avatar: '',
        banner: '#3b82f6',
        bio: '🎬 Creador de contenido | 💻 Desarrollador | 🎮 Gamer | Amante de la tecnología y la creatividad. Creando contenido que inspire y entretenga.',
        joinDate: new Date('2024-01-15'),
        subscribers: 1245,
        videos: 28,
        totalViews: 45800,
        isVerified: true,
        isSubscribed: false,
        isOwnProfile: isOwnProfile
      };

      const videosFromAPI: Video[] = [
        {
          id: '1',
          title: 'Mi primer video en VRYNO! 🎉 - Así comenzó todo esta aventura',
          views: 1250,
          likes: 243,
          thumbnail: '/thumbnails/1.jpg',
          duration: '10:25',
          uploadDate: new Date('2024-01-20')
        },
        {
          id: '2', 
          title: 'Tutorial de Next.js completo 💻 - Aprende desde cero',
          views: 8945,
          likes: 1562,
          thumbnail: '/thumbnails/2.jpg',
          duration: '28:15',
          uploadDate: new Date('2024-02-05')
        },
        {
          id: '3',
          title: 'Review del iPhone 15 Pro Max - ¿Vale la pena?',
          views: 3450,
          likes: 512,
          thumbnail: '/thumbnails/3.jpg',
          duration: '15:42',
          uploadDate: new Date('2024-02-18')
        },
        {
          id: '4',
          title: 'Cómo optimizar tu código React - Tips y mejores prácticas',
          views: 6789,
          likes: 987,
          thumbnail: '/thumbnails/4.jpg',
          duration: '22:30',
          uploadDate: new Date('2024-03-02')
        }
      ];

      setUserData(userDataFromAPI);
      setUserVideos(videosFromAPI);
      setIsLoading(false);
    };

    loadUserData();
  }, [username]);

  if (isLoading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: '#f3f4f6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ 
          textAlign: 'center',
          padding: '2rem'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '4px solid #e5e7eb',
            borderTop: '4px solid #3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p style={{ color: '#6b7280' }}>Cargando perfil...</p>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!userData) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: '#f3f4f6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ 
          textAlign: 'center',
          background: 'white',
          padding: '3rem',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>😕</div>
          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            marginBottom: '0.5rem',
            color: '#1f2937'
          }}>
            Usuario no encontrado
          </h2>
          <p style={{ color: '#6b7280' }}>
            El usuario @{username} no existe o ha sido eliminado.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f3f4f6' }}>
      <ProfileHeader user={userData as any} />
      
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '2rem',
        paddingTop: '300px' 
      }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 3fr', 
          gap: '2rem',
          alignItems: 'start'
        }}>
          {/* Sidebar de estadísticas */}
          <div>
            <UserStats user={userData} />
            
            {/* Sección de redes sociales (ejemplo) */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '1.5rem',
              marginTop: '1.5rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
            }}>
              <h3 style={{ 
                fontWeight: 'bold', 
                marginBottom: '1rem',
                color: '#1f2937'
              }}>
                Redes sociales
              </h3>
              
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                <a href="#" style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  color: '#3b82f6',
                  textDecoration: 'none',
                  padding: '0.5rem',
                  borderRadius: '6px',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#f3f4f6'}
                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <span>📘</span> Facebook
                </a>
                <a href="#" style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  color: '#3b82f6',
                  textDecoration: 'none',
                  padding: '0.5rem',
                  borderRadius: '6px',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#f3f4f6'}
                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <span>📸</span> Instagram
                </a>
                <a href="#" style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  color: '#3b82f6',
                  textDecoration: 'none',
                  padding: '0.5rem',
                  borderRadius: '6px',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#f3f4f6'}
                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <span>🐦</span> Twitter
                </a>
                <a href="#" style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  color: '#3b82f6',
                  textDecoration: 'none',
                  padding: '0.5rem',
                  borderRadius: '6px',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#f3f4f6'}
                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <span>🎵</span> TikTok
                </a>
              </div>
            </div>
          </div>

          {/* Contenido principal */}
          <div>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '2rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
            }}>
              <h2 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                marginBottom: '1rem',
                color: '#1f2937'
              }}>
                Biografía
              </h2>
              <p style={{ 
                color: '#6b7280', 
                lineHeight: '1.6',
                whiteSpace: 'pre-line'
              }}>
                {userData.bio}
              </p>
            </div>

            <UserVideos videos={userVideos} />
          </div>
        </div>
      </div>
    </div>
  );
}