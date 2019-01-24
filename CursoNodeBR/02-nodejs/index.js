
function obterUsuario(callback) {
    setTimeout(() => {
        return callback(null, {
            id: 1,
            nome: "Rick",
            nascimento: new Date()
        })
    }, 1000)
}

function obterTelefone(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            telefone: "12456",
            ddd: 111
        })
    }, 1000)
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: "João Sergio",
            numero: 000
        })
    })
}

function resolverUsuario(erro, usuario) {
    console.log("Usuário: " + usuario);
}

obterUsuario(function resolverUsuario(erro, usuario) {
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
})
//const telefone = obterTelefone(usuario.id);


//console.log("Telefone: " + telefone);