import { SITE_CONFIG } from './config/site.config';

// 🔧 MODO MANTENIMIENTO - Cambiar aquí para activar/desactivar
export const IS_MAINTENANCE_MODE = true;

// 🌐 CONFIGURACIÓN DE LA PLATAFORMA
export const PLATFORM_CONFIG = {
  // Límites de la plataforma
  MAX_FILE_SIZE: 1024 * 1024 * 1024 * 5, // 5GB
  MAX_TITLE_LENGTH: 120,
  MAX_DESCRIPTION_LENGTH: 5000,
  MAX_TAGS_PER_VIDEO: 15,
  MAX_TAG_LENGTH: 25,
  
  // Formatos soportados
  ALLOWED_VIDEO_FORMATS: ['mp4', 'webm', 'mov', 'avi', 'mkv'],
  ALLOWED_THUMBNAIL_FORMATS: ['jpg', 'jpeg', 'png', 'webp'],
  ALLOWED_AUDIO_FORMATS: ['mp3', 'wav', 'ogg', 'aac'],
  
  // Calidades soportadas
  SUPPORTED_RESOLUTIONS: ['360p', '480p', '720p', '1080p', '1440p', '4K', '8K'],
  SUPPORTED_FPS: [24, 30, 48, 60, 120, 240],
  
  // Límites de transmisión
  MAX_LIVE_STREAM_DURATION: 12 * 60 * 60, // 12 horas
  MAX_CONCURRENT_STREAMS: 3,
  MIN_STREAM_BITRATE: 1500,
  MAX_STREAM_BITRATE: 20000,
  
  // Configuración de monetización
  MIN_SUBSCRIBERS_FOR_MONETIZATION: 1000,
  MIN_WATCH_HOURS_FOR_MONETIZATION: 4000,
  REVENUE_SHARE_PERCENTAGE: 0.7, // 70% para el creador
  
  // Configuración de comunidad
  MAX_COMMENT_LENGTH: 1000,
  MAX_BIO_LENGTH: 160,
  MAX_USERNAME_LENGTH: 20,
  MIN_USERNAME_LENGTH: 3,
  
  // Configuración de seguridad
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_ATTEMPTS: 5,
  SESSION_DURATION: 30 * 24 * 60 * 60 * 1000, // 30 días
};

// 🎨 CONFIGURACIÓN DE UI/TEMA
export const UI_CONFIG = {
  THEME: {
    PRIMARY: '#FF0000', // Rojo Vrynoplay
    SECONDARY: '#000000', // Negro
    ACCENT: '#FFFFFF', // Blanco
    SUCCESS: '#00FF00', // Verde
    WARNING: '#FF9900', // Naranja
    ERROR: '#FF0000', // Rojo
  },
  
  BREAKPOINTS: {
    MOBILE: 640,
    TABLET: 768,
    DESKTOP: 1024,
    HD: 1280,
    FULLHD: 1920,
    UHD: 3840,
  },
  
  ANIMATIONS: {
    DURATION: {
      FAST: 150,
      NORMAL: 300,
      SLOW: 500,
    },
    EASING: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

// 📊 CONFIGURACIÓN DE ANALYTICS
export const ANALYTICS_CONFIG = {
  ENABLED: true,
  PROVIDER: 'vrynoplay-analytics', // Nuestro sistema propio
  AUTO_TRACK: true,
  SAMPLE_RATE: 1.0, // 100% de tracking
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutos
};

// 🚀 EXPORTAR CONFIGURACIÓN DEL SITIO
export { SITE_CONFIG };