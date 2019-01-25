const { obterPessoas } = require("./service");

Array.prototype.meuReduce = function (callback, valorInicial) {
    let valorFinal = typeof valorInicial !== undefined ? valorInicial : this[0];
    for (let index = 0; index <= this.length - 1; index++) {
        valorFinal = callback(valorFinal, this[index], this);
    }
    return valorFinal;
}

async function main() {
    try {
        const { results } = await obterPessoas("a");

        const pesos = results.map((pessoa) => parseInt(pessoa.height))

        /*const total = pesos.reduce((anterior, proximo) => {
            return anterior + proximo;
        })*/

        const minhaLista = [
            ['Rick', "Elton"],
            ["Pedro", "Rosiene"]
        ]
        const total = minhaLista.meuReduce((anterior, proximo) => {
            return anterior.concat(proximo);
        }, []).join(',');

        console.log("total: ", total);

        const totalSoma = pesos.meuReduce((anterior, proximo) => {
            return anterior + proximo;
        }, 0)

        console.log("Soma total: ", totalSoma);

    } catch (error) {
        console.error("Ihh rapaz", error);
    }
}

main();