// src/components/VideoSkeleton.tsx
export default function VideoSkeleton() {
  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
    }}>
      <div style={{
        height: '180px',
        background: '#e5e7eb',
        animation: 'pulse 2s infinite'
      }}></div>
      <div style={{ padding: '1rem' }}>
        <div style={{
          height: '1rem',
          background: '#e5e7eb',
          marginBottom: '0.75rem',
          borderRadius: '4px',
          animation: 'pulse 2s infinite',
          width: '80%'
        }}></div>
        <div style={{
          height: '0.8rem',
          background: '#e5e7eb',
          marginBottom: '0.5rem',
          borderRadius: '4px',
          animation: 'pulse 2s infinite',
          width: '60%'
        }}></div>
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginTop: '0.75rem'
        }}>
          <div style={{
            height: '0.7rem',
            background: '#e5e7eb',
            borderRadius: '4px',
            animation: 'pulse 2s infinite',
            width: '40%'
          }}></div>
          <div style={{
            height: '0.7rem',
            background: '#e5e7eb',
            borderRadius: '4px',
            animation: 'pulse 2s infinite',
            width: '30%'
          }}></div>
        </div>
      </div>
    </div>
  );
}