// components/profile/ProfileHeader.tsx
"use client";

import { useState, useRef } from 'react';
import SubscribeButton from './SubscribeButton';
import EditProfileModal from './EditProfileModal';
import AvatarUpload from './AvatarUpload';
import ProfileStats from './ProfileStats';
import SocialLinks from './SocialLinks';
import { UserProfile } from '@/types';
interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  banner: string;
  bio: string;
  location: string;
  website: string;
  joinDate: Date;
  subscribers: number;
  videos: number;
  totalViews: number;
  totalLikes: number;
  isVerified: boolean;
  isSubscribed: boolean;
  isOwnProfile: boolean;
  socialLinks?: {
    twitter?: string;
    instagram?: string;
    tiktok?: string;
    youtube?: string;
  };
}

interface ProfileHeaderProps {
  user: User;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(user);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProfileUpdate = (updatedData: Partial<User>) => {
    setCurrentUser(prev => ({ ...prev, ...updatedData }));
  };

  const handleBannerChange = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      handleProfileUpdate({ banner: e.target?.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleAvatarChange = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      handleProfileUpdate({ avatar: e.target?.result as string });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Banner con opción de edición */}
      <div style={{
        height: '300px',
        background: currentUser.banner.startsWith('http') 
          ? `url(${currentUser.banner}) center/cover` 
          : `linear-gradient(135deg, ${currentUser.banner || '#3b82f6'}, #60a5fa)`,
        position: 'relative'
      }}>
        {currentUser.isOwnProfile && (
          <>
            <button 
              onClick={() => fileInputRef.current?.click()}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                padding: '0.5rem 1rem',
                background: 'rgba(0,0,0,0.6)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              🎨 Cambiar banner
            </button>
            
            <button 
              onClick={() => setIsEditing(true)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '8rem',
                padding: '0.5rem 1rem',
                background: 'rgba(0,0,0,0.6)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              ✏️ Editar perfil
            </button>
          </>
        )}
      </div>

      {/* Input oculto para banner */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleBannerChange(file);
        }}
      />

      {/* Contenido sobrepuesto */}
      <div style={{
        position: 'absolute',
        bottom: '-100px',
        left: '2rem',
        right: '2rem',
        display: 'flex',
        alignItems: 'flex-end',
        gap: '2rem'
      }}>
        {/* Avatar editable */}
        <div style={{
          width: '160px',
          height: '160px',
          borderRadius: '50%',
          background: 'white',
          padding: '4px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          position: 'relative'
        }}>
          {currentUser.isOwnProfile ? (
            <AvatarUpload
              currentAvatar={currentUser.avatar}
              onAvatarChange={handleAvatarChange}
              size="lg"
            />
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: currentUser.avatar.startsWith('http') 
                ? `url(${currentUser.avatar}) center/cover` 
                : 'linear-gradient(135deg, #8b5cf6, #ec4899)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '3rem',
              fontWeight: 'bold'
            }}>
              {!currentUser.avatar.startsWith('http') && currentUser.displayName.charAt(0)}
            </div>
          )}
        </div>

        {/* Información del usuario */}
        <div style={{ flex: 1, marginBottom: '1rem', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.7)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
            <h1 style={{ 
              fontSize: '2rem', 
              fontWeight: 'bold', 
            }}>
              {currentUser.displayName}
            </h1>
            {currentUser.isVerified && (
              <span style={{ 
                background: '#3b82f6', 
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                fontSize: '0.8rem',
                fontWeight: '600'
              }}>
                ✓ Verificado
              </span>
            )}
          </div>

          <p style={{ 
            opacity: 0.9,
            marginBottom: '0.5rem',
            fontSize: '1.1rem'
          }}>
            @{currentUser.username}
          </p>

          {currentUser.bio && (
            <p style={{ 
              opacity: 0.8,
              marginBottom: '1rem',
              fontStyle: 'italic'
            }}>
              {currentUser.bio}
            </p>
          )}

          {currentUser.location && (
            <p style={{ 
              opacity: 0.8,
              marginBottom: '1rem'
            }}>
              📍 {currentUser.location}
            </p>
          )}

          {/* Stats mejorados */}
          <ProfileStats stats={{
            followers: currentUser.subscribers,
            videos: currentUser.videos,
            views: currentUser.totalViews,
            likes: currentUser.totalLikes
          }} />

          {/* Social Links */}
          {currentUser.socialLinks && (
            <div style={{ marginTop: '1rem' }}>
              <SocialLinks socialLinks={currentUser.socialLinks} />
            </div>
          )}
        </div>

        {/* Botones de acción */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          {!currentUser.isOwnProfile ? (
            <>
              <SubscribeButton 
                channelId={currentUser.id}
                isSubscribed={currentUser.isSubscribed}
                subscriberCount={currentUser.subscribers}
              />
              
              <button style={{
                padding: '0.75rem 1.5rem',
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                backdropFilter: 'blur(10px)'
              }}>
                💬 Mensaje
              </button>
            </>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              style={{
                padding: '0.75rem 1.5rem',
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                backdropFilter: 'blur(10px)'
              }}
            >
              ✏️ Editar perfil
            </button>
          )}

          <button style={{
            padding: '0.75rem',
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '8px',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)'
          }}>
            ⋮
          </button>
        </div>
      </div>

      {/* Modal de edición */}
      {isEditing && (
        <EditProfileModal 
          user={currentUser}
          onClose={() => setIsEditing(false)}
          onSave={handleProfileUpdate}
        />
      )}
    </div>
  );
}