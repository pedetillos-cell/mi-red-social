'use client';

interface SocialLinksProps {
  socialLinks: {
    twitter?: string;
    instagram?: string;
    tiktok?: string;
    youtube?: string;
  };
}

export default function SocialLinks({ socialLinks }: SocialLinksProps) {
  const socialPlatforms = [
    { key: 'twitter', icon: '🐦', label: 'Twitter' },
    { key: 'instagram', icon: '📸', label: 'Instagram' },
    { key: 'tiktok', icon: '🎵', label: 'TikTok' },
    { key: 'youtube', icon: '▶️', label: 'YouTube' }
  ];

  return (
    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
      {socialPlatforms.map(platform => {
        const url = socialLinks[platform.key as keyof typeof socialLinks];
        if (!url) return null;

        return (
          <a
            key={platform.key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '0.5rem',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '8px',
              textDecoration: 'none',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>{platform.icon}</span>
            <span style={{ fontSize: '0.9rem' }}>{platform.label}</span>
          </a>
        );
      })}
    </div>
  );
}