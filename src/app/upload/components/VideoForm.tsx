'use client';

import { useState } from 'react';
import { VideoStorage } from '@/lib/storage';
import { useAuth } from '@/contexts/AuthContext';

interface VideoFormProps {
  videoUrl: string;
  thumbnailUrl?: string;
  onSuccess: (videoId: string) => void;
  onError: (error: string) => void;
}

const categories = [
  'Gaming',
  'Tecnología',
  'Educación',
  'Entretenimiento',
  'Música',
  'Deportes',
  'Cocina',
  'Viajes',
  'Belleza',
  'Fitness',
  'Otro'
];

export default function VideoForm({ 
  videoUrl, 
  thumbnailUrl, 
  onSuccess, 
  onError 
}: VideoFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tags: '',
    isPublic: true,
  });
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verificación robusta del usuario
    if (!user || !user.id) {
      onError('Debes iniciar sesión para subir videos');
      return;
    }

    if (!formData.title || !formData.category) {
      onError('El título y la categoría son obligatorios');
      return;
    }

    setIsSubmitting(true);

    try {
      let finalThumbnailUrl = thumbnailUrl;

      // Subir thumbnail si se seleccionó uno nuevo
      if (thumbnailFile) {
        finalThumbnailUrl = await VideoStorage.uploadThumbnail(thumbnailFile, user.id);
      }

      // Crear el video en la base de datos
      const video = await VideoStorage.createVideo({
        title: formData.title,
        description: formData.description,
        videoUrl,
        thumbnailUrl: finalThumbnailUrl || '', // ← Añadir fallback para string vacío
        duration: 0, // Esto se calcularía con FFmpeg en producción
        views: 0,
        likes: 0,
        userId: user.id,
        category: formData.category,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        isPublic: formData.isPublic,
      });

      onSuccess(video.id);

    } catch (error) {
      console.error('Error creating video:', error);
      onError(error instanceof Error ? error.message : 'Error al crear el video');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar que sea una imagen
      if (!file.type.startsWith('image/')) {
        onError('Por favor selecciona un archivo de imagen válido');
        return;
      }
      
      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        onError('La miniatura no puede ser mayor a 5MB');
        return;
      }
      
      setThumbnailFile(file);
    }
  };

  return (
    <div className="video-form-container">
      <div className="video-form">
        <h2>Detalles del Video</h2>
        <p className="form-subtitle">Completa la información de tu video</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-section">
              <div className="form-group">
                <label htmlFor="title">Título del Video *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Ej: Mi increíble tutorial en 4K..."
                  maxLength={100}
                  disabled={isSubmitting}
                />
                <div className="char-count">{formData.title.length}/100 caracteres</div>
              </div>

              <div className="form-group">
                <label htmlFor="description">Descripción</label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe tu video para que más personas lo encuentren..."
                  maxLength={5000}
                  disabled={isSubmitting}
                />
                <div className="char-count">{formData.description.length}/5000 caracteres</div>
              </div>

              <div className="form-group">
                <label htmlFor="category">Categoría *</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                >
                  <option value="">Seleccionar categoría</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="tags">Etiquetas</label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="react, tutorial, programación"
                  disabled={isSubmitting}
                />
                <div className="help-text">Separa las etiquetas con comas</div>
              </div>
            </div>

            <div className="form-section">
              <div className="form-group">
                <label>Vista Previa del Video</label>
                <div className="video-preview">
                  <video 
                    src={videoUrl} 
                    controls 
                    className="preview-player"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Miniatura Personalizada</label>
                <div className="thumbnail-upload">
                  <input
                    type="file"
                    id="thumbnail"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="hidden"
                    disabled={isSubmitting}
                  />
                  <label htmlFor="thumbnail" className="thumbnail-btn">
                    <i className="fas fa-upload"></i>
                    {thumbnailFile ? 'Cambiar miniatura' : 'Seleccionar miniatura'}
                  </label>
                  
                  {thumbnailFile && (
                    <div className="thumbnail-preview">
                      <img 
                        src={URL.createObjectURL(thumbnailFile)} 
                        alt="Vista previa de miniatura" 
                      />
                      <button
                        type="button"
                        onClick={() => setThumbnailFile(null)}
                        className="remove-thumbnail"
                        disabled={isSubmitting}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  )}
                </div>
                <div className="help-text">Recomendado: 1280x720 px, máximo 5MB</div>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="isPublic"
                    checked={formData.isPublic}
                    onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                    disabled={isSubmitting}
                  />
                  <span>Video público 🌎</span>
                </label>
                <div className="help-text">
                  Los videos públicos son visibles para todos los usuarios de Vryno
                </div>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="btn-secondary"
              onClick={() => window.history.back()}
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={isSubmitting || !formData.title || !formData.category}
            >
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Publicando...
                </>
              ) : (
                <>
                  <i className="fas fa-upload"></i>
                  Publicar Video
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}