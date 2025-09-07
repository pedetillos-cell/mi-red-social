-- =============================================
-- VRYNOPLAY DATABASE SCHEMA - PostgreSQL
-- Diseñado para escalabilidad y alto rendimiento
-- =============================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla de usuarios (creadores y viewers)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(500) DEFAULT '/images/avatars/default.jpg',
    banner_url VARCHAR(500) DEFAULT '/images/banners/default.jpg',
    biography TEXT,
    website_url VARCHAR(500),
    social_links JSONB DEFAULT '{}',
    
    -- Estadísticas
    subscriber_count INTEGER DEFAULT 0,
    total_views BIGINT DEFAULT 0,
    total_likes BIGINT DEFAULT 0,
    
    -- Verificaciones
    is_verified BOOLEAN DEFAULT FALSE,
    is_partner BOOLEAN DEFAULT FALSE,
    is_premium BOOLEAN DEFAULT FALSE,
    
    -- Configuración
    email_verified BOOLEAN DEFAULT FALSE,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    notification_settings JSONB DEFAULT '{"email": true, "push": true, "newsletter": true}',
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_login_at TIMESTAMPTZ,
    
    -- Índices para búsquedas rápidas
    INDEX idx_users_username (username),
    INDEX idx_users_email (email),
    INDEX idx_users_created_at (created_at)
);

-- Tabla de videos
CREATE TABLE videos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(120) NOT NULL,
    description TEXT,
    duration INTEGER NOT NULL, -- en segundos
    file_url VARCHAR(500) NOT NULL,
    thumbnail_url VARCHAR(500) NOT NULL,
    preview_url VARCHAR(500),
    
    -- Metadata del video
    file_size BIGINT NOT NULL, -- en bytes
    resolution VARCHAR(20) NOT NULL, -- '3840x2160'
    fps INTEGER NOT NULL,
    codec VARCHAR(20) NOT NULL,
    bitrate INTEGER NOT NULL, -- en kbps
    
    -- Estadísticas
    views_count BIGINT DEFAULT 0,
    likes_count BIGINT DEFAULT 0,
    dislikes_count BIGINT DEFAULT 0,
    comments_count BIGINT DEFAULT 0,
    average_watch_time FLOAT DEFAULT 0,
    
    -- Categorización
    category VARCHAR(50) NOT NULL,
    tags VARCHAR(20)[] DEFAULT '{}',
    language VARCHAR(10) DEFAULT 'es',
    
    -- Calidad
    is_4k BOOLEAN DEFAULT FALSE,
    is_hdr BOOLEAN DEFAULT FALSE,
    is_spatial_audio BOOLEAN DEFAULT FALSE,
    
    -- Visibilidad
    visibility VARCHAR(20) DEFAULT 'public', -- 'public', 'unlisted', 'private'
    is_exclusive BOOLEAN DEFAULT FALSE,
    is_premiere BOOLEAN DEFAULT FALSE,
    
    -- Relaciones
    author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    published_at TIMESTAMPTZ,
    scheduled_for TIMESTAMPTZ,
    
    -- Índices
    INDEX idx_videos_author_id (author_id),
    INDEX idx_videos_category (category),
    INDEX idx_videos_created_at (created_at),
    INDEX idx_videos_views_count (views_count DESC),
    INDEX idx_videos_tags (tags)
);

-- Tabla de transmisiones en vivo
CREATE TABLE live_streams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(120) NOT NULL,
    description TEXT,
    thumbnail_url VARCHAR(500) NOT NULL,
    stream_url VARCHAR(500) NOT NULL,
    recording_url VARCHAR(500),
    
    -- Estadísticas en tiempo real
    viewer_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    peak_viewers INTEGER DEFAULT 0,
    total_watch_time INTEGER DEFAULT 0,
    
    -- Configuración de stream
    latency VARCHAR(20) DEFAULT 'normal', -- 'ultra-low', 'low', 'normal'
    max_quality VARCHAR(10) DEFAULT '1080p', -- '720p', '1080p', '1440p', '4K'
    is_chat_enabled BOOLEAN DEFAULT TRUE,
    is_donations_enabled BOOLEAN DEFAULT FALSE,
    is_subscribers_only BOOLEAN DEFAULT FALSE,
    
    -- Estado
    status VARCHAR(20) DEFAULT 'scheduled', -- 'scheduled', 'live', 'ended', 'cancelled'
    is_live BOOLEAN DEFAULT FALSE,
    
    -- Relaciones
    author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Tiempos
    scheduled_start TIMESTAMPTZ NOT NULL,
    actual_start TIMESTAMPTZ,
    ended_at TIMESTAMPTZ,
    duration INTEGER DEFAULT 0, -- en segundos
    
    -- Índices
    INDEX idx_live_streams_author_id (author_id),
    INDEX idx_live_streams_status (status),
    INDEX idx_live_streams_scheduled_start (scheduled_start)
);

-- Tabla de suscripciones (canal a canal)
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subscriber_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    channel_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Restricción única
    UNIQUE(subscriber_id, channel_id),
    
    -- Índices
    INDEX idx_subscriptions_subscriber_id (subscriber_id),
    INDEX idx_subscriptions_channel_id (channel_id)
);

-- Tabla de likes/dislikes
CREATE TABLE video_engagement (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    video_id UUID NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
    engagement_type VARCHAR(10) NOT NULL, -- 'like', 'dislike'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Restricción única
    UNIQUE(user_id, video_id),
    
    -- Índices
    INDEX idx_video_engagement_user_id (user_id),
    INDEX idx_video_engagement_video_id (video_id)
);

-- Tabla de comentarios
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content TEXT NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    video_id UUID NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
    parent_comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
    likes_count INTEGER DEFAULT 0,
    is_edited BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Índices
    INDEX idx_comments_user_id (user_id),
    INDEX idx_comments_video_id (video_id),
    INDEX idx_comments_parent_id (parent_comment_id)
);

-- Tabla de historial de visualización
CREATE TABLE watch_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    video_id UUID NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
    watch_time INTEGER NOT NULL, -- en segundos
    progress FLOAT NOT NULL, -- 0.0 to 1.0
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Índices
    INDEX idx_watch_history_user_id (user_id),
    INDEX idx_watch_history_video_id (video_id),
    INDEX idx_watch_history_created_at (created_at DESC)
);

-- Tabla de notificaciones
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- 'new_video', 'new_comment', 'new_subscriber', etc.
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    related_entity_type VARCHAR(50), -- 'video', 'comment', 'user'
    related_entity_id UUID,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Índices
    INDEX idx_notifications_user_id (user_id),
    INDEX idx_notifications_is_read (is_read),
    INDEX idx_notifications_created_at (created_at DESC)
);

-- =============================================
-- DATOS INICIALES DE PLATAFORMA
-- =============================================

-- Insertar categorías predefinidas
INSERT INTO categories (id, name, description, icon, is_visible) VALUES
('gaming', 'Gaming', 'Videojuegos, gameplay y esports', '🎮', true),
('technology', 'Tecnología', 'Reviews, tutoriales y gadgets', '💻', true),
('education', 'Educación', 'Aprendizaje y desarrollo profesional', '📚', true),
('entertainment', 'Entretenimiento', 'Contenido divertido y humor', '🎭', true),
('music', 'Música', 'Videos musicales y artistas', '🎵', true),
('sports', 'Deportes', 'Eventos deportivos y fitness', '⚽', true);

-- Insertar usuario administrador inicial
INSERT INTO users (username, email, password_hash, is_verified, is_partner) VALUES
('admin', 'admin@vrynoplay.com', 'hashed_password', true, true);

-- =============================================
-- VISTAS PARA REPORTES
-- =============================================

CREATE VIEW channel_analytics AS
SELECT 
    u.id as channel_id,
    u.username,
    COUNT(DISTINCT v.id) as total_videos,
    COUNT(DISTINCT s.id) as total_subscribers,
    SUM(v.views_count) as total_views,
    SUM(v.likes_count) as total_likes,
    AVG(v.average_watch_time) as avg_watch_time
FROM users u
LEFT JOIN videos v ON u.id = v.author_id
LEFT JOIN subscriptions s ON u.id = s.channel_id
GROUP BY u.id, u.username;

CREATE VIEW trending_videos AS
SELECT 
    v.*,
    u.username as author_username,
    u.avatar_url as author_avatar,
    (v.views_count / EXTRACT(EPOCH FROM (NOW() - v.created_at)) * 3600) as trending_score
FROM videos v
JOIN users u ON v.author_id = u.id
WHERE v.created_at > NOW() - INTERVAL '7 days'
ORDER BY trending_score DESC;