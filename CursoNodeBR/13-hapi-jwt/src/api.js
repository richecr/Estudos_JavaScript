// npm i hapi
// npm i vision inert hapi-swagger
// npm i hapi-auth-jwt2

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
const AuthRoute = require('./routes/AuthRoute');

const HapiSwagger = require('hapi-swagger');
const Vision = require('vision');
const Inert = require('inert');

// Validação das requisições.
const JWT_SECRET = 'MEU_SECREDO_SECRETO';
const HapiJWT = require('hapi-auth-jwt2');

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
        HapiJWT,
        Vision,
        Inert,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ])

    app.auth.strategy('jwt', 'jwt', {
        key: JWT_SECRET,
        // options: {
        //     expiresIn: 20,
        // }
        validate: (dado, request) => {
            // verifica no banco se usuário ta ativo.
            // verifica no banco se usuário continua pagando.
            return {
                isValid: true // Caso não válido(false).
            }
        }
    });

    app.auth.default('jwt');
    // Rotas.
    '[list(), create(), update(), delete()] => O mapRoutes, mas iria ficar um array dentro de outro, por isso a destruturação.'
    app.route([
        ...mapRoutes(new HeroRoute(context), HeroRoute.methods()),
        ...mapRoutes(new AuthRoute(JWT_SECRET), AuthRoute.methods())
    ]);

    await app.start();
    console.log("Servidor rodando na porta: ", app.info.port);
    return app;
};

module.exports = main();