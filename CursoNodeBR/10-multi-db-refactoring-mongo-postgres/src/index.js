const ContextStrategy = require('./db/strategies/base/ContextStrategy');
const MongoDB = require('./db/strategies/Mongo');
const PostGres = require('./db/strategies/Postgres');

// MongoDB
const contextMongo = new ContextStrategy(new MongoDB());
contextMongo.create();

// PostGres
const contextPost = new ContextStrategy(new PostGres());
contextPost.create();

// contextPost.read() // Lança erro.