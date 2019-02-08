const ICrud = require('../strategies/Interfaces/ICrud');
const Sequelize = require('sequelize');

// _ => private.

class PostGres extends ICrud {
    constructor() {
        super();
        this._driver = null;
        this._herois = null;
        this._connect();
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

    _connect() {
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
    }

    async defineModel() {
        this._herois = this.driver.define('herois', {
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

    create(item) {
        console.log("O item foi salvo no postgres");
    }
}

module.exports = PostGres;