

url = 'https://www.rstransitarios.com.br/';

const autocannon = require('autocannon');


// Configuração para teste de carga
const loadTest = autocannon({
  url: url,
  connections: 5000, // aumenta o número de conexões simultâneas
  pipelining: 50, // aumenta o número de pipelines
  duration: '30s', // aumenta o tempo de duração do teste
  amount: 5000000, // aumenta o número de solicitações realizadas
});

// Evento para tratar as respostas das requisições
loadTest.on('response', (client, statusCode, resBytes, responseTime) => {
  console.log(`Status code: ${statusCode}`);
  console.log(`Response time: ${responseTime} ms`);
});

// Evento para tratar o fim do teste de carga
loadTest.on('done', (result) => {
  console.log(result);
});

// Configuração para teste de segurança
const securityTest = autocannon({
  url: url,
  connections: 500, // aumenta o número de conexões simultâneas
  pipelining: 50, // aumenta o número de pipelines
  duration: '1m', // aumenta o tempo de duração do teste
  amount: 50000, // aumenta o número de solicitações realizadas
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:58.0) Gecko/20100101 Firefox/58.0',
    'Referer': url,
    'Cookie': 'session_id=1234567890',
  },
});

// Evento para tratar as respostas das requisições do teste de segurança
securityTest.on('response', (client, statusCode, resBytes, responseTime) => {
  console.log(`Status code: ${statusCode}`);
  console.log(`Response time: ${responseTime} ms`);
});

// Evento para tratar o fim do teste de segurança
securityTest.on('done', (result) => {
  console.log(result);
});

// Inicia os testes de carga e segurança
autocannon.track(loadTest, {renderProgressBar: true});
autocannon.track(securityTest, {renderProgressBar: true});








