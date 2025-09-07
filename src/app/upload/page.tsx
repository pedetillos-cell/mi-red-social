'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import LiveStreamPlayer from '../../components/LiveStreamPlayer';
import UploadProgress from './components/UploadProgress';
const searchParams = new URLSearchParams();
// Objeto de estilos en lugar de importar CSS
const styles = {
  uploadPageContainer: "min-h-screen bg-gradient-to-br from-[#667eea] to-[#764ba2] p-5",
  uploadHeader: "text-center py-10",
  headerContent: "max-w-4xl mx-auto",
  uploadTitle: "text-4xl md:text-5xl font-extrabold mb-4",
  titleGradient: "bg-gradient-to-r from-white to-[#e0e7ff] bg-clip-text text-transparent",
  uploadSubtitle: "text-xl text-[#e0e7ff] mb-0",
  uploadCardsGrid: "grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10",
  uploadCard: "bg-white/10 backdrop-blur-md rounded-xl p-6 md:p-8 text-center text-white cursor-pointer transition-all duration-300 border border-white/20 hover:-translate-y-1 hover:shadow-xl",
  videoCard: "hover:border-blue-300",
  shortCard: "hover:border-purple-300", 
  liveCard: "hover:border-red-300",
  cardIcon: "text-4xl mb-4",
  cardBadge: "inline-block bg-white/20 px-3 py-1 rounded-full text-sm mt-2",
  uploadStats: "flex flex-wrap justify-center gap-8 md:gap-10 mb-10",
  statItem: "text-center text-white",
  statNumber: "text-3xl font-bold mb-2",
  statLabel: "text-sm opacity-80",
  
  // Modal styles
  modalOverlay: "fixed inset-0 bg-black/70 flex items-center justify-center z-50 transition-opacity",
  modalOverlayActive: "opacity-100 visible",
  modalOverlayInactive: "opacity-0 invisible",
  modalContent: "bg-white rounded-xl w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto transition-transform",
  modalContentActive: "scale-100",
  modalContentInactive: "scale-90",
  professionalModal: "shadow-2xl",
  modalHeader: "flex justify-between items-center p-6 border-b border-gray-200",
  closeModal: "text-gray-500 hover:text-gray-700 text-xl",
  uploadContent: "p-6",
  uploadSection: "mb-6",
  uploadZone: "border-2 border-dashed border-gray-300 rounded-xl p-8 text-center transition-all cursor-pointer",
  professionalZone: "bg-gray-50 hover:bg-blue-50 hover:border-blue-400",
  uploadIcon: "text-4xl text-gray-400 mb-4",
  supportedFormats: "text-sm text-gray-500 mt-2",
  formSection: "space-y-6",
  formGroup: "flex flex-col",
  formLabel: "font-semibold text-gray-700 mb-2",
  formLabelWithIcon: "flex items-center gap-2 font-semibold text-gray-700 mb-2",
  formInput: "px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none",
  formTextarea: "px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none resize-vertical",
  formSelect: "px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none",
  
  // Thumbnail styles
  thumbnailUploadContainer: "mt-2",
  thumbnailUploadCard: "block border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer transition-all bg-gray-50 hover:bg-blue-50 hover:border-blue-400",
  thumbnailUploadPlaceholder: "text-gray-400",
  btnThumbnailPrimary: "inline-flex items-center gap-2 bg-blue-500 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-600 mt-4",
  thumbnailPreviewContainer: "mt-2",
  thumbnailPreviewCard: "border border-gray-200 rounded-xl overflow-hidden shadow-sm",
  thumbnailPreviewImage: "w-full h-48 object-cover",
  thumbnailActions: "flex gap-3 p-4 bg-gray-50",
  btnThumbnailChange: "inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 cursor-pointer",
  btnThumbnailRemove: "inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-200 border border-gray-300 cursor-pointer",
  thumbnailHelpText: "text-sm text-gray-500 mt-2 leading-relaxed",
  
  // Privacy settings
  privacySettingsCard: "flex flex-col gap-3 mt-2",
  privacyOptionCard: "border border-gray-200 rounded-xl p-4 transition-all cursor-pointer hover:border-blue-400 hover:bg-blue-50",
  privacyOptionHeader: "flex items-start justify-between mb-2",
  privacyRadio: "flex items-start gap-3",
  privacyLabel: "flex flex-col gap-1 cursor-pointer",
  privacyTitle: "font-semibold text-gray-900",
  privacyBadge: "inline-flex items-center gap-1 text-xs px-2 py-1 rounded font-medium",
  publicBadge: "bg-green-100 text-green-800",
  privateBadge: "bg-red-100 text-red-800",
  privacyDescription: "text-sm text-gray-600 ml-7 leading-relaxed",
  visibilityNotice: "flex items-start gap-2 mt-3 p-3 bg-blue-50 rounded-lg text-blue-800 text-sm",
  
  // Modal actions
  modalActions: "flex justify-end gap-3 p-6 border-t border-gray-200",
  btnPrimary: "flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed",
  btnSecondary: "flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 border border-gray-300",
  
  // Progress
  uploadProgress: "mt-5",
  progressHeader: "flex justify-between text-sm mb-2",
  progressBar: "h-2 bg-gray-200 rounded-full overflow-hidden",
  progressFill: "h-full bg-green-500 transition-all",
  progressStats: "flex justify-between text-xs text-gray-500 mt-2",
  
  // Privacy options
  privacyOptions: "flex flex-col gap-3",
  privacyOption: "flex items-start gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50",
  
  // Live notice
  liveNotice: "flex gap-3 p-4 bg-yellow-50 border border-yellow-300 rounded-lg mt-4",
  noticeIcon: "text-xl",
  noticeContent: "flex-1",
  
  // Live stream
  liveStreamContainer: "min-h-screen bg-gray-900",
  stopStreamButton: "fixed bottom-6 left-6 z-50",
  stopButton: "bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full shadow-lg font-semibold flex items-center gap-2",
  
  // Error message
  errorMessage: "mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
};

export default function UploadPage() {
  const [activeModal, setActiveModal] = useState<'video' | 'short' | 'live' | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLiveStreamActive, setIsLiveStreamActive] = useState(false);
  const searchParams = new URLSearchParams();
  
  // Estados para el sistema de video
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [videoTitle, setVideoTitle] = useState<string>('');
  const [videoDescription, setVideoDescription] = useState<string>('');
  const [videoCategory, setVideoCategory] = useState<string>('');
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadStats, setUploadStats] = useState({
    total: 0,
    uploaded: 0,
    speed: 0,
    timeRemaining: 0
  });
  const [isPublic, setIsPublic] = useState(true);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
  // Comentado temporalmente para el build
  setActiveModal('video'); // Valor por defecto
}, []);

  const openModal = (modalType: 'video' | 'short' | 'live') => {
    setActiveModal(modalType);
    setUploadError(null);
  };

  const closeModal = () => {
    setActiveModal(null);
    setIsUploading(false);
    setProgress(0);
    setIsLiveStreamActive(false);
    resetVideoForm();
    setUploadError(null);
  };

  // Funciones para el sistema de video
  const handleVideoFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 500 * 1024 * 1024) {
      setUploadError('El video no puede ser mayor a 500MB');
      return;
    }

    if (!file.type.startsWith('video/')) {
      setUploadError('Por favor selecciona un archivo de video válido');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setUploadStats({
      total: file.size,
      uploaded: 0,
      speed: 0,
      timeRemaining: 0
    });

    // Simular upload
    let uploaded = 0;
    const total = file.size;
    const startTime = Date.now();
    
    const uploadInterval = setInterval(() => {
      uploaded += file.size / 20;
      const elapsed = (Date.now() - startTime) / 1000;
      const speed = uploaded / elapsed;
      const remaining = (total - uploaded) / speed;

      setUploadProgress((uploaded / total) * 100);
      setUploadStats({
        total,
        uploaded,
        speed,
        timeRemaining: remaining
      });

      if (uploaded >= total) {
        clearInterval(uploadInterval);
        setVideoUrl(URL.createObjectURL(file));
        setIsUploading(false);
        setUploadProgress(100);
        setUploadError(null);
      }
    }, 300);
  };

  const handleThumbnailSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Por favor selecciona un archivo de imagen válido');
      return;
    }

    setThumbnailFile(file);
    setThumbnailPreview(URL.createObjectURL(file));
    setUploadError(null);
  };

  const handlePublishVideo = async () => {
    if (!videoTitle || !videoCategory) {
      setUploadError('Por favor completa todos los campos obligatorios');
      return;
    }

    setIsUploading(true);
    setTimeout(() => {
      alert(`¡Video "${videoTitle}" publicado con éxito!`);
      closeModal();
      resetVideoForm();
    }, 1500);
  };

  const handleCancelUpload = () => {
    if (window.confirm('¿Estás seguro de que quieres cancelar? Se perderán los cambios.')) {
      resetVideoForm();
      closeModal();
    }
  };

  const resetVideoForm = () => {
    setVideoUrl('');
    setVideoTitle('');
    setVideoDescription('');
    setVideoCategory('');
    setThumbnailFile(null);
    setThumbnailPreview('');
    setUploadProgress(0);
    setIsUploading(false);
    setIsPublic(true);
    setUploadError(null);
    setUploadStats({
      total: 0,
      uploaded: 0,
      speed: 0,
      timeRemaining: 0
    });
  };

  const simulateUpload = () => {
    if (isUploading) return;
    
    setIsUploading(true);
    setProgress(0);
    setUploadError(null);

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          setTimeout(() => {
            alert(activeModal === 'live' 
              ? '¡Transmisión en vivo iniciada con éxito! 🎬' 
              : `¡${activeModal === 'video' ? 'Video' : 'Short'} subido exitosamente! 🚀`);
            closeModal();
          }, 300);
          
          return 100;
        }
        return newProgress;
      });
    }, 200);
  };

  // Función: Iniciar transmisión en vivo
  const startLiveStream = () => {
    setIsLiveStreamActive(true);
  };

  // Función: Detener transmisión en vivo
  const stopLiveStream = () => {
    setIsLiveStreamActive(false);
    closeModal();
  };

  // Mostrar reproductor en vivo si está activo
  if (isLiveStreamActive) {
    return (
      <div className={styles.liveStreamContainer}>
        <LiveStreamPlayer
          streamKey="live_stream_key_123"
          channelName="TuCanal"
          isOwner={true}
        />
        
        {/* Botón para finalizar transmisión */}
        <div className={styles.stopStreamButton}>
          <button 
            onClick={stopLiveStream}
            className={styles.stopButton}
          >
            ⏹️ Finalizar Transmisión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.uploadPageContainer}>
      {/* Header con gradiente profesional */}
      <div className={styles.uploadHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.uploadTitle}>
            <span className={styles.titleGradient}>Crear Contenido</span>
          </h1>
          <p className={styles.uploadSubtitle}>Comparte tu creatividad con el mundo 🌎</p>
        </div>
      </div>

      {/* Tarjetas de opciones modernas */}
      <div className={styles.uploadCardsGrid}>
        <div className={`${styles.uploadCard} ${styles.videoCard}`} onClick={() => openModal('video')}>
          <div className={styles.cardIcon}>
            <i className="fas fa-film"></i>
          </div>
          <h3>Subir Video</h3>
          <p>Comparte videos largos con tu comunidad</p>
          <div className={styles.cardBadge}>4K • 60FPS</div>
        </div>

        <div className={`${styles.uploadCard} ${styles.shortCard}`} onClick={() => openModal('short')}>
          <div className={styles.cardIcon}>
            <i className="fas fa-music"></i>
          </div>
          <h3>Crear Short</h3>
          <p>Videos cortos virales con música trending</p>
          <div className={styles.cardBadge}>Vertical • 60s</div>
        </div>

        <div className={`${styles.uploadCard} ${styles.liveCard}`} onClick={() => openModal('live')}>
          <div className={styles.cardIcon}>
            <i className="fas fa-broadcast-tower"></i>
          </div>
          <h3>Transmitir en Vivo</h3>
          <p>Conecta en tiempo real con tu audiencia</p>
          <div className={styles.cardBadge}>EN VIVO 🔴</div>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className={styles.uploadStats}>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>12.4M</div>
          <div className={styles.statLabel}>Vistas diarias</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>98%</div>
          <div className={styles.statLabel}>Satisfacción</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>0.1s</div>
          <div className={styles.statLabel}>Tiempo de carga</div>
        </div>
      </div>

      {/* Modal para Video (SISTEMA REAL) */}
      {activeModal === 'video' && (
        <div className={`${styles.modalOverlay} ${activeModal ? styles.modalOverlayActive : styles.modalOverlayInactive}`} onClick={closeModal}>
          <div className={`${styles.modalContent} ${styles.professionalModal} ${activeModal ? styles.modalContentActive : styles.modalContentInactive}`} onClick={(e) => e.stopPropagation()} style={{ maxWidth: '800px' }}>
            <div className={styles.modalHeader}>
              <h2>🎬 Subir Video</h2>
              <button className={styles.closeModal} onClick={closeModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className={styles.uploadContent}>
              {!videoUrl ? (
                // Pantalla de selección de video
                <div className={styles.uploadSection}>
                  <div 
                    className={`${styles.uploadZone} ${styles.professionalZone}`} 
                    onClick={() => !isUploading && document.getElementById('video-file-input')?.click()}
                    style={{ cursor: isUploading ? 'not-allowed' : 'pointer', opacity: isUploading ? 0.7 : 1 }}
                  >
                    {isUploading ? (
                      <UploadProgress
                        progress={uploadProgress}
                        total={uploadStats.total}
                        uploaded={uploadStats.uploaded}
                        speed={uploadStats.speed}
                        timeRemaining={uploadStats.timeRemaining}
                        status="uploading"
                        fileType="video"
                      />
                    ) : (
                      <>
                        <div className={styles.uploadIcon}>
                          <i className="fas fa-cloud-upload-alt"></i>
                        </div>
                        <h4>Arrastra tu video aquí</h4>
                        <p>O haz clic para seleccionar archivos</p>
                        <div className={styles.supportedFormats}>
                          MP4, MOV, AVI • Máx. 500MB
                        </div>
                      </>
                    )}
                    <input 
                      type="file" 
                      id="video-file-input" 
                      style={{ display: 'none' }} 
                      accept="video/*"
                      onChange={handleVideoFileSelect}
                      disabled={isUploading}
                    />
                  </div>
                  {uploadError && <div className={styles.errorMessage}>{uploadError}</div>}
                </div>
              ) : (
                // Pantalla de formulario de detalles
                <div className={styles.formSection}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Título del video *</label>
                    <input 
                      type="text" 
                      className={styles.formInput}
                      value={videoTitle}
                      onChange={(e) => setVideoTitle(e.target.value)}
                      placeholder="Ej: Mi increíble tutorial en 4K..." 
                      required
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Descripción</label>
                    <textarea 
                      className={styles.formTextarea}
                      rows={3} 
                      value={videoDescription}
                      onChange={(e) => setVideoDescription(e.target.value)}
                      placeholder="Describe tu video para que más personas lo encuentren..."
                    ></textarea>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Categoría *</label>
                    <select 
                      className={styles.formSelect}
                      value={videoCategory}
                      onChange={(e) => setVideoCategory(e.target.value)}
                      required
                    >
                      <option value="">Seleccionar categoría</option>
                      <option value="gaming">Gaming</option>
                      <option value="tecnologia">Tecnología</option>
                      <option value="educacion">Educación</option>
                      <option value="entretenimiento">Entretenimiento</option>
                      <option value="musica">Música</option>
                      <option value="deportes">Deportes</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabelWithIcon}>
                      <i className="fas fa-image"></i>
                      Miniatura personalizada
                    </label>
                    <div className={styles.thumbnailUploadContainer}>
                      <input 
                        type="file" 
                        id="thumbnail-input" 
                        accept="image/*"
                        onChange={handleThumbnailSelect}
                        style={{ display: 'none' }}
                      />
                      
                      {thumbnailPreview ? (
                        <div className={styles.thumbnailPreviewContainer}>
                          <div className={styles.thumbnailPreviewCard}>
                            <img src={thumbnailPreview} alt="Vista previa de miniatura" className={styles.thumbnailPreviewImage} />
                            <div className={styles.thumbnailActions}>
                              <label htmlFor="thumbnail-input" className={styles.btnThumbnailChange}>
                                <i className="fas fa-sync"></i> Cambiar
                              </label>
                              <button 
                                type="button"
                                className={styles.btnThumbnailRemove}
                                onClick={() => {
                                  setThumbnailFile(null);
                                  setThumbnailPreview('');
                                }}
                              >
                                <i className="fas fa-trash"></i> Eliminar
                              </button>
                            </div>
                          </div>
                          <p className={styles.thumbnailHelpText}>
                            La miniatura es lo primero que verán tus espectadores. 
                            Elige una imagen atractiva y de alta calidad.
                          </p>
                        </div>
                      ) : (
                        <label htmlFor="thumbnail-input" className={styles.thumbnailUploadCard}>
                          <div className={styles.thumbnailUploadPlaceholder}>
                            <i className="fas fa-cloud-upload-alt"></i>
                            <h4>Seleccionar miniatura</h4>
                            <p>Recomendado: 1280x720px (relación 16:9)</p>
                            <span className={styles.btnThumbnailPrimary}>
                              <i className="fas fa-image"></i> Elegir imagen
                            </span>
                          </div>
                        </label>
                      )}
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabelWithIcon}>
                      <i className="fas fa-globe"></i>
                      Configuración de visibilidad
                    </label>
                    <div className={styles.privacySettingsCard}>
                      <div className={styles.privacyOptionCard}>
                        <div className={styles.privacyOptionHeader}>
                          <div className={styles.privacyRadio}>
                            <input 
                              type="radio" 
                              id="privacy-public" 
                              name="privacy" 
                              checked={isPublic} 
                              onChange={() => setIsPublic(true)} 
                            />
                            <label htmlFor="privacy-public" className={styles.privacyLabel}>
                              <span className={styles.privacyTitle}>Público</span>
                              <span className={`${styles.privacyBadge} ${styles.publicBadge}`}>
                                <i className="fas fa-globe"></i> Visible para todos
                              </span>
                            </label>
                          </div>
                        </div>
                        <div className={styles.privacyDescription}>
                          Cualquier usuario de Vryno podrá ver tu video. Aparecerá en búsquedas y recomendaciones.
                        </div>
                      </div>

                      <div className={styles.privacyOptionCard}>
                        <div className={styles.privacyOptionHeader}>
                          <div className={styles.privacyRadio}>
                            <input 
                              type="radio" 
                              id="privacy-private" 
                              name="privacy" 
                              checked={!isPublic} 
                              onChange={() => setIsPublic(false)} 
                            />
                            <label htmlFor="privacy-private" className={styles.privacyLabel}>
                              <span className={styles.privacyTitle}>Privado</span>
                              <span className={`${styles.privacyBadge} ${styles.privateBadge}`}>
                                <i className="fas fa-lock"></i> Solo con enlace
                              </span>
                            </label>
                          </div>
                        </div>
                        <div className={styles.privacyDescription}>
                          Solo las personas con el enlace podrán ver tu video. No aparecerá en búsquedas ni recomendaciones.
                        </div>
                      </div>
                    </div>
                    
                    {isPublic && (
                      <div className={styles.visibilityNotice}>
                        <i className="fas fa-info-circle"></i>
                        <span>Tu video será visible para todos los usuarios de Vryno y podrá aparecer en la sección de tendencias.</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className={styles.modalActions}>
              <button className={styles.btnSecondary} onClick={handleCancelUpload}>
                {videoUrl ? 'Descartar' : 'Cancelar'}
              </button>
              
              {videoUrl ? (
                <button 
                  className={styles.btnPrimary} 
                  onClick={handlePublishVideo}
                  disabled={isUploading || !videoTitle || !videoCategory}
                >
                  {isUploading ? (
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
              ) : (
                <button className={styles.btnPrimary} disabled>
                  Selecciona un video para continuar
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal para Short */}
      {activeModal === 'short' && (
        <div className={`${styles.modalOverlay} ${activeModal ? styles.modalOverlayActive : styles.modalOverlayInactive}`} onClick={closeModal}>
          <div className={`${styles.modalContent} ${styles.professionalModal} ${activeModal ? styles.modalContentActive : styles.modalContentInactive}`} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>🎵 Crear Short</h2>
              <button className={styles.closeModal} onClick={closeModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className={`${styles.uploadZone} ${styles.professionalZone}`} onClick={() => document.getElementById('short-file-input')?.click()}>
              <div className={styles.uploadIcon}>
                <i className="fas fa-cloud-upload-alt"></i>
              </div>
              <h4>Arrastra tu short aquí</h4>
              <p>O haz clic para seleccionar archivos</p>
              <div className={styles.supportedFormats}>
                MP4, MOV • Máx. 60s • Vertical
              </div>
              <input type="file" id="short-file-input" style={{ display: 'none' }} />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Título del short</label>
              <input 
                type="text" 
                className={styles.formInput}
                placeholder="Ej: Mi short viral..." 
                defaultValue="" 
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Seleccionar música trending</label>
              <select className={styles.formSelect} defaultValue="">
                <option value="">Elige una canción popular</option>
                <option value="song1">Canción Trend #1</option>
                <option value="song2">Canción Trend #2</option>
                <option value="song3">Canción Trend #3</option>
              </select>
            </div>

            {isUploading && (
              <div className={styles.uploadProgress}>
                <div className={styles.progressHeader}>
                  <span>Subiendo...</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
                </div>
                <div className={styles.progressStats}>
                  <span>Velocidad: 15.4 MB/s</span>
                  <span>Tiempo restante: 0m 12s</span>
                </div>
              </div>
            )}
            
            <div className={styles.modalActions}>
              <button className={styles.btnSecondary} onClick={closeModal}>
                Cancelar
              </button>
              <button className={styles.btnPrimary} onClick={simulateUpload} disabled={isUploading}>
                {isUploading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Subiendo...
                  </>
                ) : (
                  <>
                    <i className="fas fa-upload"></i>
                    Publicar Short
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para Live */}
      {activeModal === 'live' && (
        <div className={`${styles.modalOverlay} ${activeModal ? styles.modalOverlayActive : styles.modalOverlayInactive}`} onClick={closeModal}>
          <div className={`${styles.modalContent} ${styles.professionalModal} ${activeModal ? styles.modalContentActive : styles.modalContentInactive}`} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>🎥 Transmitir en Vivo</h2>
              <button className={styles.closeModal} onClick={closeModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Título de la transmisión</label>
              <input 
                type="text" 
                className={styles.formInput}
                placeholder="Ej: Tutorial en vivo: Aprendiendo React..." 
                defaultValue="" 
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Descripción</label>
              <textarea 
                className={styles.formTextarea}
                rows={3} 
                placeholder="Describe tu transmisión en vivo..." 
                defaultValue=""
              ></textarea>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Categoría</label>
              <select className={styles.formSelect} defaultValue="">
                <option value="">Seleccionar categoría</option>
                <option value="gaming">Gaming</option>
                <option value="tutorial">Tutorial</option>
                <option value="music">Música</option>
                <option value="talk">Charla</option>
                <option value="other">Otro</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Configuración de privacidad</label>
              <div className={styles.privacyOptions}>
                <label className={styles.privacyOption}>
                  <input type="radio" name="privacy" value="public" defaultChecked />
                  <span>Público 🌎</span>
                  <small>Todos pueden ver la transmisión</small>
                </label>
                <label className={styles.privacyOption}>
                  <input type="radio" name="privacy" value="subscribers" />
                  <span>Solo suscriptores 🔒</span>
                  <small>Solo suscriptores del canal</small>
                </label>
                <label className={styles.privacyOption}>
                  <input type="radio" name="privacy" value="private" />
                  <span>Privado 👤</span>
                  <small>Solo con enlace privado</small>
                </label>
              </div>
            </div>

            <div className={styles.liveNotice}>
              <div className={styles.noticeIcon}>⚠️</div>
              <div className={styles.noticeContent}>
                <strong>Requisitos para transmitir:</strong>
                <ul>
                  <li>Conexión estable a internet (mínimo 10 Mbps)</li>
                  <li>Permisos de cámara y micrófono habilitados</li>
                  <li>Navegador compatible (Chrome, Firefox, Edge)</li>
                </ul>
              </div>
            </div>
            
            <div className={styles.modalActions}>
              <button className={styles.btnSecondary} onClick={closeModal}>
                Cancelar
              </button>
              <button className={styles.btnPrimary} onClick={startLiveStream}>
                <i className="fas fa-broadcast-tower"></i>
                Iniciar Transmisión en Vivo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
<style jsx>{`
  .form-label-with-icon {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    margin-bottom: 12px;
    color: #374151;
  }
  
  .thumbnail-upload-container {
    margin-top: 8px;
  }
  
  .thumbnail-upload-card {
    display: block;
    border: 2px dashed #d1d5db;
    border-radius: 12px;
    padding: 32px 24px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease;
    background-color: #f9fafb;
  }
  
  .thumbnail-upload-card:hover {
    border-color: #3b82f6;
    background-color: #eff6ff;
  }
  
  .thumbnail-upload-placeholder i {
    font-size: 32px;
    color: #9ca3af;
    margin-bottom: 12px;
  }
  
  .thumbnail-upload-placeholder h4 {
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 8px 0;
    color: #374151;
  }
  
  .thumbnail-upload-placeholder p {
    font-size: 14px;
    color: #6b7280;
    margin: 0 0 16px 0;
  }
  
  .btn-thumbnail-primary {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background-color: #3b82f6;
    color: white;
    padding: 10px 20px;
    border-radius: 8px;
    font-weight: 500;
    transition: background-color 0.2s;
  }
  
  .btn-thumbnail-primary:hover {
    background-color: #2563eb;
  }
  
  .thumbnail-preview-container {
    margin-top: 8px;
  }
  
  .thumbnail-preview-card {
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .thumbnail-preview-image {
    width: 100%;
    height: 180px;
    object-fit: cover;
    display: block;
  }
  
  .thumbnail-actions {
    display: flex;
    padding: 12px;
    gap: 8px;
    background-color: #f9fafb;
  }
  
  .btn-thumbnail-change, .btn-thumbnail-remove {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .btn-thumbnail-change {
    background-color: #3b82f6;
    color: white;
    border: none;
  }
  
  .btn-thumbnail-change:hover {
    background-color: #2563eb;
  }
  
  .btn-thumbnail-remove {
    background-color: #f9fafb;
    color: #6b7280;
    border: 1px solid #e5e7eb;
  }
  
  .btn-thumbnail-remove:hover {
    background-color: #f3f4f6;
    color: #374151;
  }
  
  .thumbnail-help-text {
    font-size: 13px;
    color: #6b7280;
    margin-top: 8px;
    line-height: 1.4;
  }
  
  .privacy-settings-card {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 8px;
  }
  
  .privacy-option-card {
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 16px;
    transition: all 0.2s;
    cursor: pointer;
  }
  
  .privacy-option-card:hover {
    border-color: #3b82f6;
    background-color: #f8fafc;
  }
  
  .privacy-option-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 8px;
  }
  
  .privacy-radio {
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }
  
  .privacy-radio input[type="radio"] {
    margin-top: 2px;
  }
  
  .privacy-label {
    display: flex;
    flex-direction: column;
    gap: 4px;
    cursor: pointer;
  }
  
  .privacy-title {
    font-weight: 600;
    color: #111827;
  }
  
  .privacy-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    padding: 4px 8px;
    border-radius: 6px;
    font-weight: 500;
  }
  
  .public-badge {
    background-color: #dcfce7;
    color: #166534;
  }
  
  .private-badge {
    background-color: #fee2e2;
    color: #991b1b;
  }
  
  .privacy-description {
    font-size: 14px;
    color: #6b7280;
    margin-left: 28px;
    line-height: 1.5;
  }
  
  .visibility-notice {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    margin-top: 12px;
    padding: 12px;
    background-color: #eff6ff;
    border-radius: 8px;
    font-size: 14px;
    color: #1e40af;
  }
  
  .visibility-notice i {
    margin-top: 2px;
  }
`}</style>

}