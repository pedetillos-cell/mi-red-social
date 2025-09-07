export default function MaintenanceMode() {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Bienvenido a <span style={styles.highlight}>Vrynoplay</span></h1>
        <p style={styles.message}>Nuestra plataforma está en construcción.</p>
        <p style={styles.subMessage}>Estamos trabajando duro para traerte una experiencia increíble. ¡Vuelve pronto!</p>
        <div style={styles.spinner}></div>
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
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  content: {
    textAlign: 'center' as const,
    color: 'white',
    maxWidth: '600px'
  },
  title: {
    fontSize: '3.5rem',
    fontWeight: 'bold',
    marginBottom: '20px'
  },
  highlight: {
    color: '#FFD700'
  },
  message: {
    fontSize: '1.8rem',
    marginBottom: '15px',
    opacity: 0.9
  },
  subMessage: {
    fontSize: '1.2rem',
    marginBottom: '30px',
    opacity: 0.8
  },
  spinner: {
    border: '4px solid rgba(255, 255, 255, 0.3)',
    borderTop: '4px solid #FFD700',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    animation: 'spin 1s linear infinite',
    margin: '0 auto'
  }
};