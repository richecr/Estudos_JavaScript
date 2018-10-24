var listElement = document.querySelector("#app ul");
var inputElement = document.querySelector("#app input");
var btnElement = document.querySelector("#app button");

var todos = JSON.parse(localStorage.getItem('list_todos')) || [];

function renderizaLista() {
    listElement.innerHTML = "";

    todos.forEach(element => {
        var li = document.createElement("li");
        li.innerText = element;

        var pos = todos.indexOf(element);

        var linkElement = document.createElement("a");
        linkElement.setAttribute("href", "#");
        linkElement.setAttribute("onclick", "excluir(" + pos + ")");
        var linktext = document.createTextNode("Excluir");
        linkElement.appendChild(linktext);

        listElement.appendChild(li);
        listElement.appendChild(linkElement);
    });
};

function add() {
    var nome = inputElement.value;
    var li = document.createElement("li");
    li.innerText = nome;
    todos.push(nome);
    renderizaLista();
    saveToStorage()
}

function excluir(pos) {
    // remove uma vez nessa posição.
    todos.splice(pos, 1);
    renderizaLista();
    saveToStorage()
}

function saveToStorage() {
    // Precisa salvar o objeto em forma de 'String'
    localStorage.setItem('list_todos', JSON.stringify(todos));
}

renderizaLista();