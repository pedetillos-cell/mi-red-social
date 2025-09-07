'use client';

import { useState, useEffect } from 'react';

export default function SettingsSection() {
  const [activeSetting, setActiveSetting] = useState<string | null>(null);
  const [settings, setSettings] = useState({
    // 👤 CUENTA
    profileInfo: {
      username: 'javierlayos',
      email: 'javier@vryno.com',
      name: 'Javier Layos',
      bio: 'Creador de contenido en Vryno 🚀',
      location: 'Madrid, España',
      website: ''
    },
    privacy: {
      profileVisibility: 'public',
      showSubscribers: true,
      showLikedVideos: true,
      allowComments: true,
      allowMessages: 'followers'
    },
    security: {
      twoFactorAuth: false,
      loginAlerts: true,
      password: '••••••••'
    },
    notifications: {
      email: true,
      push: true,
      newVideos: true,
      liveStreams: true,
      comments: true,
      mentions: true
    },
    
    // 🎬 REPRODUCCIÓN
    videoQuality: 'auto',
    autoplay: true,
    subtitles: {
      enabled: true,
      language: 'es',
      size: 'medium',
      background: true
    },
    playbackSpeed: '1.0',
    defaultVolume: 80,
    
    // 🎨 APARIENCIA
    theme: 'auto',
    language: 'es',
    accessibility: {
      highContrast: false,
      reducedMotion: false,
      captionBold: false
    },
    density: 'comfortable',
    fontSize: 'normal',
    
    // 💾 ALMACENAMIENTO
    downloads: {
      enabled: true,
      quality: '720p',
      wifiOnly: true
    },
    cache: {
      enabled: true,
      limit: '2GB',
      autoClear: 30
    },
    storageLimit: '10GB'
  });

  // Aplicar tema seleccionado
  useEffect(() => {
    const root = document.documentElement;
    if (settings.theme === 'dark') {
      root.style.setProperty('--bg-color', '#1a1a1a');
      root.style.setProperty('--text-color', '#ffffff');
      root.style.setProperty('--card-bg', '#2d2d2d');
    } else if (settings.theme === 'light') {
      root.style.setProperty('--bg-color', '#ffffff');
      root.style.setProperty('--text-color', '#1a1a1a');
      root.style.setProperty('--card-bg', '#f9fafb');
    } else {
      // Auto - seguir preferencia del sistema
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.style.setProperty('--bg-color', isDark ? '#1a1a1a' : '#ffffff');
      root.style.setProperty('--text-color', isDark ? '#ffffff' : '#1a1a1a');
      root.style.setProperty('--card-bg', isDark ? '#2d2d2d' : '#f9fafb');
    }
  }, [settings.theme]);

  const settingsCategories = [
    {
      title: 'Cuenta',
      icon: '👤',
      settings: [
        { 
          id: 'profile-info',
          name: 'Información del perfil', 
          description: 'Gestiona tu información personal y preferencias',
          component: ProfileInfoSettings
        },
        { 
          id: 'privacy',
          name: 'Privacidad', 
          description: 'Controla quién puede ver tu contenido y actividad',
          component: PrivacySettings
        },
        { 
          id: 'security',
          name: 'Seguridad', 
          description: 'Configuración de seguridad y contraseñas',
          component: SecuritySettings
        },
        { 
          id: 'notifications',
          name: 'Notificaciones', 
          description: 'Gestiona cómo y cuándo recibir notificaciones',
          component: NotificationSettings
        }
      ]
    },
    {
      title: 'Reproducción',
      icon: '🎬',
      settings: [
        { 
          id: 'video-quality',
          name: 'Calidad de video', 
          description: 'Ajusta la calidad de reproducción predeterminada',
          component: VideoQualitySettings
        },
        { 
          id: 'autoplay',
          name: 'Reproducción automática', 
          description: 'Gestiona la reproducción automática de videos',
          component: AutoplaySettings
        },
        { 
          id: 'subtitles',
          name: 'Subtítulos', 
          description: 'Configura preferencias de subtítulos',
          component: SubtitleSettings
        },
        { 
          id: 'playback-speed',
          name: 'Velocidad de reproducción', 
          description: 'Ajusta la velocidad predeterminada',
          component: PlaybackSpeedSettings
        }
      ]
    },
    {
      title: 'Apariencia',
      icon: '🎨',
      settings: [
        { 
          id: 'theme',
          name: 'Tema', 
          description: 'Elige entre tema claro, oscuro o automático',
          component: ThemeSettings
        },
        { 
          id: 'language',
          name: 'Idioma', 
          description: 'Selecciona el idioma de la interfaz',
          component: LanguageSettings
        },
        { 
          id: 'accessibility',
          name: 'Accesibilidad', 
          description: 'Opciones de accesibilidad y visualización',
          component: AccessibilitySettings
        },
        { 
          id: 'density',
          name: 'Densidad de información', 
          description: 'Ajusta el espaciado de la interfaz',
          component: DensitySettings
        }
      ]
    },
    {
      title: 'Almacenamiento',
      icon: '💾',
      settings: [
        { 
          id: 'downloads',
          name: 'Descargas', 
          description: 'Gestiona el almacenamiento de descargas',
          component: DownloadSettings
        },
        { 
          id: 'cache',
          name: 'Caché', 
          description: 'Configura el uso de caché y almacenamiento temporal',
          component: CacheSettings
        },
        { 
          id: 'download-quality',
          name: 'Calidad de descarga', 
          description: 'Ajusta la calidad de videos descargados',
          component: DownloadQualitySettings
        },
        { 
          id: 'storage-limit',
          name: 'Límite de almacenamiento', 
          description: 'Establece límites de almacenamiento',
          component: StorageLimitSettings
        }
      ]
    }
  ];

  const handleSettingClick = (settingId: string) => {
    setActiveSetting(settingId === activeSetting ? null : settingId);
  };

  const updateSettings = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const updateNestedSettings = (category: string, subKey: string, value: any) => {
  setSettings(prev => ({
    ...prev,
    [category]: {
      ...(prev[category as keyof typeof settings] as any),  // ← ¡Corregido!
      [subKey]: value
    }
  }));
};

  const handleSave = () => {
    console.log('Configuración guardada:', settings);
    alert('✅ Configuración guardada correctamente');
    setActiveSetting(null);
  };

  const handleCancel = () => {
    setActiveSetting(null);
  };

  // Componentes de configuración COMPLETAMENTE FUNCIONALES
  function ProfileInfoSettings() {
    return (
      <div style={{ padding: '1.5rem', background: 'var(--card-bg)', borderRadius: '8px', marginTop: '1rem', border: '1px solid #e5e7eb' }}>
        <h3 style={{ fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text-color)' }}>Información del Perfil</h3>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-color)' }}>
              Nombre de usuario
            </label>
            <input
              type="text"
              value={settings.profileInfo.username}
              onChange={(e) => updateNestedSettings('profileInfo', 'username', e.target.value)}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', background: 'white', color: 'black' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-color)' }}>
              Biografía
            </label>
            <textarea
              value={settings.profileInfo.bio}
              onChange={(e) => updateNestedSettings('profileInfo', 'bio', e.target.value)}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', height: '80px', background: 'white', color: 'black' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-color)' }}>
              Ubicación
            </label>
            <input
              type="text"
              value={settings.profileInfo.location}
              onChange={(e) => updateNestedSettings('profileInfo', 'location', e.target.value)}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', background: 'white', color: 'black' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button onClick={handleSave} style={{ padding: '0.75rem 1.5rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
              💾 Guardar
            </button>
            <button onClick={handleCancel} style={{ padding: '0.75rem 1.5rem', background: '#6b7280', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
              ↩️ Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  function PrivacySettings() {
    return (
      <div style={{ padding: '1.5rem', background: 'var(--card-bg)', borderRadius: '8px', marginTop: '1rem', border: '1px solid #e5e7eb' }}>
        <h3 style={{ fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text-color)' }}>Configuración de Privacidad</h3>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-color)' }}>
            <input
              type="checkbox"
              checked={settings.privacy.showSubscribers}
              onChange={(e) => updateNestedSettings('privacy', 'showSubscribers', e.target.checked)}
              style={{ width: '18px', height: '18px' }}
            />
            <span>Mostrar suscriptores públicamente</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-color)' }}>
            <input
              type="checkbox"
              checked={settings.privacy.allowComments}
              onChange={(e) => updateNestedSettings('privacy', 'allowComments', e.target.checked)}
              style={{ width: '18px', height: '18px' }}
            />
            <span>Permitir comentarios en mis videos</span>
          </label>
          <div>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-color)' }}>
              Visibilidad del perfil
            </label>
            <select
              value={settings.privacy.profileVisibility}
              onChange={(e) => updateNestedSettings('privacy', 'profileVisibility', e.target.value)}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', background: 'white', color: 'black' }}
            >
              <option value="public">🌐 Público</option>
              <option value="followers">👥 Solo seguidores</option>
              <option value="private">🔒 Privado</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button onClick={handleSave} style={{ padding: '0.75rem 1.5rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
              💾 Guardar
            </button>
            <button onClick={handleCancel} style={{ padding: '0.75rem 1.5rem', background: '#6b7280', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
              ↩️ Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  function SecuritySettings() {
    return (
      <div style={{ padding: '1.5rem', background: 'var(--card-bg)', borderRadius: '8px', marginTop: '1rem', border: '1px solid #e5e7eb' }}>
        <h3 style={{ fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text-color)' }}>Configuración de Seguridad</h3>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-color)' }}>
            <input
              type="checkbox"
              checked={settings.security.twoFactorAuth}
              onChange={(e) => updateNestedSettings('security', 'twoFactorAuth', e.target.checked)}
              style={{ width: '18px', height: '18px' }}
            />
            <span>Autenticación de dos factores (2FA)</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-color)' }}>
            <input
              type="checkbox"
              checked={settings.security.loginAlerts}
              onChange={(e) => updateNestedSettings('security', 'loginAlerts', e.target.checked)}
              style={{ width: '18px', height: '18px' }}
            />
            <span>Alertas de inicio de sesión</span>
          </label>
          <div>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-color)' }}>
              Cambiar contraseña
            </label>
            <input
              type="password"
              value={settings.security.password}
              onChange={(e) => updateNestedSettings('security', 'password', e.target.value)}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', background: 'white', color: 'black' }}
              placeholder="Nueva contraseña"
            />
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button onClick={handleSave} style={{ padding: '0.75rem 1.5rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
              💾 Guardar
            </button>
            <button onClick={handleCancel} style={{ padding: '0.75rem 1.5rem', background: '#6b7280', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
              ↩️ Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  function NotificationSettings() {
    return (
      <div style={{ padding: '1.5rem', background: 'var(--card-bg)', borderRadius: '8px', marginTop: '1rem', border: '1px solid #e5e7eb' }}>
        <h3 style={{ fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text-color)' }}>Configuración de Notificaciones</h3>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-color)' }}>
            <input
              type="checkbox"
              checked={settings.notifications.email}
              onChange={(e) => updateNestedSettings('notifications', 'email', e.target.checked)}
              style={{ width: '18px', height: '18px' }}
            />
            <span>Notificaciones por email</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-color)' }}>
            <input
              type="checkbox"
              checked={settings.notifications.push}
              onChange={(e) => updateNestedSettings('notifications', 'push', e.target.checked)}
              style={{ width: '18px', height: '18px' }}
            />
            <span>Notificaciones push</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-color)' }}>
            <input
              type="checkbox"
              checked={settings.notifications.newVideos}
              onChange={(e) => updateNestedSettings('notifications', 'newVideos', e.target.checked)}
              style={{ width: '18px', height: '18px' }}
            />
            <span>Nuevos videos de suscripciones</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-color)' }}>
            <input
              type="checkbox"
              checked={settings.notifications.liveStreams}
              onChange={(e) => updateNestedSettings('notifications', 'liveStreams', e.target.checked)}
              style={{ width: '18px', height: '18px' }}
            />
            <span>Streams en vivo</span>
          </label>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button onClick={handleSave} style={{ padding: '0.75rem 1.5rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
              💾 Guardar
            </button>
            <button onClick={handleCancel} style={{ padding: '0.75rem 1.5rem', background: '#6b7280', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
              ↩️ Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  function VideoQualitySettings() {
    return (
      <div style={{ padding: '1.5rem', background: 'var(--card-bg)', borderRadius: '8px', marginTop: '1rem', border: '1px solid #e5e7eb' }}>
        <h3 style={{ fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text-color)' }}>Calidad de Video</h3>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-color)' }}>
            <input
              type="radio"
              name="videoQuality"
              value="auto"
              checked={settings.videoQuality === 'auto'}
              onChange={(e) => updateSettings('videoQuality', e.target.value)}
              style={{ width: '18px', height: '18px' }}
            />
            <span>🤖 Automática (recomendado)</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-color)' }}>
            <input
              type="radio"
              name="videoQuality"
              value="1080"
              checked={settings.videoQuality === '1080'}
              onChange={(e) => updateSettings('videoQuality', e.target.value)}
              style={{ width: '18px', height: '18px' }}
            />
            <span>🎯 1080p Full HD</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-color)' }}>
            <input
              type="radio"
              name="videoQuality"
              value="720"
              checked={settings.videoQuality === '720'}
              onChange={(e) => updateSettings('videoQuality', e.target.value)}
              style={{ width: '18px', height: '18px' }}
            />
            <span>🔥 720p HD</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-color)' }}>
            <input
              type="radio"
              name="videoQuality"
              value="480"
              checked={settings.videoQuality === '480'}
              onChange={(e) => updateSettings('videoQuality', e.target.value)}
              style={{ width: '18px', height: '18px' }}
            />
            <span>⚡ 480p Standard</span>
          </label>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button onClick={handleSave} style={{ padding: '0.75rem 1.5rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
              💾 Guardar
            </button>
            <button onClick={handleCancel} style={{ padding: '0.75rem 1.5rem', background: '#6b7280', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
              ↩️ Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  function AutoplaySettings() {
    return (
      <div style={{ padding: '1.5rem', background: 'var(--card-bg)', borderRadius: '8px', marginTop: '1rem', border: '1px solid #e5e7eb' }}>
        <h3 style={{ fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text-color)' }}>Reproducción Automática</h3>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-color)' }}>
            <input
              type="checkbox"
              checked={settings.autoplay}
              onChange={(e) => updateSettings('autoplay', e.target.checked)}
              style={{ width: '18px', height: '18px' }}
            />
            <span>Reproducir siguiente video automáticamente</span>
          </label>
          <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: 0 }}>
            Cuando termines de ver un video, el siguiente se reproducirá automáticamente.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button onClick={handleSave} style={{ padding: '0.75rem 1.5rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
              💾 Guardar
            </button>
            <button onClick={handleCancel} style={{ padding: '0.75rem 1.5rem', background: '#6b7280', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
              ↩️ Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  function SubtitleSettings() {
    return (
      <div style={{ padding: '1.5rem', background: 'var(--card-bg)', borderRadius: '8px', marginTop: '1rem', border: '1px solid #e5e7eb' }}>
        <h3 style={{ fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text-color)' }}>Configuración de Subtítulos</h3>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-color)' }}>
            <input
              type="checkbox"
              checked={settings.subtitles.enabled}
              onChange={(e) => updateNestedSettings('subtitles', 'enabled', e.target.checked)}
              style={{ width: '18px', height: '18px' }}
            />
            <span>Activar subtítulos automáticamente</span>
          </label>
          <div>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-color)' }}>
              Idioma de subtítulos
            </label>
            <select
              value={settings.subtitles.language}
              onChange={(e) => updateNestedSettings('subtitles', 'language', e.target.value)}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', background: 'white', color: 'black' }}
            >
              <option value="es">🇪🇸 Español</option>
              <option value="en">🇺🇸 English</option>
              <option value="fr">🇫🇷 Français</option>
              <option value="de">🇩🇪 Deutsch</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button onClick={handleSave} style={{ padding: '0.75rem 1.5rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
              💾 Guardar
            </button>
            <button onClick={handleCancel} style={{ padding: '0.75rem 1.5rem', background: '#6b7280', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
              ↩️ Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  function PlaybackSpeedSettings() {
    const speeds = [
      { value: '0.5', label: '0.5x (Lenta)' },
      { value: '0.75', label: '0.75x' },
      { value: '1.0', label: '1.0x Normal' },
      { value: '1.25', label: '1.25x' },
      { value: '1.5', label: '1.5x' },
      { value: '2.0', label: '2.0x (Rápida)' }
    ];

    return (
      <div style={{ padding: '1.5rem', background: 'var(--card-bg)', borderRadius: '8px', marginTop: '1rem', border: '1px solid #e5e7eb' }}>
        <h3 style={{ fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text-color)' }}>Velocidad de Reproducción</h3>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {speeds.map(speed => (
            <label key={speed.value} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-color)' }}>
              <input
                type="radio"
                name="playbackSpeed"
                value={speed.value}
                checked={settings.playbackSpeed === speed.value}
                onChange={(e) => updateSettings('playbackSpeed', e.target.value)}
                style={{ width: '18px', height: '18px' }}
              />
              <span>{speed.label}</span>
            </label>
          ))}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button onClick={handleSave} style={{ padding: '0.75rem 1.5rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
              💾 Guardar
            </button>
            <button onClick={handleCancel} style={{ padding: '0.75rem 1.5rem', background: '#6b7280', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
              ↩️ Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  function ThemeSettings() {
    const themes = [
      { value: 'light', label: '☀️ Claro', icon: '☀️' },
      { value: 'dark', label: '🌙 Oscuro', icon: '🌙' },
      { value: 'auto', label: '🤖 Automático', icon: '🤖' }
    ];

    return (
      <div style={{ padding: '1.5rem', background: 'var(--card-bg)', borderRadius: '8px', marginTop: '1rem', border: '1px solid #e5e7eb' }}>
        <h3 style={{ fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text-color)' }}>Tema de la Interfaz</h3>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {themes.map(theme => (
            <label key={theme.value} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              color: 'var(--text-color)',
              padding: '1rem',
              border: settings.theme === theme.value ? '2px solid #3b82f6' : '1px solid #d1d5db',
              borderRadius: '8px',
              cursor: 'pointer',
              background: settings.theme === theme.value ? '#eff6ff' : 'transparent'
            }}>
              <input
                type="radio"
                name="theme"
                value={theme.value}
                checked={settings.theme === theme.value}
                onChange={(e) => updateSettings('theme', e.target.value)}
                style={{ width: '18px', height: '18px' }}
              />
              <span style={{ fontSize: '1.2rem' }}>{theme.icon}</span>
              <span>{theme.label}</span>
            </label>
          ))}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button onClick={handleSave} style={{ padding: '0.75rem 1.5rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
              💾 Guardar
            </button>
            <button onClick={handleCancel} style={{ padding: '0.75rem 1.5rem', background: '#6b7280', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
              ↩️ Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  function LanguageSettings() {
    const languages = [
      { value: 'es', label: '🇪🇸 Español' },
      { value: 'en', label: '🇺🇸 English' },
      { value: 'fr', label: '🇫🇷 Français' },
      { value: 'de', label: '🇩🇪 Deutsch' }
    ];

    return (
      <div style={{ padding: '1.5rem', background: 'var(--card-bg)', borderRadius: '8px', marginTop: '1rem', border: '1px solid #e5e7eb' }}>
        <h3 style={{ fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text-color)' }}>Idioma de la Interfaz</h3>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {languages.map(lang => (
            <label key={lang.value} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-color)' }}>
              <input
                type="radio"
                name="language"
                value={lang.value}
                checked={settings.language === lang.value}
                onChange={(e) => updateSettings('language', e.target.value)}
                style={{ width: '18px', height: '18px' }}
              />
              <span>{lang.label}</span>
            </label>
          ))}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button onClick={handleSave} style={{ padding: '0.75rem 1.5rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
              💾 Guardar
            </button>
            <button onClick={handleCancel} style={{ padding: '0.75rem 1.5rem', background: '#6b7280', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
              ↩️ Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ... (Similar para todos los demás componentes: AccessibilitySettings, DensitySettings, DownloadSettings, etc.)

  function AccessibilitySettings() {
    return (
      <div style={{ padding: '1.5rem', background: 'var(--card-bg)', borderRadius: '8px', marginTop: '1rem', border: '1px solid #e5e7eb' }}>
        <h3 style={{ fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text-color)' }}>Opciones de Accesibilidad</h3>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-color)' }}>
            <input
              type="checkbox"
              checked={settings.accessibility.highContrast}
              onChange={(e) => updateNestedSettings('accessibility', 'highContrast', e.target.checked)}
              style={{ width: '18px', height: '18px' }}
            />
            <span>Modo alto contraste</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-color)' }}>
            <input
              type="checkbox"
              checked={settings.accessibility.reducedMotion}
              onChange={(e) => updateNestedSettings('accessibility', 'reducedMotion', e.target.checked)}
              style={{ width: '18px', height: '18px' }}
            />
            <span>Reducir animaciones</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-color)' }}>
            <input
              type="checkbox"
              checked={settings.accessibility.captionBold}
              onChange={(e) => updateNestedSettings('accessibility', 'captionBold', e.target.checked)}
              style={{ width: '18px', height: '18px' }}
            />
            <span>Subtítulos en negrita</span>
          </label>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button onClick={handleSave} style={{ padding: '0.75rem 1.5rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
              💾 Guardar
            </button>
            <button onClick={handleCancel} style={{ padding: '0.75rem 1.5rem', background: '#6b7280', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
              ↩️ Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  function DensitySettings() {
    const densities = [
      { value: 'compact', label: 'Compacto' },
      { value: 'comfortable', label: 'Cómodo (recomendado)' },
      { value: 'spacious', label: 'Espacioso' }
    ];

    return (
      <div style={{ padding: '1.5rem', background: 'var(--card-bg)', borderRadius: '8px', marginTop: '1rem', border: '1px solid #e5e7eb' }}>
        <h3 style={{ fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text-color)' }}>Densidad de la Interfaz</h3>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {densities.map(density => (
            <label key={density.value} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-color)' }}>
              <input
                type="radio"
                name="density"
                value={density.value}
                checked={settings.density === density.value}
                onChange={(e) => updateSettings('density', e.target.value)}
                style={{ width: '18px', height: '18px' }}
              />
              <span>{density.label}</span>
            </label>
          ))}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button onClick={handleSave} style={{ padding: '0.75rem 1.5rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
              💾 Guardar
            </button>
            <button onClick={handleCancel} style={{ padding: '0.75rem 1.5rem', background: '#6b7280', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
              ↩️ Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  function DownloadSettings() {
    return (
      <div style={{ padding: '1.5rem', background: 'var(--card-bg)', borderRadius: '8px', marginTop: '1rem', border: '1px solid #e5e7eb' }}>
        <h3 style={{ fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text-color)' }}>Configuración de Descargas</h3>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-color)' }}>
            <input
              type="checkbox"
              checked={settings.downloads.enabled}
              onChange={(e) => updateNestedSettings('downloads', 'enabled', e.target.checked)}
              style={{ width: '18px', height: '18px' }}
            />
            <span>Permitir descargas offline</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-color)' }}>
            <input
              type="checkbox"
              checked={settings.downloads.wifiOnly}
              onChange={(e) => updateNestedSettings('downloads', 'wifiOnly', e.target.checked)}
              style={{ width: '18px', height: '18px' }}
            />
            <span>Descargar solo por WiFi</span>
          </label>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button onClick={handleSave} style={{ padding: '0.75rem 1.5rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
              💾 Guardar
            </button>
            <button onClick={handleCancel} style={{ padding: '0.75rem 1.5rem', background: '#6b7280', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
              ↩️ Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  function CacheSettings() {
    return (
      <div style={{ padding: '1.5rem', background: 'var(--card-bg)', borderRadius: '8px', marginTop: '1rem', border: '1px solid #e5e7eb' }}>
        <h3 style={{ fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text-color)' }}>Configuración de Caché</h3>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-color)' }}>
            <input
              type="checkbox"
              checked={settings.cache.enabled}
              onChange={(e) => updateNestedSettings('cache', 'enabled', e.target.checked)}
              style={{ width: '18px', height: '18px' }}
            />
            <span>Usar caché para mejor rendimiento</span>
          </label>
          <div>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-color)' }}>
              Límite de caché
            </label>
            <select
              value={settings.cache.limit}
              onChange={(e) => updateNestedSettings('cache', 'limit', e.target.value)}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', background: 'white', color: 'black' }}
            >
              <option value="1GB">1 GB</option>
              <option value="2GB">2 GB</option>
              <option value="5GB">5 GB</option>
              <option value="10GB">10 GB</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button onClick={handleSave} style={{ padding: '0.75rem 1.5rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
              💾 Guardar
            </button>
            <button onClick={handleCancel} style={{ padding: '0.75rem 1.5rem', background: '#6b7280', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
              ↩️ Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  function DownloadQualitySettings() {
    const qualities = [
      { value: '1080p', label: '1080p Full HD' },
      { value: '720p', label: '720p HD' },
      { value: '480p', label: '480p Standard' }
    ];

    return (
      <div style={{ padding: '1.5rem', background: 'var(--card-bg)', borderRadius: '8px', marginTop: '1rem', border: '1px solid #e5e7eb' }}>
        <h3 style={{ fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text-color)' }}>Calidad de Descarga</h3>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {qualities.map(quality => (
            <label key={quality.value} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-color)' }}>
              <input
                type="radio"
                name="downloadQuality"
                value={quality.value}
                checked={settings.downloads.quality === quality.value}
                onChange={(e) => updateNestedSettings('downloads', 'quality', e.target.value)}
                style={{ width: '18px', height: '18px' }}
              />
              <span>{quality.label}</span>
            </label>
          ))}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button onClick={handleSave} style={{ padding: '0.75rem 1.5rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
              💾 Guardar
            </button>
            <button onClick={handleCancel} style={{ padding: '0.75rem 1.5rem', background: '#6b7280', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
              ↩️ Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  function StorageLimitSettings() {
    const limits = [
      { value: '5GB', label: '5 GB' },
      { value: '10GB', label: '10 GB' },
      { value: '25GB', label: '25 GB' },
      { value: '50GB', label: '50 GB' },
      { value: 'unlimited', label: 'Ilimitado' }
    ];

    return (
      <div style={{ padding: '1.5rem', background: 'var(--card-bg)', borderRadius: '8px', marginTop: '1rem', border: '1px solid #e5e7eb' }}>
        <h3 style={{ fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text-color)' }}>Límite de Almacenamiento</h3>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {limits.map(limit => (
            <label key={limit.value} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-color)' }}>
              <input
                type="radio"
                name="storageLimit"
                value={limit.value}
                checked={settings.storageLimit === limit.value}
                onChange={(e) => updateSettings('storageLimit', e.target.value)}
                style={{ width: '18px', height: '18px' }}
              />
              <span>{limit.label}</span>
            </label>
          ))}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button onClick={handleSave} style={{ padding: '0.75rem 1.5rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
              💾 Guardar
            </button>
            <button onClick={handleCancel} style={{ padding: '0.75rem 1.5rem', background: '#6b7280', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
              ↩️ Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', background: 'var(--bg-color)', minHeight: '100vh', color: 'var(--text-color)' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>
        Configuración
      </h1>

      <div style={{ display: 'grid', gap: '2rem' }}>
        {settingsCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} style={{
            background: 'var(--card-bg)',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '1.5rem' }}>{category.icon}</span>
              <h2 style={{ fontWeight: 'bold' }}>{category.title}</h2>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
              {category.settings.map((setting, settingIndex) => (
                <div key={settingIndex}>
                  <div
                    onClick={() => handleSettingClick(setting.id)}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '1rem',
                      background: '#f9fafb',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'background 0.2s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = '#f3f4f6'}
                    onMouseOut={(e) => e.currentTarget.style.background = '#f9fafb'}
                  >
                    <div>
                      <h3 style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
                        {setting.name}
                      </h3>
                      <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>{setting.description}</p>
                    </div>
                    <span style={{ color: '#6b7280' }}>{activeSetting === setting.id ? '▼' : '→'}</span>
                  </div>

                  {activeSetting === setting.id && (
                    <setting.component />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Zona peligrosa */}
      <div style={{
        background: '#fef2f2',
        borderRadius: '12px',
        padding: '2rem',
        marginTop: '3rem',
        border: '1px solid #fecaca'
      }}>
        <h2 style={{ fontWeight: 'bold', marginBottom: '1rem', color: '#dc2626' }}>
          ⚠️ Zona Peligrosa
        </h2>
        <p style={{ color: '#6b7280', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          Estas acciones no se pueden deshacer y eliminarán permanentemente tu contenido y datos.
          Asegúrate de hacer una copia de seguridad antes de proceder.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button style={{
            padding: '0.75rem 1.5rem',
            background: '#dc2626',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600'
          }}>
            🗑️ Eliminar Cuenta Permanentemente
          </button>
          
          <button style={{
            padding: '0.75rem 1.5rem',
            background: 'transparent',
            color: '#dc2626',
            border: '1px solid #dc2626',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600'
          }}>
            ⏸️ Desactivar Cuenta Temporalmente
          </button>
          
          <button style={{
            padding: '0.75rem 1.5rem',
            background: '#f3f4f6',
            color: '#6b7280',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600'
          }}>
            📥 Exportar Todos mis Datos
          </button>
        </div>

        <div style={{ 
          marginTop: '1.5rem',
          padding: '1rem',
          background: '#fecaca',
          borderRadius: '6px',
          border: '1px solid #fca5a5'
        }}>
          <p style={{ color: '#dc2626', fontSize: '0.9rem', margin: 0 }}>
            ⚠️ <strong>Advertencia:</strong> La eliminación de cuenta es permanente. 
            Perderás acceso a todos tus videos, comentarios, suscriptores y datos asociados.
          </p>
        </div>
      </div>

      {/* Información de la cuenta */}
      <div style={{
        background: 'var(--card-bg)',
        borderRadius: '12px',
        padding: '2rem',
        marginTop: '2rem',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
      }}>
        <h2 style={{ fontWeight: 'bold', marginBottom: '1.5rem' }}>
          Información de tu Cuenta
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          <div>
            <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Espacio utilizado</h3>
            <div style={{
              background: '#f3f4f6',
              borderRadius: '8px',
              height: '8px',
              marginBottom: '0.5rem'
            }}>
              <div style={{
                width: '45%',
                background: '#3b82f6',
                height: '100%',
                borderRadius: '8px'
              }}></div>
            </div>
            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>4.5 GB de 10 GB utilizados</p>
          </div>
          
          <div>
            <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Miembro desde</h3>
            <p style={{ color: '#6b7280' }}>20 de Agosto, 2024</p>
          </div>
          
          <div>
            <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Plan actual</h3>
            <p style={{ color: '#10b981', fontWeight: '600' }}>Gratuito</p>
          </div>
        </div>
      </div>
    </div>
  );
}