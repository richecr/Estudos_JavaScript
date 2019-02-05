const commander = require('commander');
const DataBase = require('./DataBase');
const Heroi = require('./Heroi');

async function main() {
    commander
        .version('v1.0.0')
        .option('-n, --nome [value]', "Nome do Heroi")
        .option('-p, --poder [value]', "Poder do Heroi")
        .option('-i, --id [value]', "Id do Heroi")

        .option('-c, --cadastrar', "Cadastrar um Heroi")
        .option('-l, --listar', "Listar os heroi")
        .option('-r, --remover', "Remover um heroi pelo ID")
        .option('-a, --atualizar [value]', "Atualizar um heroi pelo ID")
        .parse(process.argv);
    
        const heroi = new Heroi(commander);
    try {
        if (commander.cadastrar) {
            // para o metodo de cadastrar consiga criar o proprio ID.
            delete heroi.id;

            const resultado = await DataBase.cadastrar(heroi);
            if (!resultado) {
                console.error("Heroi não cadastrado! :(");
                return;
            }
            console.log("Heroi cadastrado com sucesso!");
        }

        if (commander.listar) {
            const resultado = await DataBase.listar();
            console.log( resultado );
        }

        if (commander.remover) {
            const resultado = await DataBase.remover(heroi.id);
            if (!resultado) {
                console.error("Não foi possuir remover o heroi! :(");
                return;
            }
            console.log("Heroi removido com sucesso!");
        }

        if (commander.atualizar) {
            const idParaAtualizar = parseInt(commander.atualizar);
            delete heroi.id;

            const dado = JSON.stringify(heroi);
            const heroiAtualizado = JSON.parse(dado);
            
            const resultado = await DataBase.atualizar(idParaAtualizar, heroiAtualizado);
            if (!resultado) {
                console.error("Error... :(");
                return;
            }
            console.log("Heroi atualizado com sucesso!");
        }
    } catch (error) {
        console.error("Deu ruim :(", error);
    }
};

main();