const EventEmitter = require('events')

class MeuEmissor extends EventEmitter {

}

const meuEmissor = new MeuEmissor();
const nomeEvento = 'usuario:click';
meuEmissor.on(nomeEvento, function (click) {
    console.log("um usuário clicou: ", click);
})

meuEmissor.emit(nomeEvento, "barra de rolagem");
meuEmissor.emit(nomeEvento, "no ok");