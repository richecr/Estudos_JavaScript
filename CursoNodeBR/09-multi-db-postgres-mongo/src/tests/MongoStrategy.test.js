const assert = require('assert');
const Mongo = require('../db/strategies/Mongo');
const Context = require('../db/strategies/base/ContextStrategy');

const context = new Context(new Mongo());

const MOCK_CADASTRAR = {
    nome: 'Batman',
    poder: 'Velocidade'
};

describe("Mongo strategy", function () {
    this.beforeAll(async () => {
        await context.connect();
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


})