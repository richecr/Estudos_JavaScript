docker ps
docker exec -it c224ba311596 \
    mongo -u rickelton -p minhasenhasecreta --authenticationDatabase herois

// Visualizar as databases.
show dbs

// Mudando o contexto para uma database especifica.
use herois

// mostrar tables (colecoes).
show collections

// Inserir no banco de dados 'herois' na coleção 'herois'.
db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '17/05/1999'
})

// Listar (buscar).
db.herois.find();
db.herois.find().pretty() // Formatado.

db.herois.find({}, { poder: 1, _id: 0 }) // Trazer apenas a coluna poder.

// Update.
db.herois.update({ _id: ObjectId('5c6063670728bd3a21a61284') }, 
                 { nome: 'Mulher Maravilha'} ) // Atualiza o nome, mas as informacoes de poder e data são deletados.

db.herois.update({ _id: ObjectId("5c6063670728bd3a21a61284") }, 
                 { $set: { nome: 'Laterna Verde', poder: 'Anel' } }) // Atualiza o nome e poder e não deleta os dados.
                                                                     // Mas caso coloque um campo que n exista, ele cria esse campo e adiciona.

// Delete.
db.herois.remove({}) // remove tudo(Delete sem where).
db.herois.remove({ nome: 'Laterna Verde'})