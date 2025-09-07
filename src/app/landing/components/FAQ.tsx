'use client';

import { useState } from 'react';

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqItems = [
    {
      id: 1,
      question: "¿Cómo puedo empezar a usar VRYNO?",
      answer: "Solo necesitas crear una cuenta gratuita, personalizar tu perfil y empezar a subir contenido o explorar videos."
    },
    {
      id: 2,
      question: "¿VRYNO es gratuito?",
      answer: "Sí, la plataforma es completamente gratuita para usuarios y creadores. Ofrecemos planes premium con características adicionales."
    },
    {
      id: 3,
      question: "¿Qué tipo de contenido puedo subir?",
      answer: "Puedes subir videos, shorts y hacer transmisiones en vivo. Soportamos formatos HD y 4K."
    },
    {
      id: 4,
      question: "¿Cómo funcionan las recomendaciones?",
      answer: "Usamos inteligencia artificial que analiza tus gustos, historial de visualización y engagement para recomendarte contenido relevante."
    },
    {
      id: 5,
      question: "¿Es seguro mi contenido?",
      answer: "Totalmente. Usamos encriptación end-to-end y sistemas de protección de derechos de autor."
    }
  ];

  const toggleItem = (id: number) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="faq-section">
      <div className="container">
        <h2 className="section-title">Preguntas Frecuentes</h2>
        <div className="faq-grid">
          {faqItems.map((item) => (
            <div key={item.id} className="faq-item">
              <button
                className="faq-question"
                onClick={() => toggleItem(item.id)}
                aria-expanded={openItems.includes(item.id)}
              >
                <span>{item.question}</span>
                <span className="faq-icon">
                  {openItems.includes(item.id) ? '−' : '+'}
                </span>
              </button>
              {openItems.includes(item.id) && (
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}