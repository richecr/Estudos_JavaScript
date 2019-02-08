const assert = require('assert');
const Postgres = require('../db/strategies/Postgres');
const Context = require('../db/strategies/base/ContextStrategy');

const context = new Context(new Postgres());
const MOCK_HEROI_CADASTRAR = {
    nome: 'Gaviao Negro',
    poder: 'flexas'
};

describe('postgres strategy', function() {
    this.timeout(Infinity);

    this.beforeAll(async function () {
        await context.connect();
    });

    it('Postgres Connection', async function() {
        const result = await context.isConnected();
        assert.equal(result, true);
    })

    it('Cadastrar um heroi', async function() {
        const result = await context.create( MOCK_HEROI_CADASTRAR );
        delete result.id;
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR);
    })

    it('Buscar por um heroi', async function () {
        const [result] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome });
        delete result.id;
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR);
    })
})