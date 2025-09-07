export const ANALYTICS_CONFIG = {
  MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '12098514795',
  ENABLED: process.env.NODE_ENV === 'production', // Solo en producción
};