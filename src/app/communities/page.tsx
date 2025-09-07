'use client';

import { useState } from 'react';
import CommunitiesGrid from '@/components/communities/CommunitiesGrid';
import CreateCommunityModal from '@/components/communities/CreateCommunityModal';

// Datos de ejemplo
const mockCommunities = [
  {
    id: '1',
    name: 'Gamers Unidos',
    description: 'La mejor comunidad para gamers y streamers',
    creatorId: 'user1',
    createdAt: new Date(),
    updatedAt: new Date(),
    membersCount: 12500,
    postsCount: 3421,
    isPublic: true,
    tags: ['gaming', 'streaming', 'esports'],
    rules: ['Respeto mutuo', 'No spam'],
    category: 'Gaming',
    bannerImage: '/banners/gaming.jpg'
  },
  {
    id: '2',
    name: 'Creadores de Contenido',
    description: 'Comunidad para creadores y influencers',
    creatorId: 'user2',
    createdAt: new Date(),
    updatedAt: new Date(),
    membersCount: 8900,
    postsCount: 2156,
    isPublic: true,
    tags: ['content', 'creators', 'influencers'],
    rules: ['Compartir conocimiento', 'Feedback constructivo'],
    category: 'Creatividad',
    bannerImage: '/banners/creators.jpg'
  },
  {
    id: '3',
    name: 'Tecnología Avanzada',
    description: 'Lo último en tecnología e innovación',
    creatorId: 'user3',
    createdAt: new Date(),
    updatedAt: new Date(),
    membersCount: 15600,
    postsCount: 4789,
    isPublic: true,
    tags: ['tech', 'innovation', 'ai'],
    rules: ['Discusiones técnicas', 'Noticias relevantes'],
    category: 'Tecnología',
    bannerImage: '/banners/tech.jpg'
  }
];

export default function CommunitiesPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Gaming', 'Creatividad', 'Tecnología', 'Música', 'Deportes', 'Educación'];

  const filteredCommunities = mockCommunities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         community.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || community.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={pageStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div style={headerContentStyle}>
          <h1 style={titleStyle}>Comunidades VRYNO</h1>
          <p style={subtitleStyle}>Conecta con personas que comparten tus intereses</p>
          
          <div style={headerActionsStyle}>
            <button 
              style={primaryButtonStyle}
              onClick={() => setIsCreateModalOpen(true)}
            >
              <i className="fas fa-plus" style={{marginRight: '0.5rem'}}></i>
              Crear Comunidad
            </button>
          </div>
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <div style={filtersStyle}>
        <div style={searchBoxStyle}>
          <i className="fas fa-search" style={searchIconStyle}></i>
          <input
            type="text"
            placeholder="Buscar comunidades..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={searchInputStyle}
          />
        </div>

        <div style={categoryFiltersStyle}>
          {categories.map(category => (
            <button
              key={category}
              style={{
                ...categoryButtonStyle,
                ...(selectedCategory === category ? activeCategoryButtonStyle : {})
              }}
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'all' ? 'Todas' : category}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de comunidades */}
      <CommunitiesGrid communities={filteredCommunities} />

      {/* Modal de creación */}
      {isCreateModalOpen && (
        <CreateCommunityModal onClose={() => setIsCreateModalOpen(false)} />
      )}

      {/* Estilos inline para evitar errores */}
      <style jsx>{`
        .communities-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%);
        }
      `}</style>
    </div>
  );
}

// Estilos en línea para evitar errores de CSS
const pageStyle: React.CSSProperties = {
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)'
};

const headerStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, #ff0050 0%, #9146ff 100%)',
  padding: '4rem 2rem',
  textAlign: 'center',
  position: 'relative'
};

const headerContentStyle: React.CSSProperties = {
  position: 'relative',
  zIndex: 2
};

const titleStyle: React.CSSProperties = {
  fontSize: '3rem',
  fontWeight: 800,
  marginBottom: '1rem',
  background: 'linear-gradient(135deg, #fff, #ffd700)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent'
};

const subtitleStyle: React.CSSProperties = {
  fontSize: '1.2rem',
  opacity: 0.9,
  marginBottom: '2rem',
  color: 'white'
};

const headerActionsStyle: React.CSSProperties = {
  marginTop: '2rem'
};

const primaryButtonStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, #ff0050, #9146ff)',
  color: 'white',
  border: 'none',
  padding: '1rem 2rem',
  borderRadius: '12px',
  fontSize: '1rem',
  fontWeight: 600,
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  transition: 'all 0.3s ease'
};

const filtersStyle: React.CSSProperties = {
  padding: '2rem',
  background: 'rgba(255, 255, 255, 0.02)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
};

const searchBoxStyle: React.CSSProperties = {
  position: 'relative',
  maxWidth: '400px',
  margin: '0 auto 2rem'
};

const searchIconStyle: React.CSSProperties = {
  position: 'absolute',
  left: '1rem',
  top: '50%',
  transform: 'translateY(-50%)',
  color: 'rgba(255, 255, 255, 0.5)'
};

const searchInputStyle: React.CSSProperties = {
  width: '100%',
  padding: '1rem 1rem 1rem 3rem',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '12px',
  background: 'rgba(255, 255, 255, 0.05)',
  color: 'white',
  fontSize: '1rem'
};

const categoryFiltersStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  gap: '1rem',
  flexWrap: 'wrap'
};

const categoryButtonStyle: React.CSSProperties = {
  padding: '0.75rem 1.5rem',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '25px',
  background: 'rgba(255, 255, 255, 0.05)',
  color: 'rgba(255, 255, 255, 0.8)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  fontSize: '1rem'
};

const activeCategoryButtonStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, #ff0050, #9146ff)',
  color: 'white',
  borderColor: 'transparent'
};