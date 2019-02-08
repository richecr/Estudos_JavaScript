const ICrud = require('../strategies/Interfaces/ICrud');
const Sequelize = require('sequelize');

// _ => private.

class PostGres extends ICrud {
    constructor() {
        super();
        this._driver = null;
        this._herois = null;
    }

    async isConnected() {
        try {
            await this._driver.authenticate();
            return true;
        } catch (error) {
            console.error("Fail :(", error);
            return false;
        }
    }

    async connect() {
        this._driver = new Sequelize(
            'heroes',
            'rickelton',
            'minhasenha',
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorsAliases: false
            }
        )
        await this._defineModel();
    }

    async _defineModel() {
        this._herois = this._driver.define('herois', {
            id: {
                type: Sequelize.INTEGER,
                require: true,
                primaryKey: true,
                autoIncrement:true
            },
            nome: {
                type: Sequelize.STRING,
                require: true
            },
            poder: {
                type: Sequelize.STRING,
                require: true
            }
        }, {
            tableName: 'TB_HEROIS',
            freezeTableName: false,
            timestamps: false
        });

        await this._herois.sync();
    }

    async create(item) {
        const { dataValues } = await this._herois.create(item);
        return dataValues; 
    }

    read(query = {}) {
        return this._herois.findAll({ where: query, raw: true });
    }

    update(id, novoItem) {
        return this._herois.update(novoItem, { where: {id: id}} );
    }
}

module.exports = PostGres;