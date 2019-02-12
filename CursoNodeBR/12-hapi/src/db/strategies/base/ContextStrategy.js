const ICrud = require('../Interfaces/ICrud');

class ContextStrategy extends ICrud {
    constructor(strategy) {
        super();
        this._database = strategy;
    }

    async create(item) {
        return await this._database.create(item);
    }

    read(query, skip, limit) {
        return this._database.read(query, skip, limit);
    }

    update(id, item) {
        return this._database.update(id, item);
    }

    delete(id) {
        return this._database.delete(id);
    }

    static connect() {
        return this._database.connect();
    }

    isConnected() {
        return this._database.isConnected();
    }
}

module.exports = ContextStrategy;