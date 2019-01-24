
const util = require("util");
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario() {
    return new Promise(function resolvePromisse(resolve, reject) {
        setTimeout(() => {
            return resolve({
                id: 1,
                nome: "Rick",
                nascimento: new Date()
            })
        }, 1000)
    })
}

function obterTelefone(idUsuario) {
    return new Promise(function resolverPromisse(resolve, reject) {
        setTimeout(() => {
            return resolve({
                telefone: "12456",
                ddd: 111
            })
        }, 1000)  
    })
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: "João Sergio",
            numero: 000
        })
    })
}

async function main() {
    try {
        const usuario = await obterUsuario();
        // const telefone = await obterTelefone(usuario.id);
        // const endereco = await obterEnderecoAsync(usuario.id);
        
        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])
        const telefone = resultado[0];
        const endereco = resultado[1];

        console.log(`
            Nome: ${usuario.nome},
            Telefone: (${telefone.ddd}), ${telefone.telefone}
            Endereco: ${endereco.rua}, ${endereco.numero}
        `);
        
    } catch (error) {
        console.log("Ihh rapaz", error);
    }
}

main();

/*
const usuarioPromisse = obterUsuario()

usuarioPromisse
    .then(function (usuario) {
        return obterTelefone(usuario.id)
            .then(function resolveTelefone(result) {
                return {
                    usuario : {
                        nome : usuario.nome,
                        id : usuario.id
                    },
                    telefone: result
                }
            })
    })
    .then(function (resultado){
        const endereco = obterEnderecoAsync(resultado.usuario.id);
        return endereco
            .then(function resolveEndereco(result) {
                return {
                    usuario : resultado.usuario,
                    telefone : resultado.telefone,
                    endereco : result
                }
            })
    })
    .then(function (resultado) {
        console.log("Resultado: ", resultado);
    })
    .catch(function (error) {
        console.error("Ihh rapaz", error);
    })
*/

/*obterUsuario(function resolverUsuario(erro, usuario) {
    if (erro) return "Erro";
    obterTelefone(usuario.id, function resolverTelefone(erro1, telefone) {
        if (erro1) return "Erro";
        obterEndereco(usuario.id, function resolverEndereco(erro2, endereco) {
            if (erro2) return "Erro";

            console.log(`
            Nome: ${usuario.nome},
            Endereco: ${endereco.rua}, ${endereco.numero}
            Telefone: (${telefone.ddd}), ${telefone.telefone}
            `);
        })
    })
})*/