'use client';

import { Community } from '@/types/community';
import CommunityCard from './CommunityCard';

interface CommunitiesGridProps {
  communities: Community[];
}

export default function CommunitiesGrid({ communities }: CommunitiesGridProps) {
  if (communities.length === 0) {
    return (
      <div className="no-communities">
        <i className="fas fa-users"></i>
        <h3>No se encontraron comunidades</h3>
        <p>Crea la primera comunidad o ajusta tus filtros de búsqueda</p>
      </div>
    );
  }

  return (
    <div className="communities-grid">
      {communities.map(community => (
        <CommunityCard key={community.id} community={community} />
      ))}
    </div>
  );
}