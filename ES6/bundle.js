"use strict";

var usuario = {
  nome: "Rick",
  idade: 19,
  endereco: {
    cidade: "Campina Grande",
    rua: "Joao Sergio de Almeida",
    numero: "560",
    ap: "202"
  }
};
var nome = usuario.nome,
    idade = usuario.idade,
    cidade = usuario.endereco.cidade;
console.log(nome);
console.log(idade);
console.log(cidade);

function mostraNome(_ref) {
  var nome = _ref.nome;
  console.log(nome);
}

function mostraCidade(_ref2) {
  var cidade = _ref2.endereco.cidade;
  console.log(cidade);
}

mostraNome(usuario);
mostraCidade(usuario);
