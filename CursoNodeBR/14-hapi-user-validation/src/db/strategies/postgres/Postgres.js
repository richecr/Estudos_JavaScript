const ICrud = require('../Interfaces/ICrud');
const Sequelize = require('sequelize');

// _ => private.

class PostGres extends ICrud {
    constructor(connection, schema) {
        super();
        this._connection = connection;
        this._schema = schema;
    }

    async isConnected() {
        try {
            await this._connection.authenticate();
            return true;
        } catch (error) {
            console.error("Fail :(", error);
            return false;
        }
    }

    static async defineModel(connection, schema) {
        const model = connection.define( schema.name, schema.schema, schema.options );

        await model.sync();
        return model;
    }

    static async connect() {
        const connection = new Sequelize(
            'heroes',
            'rickelton',
            'minhasenha',
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorsAliases: false,
                logging: false
                
            }
        )
        return connection;
    }

    async create(item) {
        const { dataValues } = await this._schema.create(item);
        return dataValues; 
    }

    read(query = {}) {
        return this._schema.findAll({ where: query, raw: true });
    }

    async update(id, novoItem, upsert=false) {
        const fn = upsert ? 'upsert' : 'update';

        return this._schema[fn](novoItem, { where: {id: id}} );
    }

    async delete(id) {
        const query = id ? { id } : {};

        return this._schema.destroy({ where: query });
    }
}

module.exports = PostGres;