 Redis Controller & Stream Broker

Função
Este serviço atua como o Barramento de Dados Central (Message Broker) do KOMBI-SYSTEM. Ele é responsável por gerenciar a conexão única com a instância do Redis e padronizar como todos os outros serviços (Core, Analytics, WebApp) escrevem e leem dados.

🛠 Componentes do Módulo
1. RedisConfig.js (Singleton)
Papel: Gerenciador de conexão de baixo nível usando ioredis.

Resiliência: Implementa uma retryStrategy que escala de 50ms até 2 segundos, garantindo que o sistema tente reconectar automaticamente se o container cair.

Log: Monitora eventos de connect e error no console.

2. StreamRules.js (O Dicionário)
Finalidade: Centralizar as chaves e políticas de retenção das Streams para evitar conflitos de nomes.

Tipos de Dados:

STATE: Retenção 1 (apenas o último valor). Usado para o Dashboard em tempo real.

RAW: Dados brutos para processamento imediato (Log).

EVENT: Fila de eventos históricos (Alertas).

HISTORY: Dados acumulados para análise de tendência (Thermal/Health).

3. StreamSubscriber.js (Consumidor Genérico)
Mecânica: Utiliza o comando XREAD com a flag BLOCK.

Vantagem: Eficiência extrema. O processo fica dormindo (em espera) no servidor Redis até que um novo dado chegue, eliminando o uso desnecessário de CPU por polling.

Ponteiro (lastId): Utiliza o ID $ para iniciar a leitura apenas de novos dados a partir do momento em que o serviço sobe.