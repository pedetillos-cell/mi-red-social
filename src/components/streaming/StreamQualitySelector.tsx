'use client';

import { useState, useRef, useEffect } from 'react';

interface QualityOption {
  label: string;
  value: string;
}

interface StreamQualitySelectorProps {
  qualities: QualityOption[];
  selectedQuality: string;
  onQualityChange: (quality: string) => void;
}

export default function StreamQualitySelector({
  qualities,
  selectedQuality,
  onQualityChange
}: StreamQualitySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedOption = qualities.find(q => q.value === selectedQuality) || qualities[0];

  const handleQualitySelect = (quality: string) => {
    onQualityChange(quality);
    setIsOpen(false);
  };

  return (
    <div className="quality-selector" ref={dropdownRef}>
      <button
        className="quality-selector-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="quality-label">
          <i className="fas fa-hd"></i>
          {selectedOption.label}
        </span>
        <i className={`fas ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
      </button>

      {isOpen && (
        <div className="quality-dropdown">
          {qualities.map((quality) => (
            <button
              key={quality.value}
              className={`quality-option ${selectedQuality === quality.value ? 'selected' : ''}`}
              onClick={() => handleQualitySelect(quality.value)}
            >
              <span className="option-label">{quality.label}</span>
              {selectedQuality === quality.value && (
                <i className="fas fa-check"></i>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}