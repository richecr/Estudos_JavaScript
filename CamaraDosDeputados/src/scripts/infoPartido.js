var partido = null;
var uri = JSON.parse(localStorage.getItem('uriPartido')) || [];

acessaApi = async (uri) => {
    const res = await axios.get(uri);
    const { dados, ...resto} = res.data;
    partido = dados;

    renderizaPartido();
}

renderizaPartido = () => {
    console.log(partido);
    var div = document.getElementById("div");

    var nome = document.createElement("h1");
    nome.textContent = partido.nome;
    nome.style = "word-wrap: break-word; font-family: Courier New, Courier, monospace;font-style: italic;color: gray";

    var foto = document.createElement("img");
    foto.src = partido.urlLogo;

    var status = document.getElementById("status");

    var titleStatus = document.createElement("h1");
    titleStatus.style = "font-family: Courier New, Courier, monospace;font-style: italic;color: gray";
    titleStatus.textContent = "Detalhes do Partido";

    var idLegislatura = document.createElement("h3");
    idLegislatura.textContent = "Id legislatura: " + partido.status.idLegislatura;
    idLegislatura.style = "font-family: Courier New, Courier, monospace;font-style: italic;color: gray";

    var situacao = document.createElement("h3");
    situacao.textContent = "Situação: " + partido.status.situacao;
    situacao.style = "font-family: Courier New, Courier, monospace;font-style: italic;color: gray";

    div.appendChild(nome);
    div.appendChild(foto);

    status.appendChild(titleStatus);
    status.appendChild(idLegislatura);
    status.appendChild(situacao);

}

acessaApi(uri);