const Mongoose = require('mongoose');

Mongoose.connect('mongodb://rickelton:minhasenhasecreta@localhost:27017/herois',
    {
        useNewUrlParser: true
    },
    function (error) {
        if (!error) {
            return ;
        } else {
            console.log("Erro na conexão", error);
        }
    }
);

const connection = Mongoose.connection;
connection.once('open', () => console.log("DataBase rodando..."));

setTimeout(() => {
    const state = connection.readyState;
    console.log('state', state);
}, 1000);

/**
 * State:
 *      0: Desconectado.
 *      1: Conectado.
 *      2: Conectando.
 *      3: Desconectando.
 */

const heroiSchema = new Mongoose.Schema({
    nome: {
        type: String,
        require: true // Obrigatório.
    },
    poder: {
        type: String,
        require: true
    },
    insertAt: {
        type: Date,
        default: new Date()
    }
})

const model = Mongoose.model('herois', heroiSchema);

async function main() {
    // Cadastrar
    /*const resultCadastrar = await model.create({
        nome: "Flash",
        poder: "Velocidade"
    });
    console.log(resultCadastrar);*/

    // Listar.
    const listItens = await model.find();
    console.log(listItens);
}

main();