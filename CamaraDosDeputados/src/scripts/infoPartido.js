var partido = null;
var uri = JSON.parse(localStorage.getItem('uriPartido')) || [];

acessaApi = async (uri) => {
    const res = await axios.get(uri);
    const { dados, ...resto} = res.data;
    partido = dados;

    renderizaPartido();
}

renderizaPartido = () => {
    var div = document.getElementById("div");

    var nome = document.createElement("h1");
    nome.textContent = partido.nome;
    nome.style = "word-wrap: break-word; font-family: Courier New, Courier, monospace;font-style: italic;color: gray; margin-left: 470px";
    
    var foto = document.createElement("img");
    foto.src = partido.urlLogo;
    foto.style = "margin-left: 50%; float:left;"; // mudar.
    
    div.appendChild(nome);
    div.appendChild(foto);


}

acessaApi(uri);