const mongoose = require('mongoose')

const dataCesta = new mongoose.Schema({
    nomeInstituicao: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        require: true
    }

});

module.exports = dataCesta;