// src/StreamWriter.js
const redis = require('./RedisConfig');
const { streams, hashes } = require('./StreamRules');

class StreamWriter {
  /**
   * 🪵 Escreve na linha do tempo central (Stream - XADD)
   */
  async pushToLog(sensorName, data) {
    const config = streams.log;
    try {
      await redis.client.xadd(
        config.key,
        'MAXLEN', '~', config.limit,
        '*',
        'sensor', sensorName,
        'data', JSON.stringify({ ...data, ts: Date.now() })
      );
    } catch (err) {
      console.error(`❌ [REDIS-STREAM-ERROR] Falha ao gravar log de ${sensorName}:`, err.message);
    }
  }

  /**
   * 📋 Atualiza o Estado Atual de Bandeja (Hash - HSET)
   * O nome do sensor vira o FIELD dentro da hash única da Kombi
   */
  async updateState(sensorName, data) {
    const config = hashes.engineState;
    try {
      // HSET chave campo valor
      await redis.client.hset(
        config.key,
        sensorName,
        JSON.stringify({ ...data, ts: Date.now() })
      );
    } catch (err) {
      console.error(`❌ [REDIS-HASH-ERROR] Falha ao atualizar estado de ${sensorName}:`, err.message);
    }
  }

  /**
   * 🚀 COMBO TELEMETRIA: Executa o XADD e o HSET em paralelo (Fire-and-forget)
   * O Core só precisa chamar essa função!
   */
  telemetry(sensorName, data) {
    // Dispara as duas gravações na velocidade da RAM sem travar o event loop do Core
    this.pushToLog(sensorName, data);
    this.updateState(sensorName, data);
  }
}

module.exports = new StreamWriter();