const autocannon = require('autocannon');
const url = 'https://www.rstransitarios.com.br/';

// Valida a URL de entrada
if (!/^https?:\/\//i.test(url)) {
  throw new Error('A URL deve começar com "http://" ou "https://"');
}
var teste = true
// Configuração para teste de segurança
const securityTest = autocannon({
  url,
  connections: 5000,
  pipelining: 50,
  duration: '1m',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:58.0) Gecko/20100101 Firefox/58.0',
    'Referer': url,
    'Cookie': 'session_id=1234567890',
  },
  // Configura um timeout para as requisições
  timeout: 10000,
  // Configura um limite de tamanho para as respostas
  maxResponseSize: 1024 * 1024, // 1 MB
});

// Evento para tratar as respostas das requisições do teste de segurança
securityTest.on('response', (client, statusCode, resBytes, responseTime) => {
  console.log(`Status code: ${statusCode}`);
  console.log(`Response time: ${responseTime} ms`);
});

securityTest.on('done', (result) => {
  teste = true
  console.log(result);
});
// Evento para tratar erros na requisição
securityTest.on('error', (err) => {
  console.error(err);
});

// Loop infinito para execução contínua do teste de carga e segurança
while (teste == true) {
  console.log('é igual')
  autocannon.track(securityTest, { renderProgressBar: true });
  teste = false
}
