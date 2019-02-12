const BaseRoute = require('./base/BaseRoute');

class HeroRoute extends BaseRoute {
    constructor(db) {
        super();
        this.db = db;
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            handler: (request, headers) => {
                try {
                    const { skip, limit, nome } = request.query;
                    let query = {};
                    if (nome) {
                        query.nome = nome;
                    }
                    if (skip && isNaN(skip)) {
                        throw new Error('O tipo do skip deve ser inteiro!');
                    }
                    if (limit && isNaN(limit)) {
                        throw new Error('O tipo do limit deve ser inteiro!');
                    }

                    return this.db.read(query, parseInt(skip), parseInt(limit));
                } catch (error) {
                    console.error("Deu ruim :( ", error);
                    return;
                }
            }
        };
    }
}

module.exports = HeroRoute;