//src/StreamRules.js
module.exports = {
  // Centralizamos aqui para que Analytics e Core falem a mesma língua
  streams: {
    log:      { key: 'kombi:stream:log',      limit: 1,   type: 'RAW' },
    engine:   { key: 'kombi:stream:engine',   limit: 1,   type: 'STATE' },
    electric: { key: 'kombi:stream:electric', limit: 1,   type: 'STATE' },
    alerts:   { key: 'kombi:stream:alerts',   limit: 50,  type: 'EVENT' },
    data:     { key: 'kombi:stream:data',     limit: 200, type: 'PERSISTENCE' }, 
    health:   { key: 'kombi:stream:health',   limit: 600, type: 'HISTORY' },
    thermal:  { key: 'kombi:stream:thermal',  limit: 600, type: 'HISTORY' },
    actuators:{ key: 'kombi:stream:actuators',limit: 10,  type: 'CONTROL' }
  }
};