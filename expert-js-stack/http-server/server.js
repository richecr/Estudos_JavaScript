// vamos começar, carregando o express e criando a app
const express = require("express")
const app = express()
const path = require('path')

app.get("/", (req, res)=>{
  res.sendFile(path.join(__dirname + "/index.html"));
})

var adminRouter = express.Router();

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

// Adiciona essas rotas a aplicação principal.
app.use("/admin", adminRouter);

// Iniciamos o servidor na porta 8000.
app.listen(8000);
console.log(("8000 é a porta mágica!"));