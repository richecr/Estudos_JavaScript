const BaseRoute = require('./base/BaseRoute');
const Joi = require("joi");

const failAction = (request, headers, erro) => {
    throw erro;
};

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
                    failAction,
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

    create() {
        return {
            path: '/herois',
            method: "POST",
            config: {
                validate: {
                    failAction,
                    payload: {
                        nome: Joi.string().required().min(3).max(100),
                        poder: Joi.string().required().min(2).max(100)
                    }
                }
            },
            handler: async (request) => {
                try {
                    const { nome, poder } = request.payload;
                    const result = await this.db.create({ nome: nome, poder: poder })
                    
                    return { 
                        message: "Heroi cadastrado com sucesso!",
                        _id: result._id
                    };
                } catch (error) {
                    console.log(("Deu ruim :( ", error));
                    return "Internal error";
                    
                }
            }
        }
    }
}

module.exports = HeroRoute;