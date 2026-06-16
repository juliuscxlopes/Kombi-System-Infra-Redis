// App.js
const redis = require('./src/RedisConfig');
const { streams } = require('./src/StreamRules');
const subscriber = require('./src/StreamSubscriber');


async function bootstrap() {
  console.log("🏎️  [CONTROLLER] Iniciando Infra de Dados...");

  try {
    // 1. Check de sanidade
    await redis.client.ping();
    console.log("✅ [REDIS] Memurai/Redis detectado e pronto.");

    // 2. Ativar todos os listeners baseados no StreamRules
    // Isso transforma esse app no "Painel de Controle" total
    Object.keys(streams).forEach(alias => {
        subscriber.listen(alias, (payload) => {
        });
    });

    console.log("🚀 [CONTROLLER] Monitoramento global ativo.");

  } catch (err) {
    console.error("💥 [FATAL] Erro ao subir controller:", err.message);
    process.exit(1);
  }
}

bootstrap();