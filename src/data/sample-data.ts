import { User, Video, LiveStream, Category } from '@/lib/types/platform';

export const SAMPLE_CATEGORIES: Category[] = [
  {
    id: "cat_gaming",
    name: "Gaming",
    description: "Videojuegos, gameplay, esports y contenido gamer",
    icon: "🎮",
    videoCount: 12500,
    isPopular: true
  },
  {
    id: "cat_tech",
    name: "Tecnología", 
    description: "Reviews, tutoriales, gadgets y últimas tendencias tech",
    icon: "💻",
    videoCount: 8900,
    isPopular: true
  },
  {
    id: "cat_education",
    name: "Educación",
    description: "Tutoriales, cursos online, aprendizaje y desarrollo profesional",
    icon: "📚",
    videoCount: 6700,
    isPopular: true
  },
  {
    id: "cat_entertainment",
    name: "Entretenimiento",
    description: "Contenido divertido, challenges, sketches y humor",
    icon: "🎭",
    videoCount: 15300,
    isPopular: true
  },
  {
    id: "cat_music",
    name: "Música",
    description: "Videos musicales, covers, producciones y artistas",
    icon: "🎵",
    videoCount: 9800,
    isPopular: true
  },
  {
    id: "cat_sports",
    name: "Deportes",
    description: "Eventos deportivos, análisis, highlights y fitness",
    icon: "⚽",
    videoCount: 5400,
    isPopular: false
  }
];

export const SAMPLE_USERS: User[] = [
  {
    id: "user_vrynoplay_oficial",
    username: "VrynoplayOficial",
    email: "oficial@vrynoplay.com",
    avatar: "/images/avatars/vrynoplay-oficial.jpg",
    banner: "/images/banners/vrynoplay-oficial-banner.jpg",
    subscriberCount: 256000,
    createdAt: new Date("2024-01-15"),
    isVerified: true,
    isPartner: true,
    isPremium: true,
    biography: "La plataforma de streaming más avanzada. Videos 4K, transmisiones en vivo y una comunidad global de creadores.",
    website: "https://www.vrynoplay.com",
    socialLinks: {
      twitter: "https://twitter.com/vrynoplay",
      instagram: "https://instagram.com/vrynoplay",
      youtube: "https://youtube.com/@vrynoplay"
    }
  },
  {
    id: "user_gamer_pro",
    username: "GamerPro",
    email: "gamerpro@example.com",
    avatar: "/images/avatars/gamer-pro.jpg",
    banner: "/images/banners/gamer-pro-banner.jpg",
    subscriberCount: 1250000,
    createdAt: new Date("2023-05-20"),
    isVerified: true,
    isPartner: true,
    isPremium: true,
    biography: "🎮 Content creator profesional | Gameplays en 4K | @Vrynoplay Partner",
    website: "https://gamerpro.com",
    socialLinks: {
      twitter: "https://twitter.com/gamerpro",
      instagram: "https://instagram.com/gamerpro",
      twitch: "https://twitch.tv/gamerpro"
    }
  },
  {
    id: "user_tech_review",
    username: "TechReview",
    email: "tech@review.com",
    avatar: "/images/avatars/tech-review.jpg",
    banner: "/images/banners/tech-review-banner.jpg",
    subscriberCount: 890000,
    createdAt: new Date("2023-08-12"),
    isVerified: true,
    isPartner: true,
    isPremium: true,
    biography: "📱 Reviews de tecnología honestas y detalladas | Unboxing | Análisis",
    website: "https://techreview.com",
    socialLinks: {
      twitter: "https://twitter.com/techreview",
      youtube: "https://youtube.com/@techreview"
    }
  }
];

export const SAMPLE_VIDEOS: Video[] = [
  {
    id: "vid_welcome_vrynoplay",
    title: "🚀 Bienvenido a Vrynoplay - La Revolución del Streaming",
    description: "Descubre todas las funciones increíbles que Vrynoplay ofrece para creadores y viewers. Calidad 4K, monetización avanzada y una comunidad global.",
    views: 125000,
    likes: 8950,
    dislikes: 120,
    comments: 456,
    duration: 854,
    category: "Tecnología",
    tags: ["vrynoplay", "tutorial", "streaming", "4k", "plataforma"],
    thumbnail: "/images/thumbnails/welcome-vrynoplay.jpg",
    videoUrl: "/videos/welcome-vrynoplay.mp4",
    author: SAMPLE_USERS[0],
    createdAt: new Date("2024-08-20"),
    isLive: false,
    isPremiere: false,
    isExclusive: true,
    is4K: true,
    isHDR: true,
    isSpatialAudio: true,
    fileSize: 1024 * 1024 * 512, // 512MB
    resolution: "3840x2160",
    fps: 60
  },
  {
    id: "vid_gaming_4k",
    title: "🎮 Gameplay en 4K HDR - Máxima Inmersión",
    description: "Experimenta la gaming en su máxima expresión con calidad 4K HDR a 60FPS. Gráficos ultra realistas y performance optimizada.",
    views: 2560000,
    likes: 215000,
    dislikes: 3500,
    comments: 12500,
    duration: 1860,
    category: "Gaming",
    tags: ["gaming", "4k", "hdr", "gameplay", "esports"],
    thumbnail: "/images/thumbnails/gaming-4k.jpg",
    videoUrl: "/videos/gaming-4k.mp4",
    author: SAMPLE_USERS[1],
    createdAt: new Date("2024-08-18"),
    isLive: false,
    isPremiere: false,
    isExclusive: false,
    is4K: true,
    isHDR: true,
    isSpatialAudio: true,
    fileSize: 1024 * 1024 * 1024 * 2, // 2GB
    resolution: "3840x2160",
    fps: 60
  },
  {
    id: "vid_tech_review",
    title: "📱 Review del Nuevo Flagship 2024 - Análisis Completo",
    description: "Review en profundidad del smartphone más avanzado del mercado. Cámara, performance, batería y todas sus características.",
    views: 890000,
    likes: 74500,
    dislikes: 1200,
    comments: 4300,
    duration: 1245,
    category: "Tecnología",
    tags: ["review", "smartphone", "tech", "análisis", "flagship"],
    thumbnail: "/images/thumbnails/tech-review.jpg",
    videoUrl: "/videos/tech-review.mp4",
    author: SAMPLE_USERS[2],
    createdAt: new Date("2024-08-15"),
    isLive: false,
    isPremiere: false,
    isExclusive: false,
    is4K: true,
    isHDR: false,
    isSpatialAudio: false,
    fileSize: 1024 * 1024 * 768, // 768MB
    resolution: "2560x1440",
    fps: 30
  }
];

export const SAMPLE_LIVE_STREAMS: LiveStream[] = [
  {
    id: "live_gaming_tournament",
    title: "🎮 TORNEO ESPORTS - Final Mundial en Directo",
    viewerCount: 125000,
    likeCount: 89500,
    isLive: true,
    scheduledStart: new Date("2024-08-25T20:00:00"),
    thumbnail: "/images/thumbnails/esports-tournament.jpg",
    streamUrl: "/live/esports-tournament",
    author: SAMPLE_USERS[0],
    latency: "ultra-low",
    maxQuality: "4K",
    isChatEnabled: true,
    isDonationsEnabled: true,
    isSubscribersOnly: false
  },
  {
    id: "live_tech_launch",
    title: "📱 LANZAMIENTO EXCLUSIVO - Nuevo Dispositivo Revolution",
    viewerCount: 89000,
    likeCount: 45600,
    isLive: true,
    scheduledStart: new Date("2024-08-28T18:30:00"),
    thumbnail: "/images/thumbnails/tech-launch.jpg",
    streamUrl: "/live/tech-launch",
    author: SAMPLE_USERS[2],
    latency: "low",
    maxQuality: "1440p",
    isChatEnabled: true,
    isDonationsEnabled: false,
    isSubscribersOnly: false
  }
];