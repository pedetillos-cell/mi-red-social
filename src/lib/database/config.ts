// Configuración de base de datos SIMPLIFICADA
// (Para desarrollo sin PostgreSQL instalado)

export const dbConfig = {
  // Configuración básica
  isConnected: false,
  type: 'simulated' as const,
  
  // Simular conexión para desarrollo
  simulateConnection: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dbConfig.isConnected = true;
        console.log('✅ Conexión a base de datos simulada (Modo desarrollo)');
        resolve(true);
      }, 1000);
    });
  },
  
  // Simular queries
  query: async (text: string, params?: any[]) => {
    console.log('📦 Query simulado:', text.substring(0, 100) + '...');
    return { rows: [], rowCount: 0 };
  },
  
  // Health check simulado
  healthCheck: async () => {
    return dbConfig.isConnected;
  },
  
  // Simular close
  close: () => {
    dbConfig.isConnected = false;
    console.log('🔌 Conexión a base de datos cerrada (Simulación)');
  }
};

// Exportar configuración simulada
export const database = dbConfig;
export default database;