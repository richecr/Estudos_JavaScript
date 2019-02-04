const { readFile, writeFile } = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class DataBase {
    constructor() {
        this.NOME_ARQUIVO = 'herois.json';
    }

    async obterDadosArquivo() {
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf-8');
        return JSON.parse(arquivo.toString())
    }

    async escreverDados(dados) {
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados))
        return true;
    }

    async cadastrar(heroi) {
        const dados = await this.obterDadosArquivo()
        const id = heroi.id <= 2 ? heroi.id : Date.now()
        const heroiCompleto = {
            id,
            ...heroi
        }

        const dadosCompleto = [
            ...dados,
            heroiCompleto
        ]

        const resultado = await this.escreverDados(dadosCompleto);
        return resultado;
    }

    async listar(id) {
        const dados = await this.obterDadosArquivo();
        const dadosFiltrados = dados.filter( item => (id ? (item.id === id) : true) );
        return dadosFiltrados;
    }

}

module.exports = new DataBase();