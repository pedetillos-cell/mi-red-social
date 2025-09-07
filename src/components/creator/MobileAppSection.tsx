'use client';

export default function MobileAppSection() {
  return (
    <div className="mobile-app">
      <div className="mobile-icon">
        <i className="fas fa-mobile-alt"></i>
      </div>
      <h2 className="mobile-title">App Móvil VRYNO</h2>
      <p className="mobile-description">
        Lleva tu experiencia VRYNO a cualquier lugar con nuestra app móvil. 
        Disfruta de todas las funcionalidades, recibe notificaciones y crea contenido directamente desde tu teléfono.
      </p>
      
      <div className="mobile-features">
        <div className="mobile-feature">
          <div className="feature-icon">
            <i className="fas fa-bolt"></i>
          </div>
          <h4 className="feature-title">PWA</h4>
          <p className="feature-description">App progresiva que funciona en cualquier dispositivo</p>
        </div>
        
        <div className="mobile-feature">
          <div className="feature-icon">
            <i className="fas fa-bell"></i>
          </div>
          <h4 className="feature-title">Notificaciones Push</h4>
          <p className="feature-description">Mantente informado de nuevas interacciones</p>
        </div>
        
        <div className="mobile-feature">
          <div className="feature-icon">
            <i className="fas fa-camera"></i>
          </div>
          <h4 className="feature-title">Cámara Integrada</h4>
          <p className="feature-description">Graba y sube videos directamente desde la app</p>
        </div>
      </div>
      
      <div className="mobile-buttons">
        <button className="btn-download">
          <i className="fab fa-apple"></i>
          <span>App Store</span>
        </button>
        <button className="btn-download">
          <i className="fab fa-google-play"></i>
          <span>Google Play</span>
        </button>
      </div>
    </div>
  );
}