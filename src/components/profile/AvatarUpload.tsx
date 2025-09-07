'use client';

import { useRef } from 'react';

interface AvatarUploadProps {
  currentAvatar: string;
  onAvatarChange: (file: File) => void;
  size?: 'sm' | 'md' | 'lg';
}

export default function AvatarUpload({ currentAvatar, onAvatarChange, size = 'md' }: AvatarUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file.type.startsWith('image/')) {
      onAvatarChange(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div style={{ position: 'relative', cursor: 'pointer' }} onClick={handleClick}>
      <div style={{
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        background: currentAvatar.startsWith('http') 
          ? `url(${currentAvatar}) center/cover` 
          : 'linear-gradient(135deg, #8b5cf6, #ec4899)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '3rem',
        fontWeight: 'bold'
      }}>
        {!currentAvatar.startsWith('http') && '👤'}
      </div>

      <div style={{
        position: 'absolute',
        bottom: '5px',
        right: '5px',
        background: '#3b82f6',
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '3px solid white'
      }}>
        ✏️
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileSelect(file);
        }}
      />
    </div>
  );
}