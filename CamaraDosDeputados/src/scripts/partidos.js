var partidos = [];

acessaApi = async (url) => {
    var res = await axios.get(url);
    const { dados, ...resto } = res.data;
    adicionaPartidos(dados);

    for (let i = 0; i < resto.links.length; i++) {
        if (resto.links[i].rel === "next") {
            acessaApi(resto.links[i].href);
            return;
        }
    }
    renderizaPartidos();
}

renderizaPartidos = () => {
    partidos.forEach(partido => {
        var ul = document.getElementById("lista");
        var li = document.createElement("li");
        var button = document.createElement("button");
        button.style = "font-family: 'Courier New', Courier, monospace; font-style: italic; margin-left: 100px; background-color: white; color: rgb(23, 23, 23); box-shadow: black 0px 0px 4px 2px;";
        button.textContent = "Ir page";
        
        var pos = partidos.indexOf(partido);
        button.setAttribute("onclick", "pagePartido(+" + pos + ")");
        
        var nome = document.createElement("h2");
        nome.style = "font-family: 'Courier New', Courier, monospace; font-style: italic; color: gray";
        nome.textContent = partido.nome + " - " + partido.sigla; 

        li.appendChild(nome);
        li.appendChild(button);
        ul.appendChild(li);
    });
}

pagePartido = (pos) => {
    var a = document.createElement("a");
    a.href = "pagePartido.html";
    a.click();
    salvarPartido(partidos[pos].uri);
}

salvarPartido = (deputado) => {
    localStorage.setItem("uriPartido", JSON.stringify(deputado));
}

adicionaPartidos = (dados) => {
    dados.forEach(e => {
        partidos.push(e);
    });
}

acessaApi("https://dadosabertos.camara.leg.br/api/v2/partidos?ordem=ASC&ordenarPor=sigla");