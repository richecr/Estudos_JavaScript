const usuario = {
    nome: "Rick",
    idade: 19,
    endereco: {
        cidade: "Campina Grande",
        rua: "Joao Sergio de Almeida",
        numero: "560",
        ap: "202",
    },
};

const { nome, idade, endereco:{ cidade } } = usuario;

console.log(nome);
console.log(idade);
console.log(cidade);

function mostraNome({ nome }) {
    console.log(nome);
}

function mostraCidade({endereco: { cidade }}) {
    console.log(cidade);
}

mostraNome(usuario);
mostraCidade(usuario);