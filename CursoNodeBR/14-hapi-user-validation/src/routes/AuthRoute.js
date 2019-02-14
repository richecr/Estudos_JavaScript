const BaseRoute = require('./base/BaseRoute');
const Boom = require('boom');
const Joi = require('joi');

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
    constructor(secret) {
        super();
        this.secret = secret;
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
                
                if (username.toLowerCase() !== USER.username || 
                    password !== USER.password ) {
                        return Boom.unauthorized();
                }
                
                
                const token = jwt.sign({
                    username: username,
                    id: 1
                }, this.secret)

                return {
                    token: token
                }
            } 
        }
    }
}

module.exports = AuthRoute;