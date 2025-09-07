import { put, del, list } from '@vercel/blob';
// import { getServerSession } from 'next-auth'; // ← ELIMINAR ESTA LÍNEA

// Tipos para videos
export interface Video {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl?: string; // Hacer opcional
  duration: number;
  views: number;
  likes: number;
  userId: string;
  category: string;
  tags: string[];
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Base de datos temporal en memoria
const videosDatabase: Video[] = [];

export class VideoStorage {
  // Subir video
  static async uploadVideo(file: File, userId: string): Promise<string> {
    try {
      const blob = await put(`videos/${userId}/${Date.now()}-${file.name}`, file, {
        access: 'public',
        contentType: file.type,
      });
      
      return blob.url;
    } catch (error) {
      console.error('Error uploading video:', error);
      throw new Error('Failed to upload video');
    }
  }

  // Subir thumbnail
  static async uploadThumbnail(file: File, userId: string): Promise<string> {
    try {
      const blob = await put(`thumbnails/${userId}/${Date.now()}-${file.name}`, file, {
        access: 'public',
        contentType: file.type,
      });
      
      return blob.url;
    } catch (error) {
      console.error('Error uploading thumbnail:', error);
      throw new Error('Failed to upload thumbnail');
    }
  }

  // Crear registro de video en la base de datos
  static async createVideo(videoData: Omit<Video, 'id' | 'createdAt' | 'updatedAt'>): Promise<Video> {
    const newVideo: Video = {
      ...videoData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    videosDatabase.push(newVideo);
    return newVideo;
  }

  // Obtener videos del usuario
  static async getUserVideos(userId: string): Promise<Video[]> {
    return videosDatabase.filter(video => video.userId === userId);
  }

  // Obtener video por ID
  static async getVideoById(id: string): Promise<Video | null> {
    return videosDatabase.find(video => video.id === id) || null;
  }

  // Actualizar video
  static async updateVideo(id: string, updates: Partial<Video>): Promise<Video | null> {
    const index = videosDatabase.findIndex(video => video.id === id);
    
    if (index === -1) return null;

    videosDatabase[index] = {
      ...videosDatabase[index],
      ...updates,
      updatedAt: new Date(),
    };

    return videosDatabase[index];
  }

  // Eliminar video
  static async deleteVideo(id: string): Promise<boolean> {
    const index = videosDatabase.findIndex(video => video.id === id);
    
    if (index === -1) return false;

    // Aquí eliminarías los archivos del almacenamiento
    const video = videosDatabase[index];
    try {
      await del(video.videoUrl);
      if (video.thumbnailUrl) {
        await del(video.thumbnailUrl);
      }
    } catch (error) {
      console.error('Error deleting files:', error);
    }

    videosDatabase.splice(index, 1);
    return true;
  }
}