const ICrud = require('../Interfaces/ICrud');

class ContextStrategy extends ICrud {
    constructor(strategy) {
        super();
        this._database = strategy;
    }

    async create(item) {
        return await this._database.create(item);
    }

    read(query) {
        return this._database.read(query);
    }

    update(id, item) {
        return this._database.update(id, item);
    }

    delete(id) {
        return this._database.delete(id);
    }

    connect() {
        return this._database.connect();
    }

    isConnected() {
        return this._database.isConnected();
    }
}

module.exports = ContextStrategy;