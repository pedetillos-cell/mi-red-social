'use client';

import { useState } from 'react';
import { AnalyticsEvents, trackEvent } from '../utils/analytics';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envío (luego conectas con tu backend)
    setTimeout(() => {
      trackEvent('submit', AnalyticsEvents.FORM_SUBMIT, 'contact_form');
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Resetear después de 3 segundos
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="contact-section animate-on-scroll">
      <div className="container">
        <h2 className="section-title">¿Necesitas ayuda?</h2>
        <p className="section-subtitle">
          Escríbenos y te responderemos en menos de 24 horas
        </p>
        
        {isSubmitted ? (
          <div className="success-message">
            <span className="success-icon">✅</span>
            <h3>¡Mensaje enviado!</h3>
            <p>Te contactaremos pronto.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Tu nombre completo"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="tu@email.com"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Mensaje</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="¿En qué podemos ayudarte?"
              />
            </div>
            
            <button 
              type="submit" 
              className="landing-btn landing-btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
            </button>
          </form>
        )}
        
        <div className="contact-info">
          <div className="contact-item">
            <span className="contact-icon">📧</span>
            <h4>Email</h4>
            <p>soporte@vryno.com</p>
          </div>
          <div className="contact-item">
            <span className="contact-icon">🕒</span>
            <h4>Horario</h4>
            <p>24/7 Soporte</p>
          </div>
          <div className="contact-item">
            <span className="contact-icon">🌎</span>
            <h4>Global</h4>
            <p>Todo el mundo</p>
          </div>
        </div>
      </div>
    </section>
  );
}