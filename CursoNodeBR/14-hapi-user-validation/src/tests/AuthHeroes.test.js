const assert = require('assert');
const api = require('../api');
const Context = require('../db/strategies/base/ContextStrategy');
const PostGres = require('../db/strategies/postgres/Postgres');
const UserSchema = require('../db/strategies/postgres/Schema/UserSchema');

let app = {};
const USER = {
    username: "Brucewayne",
    password: "batman123"
};

// usuário no banco(Simulando um usuário)
const USER_DB = {
    username: USER.username.toLowerCase(),
    password: '$2b$04$jYfHdQI.N8CpbLi58JnXKu7uf7Tjr7oFGqKj6MWFh1.qO9bDMXfHu'
}

describe('Auth test suite', async function () {
    this.beforeAll(async () => {
        app = await api;
        
        const connectPostgres = await PostGres.connect();
        const model = await PostGres.defineModel(connectPostgres, UserSchema);
        const postgres = new Context(new PostGres(connectPostgres, model));
        await postgres.update(null, USER_DB, true);
    });

    it('Deve obter um token', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                username: 'BruceWayne',
                password: 'batman123'
            }
        });

        const statusCode = result.statusCode;
        const dados = JSON.parse(result.payload);
        
        assert.deepEqual(statusCode, 200);
        assert.ok(dados.token.length > 10);
    });

    it('Deve retornar um erro ao tentar logar com user errado', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                username: 'RickElton',
                password: 'batman123'
            }
        });
        const statusCode = result.statusCode;
        const dados = JSON.parse(result.payload);
        
        assert.deepEqual(statusCode, 401);
        assert.deepEqual(dados.error, "Unauthorized");
    });
    
});