const mongoose = require('mongoose')

const endereco = new mongoose.Schema({
    rua: {
        type: String,
        require: true
    },
    bairro: {
        type: String,
        require: true
    },
    numero: {
        type: String,
        require: false
    },
    complemento: {
        type: String,
        require: false
    },
    cep: {
        type: String,
        require: true
    },
    cidade: {
        type: String,
        require: true
    },
    estado: {
        type: String,
        require: true
    },
    pais: {
        type: String,
        require: true
    }

});

module.exports = endereco;