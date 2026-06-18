// src/StreamRules.js
module.exports = {
  // 🪵 STREAMS: Registros sequenciais de eventos (Append-Only / XADD)
  streams: {
    // Linha do tempo central. Segura ~4 minutos de telemetria bruta a 20Hz.
    log: { key: 'kombi:stream:log', limit: 5000, type: 'RAW' },
    
    // Health Check Reativo: Onde as Specs carimbam as métricas e o Diagnosis.
    health: { key: 'kombi:stream:health', limit: 100, type: 'EVENT' },

    ALERTS: { key: 'kombi:stream:alerts', limit: 1000, type: 'EVENT' }

    
  },
  
  // 📋 HASHES: O Estado Atual Imediato (Snapshot / HSET)
  hashes: {
    // Guarda a última leitura viva de cada sensor (OIL_TEMP, CHT, RPM...).
    engineState: { key: 'kombi:engine:state' },

    actuatorsState: { key: 'kombi:actuators:state' }
  }
};