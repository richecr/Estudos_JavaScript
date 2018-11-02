var deputado = JSON.parse(localStorage.getItem('deputado')) || [];

function renderizaDeputado () {
    var div = document.getElementById('div');

    var nome = document.createElement("h1");
    nome.style = "font-family: 'Courier New', Courier, monospace; font-style: italic; color: gray";
    nome.textContent = deputado.nome;

    var foto = document.createElement("img");
    foto.style = "margin-left: 120px;"; // mudar.
    foto.src = element.urlFoto;

    div.appendChild(nome);
}

renderizaDeputado();