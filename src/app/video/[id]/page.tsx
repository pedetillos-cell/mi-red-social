import VideoPlayer from '@/components/video/VideoPlayer';
import VideoActions from '@/components/video/VideoActions';
import CommentSection from '@/components/video/CommentSection';

// Datos de ejemplo (en una app real vendrían de una API)
const videoData = {
  id: '1',
  title: 'Cómo implementar un sistema de comentarios en tiempo real',
  views: 25489,
  uploadDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 días atrás
  likes: 2400,
  dislikes: 45,
  isLiked: false,     // ← CORREGIDO
  isDisliked: false   // ← CORREGIDO
};

const initialComments = [
  {
    id: '1',
    author: 'María García',
    avatar: 'M',
    content: '¡Excelente tutorial! Justo lo que necesitaba para mi proyecto. ¿Podrías hacer un video sobre cómo implementar la función de respuestas?',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 horas atrás
    likes: 124,
    dislikes: 2,
    replies: [
      {
        id: '1-1',
        author: 'Alex Rodríguez (Creador)',
        avatar: 'A',
        content: '¡Claro que sí! Estoy preparando un video avanzado sobre el sistema de comentarios que incluirá respuestas anidadas y moderación.',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hora atrás
        likes: 42,
        dislikes: 0,
        replies: [],
      },
      {
        id: '1-2',
        author: 'Carlos López',
        avatar: 'C',
        content: '¡Eso sería genial! También me gustaría saber cómo manejar los comentarios spam.',
        timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutos atrás
        likes: 15,
        dislikes: 1,
        replies: [],
      }
    ]
  },
  {
    id: '2',
    author: 'Laura Martínez',
    avatar: 'L',
    content: 'Me encanta cómo has explicado la implementación del sistema en tiempo real. ¿Usaste Socket.io o otra tecnología?',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 horas atrás
    likes: 89,
    dislikes: 3,
    replies: [],
  },
  {
    id: '3',
    author: 'Pedro Sánchez',
    avatar: 'P',
    content: '¿Hay forma de integrar este sistema con una base de datos real? Me gustaría implementarlo en mi sitio web.',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 día atrás
    likes: 67,
    dislikes: 5,
    replies: [],
  }
];

interface VideoPageProps {
  params: Promise<{ id: string }>;
}

export default async function VideoPage({ params }: VideoPageProps) {
  const { id } = await params;
  
  return (
    <div className="container">
      <VideoPlayer />
      
      <div className="video-info">
        <h1 className="video-title">{videoData.title}</h1>
        <div className="video-stats">
          <span>{videoData.views.toLocaleString()} visualizaciones</span>
          <span>•</span>
          <span>Hace {Math.floor((Date.now() - videoData.uploadDate.getTime()) / (24 * 60 * 60 * 1000))} días</span>
        </div>
        
        <VideoActions 
          likes={videoData.likes} 
          dislikes={videoData.dislikes} 
          isLiked={videoData.isLiked} 
          isDisliked={videoData.isDisliked} 
        />
      </div>
      
      <CommentSection videoId={id} initialComments={initialComments} />
    </div>
  );
}