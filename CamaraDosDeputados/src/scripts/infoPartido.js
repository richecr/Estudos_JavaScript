var partido = null;
var deputadolider = null;
var deputados = [];

var uri = JSON.parse(localStorage.getItem('uriPartido')) || [];

acessaApi = async (uri) => {
    const res = await axios.get(uri);
    const { dados, ...resto} = res.data;
    partido = dados;
    acessaDeputado(partido.status.lider.uri);
    //salvaDeputados(dados.status.uriMembros);
    
}

/* TODO listagens dos deputados do partido.
salvaDeputados = async (uri) => {
    const res = await axios.get(uri);
    console.log(res);
}
*/


renderizaPartido = () => {
    console.log(partido);
    var div = document.getElementById("div");

    var nome = document.createElement("h1");
    nome.textContent = partido.nome;
    nome.style = "word-wrap: break-word; font-family: Courier New, Courier, monospace;font-style: italic;color: gray";

    var foto = document.createElement("img");
    foto.src = partido.urlLogo;

    div.appendChild(nome);
    div.appendChild(foto);

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

    var totalMembros = document.createElement("h3");
    totalMembros.textContent = "Total de membros: " + partido.status.totalMembros;
    totalMembros.style = "font-family: Courier New, Courier, monospace;font-style: italic;color: gray";

    var totalPosse = document.createElement("h3");
    totalPosse.textContent = "Total de posse: " + partido.status.totalPosse;
    totalPosse.style = "font-family: Courier New, Courier, monospace;font-style: italic;color: gray";

    status.appendChild(titleStatus);
    status.appendChild(idLegislatura);
    status.appendChild(situacao);
    status.appendChild(totalMembros);
    status.appendChild(totalPosse);

    var detalhesLider = document.getElementById("lider");

    var lider = document.createElement("h1");
    lider.style = "font-family: Courier New, Courier, monospace;font-style: italic;color: gray";
    lider.textContent = "Líder do partido";

    var idLider = document.createElement("h3");
    idLider.textContent = "Id legislatura: " + partido.status.lider.idLegislatura;
    idLider.style = "font-family: Courier New, Courier, monospace;font-style: italic;color: gray";

    var nomeLider = document.createElement("h3");
    nomeLider.textContent = "Nome: " + partido.status.lider.nome;
    nomeLider.style = "font-family: Courier New, Courier, monospace;font-style: italic;color: gray";

    var ufLider = document.createElement("h3");
    ufLider.textContent = "UF: " + formataUfNascimento(partido.status.lider.uf);
    ufLider.style = "font-family: Courier New, Courier, monospace;font-style: italic;color: gray";

    var button = document.createElement("button");
    button.textContent = "Page";
    button.style = "font-family: 'Courier New', Courier, monospace; font-style: italic; margin-left: 100px; background-color: white; color: rgb(23, 23, 23); box-shadow: black 0px 0px 4px 2px";
    
    button.setAttribute("onclick", "pageDeputado()");

    detalhesLider.appendChild(lider);
    detalhesLider.appendChild(idLider);
    detalhesLider.appendChild(nomeLider);
    detalhesLider.appendChild(ufLider);
    detalhesLider.appendChild(button);

    var listar_deputados = document.getElementById("listar_deputados");

}

acessaDeputado = async (uri) => {
    const res = await axios.get(uri);
    const { dados, ...resto } = res.data;
    deputadolider = dados;

    renderizaPartido();
}

function pageDeputado() {
    // Abrir uma nova página.
    var a = document.createElement("a");
    a.href = "pageDeputado.html";
    a.click();
    salvarDeputado();
}

function salvarDeputado() {
    localStorage.setItem("deputado", JSON.stringify(deputadolider));
}

formataUfNascimento = (sigla) => {
    var estados = new Map();
    estados.set('AC', "Acre'");
    estados.set('AC','Acre');
    estados.set('AL','Alagoas');
    estados.set('AP','Amapá');
    estados.set('AM','Amazonas');
    estados.set('BA','Bahia');
    estados.set('CE','Ceará');
    estados.set('DF','Distrito Federal');
    estados.set('ES','Espírito Santo');
    estados.set('GO','Goiás');
    estados.set('MA','Maranhão');
    estados.set('MT','Mato Grosso');
    estados.set('MS','Mato Grosso do Sul');
    estados.set('MG','Minas Gerais');
    estados.set('PA','Pará');
    estados.set('PB','Paraíba');
    estados.set('PR','Paraná');
    estados.set('PE','Pernambuco');
    estados.set('PI','Piauí');
    estados.set('RJ','Rio de Janeiro');
    estados.set('RN','Rio Grande do Norte');
    estados.set('RS','Rio Grande do Sul');
    estados.set('RO','Rondônia');
    estados.set('RR','Roraima');
    estados.set('SC','Santa Catarina');
    estados.set('SP','São Paulo');
    estados.set('SE','Sergipe');
    estados.set('TO','Tocantins');
    return estados.get(sigla);
}

acessaApi(uri);