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
        require: false,
        default:"s/n"
    },
    complemento: {
        type: String,
        require: false
    },
    cep: {
        type: String,
        require: false
    },
    cidade: {
        type: String,
        require: false
    },
    estado: {
        type: String,
        require: false
    },
    pais: {
        type: String,
        require: false,
        default:"Brasil"
    }

});

module.exports = endereco;