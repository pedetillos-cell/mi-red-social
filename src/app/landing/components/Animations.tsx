'use client';

import { useEffect, useRef } from 'react';

export default function Animations() {
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Solo crear el observer si el usuario no prefiere motion reducido
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-in');
            }, 100); // Pequeño delay para mejor performance
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '50px' // Carga antes de que sea visible
      }
    );

    // Observer solo para elementos visibles
    const elements = document.querySelectorAll('.animate-on-scroll:not(.animate-in)');
    elements.forEach((el) => observer.current?.observe(el));

    return () => {
      elements.forEach((el) => observer.current?.unobserve(el));
      observer.current?.disconnect();
    };
  }, []);

  return null;
}