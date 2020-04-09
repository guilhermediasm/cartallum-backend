const mongoose = require('mongoose')

const dataCesta = new mongoose.Schema({
    nomeInstituicao: {
        type: String,
        required: false
    },
    data: {
        type: Date,
        require: false
    }

});

module.exports = dataCesta;