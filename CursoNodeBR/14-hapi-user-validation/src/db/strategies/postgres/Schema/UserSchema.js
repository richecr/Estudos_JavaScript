const Sequelize = require('sequelize');

const UserSchema = {
    name: 'usuarios',
    schema: {
        id: {
            type: Sequelize.INTEGER,
            require: true,
            primaryKey: true,
            autoIncrement:true
        },
        username: {
            type: Sequelize.STRING,
            unique: true,
            require: true
        },
        password: {
            type: Sequelize.STRING,
            require: true
        }
    },
    options: {
        tableName: 'TB_USUARIOS',
        freezeTableName: false,
        timestamps: false
    }
}

module.exports = UserSchema;