// vamos começar, carregando o express e criando a app
const express = require("express")
const app = express()
const path = require('path')

app.get("/", (req, res)=>{
	res.sendFile(path.join(__dirname + "/index.html"));
})

var adminRouter = express.Router();

	// middleware de roteamento exeutado a cada requisição
	adminRouter.use((req, res, next) => {

	// logar cada requisição no console
	console.log(req.method, req.url)

	// continue com o que precisar ser feito e vá para a rota
	next();
})

// Cria rota para página principal. (http://localhost:8000/admin)
adminRouter.get("/", function(req, res){
	res.send("Eu sou o dashboard!");
})

// Cria rota para página de usuários. (http://localhost:8000/admin/users)
adminRouter.get("/users", function(req, res){
	res.send("Aqui listamos todos os users!");
})

// Cria rota para página de posts. (http://localhost:8000/admin/posts)
adminRouter.get("/posts", function(req, res) {
	res.send("Aqui listamos todos os posts!")
})

// Middleware para validação de paramentros, nessa caso para o 'name'.
adminRouter.param("name", (req, res, next, name)=>{

	// Aqui seria realizado a validação.
	console.log("Validando nome: " + name);

	// quando a validação acabar, salve o novo nome na requisição
	req.name = name;

	// Vai para próxima coisa a ser feita.
	next();
})

// rota com parâmetros. (http://localhost:8000/admin/users/:name)
adminRouter.get("/users/:name", (req, res)=>{
	res.send("Fala DEV " + req.name + "!");
})

// Rotas para login, a de acesso e a que o cliente envia para o servidor.
// Poderia ser definido diretamente no 'adminRouter'.
app.route("/login")
	.get((req, res)=>{
		res.send("Este é o formulário de login.");
	})

	.post((req, res)=>{
		res.send("Processando o formulário de login...");
	})

// Adiciona essas rotas a aplicação principal.
app.use("/admin", adminRouter);

// Iniciamos o servidor na porta 8000.
app.listen(8000);
console.log(("8000 é a porta mágica!"));