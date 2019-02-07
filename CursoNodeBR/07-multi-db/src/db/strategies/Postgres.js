const ICrud = require('../strategies/Interfaces/ICrud');

class PostGres extends ICrud {
    constructor() {
        super();    
    }

    create(item) {
        console.log("O item foi salvo no postgres");
    }
}

module.exports = PostGres;