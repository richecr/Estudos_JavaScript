const express = require('express');

const app = express();

/**
 * 'req': Todo tipo de informação: ip, autentificação, usuário e etc.
 * 'res': É a resposta que o servidor vai dar ao usuario.
 */
// Rota raiz.
app.get('/', (req, res) =>{
    res.send("Hello, world!");
});

// Ouvindo a porta '3001' do meu navegador.
app.listen(3001);

