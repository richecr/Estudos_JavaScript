// vamos começar, carregando o express e criando a app
const app = require('express')(),
      path = require('path')

// então, criamos uma rota para '/'
app.get('/', (req, res) => {
  // aqui precisamos enviar o index.html para o cliente
  res.sendFile(path.join(__dirname + '/index.html'))
})

// no fim, iniciamos o serviço na porta 8001
app.listen(8001)
console.log('8001 é a porta mágica!')