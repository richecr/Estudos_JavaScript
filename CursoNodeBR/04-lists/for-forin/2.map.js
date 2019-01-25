const service = require('./service');

async function main() {
    try {
        const result = await service.obterPessoas('a');

        /*const names = result.results.map(function (pessoa) {
            return pessoa.name
        })*/

        const names = result.results.map((pessoa) => pessoa.name);

        console.log('names: ', names);
    } catch (error) {
        console.error("ihh rapaz", error);
    }
}

main()