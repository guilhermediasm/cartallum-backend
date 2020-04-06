const mongoose = require('mongoose')

const endereco = new mongoose.Schema({
    rua: {
        type: String,
        required: true
    },
    bairro: {
        type: String,
        require: true
    },
    numero: {
        type: Number,
        require: true
    },
    complemento: {
        type: String,
        required: false
    },
    cep: {
        type: String,
        required: true
    },
    cidade: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    pais: {
        type: String,
        required: true
    }

});

module.exports = endereco;