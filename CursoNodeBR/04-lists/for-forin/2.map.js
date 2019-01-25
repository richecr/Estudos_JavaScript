const service = require('./service');

Array.prototype.meuMap = function (callback) {
    const saida = [];
    for (let index = 0; index < this.length-1; index++) {
        const resultado = callback(this[index], index);
        saida.push(resultado);
    }

    return saida;
}

async function main() {
    try {
        const result = await service.obterPessoas('a');

        /*const names = result.results.map(function (pessoa) {
            return pessoa.name
        })*/

        // const names = result.results.map((pessoa) => pessoa.name);

        // Meu map.
        const names = result.results.meuMap((pessoa, indice) => `[${indice}]${pessoa.name}`)

        console.log('names: ', names);
    } catch (error) {
        console.error("ihh rapaz", error);
    }
}

main()