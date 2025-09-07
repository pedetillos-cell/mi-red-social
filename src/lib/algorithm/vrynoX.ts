export interface Video {
  id: string;
  title: string;
  views: number;
  likes: number;
  comments: number;
  duration: number;
  category: string;
  author: {
    id: string;
    username: string;
    subscriberCount: number;
  };
  engagementRate: number;
  freshness: number; // 0-100 (qué tan nuevo es)
  qualityScore: number; // 0-100 (calidad de producción)
}

export interface UserProfile {
  id: string;
  watchHistory: {
    videoId: string;
    watchTime: number; // porcentaje visto
    category: string;
    timestamp: Date;
  }[];
  subscriptions: string[];
  likedVideos: string[];
  searchHistory: string[];
  preferredCategories: string[];
  averageWatchTime: number;
}

class VrynoXAlgorithm {
  // Factores de ponderación ajustables
  private weights = {
    relevance: 0.25,
    engagement: 0.20,
    quality: 0.15,
    freshness: 0.15,
    diversity: 0.10,
    creator: 0.10,
    trend: 0.05
  };

  // Calcular score para un video
  calculateVideoScore(video: Video, user: UserProfile): number {
    let score = 0;

    // 1. RELEVANCIA (25%)
    score += this.calculateRelevanceScore(video, user) * this.weights.relevance;

    // 2. ENGAGEMENT (20%)
    score += this.calculateEngagementScore(video) * this.weights.engagement;

    // 3. CALIDAD (15%)
    score += video.qualityScore * 0.01 * this.weights.quality;

    // 4. FRESCURA (15%)
    score += video.freshness * 0.01 * this.weights.freshness;

    // 5. DIVERSIDAD (10%)
    score += this.calculateDiversityScore(video, user) * this.weights.diversity;

    // 6. CREATOR (10%)
    score += this.calculateCreatorScore(video, user) * this.weights.creator;

    // 7. TENDENCIA (5%)
    score += this.calculateTrendScore(video) * this.weights.trend;

    return Math.min(100, Math.max(0, score));
  }

  // 1. Algoritmo de relevancia (ML mejorado)
  private calculateRelevanceScore(video: Video, user: UserProfile): number {
    let relevance = 0;

    // Similitud de categoría
    const categoryMatch = user.preferredCategories.includes(video.category) ? 100 : 0;
    relevance += categoryMatch * 0.4;

    // Historial de búsquedas
    const searchMatch = this.calculateSearchRelevance(video, user.searchHistory);
    relevance += searchMatch * 0.3;

    // Patrones de visualización
    const watchPatternMatch = this.calculateWatchPatternRelevance(video, user.watchHistory);
    relevance += watchPatternMatch * 0.3;

    return relevance;
  }

  // 2. Algoritmo de engagement (mejorado)
  private calculateEngagementScore(video: Video): number {
    // Fórmula mejorada que penaliza el engagement artificial
    const baseEngagement = (video.likes * 0.4) + (video.comments * 0.3) + (video.views * 0.3);
    
    // Engagement rate ajustado por calidad
    const engagementRate = video.engagementRate;
    const engagementQuality = engagementRate > 20 ? 100 : engagementRate * 5;

    return (baseEngagement * 0.6) + (engagementQuality * 0.4);
  }

  // 3. Algoritmo de diversidad (anti-burbuja)
  private calculateDiversityScore(video: Video, user: UserProfile): number {
    // Menos puntuación si es muy similar al contenido reciente
    const recentCategories = user.watchHistory.slice(-10).map(w => w.category);
    const isOverrepresented = recentCategories.filter(c => c === video.category).length > 3;
    
    // Menos puntuación si es del mismo creador consecutivo
    const recentCreators = user.watchHistory.slice(-5).map(w => w.videoId);
    const isSameCreator = recentCreators.includes(video.id);

    let diversity = 100;
    if (isOverrepresented) diversity -= 40;
    if (isSameCreator) diversity -= 30;

    return Math.max(0, diversity);
  }

  // 4. Algoritmo de calidad de creador
  private calculateCreatorScore(video: Video, user: UserProfile): number {
    let creatorScore = 0;

    // Suscripción del usuario
    const isSubscribed = user.subscriptions.includes(video.author.id);
    if (isSubscribed) creatorScore += 40;

    // Engagement del creador
    const creatorEngagement = Math.min(video.author.subscriberCount / 10000, 100);
    creatorScore += creatorEngagement * 0.6;

    return creatorScore;
  }

  // 5. Algoritmo de tendencias en tiempo real
  private calculateTrendScore(video: Video): number {
    // Simulación de detección de tendencias en tiempo real
    const trendKeywords = ['tutorial', '2024', 'nuevo', 'actualizado', 'mejor'];
    const hasTrendKeyword = trendKeywords.some(keyword => 
      video.title.toLowerCase().includes(keyword)
    );

    // Crecimiento viral reciente
    const growthRate = video.views / (Date.now() - new Date().setDate(new Date().getDate() - 7));
    const viralScore = Math.min(growthRate * 1000, 100);

    return hasTrendKeyword ? viralScore * 1.2 : viralScore;
  }

  // Búsqueda semántica mejorada
  private calculateSearchRelevance(video: Video, searchHistory: string[]): number {
    // NLP simulado - Búsqueda semántica
    const videoKeywords = this.extractKeywords(video.title);
    let maxMatch = 0;

    for (const search of searchHistory) {
      const searchKeywords = this.extractKeywords(search);
      const match = this.calculateKeywordSimilarity(videoKeywords, searchKeywords);
      maxMatch = Math.max(maxMatch, match);
    }

    return maxMatch * 100;
  }

  // Patrones de visualización con machine learning simulado
  private calculateWatchPatternRelevance(video: Video, watchHistory: any[]): number {
    const similarVideos = watchHistory.filter(w => 
      w.category === video.category || 
      this.extractKeywords(w.videoId).some(k => 
        this.extractKeywords(video.title).includes(k)
      )
    );

    if (similarVideos.length === 0) return 50;

    const avgWatchTime = similarVideos.reduce((sum, w) => sum + w.watchTime, 0) / similarVideos.length;
    return avgWatchTime * 100;
  }

  // Herramientas de procesamiento de lenguaje natural
  private extractKeywords(text: string): string[] {
    // Simulación de NLP - Extracción de keywords
    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3);
    
    return [...new Set(words)]; // Eliminar duplicados
  }

  private calculateKeywordSimilarity(keywords1: string[], keywords2: string[]): number {
    const intersection = keywords1.filter(k => keywords2.includes(k)).length;
    const union = new Set([...keywords1, ...keywords2]).size;
    return union === 0 ? 0 : intersection / union;
  }

  // Sistema de recomendación principal
  getRecommendations(videos: Video[], user: UserProfile, count: number = 10): Video[] {
    // Calcular scores para todos los videos
    const scoredVideos = videos.map(video => ({
      video,
      score: this.calculateVideoScore(video, user)
    }));

    // Ordenar por score
    scoredVideos.sort((a, b) => b.score - a.score);

    // Aplicar diversificación
    const diversified = this.diversifyRecommendations(scoredVideos, user);

    return diversified.slice(0, count).map(item => item.video);
  }

  // Diversificación inteligente
  private diversifyRecommendations(scoredVideos: any[], user: UserProfile): any[] {
    const result: any[] = [];
    const usedCategories = new Set();
    const usedCreators = new Set();

    for (const item of scoredVideos) {
      if (result.length >= 20) break;

      const video = item.video;
      const isCategoryUsed = usedCategories.has(video.category);
      const isCreatorUsed = usedCreators.has(video.author.id);

      // Penalizar repetición
      let diversityPenalty = 0;
      if (isCategoryUsed) diversityPenalty += 20;
      if (isCreatorUsed) diversityPenalty += 30;

      const finalScore = Math.max(0, item.score - diversityPenalty);

      if (finalScore > 50) { // Threshold mínimo
        result.push({ ...item, score: finalScore });
        usedCategories.add(video.category);
        usedCreators.add(video.author.id);
      }
    }

    return result.sort((a, b) => b.score - a.score);
  }

  // Aprendizaje automático en tiempo real
  updateUserProfile(user: UserProfile, newInteraction: any): UserProfile {
    // Actualizar preferencias basado en nueva interacción
    const updatedProfile = { ...user };

    // Aprender categorías preferidas
    if (!updatedProfile.preferredCategories.includes(newInteraction.category)) {
      updatedProfile.preferredCategories.push(newInteraction.category);
    }

    // Actualizar tiempo de visualización promedio
    const totalWatchTime = updatedProfile.watchHistory.reduce((sum, w) => sum + w.watchTime, 0);
    updatedProfile.averageWatchTime = (totalWatchTime + newInteraction.watchTime) / 
      (updatedProfile.watchHistory.length + 1);

    // Mantener historial limitado
    if (updatedProfile.watchHistory.length >= 1000) {
      updatedProfile.watchHistory = updatedProfile.watchHistory.slice(-900);
    }

    return updatedProfile;
  }
}

export const vrynoX = new VrynoXAlgorithm();