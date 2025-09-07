'use client';

import { useState } from 'react';

interface CreateCommunityModalProps {
  onClose: () => void;
}

export default function CreateCommunityModal({ onClose }: CreateCommunityModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    isPublic: true,
    tags: [] as string[],
    rules: [''] as string[]
  });

  const [currentTag, setCurrentTag] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para crear comunidad
    console.log('Creando comunidad:', formData);
    onClose();
  };

  const addTag = () => {
    if (currentTag && !formData.tags.includes(currentTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag]
      }));
      setCurrentTag('');
    }
  };

  const addRule = () => {
    setFormData(prev => ({
      ...prev,
      rules: [...prev.rules, '']
    }));
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const updateRule = (index: number, value: string) => {
    const newRules = [...formData.rules];
    newRules[index] = value;
    setFormData(prev => ({ ...prev, rules: newRules }));
  };

  const removeRule = (index: number) => {
    setFormData(prev => ({
      ...prev,
      rules: prev.rules.filter((_, i) => i !== index)
    }));
  };

  return (
    <div style={modalOverlayStyle} onClick={onClose}>
      <div style={modalContentStyle} onClick={e => e.stopPropagation()}>
        <div style={modalHeaderStyle}>
          <h2 style={modalTitleStyle}>Crear Nueva Comunidad</h2>
          <button style={closeButtonStyle} onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Nombre de la comunidad *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Ej: Gamers Unidos"
              style={inputStyle}
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Descripción *</label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe el propósito de tu comunidad..."
              style={textareaStyle}
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Categoría *</label>
            <select
              required
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              style={selectStyle}
            >
              <option value="">Seleccionar categoría</option>
              <option value="Gaming">Gaming</option>
              <option value="Tecnología">Tecnología</option>
              <option value="Música">Música</option>
              <option value="Deportes">Deportes</option>
              <option value="Educación">Educación</option>
              <option value="Creatividad">Creatividad</option>
            </select>
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Etiquetas</label>
            <div style={tagsInputStyle}>
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="Añadir etiqueta..."
                style={inputStyle}
              />
              <button type="button" onClick={addTag} style={addTagButtonStyle}>
                <i className="fas fa-plus"></i>
              </button>
            </div>
            <div style={tagsListStyle}>
              {formData.tags.map(tag => (
                <span key={tag} style={tagStyle}>
                  #{tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    style={removeTagButtonStyle}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Reglas de la comunidad</label>
            {formData.rules.map((rule, index) => (
              <div key={index} style={ruleInputStyle}>
                <input
                  type="text"
                  value={rule}
                  onChange={(e) => updateRule(index, e.target.value)}
                  placeholder={`Regla ${index + 1}...`}
                  style={inputStyle}
                />
                {formData.rules.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeRule(index)}
                    style={removeRuleButtonStyle}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addRule} style={addRuleButtonStyle}>
              <i className="fas fa-plus"></i> Añadir regla
            </button>
          </div>

          <div style={formGroupStyle}>
            <label style={checkboxLabelStyle}>
              <input
                type="checkbox"
                checked={formData.isPublic}
                onChange={(e) => setFormData(prev => ({ ...prev, isPublic: e.target.checked }))}
                style={checkboxStyle}
              />
              Comunidad pública (cualquiera puede unirse)
            </label>
          </div>

          <div style={formActionsStyle}>
            <button type="button" onClick={onClose} style={secondaryButtonStyle}>
              Cancelar
            </button>
            <button type="submit" style={primaryButtonStyle}>
              <i className="fas fa-plus"></i>
              Crear Comunidad
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Estilos para el modal
const modalOverlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  padding: '2rem'
};

const modalContentStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '24px',
  padding: '2.5rem',
  width: '100%',
  maxWidth: '600px',
  maxHeight: '90vh',
  overflowY: 'auto'
};

const modalHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '2rem'
};

const modalTitleStyle: React.CSSProperties = {
  fontSize: '1.8rem',
  fontWeight: 700,
  margin: 0,
  color: 'white'
};

const closeButtonStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: 'rgba(255, 255, 255, 0.7)',
  fontSize: '1.5rem',
  cursor: 'pointer',
  padding: '0.5rem',
  borderRadius: '8px'
};

const formStyle: React.CSSProperties = {
  padding: 0
};

const formGroupStyle: React.CSSProperties = {
  marginBottom: '1.5rem'
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '0.5rem',
  fontWeight: 600,
  color: 'rgba(255, 255, 255, 0.9)'
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '1rem',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '12px',
  background: 'rgba(255, 255, 255, 0.05)',
  color: 'white',
  fontSize: '1rem'
};

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  resize: 'vertical',
  minHeight: '100px'
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  cursor: 'pointer'
};

const tagsInputStyle: React.CSSProperties = {
  display: 'flex',
  gap: '0.5rem',
  marginBottom: '0.5rem'
};

const addTagButtonStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, #ff0050, #9146ff)',
  border: 'none',
  borderRadius: '8px',
  padding: '0 1rem',
  color: 'white',
  cursor: 'pointer',
  minWidth: '50px'
};

const tagsListStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem'
};

const tagStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.1)',
  padding: '0.5rem 1rem',
  borderRadius: '15px',
  fontSize: '0.9rem',
  color: 'rgba(255, 255, 255, 0.8)',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem'
};

const removeTagButtonStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: 'rgba(255, 255, 255, 0.5)',
  cursor: 'pointer',
  padding: '0.25rem',
  borderRadius: '4px'
};

const ruleInputStyle: React.CSSProperties = {
  display: 'flex',
  gap: '0.5rem',
  marginBottom: '0.5rem'
};

const removeRuleButtonStyle: React.CSSProperties = {
  ...removeTagButtonStyle,
  background: 'rgba(255, 0, 80, 0.2)',
  minWidth: '40px'
};

const addRuleButtonStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px dashed rgba(255, 255, 255, 0.2)',
  color: 'rgba(255, 255, 255, 0.7)',
  padding: '0.5rem 1rem',
  borderRadius: '8px',
  cursor: 'pointer',
  marginTop: '0.5rem',
  width: '100%'
};

const checkboxLabelStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  cursor: 'pointer'
};

const checkboxStyle: React.CSSProperties = {
  width: '18px',
  height: '18px',
  cursor: 'pointer'
};

const formActionsStyle: React.CSSProperties = {
  display: 'flex',
  gap: '1rem',
  marginTop: '2rem'
};

const primaryButtonStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, #ff0050, #9146ff)',
  color: 'white',
  border: 'none',
  padding: '1rem 2rem',
  borderRadius: '12px',
  fontSize: '1rem',
  fontWeight: 600,
  cursor: 'pointer',
  flex: 2
};

const secondaryButtonStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.1)',
  color: 'white',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  padding: '1rem 2rem',
  borderRadius: '12px',
  fontSize: '1rem',
  fontWeight: 600,
  cursor: 'pointer',
  flex: 1
};