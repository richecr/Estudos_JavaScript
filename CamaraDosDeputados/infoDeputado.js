var deputado = JSON.parse(localStorage.getItem('deputado')) || [];

function renderizaDeputado () {
    var div = document.getElementById('div');

    var nome = document.createElement("h1");
    nome.style = "font-family: 'Courier New', Courier, monospace; font-style: italic; color: gray";
    nome.textContent = deputado.nome;
    div.appendChild(nome);
}

renderizaDeputado();