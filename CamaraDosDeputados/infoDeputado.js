var dep = JSON.parse(localStorage.getItem('deputado')) || [];
var deputado;

function acessaApi(url) {
    axios.get(url)
    .then(function(response){
        deputado = response.data.dados;
        console.log(deputado);
    }).catch(function(error){
        console.log(error);
    });
}

function renderizaDeputado () {
    var div = document.getElementById('div');

    var nome = document.createElement("h1");
    nome.style = "font-family: Courier New, Courier, monospace;font-style: italic;color: gray; margin-left: 470px";
    nome.textContent = deputado.nome + " - " + deputado.siglaPartido;

    var foto = document.createElement("img");
    foto.style = "margin-left: 650px;"; // mudar.
    foto.src = deputado.urlFoto;

    div.appendChild(nome);
    div.appendChild(foto);
}

acessaApi(dep.uri);

//renderizaDeputado();