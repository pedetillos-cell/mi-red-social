'use client';

// 1. IMPORTAR COMPONENTE Y CONFIGURACIÓN DEL MODO MANTENIMIENT
import { IS_MAINTENANCE_MODE, SITE_CONFIG } from '@/lib/constants';
import MaintenanceMode from '@/components/MaintenanceMode';

// 2. IMPORTS ORIGINALES DE TU APP
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RecommendationEngine from '../components/RecommendationEngine';
import { type Video, type UserProfile } from '../lib/algorithm/vrynoX';
import TrendingSection from '../components/sections/TrendingSection';
import SubscriptionsSection from '../components/sections/SubscriptionsSection';
import LibrarySection from '../components/sections/LibrarySection';
import HistorySection from '../components/sections/HistorySection';
import LikesSection from '../components/sections/LikesSection';
import TermsSection from '../components/sections/TermsSection';
import PrivacySection from '../components/sections/PrivacySection';
import SecuritySection from '../components/sections/SecuritySection';
import HowItWorksSection from '../components/sections/HowItWorksSection';
import SettingsSection from '../components/sections/SettingsSection';
import HelpSection from '../components/sections/HelpSection';
import VideoSkeleton from '../components/VideoSkeleton';
import LoginModal from '../components/LoginModal';
import CommentsSection from '@/components/comments/CommentsSection';
import LiveStreamPlayer from '@/components/LiveStreamPlayer';

// Tus videos actuales (MANTENIDOS EXACTAMENTE IGUAL)
const videos = [
  {
    id: '1',
    title: 'Mi primer video en VRYNO! 🎉',
    views: 1250,
    likes: 243,
    createdAt: new Date('2024-08-20'),
    author: { username: 'javierlayos' }
  },
  {
    id: '2', 
    title: 'Tutorial de Next.js completo 💻',
    views: 894599,
    likes: 156299,
    createdAt: new Date('2024-08-18'),
    author: { username: 'saradebarrio' }
  },
  {
    id: '3',
    title: 'Cómo ganar suscriptores rápido 🚀',
    views: 3250,
    likes: 542,
    createdAt: new Date('2024-08-15'),
    author: { username: 'creadorpro' }
  },
  {
    id: '4',
    title: 'Editando videos como profesional 🎬',
    views: 2100,
    likes: 387,
    createdAt: new Date('2024-08-12'),
    author: { username: 'editorpro' }
  },
  {
    id: '5',
    title: 'Streaming en vivo tutorial 📡',
    views: 4800,
    likes: 892,
    createdAt: new Date('2024-08-10'),
    author: { username: 'streamermaster' }
  },
  {
    id: '6',
    title: 'Monetización en redes sociales 💰',
    views: 6700,
    likes: 1245,
    createdAt: new Date('2024-08-05'),
    author: { username: 'finanzasyoutube' }
  },
  {
    id: '7',
    title: 'Cámara y iluminación profesional 📸',
    views: 3200,
    likes: 678,
    createdAt: new Date('2024-08-01'),
    author: { username: 'fotograpro' }
  },
  {
    id: '8',
    title: 'Creando thumbnails que atraen clicks 🎨',
    views: 5600,
    likes: 987,
    createdAt: new Date('2024-07-28'),
    author: { username: 'disenadorart' }
  }
];

// Datos de ejemplo para el motor de recomendaciones
const sampleVideos: Video[] = [
  {
    id: "rec1",
    title: "Tutorial Next.js 14 - Nuevas características",
    views: 15000,
    likes: 1200,
    comments: 150,
    duration: 1250,
    category: "Tecnología",
    author: {
      id: "dev1",
      username: "techmaster",
      subscriberCount: 50000
    },
    engagementRate: 25.8,
    freshness: 95,
    qualityScore: 92
  },
  {
    id: "rec2",
    title: "Cómo optimizar tu perfil de VRYNO",
    views: 8900,
    likes: 845,
    comments: 120,
    duration: 845,
    category: "Educación",
    author: {
      id: "creator2",
      username: "growthhacker",
      subscriberCount: 32000
    },
    engagementRate: 22.3,
    freshness: 88,
    qualityScore: 89
  },
  {
    id: "rec3",
    title: "Los mejores efectos para tus videos",
    views: 12500,
    likes: 1350,
    comments: 210,
    duration: 1120,
    category: "Creatividad",
    author: {
      id: "creator3",
      username: "creativepro",
      subscriberCount: 78000
    },
    engagementRate: 28.7,
    freshness: 92,
    qualityScore: 94
  }
];

const sampleUser: UserProfile = {
  id: "user123",
  watchHistory: [
    {
      videoId: "1",
      watchTime: 85,
      category: "Tecnología",
      timestamp: new Date()
    }
  ],
  subscriptions: ["dev1"],
  likedVideos: ["1"],
  searchHistory: ["next.js tutorial", "react tips"],
  preferredCategories: ["Tecnología", "Programación"],
  averageWatchTime: 75
};

// Estilos mejorados para botones del sidebar
const sidebarButtonStyle = (isActive: boolean) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  padding: '0.8rem 1rem',
  background: isActive ? '#3b82f6' : 'transparent',
  border: 'none',
  borderRadius: '10px',
  cursor: 'pointer',
  fontWeight: '600',
  color: isActive ? 'white' : '#374151',
  transition: 'all 0.2s ease',
  width: '100%',
  textAlign: 'left' as const,
});

export default function Home() {
  // 🚨 VERIFICACIÓN DEL MODO MANTENIMIENTO (LO PRIMERO DENTRO DEL COMPONENTE)
  if (IS_MAINTENANCE_MODE) {
    return <MaintenanceMode />;
  }

  // ... [EL RESTO DE TU CÓDIGO ORIGINAL] ...
  const [recommendations, setRecommendations] = useState<Video[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('inicio');
  const [isLoading, setIsLoading] = useState(true);
  const [showUploadDropdown, setShowUploadDropdown] = useState(false);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const router = useRouter();

  // Simular carga de datos
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setRecommendations(sampleVideos);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleLogoClick = () => {
    router.push('/');
    window.location.reload();
  };

  const handleSidebarClick = (section: string) => {
    setActiveSection(section);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Buscando:", searchQuery);
  };

  const handleUploadClick = (option: string) => {
    console.log("Opción seleccionada:", option);
    // 🎯 REDIRECCIÓN A UPLOAD
    if (typeof window !== 'undefined') {
      if (option === 'video') window.location.href = '/upload';
      else if (option === 'short') window.location.href = '/upload?type=short';
      else if (option === 'live') window.location.href = '/upload?type=live';
    } 
    setShowUploadDropdown(false);
  };

  const handleLogin = (userData: any) => {
    setCurrentUser(userData);
    setShowLoginDropdown(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const renderActiveSection = () => {
    switch(activeSection) {
      case 'trending':
        return <TrendingSection />;
      case 'suscripciones':
        return <SubscriptionsSection />;
      case 'biblioteca':
        return <LibrarySection />;
      case 'historial':
        return <HistorySection />;
      case 'likes':
        return <LikesSection />;
      case 'terminos':
        return <TermsSection />;
      case 'privacidad':
        return <PrivacySection />;
      case 'seguridad':
        return <SecuritySection />;
      case 'como-funciona':
        return <HowItWorksSection />;
      case 'configuracion':
        return <SettingsSection />;
      case 'ayuda':
        return <HelpSection />;
      default:
        return (
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', color: '#1f2937' }}>
              {/* Título vacío como en tu código original */}
            </h1>
            
            {/* Sección de recomendaciones */}
            <section aria-labelledby="recommendations-heading">
              <h2 id="recommendations-heading" style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                marginBottom: '1.5rem',
                color: '#374151'
              }}>
                Recomendaciones para ti
              </h2>
              
              {isLoading ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                  {[...Array(4)].map((_, i) => (
                    <VideoSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <RecommendationEngine 
                  userProfile={sampleUser}
                  videos={sampleVideos}
                />
              )}
            </section>
            
            {/* Tus videos */}
            <section aria-labelledby="your-videos-heading" style={{ marginTop: '3rem' }}>
              <h2 id="your-videos-heading" style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                marginBottom: '1.5rem',
                color: '#374151'
              }}>
                Tus Videos
              </h2>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                gap: '1.5rem' 
              }}>
                {videos.map(video => (
                  <div key={video.id} style={{
                    background: 'white',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }}>
                    <div style={{
                      height: '180px',
                      background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '3rem'
                    }}>
                      ▶️
                    </div>
                    <div style={{ padding: '1rem' }}>
                      <h3 style={{ 
                        fontWeight: 'bold', 
                        marginBottom: '0.5rem',
                        fontSize: '1.1rem',
                        color: '#1f2937'
                      }}>
                        {video.title}
                      </h3>
                      <p style={{ color: '#6b7280', marginBottom: '0.5rem' }}>
                        {video.author.username}
                      </p>
                      <div style={{ display: 'flex', gap: '1rem', color: '#6b7280', fontSize: '0.9rem' }}>
                        <span>{video.views.toLocaleString()} vistas</span>
                        <span>{video.likes.toLocaleString()} likes</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f3f4f6',
      padding: '6rem 2rem 2rem 2rem',
      marginLeft: '250px'
    }}>
      {/* BARRA SUPERIOR CON BÚSQUEDA Y BOTONES */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: '250px',
        right: 0,
        height: '70px',
        background: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        zIndex: 1000
      }}>
        {/* Barra de búsqueda centrada */}
        <form onSubmit={handleSearch} style={{ 
          position: 'absolute', 
          left: '50%', 
          transform: 'translateX(-50%)',
          width: '40%',
          maxWidth: '500px'
        }}>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar videos, canales, categorías..."
              style={{
                width: '100%',
                padding: '0.8rem 1rem 0.8rem 3rem',
                borderRadius: '9999px',
                border: '1px solid #d1d5db',
                fontSize: '1rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}
              aria-label="Buscar contenido"
            />
            <span style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#6b7280'
            }}>🔍</span>
          </div>
        </form>

        {/* Botones de la derecha */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: 'auto' }}>
          {/* Botón Subir con dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowUploadDropdown(!showUploadDropdown)}
              onBlur={() => setTimeout(() => setShowUploadDropdown(false), 200)}
              style={{
                padding: '0.5rem 1rem',
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span>📤</span>
              Subir
              <span>▼</span>
            </button>
            
            {showUploadDropdown && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                background: 'white',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                padding: '0.5rem',
                minWidth: '150px',
                zIndex: 1001,
                marginTop: '0.5rem'
              }}>
                <button
                  onClick={() => handleUploadClick('video')}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = '#f3f4f6'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <span>🎬</span>
                  Subir Video
                </button>
                <button
                  onClick={() => handleUploadClick('short')}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = '#f3f4f6'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <span>📱</span>
                  Crear Short
                </button>
                <button
                  onClick={() => handleUploadClick('live')}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = '#f3f4f6'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <span>🔴</span>
                  Transmitir en Vivo
                </button>
              </div>
            )}
          </div>

          {/* Botón Iniciar Sesión con dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => currentUser ? setShowLoginDropdown(!showLoginDropdown) : setIsLoginModalOpen(true)}
              onBlur={() => setTimeout(() => setShowLoginDropdown(false), 200)}
              style={{
                padding: '0.5rem 1rem',
                background: currentUser ? '#8b5cf6' : '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span>👤</span>
              {currentUser ? currentUser.username : 'Iniciar Sesión'}
              <span>▼</span>
            </button>
            
            {showLoginDropdown && currentUser && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                background: 'white',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                padding: '0.5rem',
                minWidth: '180px',
                zIndex: 1001,
                marginTop: '0.5rem'
              }}>
                <button
                  onClick={handleLogout}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#ef4444'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = '#fef2f2'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <span>🚪</span>
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* LOGO COMO BOTÓN EN LA BARRA LATERAL */}
      <div style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '250px',
        height: '70px',
        background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1001,
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <button
          onClick={handleLogoClick}
          style={{
            background: 'transparent',
            color: 'white',
            border: 'none',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            padding: '1rem',
            borderRadius: '8px',
            transition: 'background 0.2s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
          aria-label="Volver al inicio"
        >
          Vryno
        </button>
      </div>

      {/* BARRA LATERAL IZQUIERDA */}
      <nav style={{
        position: 'fixed',
        left: 0,
        top: '70px',
        width: '250px',
        height: 'calc(100vh - 70px)',
        background: 'white',
        boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
        padding: '2rem 1rem',
        zIndex: 900,
        overflowY: 'auto'
      }} role="navigation" aria-label="Menú principal">
        <h3 style={{
          fontSize: '1.1rem',
          fontWeight: 'bold',
          marginBottom: '2rem',
          color: '#374151',
          padding: '0 1rem'
        }}>Menú Principal</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button 
            onClick={() => handleSidebarClick('inicio')}
            style={sidebarButtonStyle(activeSection === 'inicio')}
            aria-selected={activeSection === 'inicio'}
          >
            <span>🏠</span> Inicio
          </button>
          
          <button 
            onClick={() => handleSidebarClick('trending')}
            style={sidebarButtonStyle(activeSection === 'trending')}
            aria-selected={activeSection === 'trending'}
          >
            <span>🔥</span> Trending
          </button>
          
          <button 
            onClick={() => handleSidebarClick('suscripciones')}
            style={sidebarButtonStyle(activeSection === 'suscripciones')}
            aria-selected={activeSection === 'suscripciones'}
          >
            <span>📺</span> Suscripciones
          </button>
          
          <button 
            onClick={() => handleSidebarClick('biblioteca')}
            style={sidebarButtonStyle(activeSection === 'biblioteca')}
            aria-selected={activeSection === 'biblioteca'}
          >
            <span>📚</span> Biblioteca
          </button>
          
          <button 
            onClick={() => handleSidebarClick('historial')}
            style={sidebarButtonStyle(activeSection === 'historial')}
            aria-selected={activeSection === 'historial'}
          >
            <span>🕒</span> Historial
          </button>
          
          <button 
            onClick={() => handleSidebarClick('likes')}
            style={sidebarButtonStyle(activeSection === 'likes')}
            aria-selected={activeSection === 'likes'}
          >
            <span>👍</span> Videos que me gustan
          </button>
        </div>
        
        <h3 style={{
          fontSize: '1.1rem',
          fontWeight: 'bold',
          margin: '2rem 0 1rem 0',
          color: '#374151',
          padding: '0 1rem'
        }}>Información</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button 
            onClick={() => handleSidebarClick('como-funciona')}
            style={sidebarButtonStyle(activeSection === 'como-funciona')}
            aria-selected={activeSection === 'como-funciona'}
          >
            <span>❓</span> Cómo funciona
          </button>
          
          <button 
            onClick={() => handleSidebarClick('terminos')}
            style={sidebarButtonStyle(activeSection === 'terminos')}
            aria-selected={activeSection === 'terminos'}
          >
            <span>📄</span> Términos de uso
          </button>
          
          <button 
            onClick={() => handleSidebarClick('privacidad')}
            style={sidebarButtonStyle(activeSection === 'privacidad')}
            aria-selected={activeSection === 'privacidad'}
          >
            <span>🔒</span> Privacidad
          </button>
          
          <button 
            onClick={() => handleSidebarClick('seguridad')}
            style={sidebarButtonStyle(activeSection === 'seguridad')}
            aria-selected={activeSection === 'seguridad'}
          >
            <span>🛡️</span> Seguridad
          </button>
        </div>
        
        <h3 style={{
          fontSize: '1.1rem',
          fontWeight: 'bold',
          margin: '2rem 0 1rem 0',
          color: '#374151',
          padding: '0 1rem'
        }}>Configuración</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button 
            onClick={() => handleSidebarClick('configuracion')}
            style={sidebarButtonStyle(activeSection === 'configuracion')}
            aria-selected={activeSection === 'configuracion'}
          >
            <span>⚙️</span> Configuración
          </button>
          
          <button 
            onClick={() => handleSidebarClick('ayuda')}
            style={sidebarButtonStyle(activeSection === 'ayuda')}
            aria-selected={activeSection === 'ayuda'}
          >
            <span>💬</span> Ayuda y soporte
          </button>
        </div>
      </nav>

      {/* CONTENIDO PRINCIPAL */}
      <main role="main">
        {renderActiveSection()}
      </main>

      {/* MODAL DE LOGIN */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />

      <CommentsSection
        videoId="video-123"
        currentUser={{
          id: "user-456",
          name: "Tu Nombre",
          avatar: ""
        }}
      />

      <style jsx global>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}