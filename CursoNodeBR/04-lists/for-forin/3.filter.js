const { obterPessoas } = require('./service');

Array.prototype.meuFilter = function (callback) {
    const saida = [];
    for (let index = 0; index < this.length-1; index++) {
        const result = callback(this[index], index, this);
        if (result) {
            saida.push(this[index]);
        }
    }

    return saida;
}

async function main() {
    try {
        const { results } = await obterPessoas('a');

        /*const familiaLars = results.filter(function (item) {
            const result = item.name.toLowerCase().indexOf('lars') !== -1;
            return result;
        })*/

        const familiaLars = results.meuFilter((pessoa, indice, lista) => {
            return pessoa.name.toLowerCase().indexOf('lars') !== -1;
        })

        const names = familiaLars.map((pessoa) => pessoa.name);
        console.log('names: ', names);
    } catch (error) {
       Console.error("ihh rapaz", error); 
    }
}

main();