// npm i hapi
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

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]());
}

async function main() {
    const connection = Mongo.connect();
    const context = new Context(new Mongo(connection, HeroisSchema));
    
    '[list(), create(), read()] => O mapRoutes, mas iria ficar um array dentro de outro, por isso a destruturação.'
    app.route([
        ...mapRoutes(new HeroRoute(context), HeroRoute.methods())
    ]);

    await app.start();
    console.log("Servidor rodando na porta: ", app.info.port);
    return app;
};

module.exports = main();