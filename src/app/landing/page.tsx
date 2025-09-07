'use client'; // ✅ AÑADE ESTA LÍNEA

import Link from 'next/link';
import Testimonials from './components/Testimonials';
import Stats from './components/Stats';
import FAQ from './components/FAQ';
import Animations from './components/Animations';
import Gallery from './components/Gallery';
import VideoDemo from './components/VideoDemo';
import Analytics from './components/Analytics';
import { AnalyticsEvents, trackEvent } from './utils/analytics';
import './landing-styles.css';
import ContactForm from './components/ContactForm';
export default function LandingPage() {
  
  const handleButtonClick = (buttonName: string) => {
    trackEvent('click', AnalyticsEvents.BUTTON_CLICK, buttonName);
  };

  const handleVideoPlay = () => {
    trackEvent('play', AnalyticsEvents.VIDEO_PLAY, 'landing_video');
  };

  return (
    <>
      <Analytics />
      <Animations />
      <div className="landing-container">
        
      
        
        {/* HERO SECTION */}
        <section className="hero-section animate-on-scroll">
          <div className="hero-content">
            <h1 className="hero-title">
              🎬 VRYNO
            </h1>
            <p className="hero-subtitle">
              La plataforma de streaming que revoluciona la forma de ver contenido
            </p>
            <div className="hero-buttons">
              <Link 
                href="/" 
                className="landing-btn landing-btn-primary"
                onClick={() => handleButtonClick('empezar_a_ver')}
              >
                🎬 Entrar a la App
              </Link>
              <Link 
                href="/upload" 
                className="landing-btn landing-btn-secondary"
                onClick={() => handleButtonClick('subir_contenido')}
              >
                📤 Subir Video
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="mockup-player">
              <div className="mockup-screen">
                <div className="playing-content">
                  <span>🎥</span>
                  <p>Contenido en reproducción</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS SECTION */}
        <Stats />

        {/* FEATURES SECTION */}
        <section className="features-section animate-on-scroll">
          <div className="container">
            <h2 className="section-title">¿Por qué elegir VRYNO?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🚀</div>
                <h3>Rendimiento Ultra Rápido</h3>
                <p>Streaming en 4K sin buffering con nuestra tecnología avanzada</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🎯</div>
                <h3>Recomendaciones Inteligentes</h3>
                <p>Algoritmos IA que aprenden de tus gustos y preferencias</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔒</div>
                <h3>Privacidad Garantizada</h3>
                <p>Tus datos siempre protegidos con encriptación end-to-end</p>
              </div>
            </div>
          </div>
        </section>

        {/* VIDEO DEMO SECTION */}
        <VideoDemo />

        {/* TESTIMONIALS SECTION */}
        <Testimonials />

        {/* GALLERY SECTION */}
        <Gallery />

        {/* FAQ SECTION */}
        <FAQ />
<ContactForm />
        {/* CTA SECTION */}
        <section className="cta-section animate-on-scroll">
          <div className="container">
            <h2 className="cta-title">Únete a la revolución del streaming</h2>
            <p className="cta-subtitle">
              Más de 1 millón de creadores ya confían en Vryno
            </p>
            <Link 
              href="/" 
              className="landing-btn landing-btn-primary landing-btn-large"
              onClick={() => handleButtonClick('crear_cuenta')}
            >
              🚀 Comenzar Ahora
            </Link>
          </div>
        </section>

      </div>
    </>
  );
}