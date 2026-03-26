//KOMBI-SYSTEM/infra/RedisStream/src
const Redis = require('ioredis');
require('dotenv').config();

class RedisConfig {
  constructor() {
    this.client = new Redis({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD,
      retryStrategy: (times) => Math.min(times * 50, 2000),
    });

    this._initEvents();
  }

  _initEvents() {
    this.client.on('connect', () => console.log('🧠 [REDIS] Conexão estabelecida com o barramento.'));
    this.client.on('error', (err) => console.error('🚨 [REDIS] Erro de conexão:', err.message));
  }
}

// Exportamos a instância única (Singleton)
module.exports = new RedisConfig();