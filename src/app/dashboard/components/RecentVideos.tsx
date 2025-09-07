'use client';

import Link from 'next/link'; // ← Importación faltante

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  views: number;
  duration: string;
  uploadDate: string;
  likes: number;
}

interface RecentVideosProps {
  videos: Video[];
  isLoading: boolean;
}

export default function RecentVideos({ videos, isLoading }: RecentVideosProps) {
  if (isLoading) {
    return (
      <div className="recent-videos">
        <h3 className="section-title">Videos Recientes</h3>
        <div className="loading-skeleton">
          {[1, 2].map((item) => (
            <div key={item} className="video-skeleton">
              <div className="thumbnail-skeleton"></div>
              <div className="content-skeleton">
                <div className="title-skeleton"></div>
                <div className="stats-skeleton"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="recent-videos">
      <div className="section-header">
        <h3 className="section-title">Videos Recientes</h3>
        <Link href="/videos" className="view-all-link">
          Ver todos →
        </Link>
      </div>
      
      <div className="videos-list">
        {videos.map((video) => (
          <div key={video.id} className="video-item">
            <div className="video-thumbnail">
              <img src={video.thumbnail || '/api/placeholder/300/200'} alt={video.title} />
              <span className="video-duration">{video.duration}</span>
            </div>
            <div className="video-details">
              <h4 className="video-title">{video.title}</h4>
              <div className="video-stats">
                <span className="video-stat">{video.views.toLocaleString()} vistas</span>
                <span className="video-stat">{video.likes} likes</span>
                <span className="video-stat">{new Date(video.uploadDate).toLocaleDateString()}</span>
              </div>
            </div>
            <button className="video-menu">⋯</button>
          </div>
        ))}
      </div>
    </div>
  );
}