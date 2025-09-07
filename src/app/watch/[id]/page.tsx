import CommentsSection from "@/components/comments/CommentsSection";
import VideoActions from "@/components/videos/VideoActions";
import SubscribeButton from "@/components/channel/SubscribeButton";
import VideoRecommendations from "@/components/videos/VideoRecommendations";

// Simular datos del video (luego vendrán de la base de datos)
const getVideoData = async (id: string) => {
  // Simular delay de API
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return {
    id,
    title: "Cómo Crear una App Completa con Next.js 14 y React",
    description: "En este tutorial te muestro paso a paso cómo crear una aplicación moderna con las últimas tecnologías. Aprenderás: React Server Components, Tailwind CSS, TypeScript y mucho más! 🚀",
    views: 15420,
    uploadDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 días atrás
    duration: "28:15",
    channel: {
      id: "techmaster",
      name: "TechMaster Pro",
      avatar: "/api/placeholder/80/80",
      subscribers: 12500,
      isVerified: true
    },
    likes: 1245,
    dislikes: 8,
    tags: ["react", "nextjs", "tutorial", "programming", "webdev"]
  };
};

export default async function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const video = await getVideoData(id);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Premium */}
      <header className="bg-white border-b border-gray-200 fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold text-gray-900">Vryno</h1>
            <nav className="hidden md:flex gap-6">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Inicio</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Explorar</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Shorts</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Suscripciones</a>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors">
              📤 Subir
            </button>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>
        </div>
      </header>

      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Columna principal - Video y info */}
            <div className="lg:col-span-2">
              {/* Reproductor de video premium */}
              <div className="bg-black aspect-video rounded-xl mb-6 relative overflow-hidden group">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-white text-6xl">🎬</span>
                </div>
                
                {/* Controles del reproductor */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-mono">28:15</span>
                    <div className="flex items-center gap-4">
                      <button className="text-white text-xl">⏮️</button>
                      <button className="text-white text-xl">⏯️</button>
                      <button className="text-white text-xl">⏭️</button>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="text-white text-lg">🔊</button>
                      <div className="w-20 h-1 bg-white/50 rounded-full">
                        <div className="w-3/4 h-full bg-red-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Información del video */}
              <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900 mb-3">{video.title}</h1>
                
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="text-gray-600 font-medium">{video.views.toLocaleString()} vistas</span>
                  <span className="text-gray-600">•</span>
                  <span className="text-gray-600">{video.uploadDate.toLocaleDateString()}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {video.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                {/* Video Actions */}
                <VideoActions 
                  videoId={id} 
                  initialLikes={video.likes} 
                  initialDislikes={video.dislikes} 
                />
                
                {/* Línea separadora */}
                <div className="border-t border-gray-200 my-6"></div>
                
                {/* Información del canal */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">T</span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">{video.channel.name}</h3>
                      {video.channel.isVerified && (
                        <span className="text-blue-500" title="Verificado">✓</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{video.channel.subscribers.toLocaleString()} suscriptores</p>
                  </div>
                  
                  <SubscribeButton channelId={video.channel.id} />
                </div>

                {/* Descripción */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">{video.description}</p>
                </div>
              </div>

              {/* Sección de comentarios */}
              <CommentsSection
                videoId={id}
                currentUser={{
                  id: "user-123",
                  name: "Javier Layos",
                  avatar: ""
                }}
              />
            </div>

            {/* Sidebar - Recomendaciones */}
            <div className="lg:col-span-1">
              <VideoRecommendations currentVideoId={id} />
            </div>
          </div>
        </div>
      </div>

      {/* Footer premium */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Vryno</h3>
              <p className="text-gray-400">La plataforma de video líder para creadores de contenido.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Navegación</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Inicio</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Explorar</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shorts</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Suscripciones</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Términos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacidad</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Política de contenido</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Síguenos</h4>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">📘</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">🐦</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">📸</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">🎵</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 Vryno. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}