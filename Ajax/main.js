// Ajax - Requisição assíncrono
// XMLHttpRequest -> Dá acesso as funcionalidades do ajax para recuperarmos alguma informação de um servidor.
// Utilizaremos a API do usuário do GitHub.

var xhr = new XMLHttpRequest();

xhr.open("GET", "https://api.github.com/users/RichElton");
xhr.send(null);


xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
        console.log(JSON.parse(xhr.responseText));
    }
}
