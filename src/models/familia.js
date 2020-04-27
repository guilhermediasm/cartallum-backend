const mongoose = require('../database');
const bcrypt = require('bcryptjs')
const pessoa = require('./utils/pessoa')
const dataCesta = require('./utils/dataCesta')
const endereco = require('./utils/endereco')

const FamiliaSchema = new mongoose.Schema({

    integrantes: [pessoa],

    rendaPercapita: {
        type: String,
        required: true
    },
    endereco: endereco,

    dataCestas: [dataCesta],

});


const Familia = mongoose.model('Familia', FamiliaSchema);

module.exports = Familia;