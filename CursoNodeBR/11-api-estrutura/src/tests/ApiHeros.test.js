const assert = require('assert');
const api = require('../api');

let app = {};
describe('Suite de testes da api heros', async function () {
    this.beforeAll(async () => {
        app = await api;
    });

    it('Listar /herois', async () => {
        const result = await app.inject({
            method: "GET",
            url: '/herois'
        });
        const dados = JSON.parse(result.payload);
        const statusCode = result.statusCode;

        assert.deepEqual(statusCode, 200);
        assert.ok(Array.isArray(dados));
    });
});