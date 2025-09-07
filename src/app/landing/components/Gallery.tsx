'use client';

export default function Gallery() {
  const screenshots = [
    {
      id: 1,
      title: "Interfaz Principal",
      description: "Dashboard moderno y intuitivo",
      emoji: "🎛️"
    },
    {
      id: 2,
      title: "Reproductor 4K", 
      description: "Calidad de cine en tu navegador",
      emoji: "🎬"
    },
    {
      id: 3,
      title: "Panel de Creador",
      description: "Gestiona tu contenido fácilmente",
      emoji: "📊"
    },
    {
      id: 4,
      title: "Recomendaciones IA",
      description: "Descubre contenido personalizado",
      emoji: "🤖"
    }
  ];

  return (
    <section className="gallery-section animate-on-scroll">
      <div className="container">
        <h2 className="section-title">Descubre la Experiencia de Vryno</h2>
        <div className="gallery-grid">
          {screenshots.map((item) => (
            <div key={item.id} className="gallery-item">
              <div className="gallery-image">
                <div className="image-placeholder">
                  <span className="image-emoji">{item.emoji}</span>
                  <div className="image-overlay">
                    <span className="view-text">Ver Demo</span>
                  </div>
                </div>
              </div>
              <div className="gallery-info">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}