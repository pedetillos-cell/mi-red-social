'use client';

interface LiveStreamModalProps {
  onClose: () => void;
}

export default function LiveStreamModal({ onClose }: LiveStreamModalProps) {
  const startStream = () => {
    alert('¡Transmisión en vivo iniciada!');
    onClose();
  };

  return (
    <div className="modal active">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Transmitir en Vivo</h2>
          <button className="close-modal" onClick={onClose}>&times;</button>
        </div>
        
        <div className="live-preview">
          Vista previa de la transmisión en vivo
        </div>
        
        <div className="form-group">
          <label className="form-label">Título de la transmisión</label>
          <input type="text" className="form-input" placeholder="Ingresa un título atractivo" />
        </div>
        
        <div className="form-group">
          <label className="form-label">Descripción</label>
          <textarea className="form-input" rows={3} placeholder="Describe tu transmisión en vivo"></textarea>
        </div>
        
        <div className="form-group">
          <label className="form-label">Categoría</label>
          <select className="form-input">
            <option>Juegos</option>
            <option>Música</option>
            <option>Charlas</option>
            <option>Deportes</option>
          </select>
        </div>
        
        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>Cancelar</button>
          <button className="btn-submit" onClick={startStream}>Iniciar Transmisión</button>
        </div>
      </div>
    </div>
  );
}