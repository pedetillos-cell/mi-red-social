'use client';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Ana García",
      role: "Creadora de Contenido",
      content: "VRYNO ha revolucionado mi forma de conectar con mi audiencia. Las recomendaciones inteligentes son increíbles.",
      avatar: "👩‍🎨"
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      role: "Streamer Profesional",
      content: "La calidad de streaming en 4K es impresionante. Mis seguidores notaron la diferencia inmediatamente.",
      avatar: "🎮"
    },
    {
      id: 3, 
      name: "María López",
      role: "Educadora",
      content: "La plataforma perfecta para compartir contenido educativo. Intuitiva y poderosa.",
      avatar: "👩‍🏫"
    }
  ];

  return (
    <section className="testimonials-section">
      <div className="container">
        <h2 className="section-title">Lo que dicen nuestros creadores</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-avatar">
                {testimonial.avatar}
              </div>
              <p className="testimonial-content">"{testimonial.content}"</p>
              <div className="testimonial-author">
                <h4>{testimonial.name}</h4>
                <p>{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}