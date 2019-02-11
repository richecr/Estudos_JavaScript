/* Passo-a-passo:

1 - npm install sequelize

2 - npm install pg-hstore pg

*/

const Sequelize = require('sequelize');
const drive = new Sequelize(
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

async function main() {
    const Herois = drive.define('herois', {
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

    await Herois.sync();

    // await Herois.create({
    //     nome: 'Laterna Verde',
    //     poder: 'Anel'
    // });

    // 'raw: true' => Mando ele trazer apenas as ifnromações úteis do meu BD.
    // 'attributes: ['nome']' => retornar os herois, apenas com a informação do nome. 
    const result = await Herois.findAll({ 
        raw: true,
        attributes: ['nome', 'poder']
    });
    console.log(result);
}

main();