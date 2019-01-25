const { obterPessoas } = require("./service");

async function main() {
    try {
        const { results } = await obterPessoas("a");

        const pesos = results.map((pessoa) => parseInt(pessoa.height))

        const total = pesos.reduce((anterior, proximo) => {
            return anterior + proximo;
        })

        console.log("total: ", total);

    } catch (error) {
        console.error("Ihh rapaz", error);
    }
}

main();