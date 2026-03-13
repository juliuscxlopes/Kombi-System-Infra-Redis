const redis = require('./RedisConfig');
const { streams } = require('./StreamRules');

class StreamWriter {
  /**
   * Publica dados aplicando a regra de MAXLEN definida em StreamRules
   */
  async push(alias, sensorName, data) {
    const config = streams[alias];
    
    if (!config) {
      console.error(`❌ [WRITER] Stream '${alias}' não mapeada.`);
      return;
    }

    try {
      // Usamos o seu padrão de campos: 'sensor' e 'data'
      await redis.client.xadd(
        config.key, 
        'MAXLEN', '~', config.limit, 
        '*', 
        'sensor', sensorName, 
        'data', JSON.stringify({ ...data, ts: Date.now() })
      );
    } catch (err) {
      console.error(`❌ [REDIS-WRITE] Erro em ${alias}:`, err.message);
    }
  }
}

module.exports = new StreamWriter();