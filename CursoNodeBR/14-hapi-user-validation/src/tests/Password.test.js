const assert = require('assert');
const PasswordHelper = require('../helpers/PasswordHelper');

const SENHA = "Rick@123";
const HASH = "$2b$04$kV8Pp/42S.thWNDOuIX7F.h9y3NZvi9pcbjipUygGDdtkXth7G9uC";

describe.only('Suite de testes de password do usuário', async function () {
    it("Deve gerar um hash a partir de uma senha", async () => {
        const result = await PasswordHelper.hashPassword( SENHA );
        
        assert.ok(result.length > 10);
    });

    it("Deve comparar uma senha e um hash", async () => {
        const result = await PasswordHelper.comparePassword( SENHA, HASH );

        assert.ok(result);
    });
})