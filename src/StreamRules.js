// src/StreamRules.js
module.exports = {
  // 🪵 STREAMS: Registros sequenciais de eventos (Append-Only / XADD)
  streams: {
    // A linha do tempo central. O Core joga tudo aqui e o InfluxDB/Workers consomem.
    log: { key: 'kombi:stream:log', limit: 5000, type: 'RAW' }, 
    
    // Comando de atuadores (injeção de água, coolers, AC, etc.) mandados por Analytics/Core
    actuators: { key: 'kombi:stream:actuators', limit: 10, type: 'CONTROL' },
    
    // Analytics e Core publicam eventos de contexto para tomadas de decisão de segurança
    contention: { key: 'kombi:stream:contention', limit: 50, type: 'EVENT' }
  },

  // 📋 HASHES: O Estado do Momento / Foto de Bandeja (Chave-Valor / HSET)
  hashes: {
    // Guarda a última leitura viva de cada sensor. A tela lê direto daqui.
    engineState: { key: 'kombi:engine:state' }
  }
};