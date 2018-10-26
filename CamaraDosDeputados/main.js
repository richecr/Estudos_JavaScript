var deputados = [];
var data;

function buscaDeputados() {
    
    if (data != undefined){
        while(continua(data.links)) {
            acessaApi(data.links[1].href);
            console.log(data);
            //adicionaDeputados(data.dados);
        }
    } else {
        console.log("OKOK");
        
    }
    renderizaDeputados(deputados);
}


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

function acessaApi(url) {
    axios.get(url)
    .then(function(response){
        data = response.data;
        adicionaDeputados(data.dados);
        
        for (let i = 0; i < data.links.length; i++) {
            if (data.links[i].rel === "next") {
                acessaApi(data.links[i].href);
                return;
            }
        }

        renderizaDeputados();
    }).catch(function(error){
        console.log(error);
    });
}

function adicionaDeputados(deps) {
    deps.forEach(element => {
        deputados.push(element);
    });
}

function pageDeputado(pos) {
    // Abrir uma nova página.
    console.log(deputados[pos].nome);
}

acessaApi("https://dadosabertos.camara.leg.br/api/v2/deputados?ordem=ASC&ordenarPor=nome&pagina=1&itens=100");