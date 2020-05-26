const mongoose = require('../database');
const bcrypt = require('bcryptjs')
const endereco = require('./utils/endereco')

const InstituicaoSchema = new mongoose.Schema({
    nomeInstituicao: {
        type: String,
        require: true,
    },
    tipo: {
        type: String,
        require: false,
        default:"cliente"
    },
    email: {
        type: String,
        require: false,
        lowercase: true,
    },
    password: {
        type: String,
        require: true,
    },
    telefone: {
        type: String,
        require: false
    },
    endereco: endereco,
});

InstituicaoSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
})

const Instituicao = mongoose.model('Instituicao', InstituicaoSchema);

module.exports = Instituicao;