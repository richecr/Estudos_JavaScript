const ICrud = require('../strategies/Interfaces/ICrud');
const Mongoose = require('mongoose');

/**
 * State:
 *      0: Desconectado.
 *      1: Conectado.
 *      2: Conectando.
 *      3: Desconectando.
 */
const STATUS = {
    0: "Desconectado",
    1: "Conectado",
    2: "Conectando",
    3: "Desconectando",
};

class MongoDB extends ICrud {
    constructor() {
        super();
        this._herois = null;
    }

    async isConnected() {
        const state = STATUS[Mongoose.connection.readyState];
        if (state === "Conectado") {
            return state;
        }
        if (state !== "Conectando") {
            return state;
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
        return STATUS[Mongoose.connection.readyState];;
    }

    defineModel() {
        const heroisSchema = new Mongoose.Schema({
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
        });
        this._herois = Mongoose.model('herois', heroisSchema);
    }

    async connect() {
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
                        });
        const connection = Mongoose.connection;
        connection.once('open', () => console.log("DataBase rodando..."));
        await this.defineModel();
    }

    async create(item) {
        return await this._herois.create(item);
    }
}

module.exports = MongoDB;