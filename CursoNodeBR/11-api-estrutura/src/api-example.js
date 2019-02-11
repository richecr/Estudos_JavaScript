// npm i hapi
const Hapi = require('hapi');
const app = new Hapi.Server({
    port: 5000
});

const Context  = require('./db/strategies/base/ContextStrategy');
const Mongo = require('./db/strategies/mongodb/Mongo');
const HeroisSchema = require('./db/strategies/mongodb/Schemas/HeroisSchema');

async function main() {
    const connection = Mongo.connect();
    const context = new Context(new Mongo(connection, HeroisSchema));
    app.route([
        {
            path: '/herois',
            method: 'GET',
            handler: (request, head) => {
                return context.read();
            }
        }
    ]);

    await app.start();
    console.log("Servidor rodando na porta: ", app.info.port);
};

main();