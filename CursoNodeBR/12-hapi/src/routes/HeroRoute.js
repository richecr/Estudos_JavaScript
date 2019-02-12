const BaseRoute = require('./base/BaseRoute');
const Joi = require("joi");

class HeroRoute extends BaseRoute {
    constructor(db) {
        super();
        this.db = db;
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            config: {
                validate: {
                    // payload -> body
                    // headers -> Header
                    // params -> na URL :id
                    // query -> ?skip=0&limit=100
                    failAction: (request, headers, erro) => {
                        throw erro;
                    },
                    query: {
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(10),
                        nome: Joi.string().min(3).max(100)
                    }
                }
            },
            handler: (request, headers) => {
                try {
                    const { skip, limit, nome } = request.query;
                    const query = nome ? {
                        nome: {
                            $regex: `.*${nome}*.`
                        }
                    } : {}
                    
                    return this.db.read(query, skip, limit);
                } catch (error) {
                    console.error("Deu ruim :( ", error);
                    return;
                }
            }
        };
    }
}

module.exports = HeroRoute;