const Mongoose = require("mongoose");

const heroisSchema = new Mongoose.Schema({
    nome: {
        type: String,
        require: true // Obrigatório.
    },
    poder: {
        type: String,
        require: true
    },
    insertAt: {
        type: Date,
        default: new Date()
    }
});

module.exports = Mongoose.model('herois', heroisSchema);