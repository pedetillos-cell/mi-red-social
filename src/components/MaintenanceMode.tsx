'use client';

import { SITE_CONFIG } from '@/lib/config/site.config';

export default function MaintenanceMode() {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Logo y título */}
        <div style={styles.header}>
          <h1 style={styles.title}>
            <span style={styles.highlight}>{SITE_CONFIG.name}</span>
          </h1>
          <div style={styles.logoPlaceholder}>🎬</div>
        </div>

        {/* Mensaje principal */}
        <div style={styles.messageContainer}>
          <h2 style={styles.message}>Estamos mejorando la experiencia</h2>
          <p style={styles.subMessage}>
            {SITE_CONFIG.description}
          </p>
        </div>

        {/* Información de contacto */}
        <div style={styles.contactInfo}>
          <h3 style={styles.contactTitle}>Próximamente disponible</h3>
          <p style={styles.contactText}>
            Para más información, contáctanos en:<br />
            <span style={styles.contactEmail}>
              {SITE_CONFIG.contact.email}
            </span>
          </p>
        </div>

        {/* Spinner de carga */}
        <div style={styles.spinnerContainer}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Cargando la revolución del streaming...</p>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <p style={styles.footerText}>
            &copy; {new Date().getFullYear()} {SITE_CONFIG.legal.companyName}
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #FF0000 0%, #990000 100%)',
    padding: '20px',
    fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  content: {
    textAlign: 'center' as const,
    color: 'white',
    maxWidth: '600px',
    background: 'rgba(0, 0, 0, 0.8)',
    padding: '40px',
    borderRadius: '20px',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
  },
  header: {
    marginBottom: '30px'
  },
  title: {
    fontSize: '4rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    background: 'linear-gradient(45deg, #FFFFFF, #FF9999)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent'
  },
  highlight: {
    color: '#FFFFFF'
  },
  logoPlaceholder: {
    fontSize: '4rem',
    marginBottom: '20px'
  },
  messageContainer: {
    marginBottom: '30px'
  },
  message: {
    fontSize: '2.2rem',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#FFFFFF'
  },
  subMessage: {
    fontSize: '1.4rem',
    opacity: 0.9,
    lineHeight: '1.6',
    marginBottom: '20px'
  },
  contactInfo: {
    marginBottom: '30px',
    padding: '20px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '10px'
  },
  contactTitle: {
    fontSize: '1.6rem',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#FFFFFF'
  },
  contactText: {
    fontSize: '1.2rem',
    opacity: 0.9,
    lineHeight: '1.5'
  },
  contactEmail: {
    color: '#FF9999',
    fontWeight: 'bold'
  },
  spinnerContainer: {
    marginBottom: '30px'
  },
  spinner: {
    border: '4px solid rgba(255, 255, 255, 0.3)',
    borderTop: '4px solid #FFFFFF',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 20px'
  },
  loadingText: {
    fontSize: '1.1rem',
    opacity: 0.8
  },
  footer: {
    borderTop: '1px solid rgba(255, 255, 255, 0.2)',
    paddingTop: '20px'
  },
  footerText: {
    fontSize: '0.9rem',
    opacity: 0.7
  }
};