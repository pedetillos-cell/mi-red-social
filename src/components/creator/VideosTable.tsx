'use client';

import { Video } from '@/types/creator';

export default function VideosTable() {
  const videos: Video[] = [
    {
      id: '1',
      title: 'Cómo implementar comentarios en tiempo real',
      thumbnail: '',
      uploadDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      views: 25400,
      likes: 2400,
      comments: 348,
      revenue: 142.50
    },
    {
      id: '2',
      title: 'Tutorial de Next.js completo',
      thumbnail: '',
      uploadDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      views: 48700,
      likes: 4200,
      comments: 512,
      revenue: 285.30
    },
    {
      id: '3',
      title: 'Review del iPhone 15 Pro Max',
      thumbnail: '',
      uploadDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      views: 124800,
      likes: 9700,
      comments: 1200,
      revenue: 642.80
    }
  ];
  
  const formatDate = (date: Date) => {
    const diff = Math.floor((Date.now() - date.getTime()) / (24 * 60 * 60 * 1000));
    return `Publicado hace ${diff} ${diff === 1 ? 'día' : 'días'}`;
  };
  
  return (
    <div className="videos-section">
      <div className="section-header">
        <h3 className="section-title">Tus Videos</h3>
        <button className="btn-primary">
          <i className="fas fa-plus"></i>
          <span>Subir video</span>
        </button>
      </div>
      
      <table className="videos-table">
        <thead>
          <tr>
            <th>Video</th>
            <th>Visualizaciones</th>
            <th>Likes</th>
            <th>Comentarios</th>
            <th>Ingresos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video) => (
            <tr key={video.id} className="video-row">
              <td>
                <div className="video-info">
                  <div className="video-thumbnail">
                    <i className="fas fa-play"></i>
                  </div>
                  <div>
                    <div className="video-title">{video.title}</div>
                    <div className="video-stats">{formatDate(video.uploadDate)}</div>
                  </div>
                </div>
              </td>
              <td>{video.views.toLocaleString()}</td>
              <td>{video.likes.toLocaleString()}</td>
              <td>{video.comments.toLocaleString()}</td>
              <td>${video.revenue.toLocaleString()}</td>
              <td>
                <div className="video-actions">
                  <button className="btn-icon">
                    <i className="fas fa-chart-line"></i>
                  </button>
                  <button className="btn-icon">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="btn-icon">
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}