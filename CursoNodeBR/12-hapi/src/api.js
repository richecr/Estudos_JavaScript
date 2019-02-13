// npm i hapi
// npm i vision inert hapi-swagger

const Hapi = require('hapi');
const app = new Hapi.Server({
    port: 5000
});

// Bancos de dados.
const Context  = require('./db/strategies/base/ContextStrategy');
const Mongo = require('./db/strategies/mongodb/Mongo');
const HeroisSchema = require('./db/strategies/mongodb/Schemas/HeroisSchema');

// Routas.
const HeroRoute = require('./routes/HeroRoute'); 

const HapiSwagger = require('hapi-swagger');
const Vision = require('vision');
const Inert = require('inert');

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]());
}

async function main() {
    const connection = Mongo.connect();
    const context = new Context(new Mongo(connection, HeroisSchema));
    
    // Para a documentação da API.
    const swaggerOptions = {
        info: {
            title: "API HEROIS",
            version: 'v1.0'
        },
        lang: 'pt'
    }
    await app.register([
        Vision,
        Inert,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ])

    // Rotas.
    '[list(), create(), update(), delete()] => O mapRoutes, mas iria ficar um array dentro de outro, por isso a destruturação.'
    app.route(
        mapRoutes(new HeroRoute(context), HeroRoute.methods())
    );

    await app.start();
    console.log("Servidor rodando na porta: ", app.info.port);
    return app;
};

module.exports = main();