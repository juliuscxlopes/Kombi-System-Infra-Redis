// App.js
const redis = require('./src/RedisConfig');
const { streams } = require('./src/StreamRules');


async function bootstrap() {
  console.log("🏎️  [CONTROLLER] Iniciando Infra de Dados...");

  try {
    // 1. Check de sanidade
    await redis.client.ping();
    console.log("✅ [REDIS] Memurai/Redis detectado e pronto.");

    console.log("🚀 [CONTROLLER] Monitoramento global ativo.");
    console.log("🚀 [CONTROLLER] Testando alterações no Redis...");

  } catch (err) {
    console.error("💥 [FATAL] Erro ao subir controller:", err.message);
    process.exit(1);
  }
}

bootstrap();