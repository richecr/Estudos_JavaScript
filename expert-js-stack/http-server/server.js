// vamos importar os módulos http e filesystem
const http = require('http'), fs = require('fs')

// então, criamos o servidor http
http.createServer((req, res) => {
  // esse é o cabeçalho da nossa resposta
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Access-Control-Allow-Origin' : '*'
  })
  // leremos o index.html
  let readStream = fs.createReadStream(__dirname + '/index.html')
  // então, enviamos ele para o cliente
  readStream.pipe(res)
}).listen(8000)

// no fim, informamos o endpoint para o usuário
console.log('Visite-me em: http://localhost:8000')