const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const port = process.env.PORT || 8000;

const User = require('./domain/user');

// Conexão com a instancia do Banco de dados(MongoDB).
mongoose.connect('mongodb://localhost:27017/CRM')

// Configurando o parser para pegar as informações de POST.
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

// CORS.
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    next();
});

// Requisições no console.
app.use(morgan('dev'));

// Rotas.

// Rota básica.
app.get("/", (req, res) => {
    res.send("Bem-vindo a página principal.");
})

const apiRouter = express.Router();

apiRouter.use(function(req, res, next){
    console.log("Foi feita uma requisição para nossa api.");
    // Aqui será feita a autenticação dos users.
    next();
})

// Roteamento de testes.
// Acesse GET http://localhost:8000/api
apiRouter.get("/", (req, res) => {
    res.json({ message : "Essa é a nossa api."});
})

// Rotas terminadas em '/users'.
apiRouter.route('/users')
    
    // Criar users (POST).
    .post(function(req, res){
        var user = new User();

        user.name = req.body.name;
        user.username = req.body.username;
        user.password = req.body.password;

        user.save(function(err){
            if (err) {
                if (err.code === 11000) {
                    return res.json({
                        sucess: false,
                        message: 'Um usuário com esse username já existe.'
                    })
                } else {
                    return res.send(err);
                }
            }
            res.json({ message : 'Usuário criado!' });
        })
    })

    // Listando usuários (GET).
    .get(function(req, res){
        User.find(function(err, users){
            if (err) res.send(err);

            return res.json(users);
        })
    })

// Rotas terminadas em 'users/:id'
apiRouter.route('/users/:id')
    // Retorna um user (GET).
    .get(function(req, res) {
        User.findById(req.params.id, function(err, user) {
            if (err) res.send(err);

            res.json(user);
        })
    })

    // Atualizando um user (PUT).
    .put(function(req, res) {
        User.findById(req.params.id, function (err, user) {
            if (err) res.send(err);

            if (req.body.name) user.name = req.body.name;
            if (req.body.username) user.username = req.body.username;
            if (req.body.password) user.password = req.body.password;

            user.save(function(err) {
                if (err) res.send(err);

                res.json({ message: 'Usuário atualizado!' });
            })
        })
    })

    // Deletar um user (DELETE).
    .delete(function(req, res) {
        User.findByIdAndDelete(req.params.id, function (err, user){
            if (err) res.send(err);

            res.send({ message: 'Usuário deletado!'});
        })
    })

app.use("/api", apiRouter);

// Iniciando serviço.
app.listen(port);
console.log("A mágica ta na porta: " + port);