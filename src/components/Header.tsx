import UploadNavButton from './UploadNavButton';

export default function Header() {
  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#1f1f23',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      {/* Logo */}
      <div className="logo">
        <span>🎬</span> VRYNO
      </div>
      
      {/* Navegación */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Otros links de navegación... */}
        <UploadNavButton />
      </nav>
    </header>
  );
}