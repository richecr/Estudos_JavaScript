/**
 * Usando o axios(https://github.com/axios/axios).
 * tag para colocar no html: <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
 */

axios.get("https://api.github.com/users/RichElton").then(function(response){
    console.log(response.data.avatar_url);
}).catch(function(error){
    console.warn(error);
});

axios.get("https://dadosabertos.camara.leg.br/api/v2/deputados?ordem=ASC&ordenarPor=nome&pagina=1&itens=100").then(function(response){
	console.log(response.data.dados[0]);
}).catch(function(error){
	console.log(error);
});