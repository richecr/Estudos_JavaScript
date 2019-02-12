const assert = require('assert');
const api = require('../api');

const MOCK_CADASTRAR = {
    nome: "Chapolin",
    poder: "Todos"
};

let app = {};
describe('Suite de testes da api heros', async function () {
    this.beforeAll(async () => {
        app = await api;
    });

    it('Listar GET - /herois', async () => {
        const result = await app.inject({
            method: "GET",
            url: '/herois'
        });
        const dados = JSON.parse(result.payload);
        const statusCode = result.statusCode;

        assert.deepEqual(statusCode, 200);
        assert.ok(Array.isArray(dados));
    });

    it('Listar GET - /herois - deve listar somente 3 registros', async () => {
        const TAMANHO_LIMITE = 3;
        const result = await app.inject({
            method: "GET",
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        });

        const dados = JSON.parse(result.payload);
        const statusCode = result.statusCode;
        
        assert.deepEqual(statusCode, 200);
        assert.ok(dados.length === TAMANHO_LIMITE);
    });

    it('Listar GET - /herois - deve filtrar um item', async () => {
        const TAMANHO_LIMITE = 3;
        const NOME = "Laterna Verde";
        const result = await app.inject({
            method: "GET",
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}&nome=${NOME}`
        });

        const dados = JSON.parse(result.payload);
        const statusCode = result.statusCode;
        
        assert.deepEqual(statusCode, 200);
        assert.deepEqual(dados[0].nome, NOME);
    });

    it('Listar GET - /herois limite sendo inválido', async () => {
        const TAMANHO_LIMITE = "OPA";
        const result = await app.inject({
            method: "GET",
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        });

        const errorResult = {
            "statusCode": 400,
            "error": "Bad Request",
            "message": "child \"limit\" fails because [\"limit\" must be a number]",
            "validation": {
                "source":"query",
                "keys":["limit"]
            }
        };

       assert.deepEqual(result.statusCode, 400);
       assert.deepEqual(result.payload, JSON.stringify(errorResult))
    });

    it('Cadastrar POST - /herois', async () => {
        const result = await app.inject({
            method: "POST",
            url: `/herois`,
            payload: MOCK_CADASTRAR
        });

        const statusCode = result.statusCode;
        const { message, _id } = JSON.parse(result.payload);
        
        assert.ok(statusCode === 200);
        assert.notStrictEqual(_id, undefined);
        assert.deepEqual(message, "Heroi cadastrado com sucesso!");
    });
});