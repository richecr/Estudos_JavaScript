const assert = require('assert');
const Mongo = require('../db/strategies/Mongo');
const Context = require('../db/strategies/base/ContextStrategy');

const context = new Context(new Mongo());

const MOCK_CADASTRAR = {
    nome: 'Batman',
    poder: 'Dinheiro'
};

const MOCK_ATUALIZAR = {
    nome: 'Flash',
    poder: 'Rápido'
};

const MOCK_DELETAR = {
    nome: 'Homem de Ferro',
    poder: 'Lata'
}

describe("Mongo strategy", function () {
    this.beforeAll(async () => {
        await context.connect();
        await context.create(MOCK_ATUALIZAR);
        await context.create(MOCK_DELETAR);
    })
    
    it('Verificar conexão', async () => {
        const result = await context.isConnected();
        const expect = "Conectado";
        assert.deepEqual(result, expect);
    });

    it('Cadastrar um heroi', async () => {
        const { nome, poder } = await context.create( MOCK_CADASTRAR );
        
        assert.deepEqual({ nome, poder }, MOCK_CADASTRAR);
    });

    it('Listar herois', async () => {
        const { nome, poder } = await context.read({ nome: 'Batman' });
        assert.deepEqual({nome, poder}, MOCK_CADASTRAR);
    });

    it('Atualizar um heroi', async () => {
        await context.update({ nome: 'Flash'}, { poder: "Velocidade" });
        const { nome, poder } = await context.read({ nome: "Flash" });
        assert.deepEqual({ nome, poder }, { nome: "Flash", poder: "Velocidade"});
    });

    it('Deletando um heroi', async () => {
        const result = await context.delete({nome: 'Homem de Ferro'});
        assert.deepEqual(result.n, 1);
    });
})