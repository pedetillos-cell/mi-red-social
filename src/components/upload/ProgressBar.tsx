interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  const getProcessingStep = (progress: number) => {
    if (progress < 25) return "Subiendo video...";
    if (progress < 50) return "Transcodificando...";
    if (progress < 75) return "Generando miniaturas...";
    return "Finalizando...";
  };

  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="progress-text">
        Procesando: {Math.round(progress)}% - {getProcessingStep(progress)}
      </p>
    </div>
  );
}