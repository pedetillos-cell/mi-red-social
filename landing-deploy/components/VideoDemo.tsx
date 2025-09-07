'use client';

import { useState } from 'react';

export default function VideoDemo() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    // Aquí puedes añadir analytics después
    console.log('Video reproducido');
  };

  return (
    <section className="video-section animate-on-scroll">
      <div className="container">
        <h2 className="section-title">Mira Vryno en acción</h2>
        <p className="section-subtitle">
          Descubre cómo nuestra plataforma transforma la experiencia de streaming
        </p>
        
        <div className="video-container">
          {!isPlaying ? (
            <div className="video-placeholder" onClick={handlePlay}>
              <div className="play-button">
                <span className="play-icon">▶</span>
              </div>
              <div className="placeholder-image">
                <div className="demo-screen">
                  <div className="demo-content">
                    <span className="demo-emoji">🎬</span>
                    <p>Video demostrativo</p>
                    <button className="play-promp-btn">
                      Haz clic para reproducir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="video-wrapper">
              {/* Aquí iría el video real - por ahora un placeholder */}
              <div className="real-video-placeholder">
                <div className="playing-demo">
                  <span className="demo-emoji-large">📱</span>
                  <p>Reproduciendo demostración...</p>
                  <div className="video-controls">
                    <button className="control-btn">⏸️</button>
                    <button className="control-btn">🔊</button>
                    <button className="control-btn">↗️</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="video-features">
          <div className="video-feature">
            <span className="feature-badge">🎯</span>
            <h4>Interfaz Intuitiva</h4>
            <p>Navegación sencilla y experiencia de usuario fluida</p>
          </div>
          <div className="video-feature">
            <span className="feature-badge">⚡</span>
            <h4>Rápido y Eficiente</h4>
            <p>Carga instantánea y streaming sin interrupciones</p>
          </div>
          <div className="video-feature">
            <span className="feature-badge">🎨</span>
            <h4>Diseño Moderno</h4>
            <p>Interfaz elegante y completamente personalizable</p>
          </div>
        </div>
      </div>
    </section>
  );
}