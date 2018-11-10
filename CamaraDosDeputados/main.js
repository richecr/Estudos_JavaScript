var deputados = [];
var data;

function renderizaDeputados() {
    deputados.forEach(element => {
        var dep = document.createElement("li");
        // Configurando o nome.
        var nome = document.createElement("h1");
        nome.style = "font-family: 'Courier New', Courier, monospace; font-style: italic; color: gray";
        nome.textContent = element.nome;
        // Configurando a foto.
        var foto = document.createElement("img");
        foto.style = "margin-left: 70px;";
        foto.src = element.urlFoto;
        // Configurando o botão.
        var button = document.createElement("button");
        button.textContent = "Page";
        button.style = "font-family: 'Courier New', Courier, monospace; font-style: italic; margin-left: 100px; background-color: white; color: rgb(23, 23, 23); box-shadow: black 0px 0px 4px 2px;";
        var pos = deputados.indexOf(element);
        button.setAttribute("onclick", "pageDeputado(+" + pos + ")");
        
        // Adicionando na lista.
        dep.appendChild(nome);
        dep.appendChild(document.createElement("br"));
        dep.appendChild(foto);
        dep.appendChild(document.createElement("br"));
        dep.appendChild(button);
        document.getElementById("lista").appendChild(dep);
    });
}

acessaApi = async (url) => {
    var res = await axios.get(url);
    const { dados, ...resto } = res.data;
    adicionaDeputados(dados);

    for (let i = 0; i < resto.links.length; i++) {
        if (resto.links[i].rel === "next") {
            acessaApi(resto.links[i].href);
            return;
        }
    }
    renderizaDeputados()
}

function adicionaDeputados(deps) {
    deps.forEach(element => {
        deputados.push(element);
    });
}

function pageDeputado(pos) {
    // Abrir uma nova página.
    var a = document.createElement("a");
    a.href = "pageDeputado.html";
    a.click();
    salvarDeputado(deputados[pos]);
}

function salvarDeputado(deputado) {
    localStorage.setItem("deputado", JSON.stringify(deputado));
}

acessaApi("https://dadosabertos.camara.leg.br/api/v2/deputados?ordem=ASC&ordenarPor=nome&pagina=1&itens=100");
