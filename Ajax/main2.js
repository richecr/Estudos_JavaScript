/**
 * Usando o Promises.
 * JavaScript não espera a requisição terminar
 */


var minhaPromise = function() {
    // Resolve caso seja bem sucedido, ou reject caso não seja bem sucedida.
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://api.github.com/users/RichElton");
        xhr.send(null);

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject("Erro na requisição.");
                }
            }
        }
    });
}

/**
 * Na minha função, ao chamar o método resolve, ele chama o método then, caso seja o reject ele invoca o catch.
 */
minhaPromise().then(function(response){
    console.log(response);
}).catch(function(error){
    console.warn(error);
});