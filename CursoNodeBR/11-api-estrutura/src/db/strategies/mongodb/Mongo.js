const ICrud = require('../Interfaces/ICrud');
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
    constructor(connection, schema) {
        super();
        this._connection = connection;
        this._schema = schema;
    }

    async isConnected() {
        const state = STATUS[this._connection.readyState];
        if (state === "Conectado") {
            return state;
        }
        if (state !== "Conectando") {
            return state;
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
        return STATUS[this._connection.readyState];;
    }

    static connect() {
        Mongoose.connect('mongodb://rickelton:minhasenhasecreta@localhost:27017/herois',
                        { useNewUrlParser: true },
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
        return connection;
    }

    async create(item) {
        return await this._schema.create(item);
    }

    async read(query) {
        const result = await this._schema.find(query);
        return result;
    }

    async update(query, item) {
        await this._schema.updateOne(query, { $set: item });
    }

    async delete(query) {
        return this._schema.deleteOne(query);
    }
}

module.exports = MongoDB;