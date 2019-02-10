const assert = require('assert');
const Mongo = require('../db/strategies/Mongo');
const Context = require('../db/strategies/base/ContextStrategy');

const context = new Context(new Mongo());

describe("Mongo strategy", function () {
    this.beforeAll(async () => {
        await context.connect();
    })
    
    it('Verificar conexão', async () => {
        const result = await context.isConnected();
        const expect = "Conectado";
        assert.deepEqual(result, expect);
    });
})