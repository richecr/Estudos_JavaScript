var deputado = JSON.parse(localStorage.getItem('deputado')) || [];

acessa = async (url) => {
    const res = await axios.get(url);
    var dados = res.data.dados;
    deputado = dados;
    renderizaDeputado();
}

function renderizaDeputado() {
    var div = document.getElementById('div');

    var nome = document.createElement("h1");
    nome.style = "font-family: Courier New, Courier, monospace;font-style: italic;color: gray";
    nome.textContent = deputado.ultimoStatus.nome + " - " + deputado.ultimoStatus.siglaPartido;

    var foto = document.createElement("img");
    foto.src = deputado.ultimoStatus.urlFoto;

    var informacoes = document.getElementById("infor");
    
    var nomeCivil = document.createElement("h1");
    nomeCivil.style = "font-family: Courier New, Courier, monospace;font-style: italic;color: gray";
    nomeCivil.textContent = deputado.nomeCivil;

    var nascimento = document.createElement("h3");
    nascimento.style = "font-family: Courier New, Courier, monospace;font-style: italic;color: gray";
    nascimento.textContent = "Data de nascimento: " + formataData(deputado.dataNascimento);
    
    var ufNascimento = document.createElement("h3");
    ufNascimento.style = "font-family: Courier New, Courier, monospace;font-style: italic;color: gray";
    ufNascimento.textContent = "No estado de: " + formataUfNascimento(deputado.ufNascimento);
    
    var muniNascimento = document.createElement("h3");
    muniNascimento.style = "font-family: Courier New, Courier, monospace;font-style: italic;color: gray";
    muniNascimento.textContent = "No munícipio de: " + deputado.municipioNascimento;

    var escolaridade = document.createElement("h3");
    escolaridade.style = "font-family: Courier New, Courier, monospace;font-style: italic;color: gray";
    escolaridade.textContent = "Escolaridade: " + deputado.escolaridade;

    
    var gabineteInfo = document.getElementById("gabinete");

    var gabinete = document.createElement("h1");
    gabinete.style = "font-family: Courier New, Courier, monospace;font-style: italic;color: gray";
    gabinete.textContent = "GABINETE";

    var nomeGabinete = document.createElement("h3");
    nomeGabinete.style = "font-family: Courier New, Courier, monospace;font-style: italic;color: gray";
    nomeGabinete.textContent = "Nome do gabinete: " + deputado.ultimoStatus.gabinete.nome;

    var predioGabinete = document.createElement("h3");
    predioGabinete.style = "font-family: Courier New, Courier, monospace;font-style: italic;color: gray";
    predioGabinete.textContent = "Prédio do gabinete: " + deputado.ultimoStatus.gabinete.predio;

    var andarGabinete = document.createElement("h3");
    andarGabinete.style = "font-family: Courier New, Courier, monospace;font-style: italic;color: gray";
    andarGabinete.textContent = "Andar do gabinete: " + deputado.ultimoStatus.gabinete.andar;

    var foneGabinete = document.createElement("h3");
    foneGabinete.style = "font-family: Courier New, Courier, monospace;font-style: italic;color: gray";
    foneGabinete.textContent = "Telefone do gabinete: " + deputado.ultimoStatus.gabinete.telefone;

    var email = document.createElement("h3");
    email.style = "font-family: Courier New, Courier, monospace;font-style: italic;color: gray";
    email.textContent = "Telefone do gabinete: " + deputado.ultimoStatus.gabinete.email;

    gabineteInfo.appendChild(gabinete);
    gabineteInfo.appendChild(nomeGabinete);
    gabineteInfo.appendChild(predioGabinete);
    gabineteInfo.appendChild(andarGabinete);
    gabineteInfo.appendChild(foneGabinete);
    gabineteInfo.appendChild(email);

    informacoes.appendChild(nomeCivil);
    informacoes.appendChild(nascimento);
    informacoes.appendChild(ufNascimento);
    informacoes.appendChild(muniNascimento);
    informacoes.appendChild(escolaridade);
    informacoes.appendChild(document.createElement("br"));

    
    div.appendChild(nome);
    div.appendChild(foto);
}

formataData = (data) => {
    data = data.split("-");
    return data[2] + "/" + data[1] + "/" + data[0];
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

acessa(deputado.uri);