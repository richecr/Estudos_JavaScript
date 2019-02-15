// npm i hapi
// npm i vision inert hapi-swagger
// npm i hapi-auth-jwt2

// npm i bcrypt

// npm i dotenv
// Configurações para produção.
const { config } = require('dotenv');
const { join } = require('path');
const { ok } = require('assert');

const env = process.env.NODE_ENV || "dev";
ok(env === "prod" || env === "dev", "A env é inválida, ou dev ou prod");

const configPath = join(__dirname, './config', `.env.${env}`);
config({
    path: configPath
});


const Hapi = require('hapi');
// Bancos de dados.
const Context  = require('./db/strategies/base/ContextStrategy');
const Mongo = require('./db/strategies/mongodb/Mongo');
const HeroisSchema = require('./db/strategies/mongodb/Schemas/HeroisSchema');

const Postgres = require('./db/strategies/postgres/Postgres');
const UserSchema = require('./db/strategies/postgres/Schema/UserSchema');

// Rotas.
const HeroRoute = require('./routes/HeroRoute');
const AuthRoute = require('./routes/AuthRoute');

const HapiSwagger = require('hapi-swagger');
const Vision = require('vision');
const Inert = require('inert');

// Validação das requisições.
const JWT_SECRET = process.env.JWT_SECRET;
const HapiJWT = require('hapi-auth-jwt2');

// Para a documentação da API.
const swaggerOptions = {
    info: {
        title: "API HEROIS",
        version: 'v1.0'
    },
    lang: 'pt'
}

const app = new Hapi.Server({
    port: process.env.PORT
});

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]());
}

async function main() {
    // MongoDB
    const connection = Mongo.connect();
    const context = new Context(new Mongo(connection, HeroisSchema));
    
    // PostGres
    const connectionPost = await Postgres.connect();
    const model = await Postgres.defineModel(connectionPost, UserSchema);
    const contextPostGres = new Context(new Postgres(connectionPost, model));

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
        validate: async (dado, request) => {
            // Verifica se o usuario esta cadastrado no banco.
            const [result] = await contextPostGres.read({
                username: dado.username.toLowerCase()
            });
            if (!result) {
                return {
                    isValid: false
                }
            }

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
        ...mapRoutes(new AuthRoute(JWT_SECRET, contextPostGres), AuthRoute.methods())
    ]);

    await app.start();
    console.log("Servidor rodando na porta: ", app.info.port);
    return app;
};

module.exports = main();