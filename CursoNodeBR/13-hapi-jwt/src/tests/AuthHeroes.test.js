const assert = require('assert');
const api = require('../api');

let app = {};

describe('Auth test suite', async function () {
    this.beforeAll(async () => {
        app = await api;
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
    
});