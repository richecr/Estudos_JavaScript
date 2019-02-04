const { deepEqual, ok } = require('assert');

const DataBase = require('./DataBase');

const DEFAULT_ITEM_CADASTRAR = { nome: 'Flash', poder:"Speed", id: 1 };

describe("Suite de manipulação de herois", () => {

    it("Deve cadastrar um heroi usando arquivos", async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        const resultado = await DataBase.cadastrar(DEFAULT_ITEM_CADASTRAR)
        const [actual] = await DataBase.listar(DEFAULT_ITEM_CADASTRAR.id)

        deepEqual(actual, expected);
    })

    it("Deve pesquisar um heroi usando arquivos", async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        const [resultado] = await DataBase.listar(expected.id)
        deepEqual(resultado, expected);
    })

})