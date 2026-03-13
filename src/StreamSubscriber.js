// StreamSubscriber.js
const redis = require('./RedisConfig');
const { streams } = require('./StreamRules');

class StreamSubscriber {
  async listen(alias, callback) {
    const config = streams[alias];
    if (!config) return;

    // Usamos '$' para pegar só o que chegar APÓS o início do script
    let lastId = '$'; 

    console.log(`👂 [SUB] Monitorando: ${config.key}`);

    while (true) {
      try {
        // O BLOCK 5000 mantém a conexão 'em espera' no servidor. 
        // Não gasta CPU do seu PC nem banda de rede enquanto não houver dado.
        const results = await redis.client.xread('BLOCK', 5000, 'STREAMS', config.key, lastId);
        
        if (results) {
          const messages = results[0][1];
          for (const [id, fields] of messages) {
            const messageObject = {};
            for (let i = 0; i < fields.length; i += 2) {
                messageObject[fields[i]] = fields[i + 1];
            }
            
            try {
                const payload = JSON.parse(messageObject.data);
                payload.sensor = messageObject.sensor;
                payload.id = id; // Opcional: ID único da mensagem no Redis
                
                // Dispara o callback (Lógica de negócio)
                callback(payload);
            } catch (e) {
                console.error("⚠️ [PARSE ERROR] Dado corrompido na stream.");
            }
            
            lastId = id; // Move o ponteiro para a próxima mensagem
          }
        }
      } catch (err) {
        if (err.message.includes('unknown command')) {
            console.error(`🚨 [REDIS VERSION ERROR] O comando '${err.message.split("'")[1]}' não existe. Verifique se o Redis é 5.0+`);
            break; // Mata o loop se o Redis for incompatível
        }
        
        console.error(`❌ [SUB] Erro em ${alias}:`, err.message);
        await new Promise(r => setTimeout(r, 5000)); // Espera 5s antes de tentar reconectar
      }
    }
  }
}
module.exports = new StreamSubscriber();