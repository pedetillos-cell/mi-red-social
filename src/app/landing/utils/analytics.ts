// src/app/landing/utils/analytics.ts
export const trackEvent = (action: string, category: string, label?: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
    });
  }
};

// Eventos específicos para VRYNO
export const AnalyticsEvents = {
  // Navegación
  NAVIGATION: 'navigation',
  BUTTON_CLICK: 'button_click',
  
  // Engagement
  VIDEO_PLAY: 'video_play',
  FORM_SUBMIT: 'form_submit',
  
  // Conversiones
  SIGNUP: 'signup',
  UPLOAD: 'upload',
  
  // Categorías
  LANDING_PAGE: 'landing_page',
  VIDEO: 'video',
  AUTH: 'authentication',
  CONTENT: 'content'
};