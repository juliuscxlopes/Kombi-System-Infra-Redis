//src/StreamRules.js
module.exports = {
  // Centralizamos aqui para que Analytics e Core falem a mesma língua
  streams: {
    log:      { key: 'kombi:stream:log',      limit: 1,   type: 'RAW' }, // É a stream de log, onde tudo é publicado.. servidor influx final.. Recebe no via cabo publica no worker do core e é o registro fisico de tudo o que acontece.
    engine:   { key: 'kombi:stream:engine',   limit: 1,   type: 'STATE' }, // Analyticas Le e alimenta Health - Alerts
    electric: { key: 'kombi:stream:electric', limit: 1,   type: 'STATE' }, // Analyticas Le e alimenta Health - Alerts
    actuators:{ key: 'kombi:stream:actuators',limit: 10,  type: 'CONTROL' }, //atuadores comandados por analytics e por core.
    alerts:   { key: 'kombi:stream:alerts',   limit: 50,  type: 'EVENT' }, // APPDIsplay le e publica alertas
    contention:{ key: 'kombi:stream:contention',limit: 10,  type: 'EVENT' }, // Analytics e core publicam eventos de contexto que alimentam tomadas de decisão.
    health:   { key: 'kombi:stream:health',   limit: 600, type: 'HISTORY' }, // gerencia estados de saude e alimenta tomadas de decisão do analytics
    
  }
};