const assert = require('assert');
const Postgres = require('../db/strategies/postgres/Postgres');
const Context = require('../db/strategies/base/ContextStrategy');
const HeroisSchema = require('../db/strategies/postgres/Schema/HeroisSchema');

let context = {};

const MOCK_HEROI_CADASTRAR = {
    nome: 'Gaviao Negro',
    poder: 'flexas'
};

const MOCK_HEROI_ATUALIZAR = {
    nome: 'Homem-Aranha',
    poder: 'Ser nerd'
};

describe('postgres strategy', function() {
    this.timeout(Infinity);

    this.beforeAll(async function () {
        const connection = await Postgres.connect();
        const model = await Postgres.defineModel(connection, HeroisSchema);
        context = new Context(new Postgres(connection, model));
        //await context.delete();
        await context.create(MOCK_HEROI_ATUALIZAR);
    });

    it('Postgres Connection', async function() {
        const result = await context.isConnected();
        assert.equal(result, true);
    });

    it('Cadastrar um heroi', async function() {
        const result = await context.create( MOCK_HEROI_CADASTRAR );
        delete result.id;
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR);
    });

    it('Buscar por um heroi', async function () {
        const [result] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome });
        delete result.id;
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR);
    });

    it('Atualizar um heroi', async function () {
        const [itemAtualizar] = await context.read({ nome: MOCK_HEROI_ATUALIZAR.nome });
        const novoItem = {
            ...MOCK_HEROI_ATUALIZAR,
            nome: 'Mulher-Maravilha'
        };
        const [result] = await context.update(itemAtualizar.id, novoItem);
        const [itemAtualizado] = await context.read({ id: itemAtualizar.id });
        assert.deepEqual(itemAtualizado.nome, novoItem.nome);
        assert.deepEqual(result, 1);
    });

    it('Deletar um heroi', async function () {
        const [item] = await context.read({});

        const result = await context.delete(item.id);
        assert.deepEqual(result, 1);
    })
})