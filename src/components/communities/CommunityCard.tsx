'use client';

import { Community } from '@/types/community';
import Link from 'next/link';

interface CommunityCardProps {
  community: Community;
}

export default function CommunityCard({ community }: CommunityCardProps) {
  return (
    <Link href={`/communities/${community.id}`} className="community-card">
      <div className="card-banner">
        {community.bannerImage ? (
          <img src={community.bannerImage} alt={community.name} />
        ) : (
          <div className="banner-placeholder"></div>
        )}
        <div className="card-overlay">
          <div className="community-stats">
            <span className="stat">
              <i className="fas fa-users"></i>
              {community.membersCount.toLocaleString()}
            </span>
            <span className="stat">
              <i className="fas fa-comment"></i>
              {community.postsCount.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className="card-content">
        <h3 className="community-name">{community.name}</h3>
        <p className="community-description">{community.description}</p>
        
        <div className="community-tags">
          {community.tags.slice(0, 3).map(tag => (
            <span key={tag} className="tag">#{tag}</span>
          ))}
        </div>

        <div className="community-category">
          <span className="category-badge">{community.category}</span>
        </div>
      </div>
    </Link>
  );
}