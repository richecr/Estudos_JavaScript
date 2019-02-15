const BaseRoute = require('./base/BaseRoute');
const Boom = require('boom');
const Joi = require('joi');
const PasswordHelper = require('../helpers/PasswordHelper');

// npm i jsonwebtoken
const jwt = require('jsonwebtoken');

const failAction = (request, headers, erro) => {
    throw erro;
};

const USER = {
    username: 'brucewayne',
    password: 'batman123'
};

class AuthRoute extends BaseRoute {
    constructor(secret, db) {
        super();
        this.secret = secret;
        this.db = db;
    }

    login() {
        return {
            path: '/login',
            method: 'POST',
            config: {
                auth: false,
                tags: ['api'],
                description: 'Obter Token',
                notes: 'Faz login com user e senha do banco',

                validate: {
                    failAction,
                    payload: {
                        username: Joi.string().required(),
                        password: Joi.string().required()
                    }
                }
            },
            handler: async (request) => {
                const { username, password } = request.payload;
                
                const [usuario] = await this.db.read({
                    username: username.toLowerCase()
                })
                if ( !usuario ) {
                    return Boom.unauthorized('O usuário informado não existe!');
                }

                const match = await PasswordHelper.comparePassword(password, usuario.password);
                if ( !match ) {
                    return Boom.unauthorized('O usuário ou senha inválidos!');
                }

                // if (username.toLowerCase() !== USER.username || 
                //     password !== USER.password ) {
                //         return Boom.unauthorized();
                // }
                
                const token = jwt.sign({
                    username: username,
                    id: usuario.id
                }, this.secret)

                return {
                    token: token
                }
            } 
        }
    }
}

module.exports = AuthRoute;